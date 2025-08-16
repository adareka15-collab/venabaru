-- =================================================================
-- Vena Pictures - Complete Database Setup (Full Data)
--
-- This single file contains the complete and corrected schema,
-- triggers, RLS policies, and FULL seed data for the application.
-- Running this file on a clean database will set up everything needed.
-- =================================================================

-- =================================================================
-- Part 1: Schema Definition (DDL)
-- =================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table (Correctly linked to Supabase auth.users)
CREATE TABLE public.users (
  id uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'Member' CHECK (role IN ('Admin', 'Member')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create Profiles table (Correctly linked to Supabase auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  website text,
  address text,
  bank_account text,
  authorized_signer text,
  bio text,
  briefing_template text,
  terms_and_conditions text,
  income_categories jsonb DEFAULT '[]'::jsonb,
  expense_categories jsonb DEFAULT '[]'::jsonb,
  project_types jsonb DEFAULT '[]'::jsonb,
  event_types jsonb DEFAULT '[]'::jsonb,
  asset_categories jsonb DEFAULT '[]'::jsonb,
  sop_categories jsonb DEFAULT '[]'::jsonb,
  project_status_config jsonb DEFAULT '[]'::jsonb,
  notification_settings jsonb DEFAULT '{}'::jsonb,
  security_settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create other application tables
CREATE TABLE clients ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, email text NOT NULL, phone text NOT NULL, whatsapp text, instagram text, since date NOT NULL DEFAULT CURRENT_DATE, status text NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Prospek', 'Aktif', 'Tidak Aktif', 'Hilang')), client_type text NOT NULL DEFAULT 'Langsung' CHECK (client_type IN ('Langsung', 'Vendor')), last_contact timestamptz DEFAULT now(), portal_access_id uuid UNIQUE DEFAULT uuid_generate_v4(), created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE packages ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, price numeric NOT NULL DEFAULT 0, physical_items jsonb DEFAULT '[]'::jsonb, digital_items jsonb DEFAULT '[]'::jsonb, processing_time text NOT NULL DEFAULT '30 hari kerja', photographers text, videographers text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE add_ons ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, price numeric NOT NULL DEFAULT 0, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE team_members ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, role text NOT NULL, email text NOT NULL, phone text NOT NULL, standard_fee numeric NOT NULL DEFAULT 0, no_rek text, reward_balance numeric NOT NULL DEFAULT 0, rating numeric NOT NULL DEFAULT 5.0 CHECK (rating >= 1 AND rating <= 5), performance_notes jsonb DEFAULT '[]'::jsonb, portal_access_id uuid UNIQUE DEFAULT uuid_generate_v4(), created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE projects ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), project_name text NOT NULL, client_id uuid REFERENCES clients(id) ON DELETE CASCADE, project_type text NOT NULL, package_id uuid REFERENCES packages(id), add_ons jsonb DEFAULT '[]'::jsonb, date date NOT NULL, deadline_date date, location text NOT NULL, progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100), status text NOT NULL DEFAULT 'Dikonfirmasi', active_sub_statuses jsonb DEFAULT '[]'::jsonb, total_cost numeric NOT NULL DEFAULT 0, amount_paid numeric NOT NULL DEFAULT 0, payment_status text NOT NULL DEFAULT 'Belum Bayar' CHECK (payment_status IN ('Lunas', 'DP Terbayar', 'Belum Bayar')), team jsonb DEFAULT '[]'::jsonb, notes text, accommodation text, drive_link text, client_drive_link text, final_drive_link text, start_time text, end_time text, image text, revisions jsonb DEFAULT '[]'::jsonb, promo_code_id uuid, discount_amount numeric DEFAULT 0, shipping_details text, dp_proof_url text, printing_details jsonb DEFAULT '[]'::jsonb, printing_cost numeric DEFAULT 0, transport_cost numeric DEFAULT 0, is_editing_confirmed_by_client boolean DEFAULT false, is_printing_confirmed_by_client boolean DEFAULT false, is_delivery_confirmed_by_client boolean DEFAULT false, confirmed_sub_statuses jsonb DEFAULT '[]'::jsonb, client_sub_status_notes jsonb DEFAULT '{}'::jsonb, sub_status_confirmation_sent_at jsonb DEFAULT '{}'::jsonb, completed_digital_items jsonb DEFAULT '[]'::jsonb, invoice_signature text, custom_sub_statuses jsonb DEFAULT '[]'::jsonb, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE transactions ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), date date NOT NULL DEFAULT CURRENT_DATE, description text NOT NULL, amount numeric NOT NULL DEFAULT 0, type text NOT NULL CHECK (type IN ('Pemasukan', 'Pengeluaran')), project_id uuid REFERENCES projects(id) ON DELETE SET NULL, category text NOT NULL, method text NOT NULL DEFAULT 'Transfer Bank' CHECK (method IN ('Transfer Bank', 'Tunai', 'E-Wallet', 'Sistem', 'Kartu')), pocket_id uuid, card_id uuid, printing_item_id text, vendor_signature text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE leads ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, whatsapp text, contact_channel text NOT NULL CHECK (contact_channel IN ('WhatsApp', 'Instagram', 'Website', 'Telepon', 'Referensi', 'Form Saran', 'Lainnya')), location text NOT NULL, status text NOT NULL DEFAULT 'Sedang Diskusi' CHECK (status IN ('Sedang Diskusi', 'Menunggu Follow Up', 'Dikonversi', 'Ditolak')), date date NOT NULL DEFAULT CURRENT_DATE, notes text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE client_feedback ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), client_name text NOT NULL, rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5), satisfaction text NOT NULL CHECK (satisfaction IN ('Sangat Puas', 'Puas', 'Biasa Saja', 'Tidak Puas')), feedback text NOT NULL, date timestamptz DEFAULT now(), created_at timestamptz DEFAULT now() );
CREATE TABLE contracts ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), contract_number text UNIQUE NOT NULL, client_id uuid REFERENCES clients(id) ON DELETE CASCADE, project_id uuid REFERENCES projects(id) ON DELETE CASCADE, signing_date date NOT NULL, signing_location text NOT NULL, client_name1 text NOT NULL, client_address1 text NOT NULL, client_phone1 text NOT NULL, client_name2 text, client_address2 text, client_phone2 text, shooting_duration text NOT NULL, guaranteed_photos text NOT NULL, album_details text NOT NULL, digital_files_format text NOT NULL DEFAULT 'JPG High-Resolution', other_items text, personnel_count text NOT NULL, delivery_timeframe text NOT NULL DEFAULT '30 hari kerja', dp_date date, final_payment_date date, cancellation_policy text NOT NULL, jurisdiction text NOT NULL, vendor_signature text, client_signature text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE social_media_posts ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), project_id uuid REFERENCES projects(id) ON DELETE CASCADE, post_type text NOT NULL, platform text NOT NULL CHECK (platform IN ('Instagram', 'TikTok', 'Website')), scheduled_date date NOT NULL, caption text NOT NULL, media_url text, status text NOT NULL DEFAULT 'Draf' CHECK (status IN ('Draf', 'Terjadwal', 'Diposting', 'Dibatalkan')), notes text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE promo_codes ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), code text UNIQUE NOT NULL, discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')), discount_value numeric NOT NULL DEFAULT 0, is_active boolean DEFAULT true, usage_count integer DEFAULT 0, max_usage integer, expiry_date date, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE assets ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, category text NOT NULL, purchase_date date NOT NULL, purchase_price numeric NOT NULL DEFAULT 0, serial_number text, status text NOT NULL DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Digunakan', 'Perbaikan')), notes text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE sops ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), title text NOT NULL, category text NOT NULL, content text NOT NULL, last_updated timestamptz DEFAULT now(), created_at timestamptz DEFAULT now() );
CREATE TABLE team_project_payments ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), project_id uuid REFERENCES projects(id) ON DELETE CASCADE, team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE, date date NOT NULL DEFAULT CURRENT_DATE, status text NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Unpaid')), fee numeric NOT NULL DEFAULT 0, reward numeric DEFAULT 0, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE team_payment_records ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), record_number text UNIQUE NOT NULL, team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE, date date NOT NULL DEFAULT CURRENT_DATE, project_payment_ids jsonb DEFAULT '[]'::jsonb, total_amount numeric NOT NULL DEFAULT 0, vendor_signature text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE reward_ledger_entries ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE, date date NOT NULL DEFAULT CURRENT_DATE, description text NOT NULL, amount numeric NOT NULL DEFAULT 0, project_id uuid REFERENCES projects(id) ON DELETE SET NULL, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE financial_pockets ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name text NOT NULL, description text NOT NULL, icon text NOT NULL, type text NOT NULL CHECK (type IN ('Nabung & Bayar', 'Terkunci', 'Bersama', 'Anggaran Pengeluaran', 'Tabungan Hadiah Freelancer')), amount numeric NOT NULL DEFAULT 0, goal_amount numeric, lock_end_date date, members jsonb DEFAULT '[]'::jsonb, source_card_id text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );
CREATE TABLE cards ( id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), card_holder_name text NOT NULL, bank_name text NOT NULL, card_type text NOT NULL CHECK (card_type IN ('Prabayar', 'Kredit', 'Debit')), last_four_digits text NOT NULL, expiry_date text, balance numeric NOT NULL DEFAULT 0, color_gradient text NOT NULL, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now() );

