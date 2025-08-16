-- This migration script fixes the authentication schema. It replaces the
-- old, disconnected `users` table with a new one correctly linked to
-- `auth.users` and re-links the `profiles` table.

-- Step 1: Drop the foreign key constraint from the `profiles` table that depends on the old `users` table.
-- We use an IF EXISTS block to prevent errors if the constraint was already removed.
DO $$
BEGIN
   IF EXISTS (
       SELECT 1 FROM pg_constraint
       WHERE conname = 'profiles_user_id_fkey' AND conrelid = 'public.profiles'::regclass
   ) THEN
      ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_id_fkey;
   END IF;
END $$;

-- Step 2: Drop the old, disconnected `users` table.
DROP TABLE IF EXISTS public.users;

-- Step 3: Create the `users` table again, this time with the `id` as a primary key
-- that directly references the `id` in `auth.users`. This creates the correct link.
CREATE TABLE public.users (
  id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'Member' CHECK (role IN ('Admin', 'Member')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 4: Re-create RLS policies for the new `users` table.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can see their own user data"
  ON public.users FOR SELECT
  TO authenticated
  USING ( auth.uid() = id );

CREATE POLICY "Admins can manage all user data"
  ON public.users FOR ALL
  TO authenticated
  USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' )
  WITH CHECK ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' );

-- Step 5: Create a function that will be triggered when a new user is created.
-- This function inserts a new row into our public `users` table.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email));
  -- Manually set the role for the admin user upon creation
  IF new.email = 'admin@venapictures.com' THEN
      UPDATE public.users SET role = 'Admin' WHERE id = new.id;
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create a trigger that calls the `handle_new_user` function
-- every time a new user is added to the `auth.users` table.
-- We drop it first to ensure no old versions are hanging around.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 7: Re-link the `profiles` table. The `user_id` column in `profiles` should
-- now reference `auth.users(id)` directly, as this is the single source of truth for user IDs.
-- We will set it to SET NULL on delete, so if an admin user is deleted, the company profile doesn't get deleted.
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Step 8: Manually synchronize existing users.
-- This will populate the new `users` table with users that already exist in `auth.users`.
-- This is important for users created before this migration was applied.
INSERT INTO public.users (id, email, full_name, role)
SELECT id, email, raw_user_meta_data->>'full_name' as full_name,
       CASE WHEN email = 'admin@venapictures.com' THEN 'Admin' ELSE 'Member' END as role
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to necessary roles.
GRANT ALL ON TABLE public.users TO postgres;
GRANT ALL ON TABLE public.users TO service_role;
