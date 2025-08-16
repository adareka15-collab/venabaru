-- This migration script redefines the public `users` table to correctly link it
-- with the `auth.users` table from Supabase's authentication system.
-- It also creates a trigger to automatically populate the new `users` table
-- when a new user signs up.

-- Drop the old, disconnected `users` table to avoid conflicts.
DROP TABLE IF EXISTS public.users;

-- Create the `users` table again, this time with the `id` as a primary key
-- that directly references the `id` in `auth.users`. This creates the link.
CREATE TABLE public.users (
  id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'Member' CHECK (role IN ('Admin', 'Member')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create a function that will be triggered when a new user is created.
-- This function inserts a new row into our public `users` table,
-- copying the id, email, and full_name from the new authentication user.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that calls the `handle_new_user` function
-- every time a new user is added to the `auth.users` table.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable Row Level Security (RLS) on the new `users` table for security.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies.
-- 1. Authenticated users can view their own data.
CREATE POLICY "Authenticated users can see their own user data"
  ON public.users FOR SELECT
  TO authenticated
  USING ( auth.uid() = id );

-- 2. Users with the 'Admin' role can view and modify all user data.
CREATE POLICY "Admins can manage all user data"
  ON public.users FOR ALL
  TO authenticated
  USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' )
  WITH CHECK ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' );

-- Grant permissions to necessary roles.
GRANT ALL ON TABLE public.users TO postgres;
GRANT ALL ON TABLE public.users TO service_role;