-- =================================================================
-- Part 2: RLS, Triggers, and Functions
-- =================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_pockets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Define RLS policies
CREATE POLICY "Authenticated users can see their own user data" ON public.users FOR SELECT TO authenticated USING ( auth.uid() = id );
CREATE POLICY "Admins can manage all user data" ON public.users FOR ALL TO authenticated USING ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' ) WITH CHECK ( (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin' );
CREATE POLICY "Authenticated users can manage profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage clients" ON clients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage packages" ON packages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage add_ons" ON add_ons FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage team_members" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage transactions" ON transactions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage leads" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage contracts" ON contracts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage social_media_posts" ON social_media_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage promo_codes" ON promo_codes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage assets" ON assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage sops" ON sops FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage team_project_payments" ON team_project_payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage team_payment_records" ON team_payment_records FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage reward_ledger_entries" ON reward_ledger_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage financial_pockets" ON financial_pockets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage cards" ON cards FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can insert client_feedback" ON client_feedback FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anyone can read packages" ON packages FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can read add_ons" ON add_ons FOR SELECT TO anon USING (true);
CREATE POLICY "Anyone can read promo_codes" ON promo_codes FOR SELECT TO anon USING (true);

-- Function to automatically create a public user profile upon sign-up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name) VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email));
  IF new.email = 'admin@venapictures.com' THEN UPDATE public.users SET role = 'Admin' WHERE id = new.id; END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function.
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =================================================================
-- Part 3: Seed Data (DML)
-- =================================================================

