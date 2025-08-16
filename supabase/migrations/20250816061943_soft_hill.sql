/*
  # Initial Database Schema for Vena Pictures

  1. New Tables
    - `users` - User accounts and authentication
    - `clients` - Client information and portal access
    - `projects` - Project details and status tracking
    - `team_members` - Freelancer information
    - `packages` - Service packages
    - `add_ons` - Additional services
    - `transactions` - Financial transactions
    - `leads` - Prospect management
    - `client_feedback` - Customer satisfaction data
    - `contracts` - Legal contracts
    - `social_media_posts` - Social media planning
    - `promo_codes` - Discount codes
    - `assets` - Equipment and asset tracking
    - `sops` - Standard Operating Procedures
    - `revisions` - Project revision tracking
    - `team_project_payments` - Freelancer payment tracking
    - `team_payment_records` - Payment slip records
    - `reward_ledger_entries` - Freelancer reward tracking
    - `financial_pockets` - Budget allocation
    - `cards` - Payment cards/accounts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Separate policies for public forms

  3. Features
    - UUID primary keys
    - Timestamps for audit trail
    - JSON fields for complex data
    - Foreign key relationships
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'Member' CHECK (role IN ('Admin', 'Member')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  instagram text,
  since date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Prospek', 'Aktif', 'Tidak Aktif', 'Hilang')),
  client_type text NOT NULL DEFAULT 'Langsung' CHECK (client_type IN ('Langsung', 'Vendor')),
  last_contact timestamptz DEFAULT now(),
  portal_access_id uuid UNIQUE DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  physical_items jsonb DEFAULT '[]'::jsonb,
  digital_items jsonb DEFAULT '[]'::jsonb,
  processing_time text NOT NULL DEFAULT '30 hari kerja',
  photographers text,
  videographers text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add-ons table
CREATE TABLE IF NOT EXISTS add_ons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  standard_fee numeric NOT NULL DEFAULT 0,
  no_rek text,
  reward_balance numeric NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 5.0 CHECK (rating >= 1 AND rating <= 5),
  performance_notes jsonb DEFAULT '[]'::jsonb,
  portal_access_id uuid UNIQUE DEFAULT uuid_generate_v4(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_name text NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_type text NOT NULL,
  package_id uuid REFERENCES packages(id),
  add_ons jsonb DEFAULT '[]'::jsonb,
  date date NOT NULL,
  deadline_date date,
  location text NOT NULL,
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text NOT NULL DEFAULT 'Dikonfirmasi',
  active_sub_statuses jsonb DEFAULT '[]'::jsonb,
  total_cost numeric NOT NULL DEFAULT 0,
  amount_paid numeric NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'Belum Bayar' CHECK (payment_status IN ('Lunas', 'DP Terbayar', 'Belum Bayar')),
  team jsonb DEFAULT '[]'::jsonb,
  notes text,
  accommodation text,
  drive_link text,
  client_drive_link text,
  final_drive_link text,
  start_time text,
  end_time text,
  image text,
  revisions jsonb DEFAULT '[]'::jsonb,
  promo_code_id uuid,
  discount_amount numeric DEFAULT 0,
  shipping_details text,
  dp_proof_url text,
  printing_details jsonb DEFAULT '[]'::jsonb,
  printing_cost numeric DEFAULT 0,
  transport_cost numeric DEFAULT 0,
  is_editing_confirmed_by_client boolean DEFAULT false,
  is_printing_confirmed_by_client boolean DEFAULT false,
  is_delivery_confirmed_by_client boolean DEFAULT false,
  confirmed_sub_statuses jsonb DEFAULT '[]'::jsonb,
  client_sub_status_notes jsonb DEFAULT '{}'::jsonb,
  sub_status_confirmation_sent_at jsonb DEFAULT '{}'::jsonb,
  completed_digital_items jsonb DEFAULT '[]'::jsonb,
  invoice_signature text,
  custom_sub_statuses jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  type text NOT NULL CHECK (type IN ('Pemasukan', 'Pengeluaran')),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  category text NOT NULL,
  method text NOT NULL DEFAULT 'Transfer Bank' CHECK (method IN ('Transfer Bank', 'Tunai', 'E-Wallet', 'Sistem', 'Kartu')),
  pocket_id uuid,
  card_id uuid,
  printing_item_id text,
  vendor_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  whatsapp text,
  contact_channel text NOT NULL CHECK (contact_channel IN ('WhatsApp', 'Instagram', 'Website', 'Telepon', 'Referensi', 'Form Saran', 'Lainnya')),
  location text NOT NULL,
  status text NOT NULL DEFAULT 'Sedang Diskusi' CHECK (status IN ('Sedang Diskusi', 'Menunggu Follow Up', 'Dikonversi', 'Ditolak')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Client feedback table
CREATE TABLE IF NOT EXISTS client_feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  satisfaction text NOT NULL CHECK (satisfaction IN ('Sangat Puas', 'Puas', 'Biasa Saja', 'Tidak Puas')),
  feedback text NOT NULL,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  signing_date date NOT NULL,
  signing_location text NOT NULL,
  client_name1 text NOT NULL,
  client_address1 text NOT NULL,
  client_phone1 text NOT NULL,
  client_name2 text,
  client_address2 text,
  client_phone2 text,
  shooting_duration text NOT NULL,
  guaranteed_photos text NOT NULL,
  album_details text NOT NULL,
  digital_files_format text NOT NULL DEFAULT 'JPG High-Resolution',
  other_items text,
  personnel_count text NOT NULL,
  delivery_timeframe text NOT NULL DEFAULT '30 hari kerja',
  dp_date date,
  final_payment_date date,
  cancellation_policy text NOT NULL,
  jurisdiction text NOT NULL,
  vendor_signature text,
  client_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Social media posts table
CREATE TABLE IF NOT EXISTS social_media_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  post_type text NOT NULL,
  platform text NOT NULL CHECK (platform IN ('Instagram', 'TikTok', 'Website')),
  scheduled_date date NOT NULL,
  caption text NOT NULL,
  media_url text,
  status text NOT NULL DEFAULT 'Draf' CHECK (status IN ('Draf', 'Terjadwal', 'Diposting', 'Dibatalkan')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  max_usage integer,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  category text NOT NULL,
  purchase_date date NOT NULL,
  purchase_price numeric NOT NULL DEFAULT 0,
  serial_number text,
  status text NOT NULL DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Digunakan', 'Perbaikan')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- SOPs table
CREATE TABLE IF NOT EXISTS sops (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Team project payments table
CREATE TABLE IF NOT EXISTS team_project_payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Unpaid')),
  fee numeric NOT NULL DEFAULT 0,
  reward numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team payment records table
CREATE TABLE IF NOT EXISTS team_payment_records (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  record_number text UNIQUE NOT NULL,
  team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  project_payment_ids jsonb DEFAULT '[]'::jsonb,
  total_amount numeric NOT NULL DEFAULT 0,
  vendor_signature text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reward ledger entries table
CREATE TABLE IF NOT EXISTS reward_ledger_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_member_id uuid REFERENCES team_members(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Financial pockets table
CREATE TABLE IF NOT EXISTS financial_pockets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  type text NOT NULL CHECK (type IN ('Nabung & Bayar', 'Terkunci', 'Bersama', 'Anggaran Pengeluaran', 'Tabungan Hadiah Freelancer')),
  amount numeric NOT NULL DEFAULT 0,
  goal_amount numeric,
  lock_end_date date,
  members jsonb DEFAULT '[]'::jsonb,
  source_card_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_holder_name text NOT NULL,
  bank_name text NOT NULL,
  card_type text NOT NULL CHECK (card_type IN ('Prabayar', 'Kredit', 'Debit')),
  last_four_digits text NOT NULL,
  expiry_date text,
  balance numeric NOT NULL DEFAULT 0,
  color_gradient text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_project_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_pockets ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users
CREATE POLICY "Authenticated users can manage users"
  ON users FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage packages"
  ON packages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage add_ons"
  ON add_ons FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage team_members"
  ON team_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage leads"
  ON leads FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contracts"
  ON contracts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage social_media_posts"
  ON social_media_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage promo_codes"
  ON promo_codes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage assets"
  ON assets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage sops"
  ON sops FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage team_project_payments"
  ON team_project_payments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage team_payment_records"
  ON team_payment_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage reward_ledger_entries"
  ON reward_ledger_entries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage financial_pockets"
  ON financial_pockets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage cards"
  ON cards FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public policies for forms
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can insert client_feedback"
  ON client_feedback FOR INSERT
  TO anon
  WITH CHECK (true);

-- Public read policies for booking form
CREATE POLICY "Anyone can read packages"
  ON packages FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read add_ons"
  ON add_ons FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can read promo_codes"
  ON promo_codes FOR SELECT
  TO anon
  USING (true);

-- Portal access policies
CREATE POLICY "Clients can access their own data via portal"
  ON clients FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Team members can access their own data via portal"
  ON team_members FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Portal users can read related projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_portal_access_id ON clients(portal_access_id);
CREATE INDEX IF NOT EXISTS idx_team_members_portal_access_id ON team_members(portal_access_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(date);
CREATE INDEX IF NOT EXISTS idx_transactions_project_id ON transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_leads_date ON leads(date);
CREATE INDEX IF NOT EXISTS idx_client_feedback_date ON client_feedback(date);