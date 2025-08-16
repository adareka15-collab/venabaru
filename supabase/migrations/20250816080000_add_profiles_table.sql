
/*
  # Add Profiles Table for Settings
  
  This migration adds the profiles table to store company profile information,
  categories, and project status configurations for the Settings page.
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
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
  notification_settings jsonb DEFAULT '{
    "newProject": true,
    "paymentConfirmation": true,
    "deadlineReminder": true
  }'::jsonb,
  security_settings jsonb DEFAULT '{
    "twoFactorEnabled": false
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy for authenticated users
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Authenticated users can manage profiles'
  ) THEN
    CREATE POLICY "Authenticated users can manage profiles"
      ON profiles FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Insert Vena Pictures profile data
INSERT INTO profiles (
  user_id,
  company_name,
  full_name,
  email,
  phone,
  website,
  address,
  bank_account,
  authorized_signer,
  bio,
  briefing_template,
  terms_and_conditions,
  income_categories,
  expense_categories,
  project_types,
  event_types,
  asset_categories,
  sop_categories,
  project_status_config
) VALUES (
  'd5527778-db97-4fb4-ad64-bdc3656c647c',
  'Vena Pictures',
  'Admin Vena',
  'admin@venapictures.com',
  '081234567890',
  'https://venapictures.com',
  'Jl. Raya Fotografi No. 123, Jakarta, Indonesia',
  'BCA 1234567890 a/n Vena Pictures',
  'Vena Pictures Management',
  'Vendor fotografi pernikahan profesional dengan spesialisasi pada momen-momen otentik dan sinematik.',
  'Tim terbaik! Mari berikan yang terbaik untuk klien kita. Jaga semangat, komunikasi, dan fokus pada detail. Let''s create magic!',
  E'📜 Syarat & Ketentuan Umum\n\nPemesanan & Pembayaran:\n- Pemesanan dianggap sah setelah pembayaran Uang Muka (DP) sebesar 50% dari total biaya.\n- Pelunasan sisa pembayaran wajib dilakukan paling lambat 3 (tiga) hari sebelum tanggal acara.\n- Semua pembayaran dilakukan melalui transfer ke rekening yang tertera pada invoice.\n\n📅 Jadwal & Waktu Kerja\n- Durasi kerja tim sesuai dengan detail yang tertera pada paket yang dipilih.\n- Penambahan jam kerja akan dikenakan biaya tambahan per jam.\n- Klien wajib memberikan rundown acara yang jelas kepada tim paling lambat 7 (tujuh) hari sebelum acara.\n\n📦 Penyerahan Hasil\n- Hasil akhir (foto edit, video, album) akan diserahkan dalam kurun waktu yang tertera pada paket (misal: 30-60 hari kerja).\n- Hari kerja tidak termasuk hari Sabtu, Minggu, dan hari libur nasional.\n- File mentah (RAW) tidak diberikan kepada klien.\n- Hasil digital akan diberikan melalui tautan Google Drive.\n\n➕ Revisi\n- Klien berhak mendapatkan 1 (satu) kali revisi minor untuk hasil video (misal: penggantian lagu, pemotongan klip).\n- Revisi mayor (perubahan konsep total) akan dikenakan biaya tambahan.\n- Revisi tidak berlaku untuk hasil foto, kecuali terdapat kesalahan teknis fatal dari pihak fotografer.\n\n❌ Pembatalan\n- Jika pembatalan dilakukan oleh klien, Uang Muka (DP) yang telah dibayarkan tidak dapat dikembalikan.',
  '["DP Proyek", "Pelunasan Proyek", "Bonus Performance", "Vendor Commission", "Refund Client"]'::jsonb,
  '["Gaji Freelancer", "Sewa Alat", "Transportasi", "Konsumsi", "Cetak Album", "Marketing", "Sewa Tempat", "Peralatan", "Hadiah Freelancer", "Operasional"]'::jsonb,
  '["Pernikahan", "Pre-wedding", "Engagement", "Lamaran", "Ulang Tahun", "Acara Korporat", "Wisuda", "Family Portrait", "Maternity", "Product Photography"]'::jsonb,
  '["Meeting Klien", "Site Survey", "Equipment Check", "Team Briefing", "Training Session", "Planning Session"]'::jsonb,
  '["Kamera", "Lensa", "Lighting", "Audio", "Tripod & Stabilizer", "Drone", "Lainnya"]'::jsonb,
  '["Fotografi", "Videografi", "Editing", "Layanan Klien", "Marketing", "Umum", "Keamanan"]'::jsonb,
  '[
    {
      "id": "status_dikonfirmasi",
      "name": "Dikonfirmasi",
      "color": "#3b82f6",
      "note": "Proyek telah dikonfirmasi oleh klien",
      "subStatuses": []
    },
    {
      "id": "status_persiapan",
      "name": "Persiapan",
      "color": "#f59e0b",
      "note": "Tim sedang mempersiapkan equipment dan koordinasi",
      "subStatuses": [
        {
          "name": "Equipment Check",
          "note": "Pengecekan dan persiapan peralatan"
        },
        {
          "name": "Team Briefing",
          "note": "Briefing tim tentang konsep dan timeline"
        },
        {
          "name": "Site Survey",
          "note": "Survey lokasi shooting"
        }
      ]
    },
    {
      "id": "status_shooting",
      "name": "Shooting",
      "color": "#10b981",
      "note": "Proses shooting sedang berlangsung",
      "subStatuses": [
        {
          "name": "Preparation",
          "note": "Persiapan di lokasi"
        },
        {
          "name": "Main Session",
          "note": "Sesi utama shooting"
        },
        {
          "name": "Additional Shots",
          "note": "Pengambilan foto/video tambahan"
        }
      ]
    },
    {
      "id": "status_editing",
      "name": "Editing",
      "color": "#8b5cf6",
      "note": "Proses editing foto dan video",
      "subStatuses": [
        {
          "name": "Seleksi Foto",
          "note": "Pemilihan foto terbaik"
        },
        {
          "name": "Editing Foto",
          "note": "Proses editing foto"
        },
        {
          "name": "Editing Video",
          "note": "Proses editing video"
        },
        {
          "name": "Review Internal",
          "note": "Review hasil editing oleh tim"
        }
      ]
    },
    {
      "id": "status_review",
      "name": "Review Klien",
      "color": "#f97316",
      "note": "Menunggu review dan persetujuan dari klien",
      "subStatuses": [
        {
          "name": "Preview Dikirim",
          "note": "Preview hasil telah dikirim ke klien"
        },
        {
          "name": "Menunggu Feedback",
          "note": "Menunggu feedback dari klien"
        },
        {
          "name": "Revisi",
          "note": "Proses revisi berdasarkan feedback klien"
        }
      ]
    },
    {
      "id": "status_produksi",
      "name": "Produksi",
      "color": "#06b6d4",
      "note": "Proses cetak album dan persiapan delivery",
      "subStatuses": [
        {
          "name": "Cetak Album",
          "note": "Proses cetak album fisik"
        },
        {
          "name": "Packaging",
          "note": "Pengemasan produk"
        },
        {
          "name": "Quality Check",
          "note": "Pengecekan kualitas produk"
        }
      ]
    },
    {
      "id": "status_selesai",
      "name": "Selesai",
      "color": "#22c55e",
      "note": "Proyek telah selesai dan diserahkan ke klien",
      "subStatuses": []
    },
    {
      "id": "status_dibatalkan",
      "name": "Dibatalkan",
      "color": "#ef4444",
      "note": "Proyek dibatalkan",
      "subStatuses": []
    }
  ]'::jsonb
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_company_name ON profiles(company_name);