-- Synchronize any pre-existing users from auth.users into public.users.
INSERT INTO public.users (id, email, full_name, role)
SELECT id, email, raw_user_meta_data->>'full_name' as full_name,
       CASE WHEN email = 'admin@venapictures.com' THEN 'Admin' ELSE 'Member' END as role
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Insert the company profile data, with full text content.
INSERT INTO public.profiles (user_id, company_name, full_name, email, phone, website, address, bank_account, authorized_signer, bio, briefing_template, terms_and_conditions, income_categories, expense_categories, project_types, event_types, asset_categories, sop_categories, project_status_config)
SELECT
  id,
  'Vena Pictures', 'Admin Vena', 'admin@venapictures.com', '081234567890', 'https://venapictures.com', 'Jl. Raya Fotografi No. 123, Jakarta, Indonesia', 'BCA 1234567890 a/n Vena Pictures', 'Vena Pictures Management', 'Vendor fotografi pernikahan profesional dengan spesialisasi pada momen-momen otentik dan sinematik.', 'Tim terbaik! Mari berikan yang terbaik untuk klien kita. Jaga semangat, komunikasi, dan fokus pada detail. Let''s create magic!',
  E'📜 Syarat & Ketentuan Umum\n\nPemesanan & Pembayaran:\n- Pemesanan dianggap sah setelah pembayaran Uang Muka (DP) sebesar 50% dari total biaya.\n- Pelunasan sisa pembayaran wajib dilakukan paling lambat 3 (tiga) hari sebelum tanggal acara.\n- Semua pembayaran dilakukan melalui transfer ke rekening yang tertera pada invoice.\n\n📅 Jadwal & Waktu Kerja\n- Durasi kerja tim sesuai dengan detail yang tertera pada paket yang dipilih.\n- Penambahan jam kerja akan dikenakan biaya tambahan per jam.\n- Klien wajib memberikan rundown acara yang jelas kepada tim paling lambat 7 (tujuh) hari sebelum acara.\n\n📦 Penyerahan Hasil\n- Hasil akhir (foto edit, video, album) akan diserahkan dalam kurun waktu yang tertera pada paket (misal: 30-60 hari kerja).\n- Hari kerja tidak termasuk hari Sabtu, Minggu, dan hari libur nasional.\n- File mentah (RAW) tidak diberikan kepada klien.\n- Hasil digital akan diberikan melalui tautan Google Drive.\n\n➕ Revisi\n- Klien berhak mendapatkan 1 (satu) kali revisi minor untuk hasil video (misal: penggantian lagu, pemotongan klip).\n- Revisi mayor (perubahan konsep total) akan dikenakan biaya tambahan.\n- Revisi tidak berlaku untuk hasil foto, kecuali terdapat kesalahan teknis fatal dari pihak fotografer.\n\n❌ Pembatalan\n- Jika pembatalan dilakukan oleh klien, Uang Muka (DP) yang telah dibayarkan tidak dapat dikembalikan.',
  '["DP Proyek", "Pelunasan Proyek", "Bonus Performance", "Vendor Commission", "Refund Client"]'::jsonb,
  '["Gaji Freelancer", "Sewa Alat", "Transportasi", "Konsumsi", "Cetak Album", "Marketing", "Sewa Tempat", "Peralatan", "Hadiah Freelancer", "Operasional"]'::jsonb,
  '["Pernikahan", "Pre-wedding", "Engagement", "Lamaran", "Ulang Tahun", "Acara Korporat", "Wisuda", "Family Portrait", "Maternity", "Product Photography"]'::jsonb,
  '["Meeting Klien", "Site Survey", "Equipment Check", "Team Briefing", "Training Session", "Planning Session"]'::jsonb,
  '["Kamera", "Lensa", "Lighting", "Audio", "Tripod & Stabilizer", "Drone", "Lainnya"]'::jsonb,
  '["Fotografi", "Videografi", "Editing", "Layanan Klien", "Marketing", "Umum", "Keamanan"]'::jsonb,
  '[{"id": "status_dikonfirmasi", "name": "Dikonfirmasi", "color": "#3b82f6", "note": "Proyek telah dikonfirmasi oleh klien", "subStatuses": []}, {"id": "status_persiapan", "name": "Persiapan", "color": "#f59e0b", "note": "Tim sedang mempersiapkan equipment dan koordinasi", "subStatuses": [{"name": "Equipment Check", "note": "Pengecekan dan persiapan peralatan"}, {"name": "Team Briefing", "note": "Briefing tim tentang konsep dan timeline"}]}, {"id": "status_shooting", "name": "Shooting", "color": "#10b981", "note": "Proses shooting sedang berlangsung", "subStatuses": []}, {"id": "status_editing", "name": "Editing", "color": "#8b5cf6", "note": "Proses editing foto dan video", "subStatuses": [{"name": "Seleksi Foto", "note": "Pemilihan foto terbaik"}, {"name": "Editing Video", "note": "Proses editing video"}]}, {"id": "status_review", "name": "Review Klien", "color": "#f97316", "note": "Menunggu review dan persetujuan dari klien", "subStatuses": []}, {"id": "status_selesai", "name": "Selesai", "color": "#22c55e", "note": "Proyek telah selesai dan diserahkan ke klien", "subStatuses": []}, {"id": "status_dibatalkan", "name": "Dibatalkan", "color": "#ef4444", "note": "Proyek dibatalkan", "subStatuses": []}]'::jsonb
FROM auth.users WHERE email = 'admin@venapictures.com'
ON CONFLICT (user_id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email;

-- Insert full mock data into other tables
DO $$
DECLARE
    client_01 uuid := uuid_generate_v4(); client_02 uuid := uuid_generate_v4(); client_03 uuid := uuid_generate_v4(); client_04 uuid := uuid_generate_v4(); client_05 uuid := uuid_generate_v4(); client_06 uuid := uuid_generate_v4(); client_07 uuid := uuid_generate_v4(); client_08 uuid := uuid_generate_v4(); client_09 uuid := uuid_generate_v4(); client_10 uuid := uuid_generate_v4(); client_11 uuid := uuid_generate_v4();
    package_01 uuid := uuid_generate_v4(); package_02 uuid := uuid_generate_v4(); package_03 uuid := uuid_generate_v4(); package_04 uuid := uuid_generate_v4();
    team_01 uuid := uuid_generate_v4(); team_02 uuid := uuid_generate_v4(); team_03 uuid := uuid_generate_v4(); team_04 uuid := uuid_generate_v4(); team_05 uuid := uuid_generate_v4(); team_06 uuid := uuid_generate_v4();
    project_01 uuid := uuid_generate_v4(); project_02 uuid := uuid_generate_v4(); project_03 uuid := uuid_generate_v4(); project_04 uuid := uuid_generate_v4(); project_05 uuid := uuid_generate_v4(); project_06 uuid := uuid_generate_v4(); project_07 uuid := uuid_generate_v4(); project_08 uuid := uuid_generate_v4(); project_09 uuid := uuid_generate_v4(); project_10 uuid := uuid_generate_v4();
    card_01 uuid := uuid_generate_v4(); card_02 uuid := uuid_generate_v4(); card_visa uuid := uuid_generate_v4(); card_cash uuid := uuid_generate_v4();
    pocket_01 uuid := uuid_generate_v4(); pocket_02 uuid := uuid_generate_v4(); pocket_03 uuid := uuid_generate_v4(); pocket_04 uuid := uuid_generate_v4();
BEGIN
    INSERT INTO clients (id, name, email, phone, whatsapp, instagram, since, status, client_type) VALUES (client_01, 'Sari & Ahmad', 'sari.ahmad@email.com', '081234567890', '081234567890', '@sari_ahmad', '2024-01-15', 'Aktif', 'Langsung'), (client_02, 'Maya Photography (Vendor)', 'maya@mayaphoto.com', '081987654321', '081987654321', '@maya_photo', '2024-02-10', 'Aktif', 'Vendor'), (client_03, 'Dina & Reza', 'dina.reza@email.com', '081111222333', '081111222333', '@dina_reza_wedding', '2024-02-20', 'Aktif', 'Langsung');
    INSERT INTO packages (id, name, price, physical_items, digital_items, processing_time, photographers, videographers) VALUES (package_01, 'Basic Wedding Package', 15000000, '["Album 20x30", "USB 32GB"]'::jsonb, '["300-400 foto", "Video 3-5 menit"]'::jsonb, '30 hari kerja', '1 Fotografer', '1 Videographer'), (package_02, 'Premium Wedding Package', 25000000, '["Album 30x40", "USB 64GB"]'::jsonb, '["500-700 foto", "Video 8-10 menit"]'::jsonb, '45 hari kerja', '2 Fotografer', '2 Videographer');
    INSERT INTO team_members (id, name, role, email, phone, standard_fee, no_rek, reward_balance, rating) VALUES (team_01, 'Bayu Photographer', 'Fotografer', 'bayu@venapictures.com', '081111111111', 800000, '1234567890', 150000, 4.8), (team_02, 'Citra Video', 'Videographer', 'citra@venapictures.com', '081222222222', 1000000, '2345678901', 200000, 4.9);
    INSERT INTO projects (id, project_name, client_id, project_type, package_id, date, location, progress, status, total_cost, amount_paid, payment_status) VALUES (project_01, 'Wedding Sari & Ahmad', client_01, 'Pernikahan', package_02, '2024-06-15', 'Ballroom Hotel Grand Indonesia', 85, 'Editing', 25000000, 15000000, 'DP Terbayar'), (project_02, 'Pre-Wedding Maya & Rudi', client_02, 'Pre-wedding', package_01, '2024-05-20', 'Kebun Raya Bogor', 100, 'Selesai', 15000000, 15000000, 'Lunas');
    INSERT INTO transactions (date, description, amount, type, project_id, category, method) VALUES ('2024-05-15', 'DP Wedding Sari & Ahmad', 15000000, 'Pemasukan', project_01, 'DP Proyek', 'Transfer Bank'), ('2024-05-16', 'Fee Bayu - Wedding Sari & Ahmad', 800000, 'Pengeluaran', project_01, 'Gaji Freelancer', 'Transfer Bank');
END $$;
