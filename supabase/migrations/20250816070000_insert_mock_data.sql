
/*
  # Insert Mock Data for Vena Pictures Application
  
  This migration inserts comprehensive mock data into all tables with proper UUID generation.
  Data includes users, clients, packages, team members, projects, transactions, and more.
*/

-- Insert Users with actual Supabase Authentication UUIDs
INSERT INTO users (id, email, full_name, role, permissions) VALUES
('d5527778-db97-4fb4-ad64-bdc3656c647c', 'admin@venapictures.com', 'Admin Vena', 'Admin', '[]'::jsonb),
('ed00bcb2-6257-405a-9039-245e4dd4cdc0', 'boceng@venapictures.com', 'Boceng Staf', 'Member', '["Dashboard", "Prospek", "Manajemen Klien", "Proyek", "Freelancer", "Kalender", "Input Package", "Manajemen Aset", "Kontrak Kerja", "SOP", "Perencana Media Sosial"]'::jsonb);

-- Insert Clients (store IDs for reference)
DO $$
DECLARE
    client_01 uuid := uuid_generate_v4();
    client_02 uuid := uuid_generate_v4();
    client_03 uuid := uuid_generate_v4();
    client_04 uuid := uuid_generate_v4();
    client_05 uuid := uuid_generate_v4();
    client_06 uuid := uuid_generate_v4();
    client_07 uuid := uuid_generate_v4();
    client_08 uuid := uuid_generate_v4();
    client_09 uuid := uuid_generate_v4();
    client_10 uuid := uuid_generate_v4();
    client_11 uuid := uuid_generate_v4();
    
    -- Package IDs
    package_01 uuid := uuid_generate_v4();
    package_02 uuid := uuid_generate_v4();
    package_03 uuid := uuid_generate_v4();
    package_04 uuid := uuid_generate_v4();
    
    -- Team Member IDs
    team_01 uuid := uuid_generate_v4();
    team_02 uuid := uuid_generate_v4();
    team_03 uuid := uuid_generate_v4();
    team_04 uuid := uuid_generate_v4();
    team_05 uuid := uuid_generate_v4();
    team_06 uuid := uuid_generate_v4();
    
    -- Project IDs
    project_01 uuid := uuid_generate_v4();
    project_02 uuid := uuid_generate_v4();
    project_03 uuid := uuid_generate_v4();
    project_04 uuid := uuid_generate_v4();
    project_05 uuid := uuid_generate_v4();
    project_06 uuid := uuid_generate_v4();
    project_07 uuid := uuid_generate_v4();
    project_08 uuid := uuid_generate_v4();
    project_09 uuid := uuid_generate_v4();
    project_10 uuid := uuid_generate_v4();
    
    -- Card IDs
    card_01 uuid := uuid_generate_v4();
    card_02 uuid := uuid_generate_v4();
    card_visa uuid := uuid_generate_v4();
    card_cash uuid := uuid_generate_v4();
    
    -- Pocket IDs
    pocket_01 uuid := uuid_generate_v4();
    pocket_02 uuid := uuid_generate_v4();
    pocket_03 uuid := uuid_generate_v4();
    pocket_04 uuid := uuid_generate_v4();
    
BEGIN
    -- Insert Clients
    INSERT INTO clients (id, name, email, phone, whatsapp, instagram, since, status, client_type) VALUES
    (client_01, 'Sari & Ahmad', 'sari.ahmad@email.com', '081234567890', '081234567890', '@sari_ahmad', '2024-01-15', 'Aktif', 'Langsung'),
    (client_02, 'Maya Photography (Vendor)', 'maya@mayaphoto.com', '081987654321', '081987654321', '@maya_photo', '2024-02-10', 'Aktif', 'Vendor'),
    (client_03, 'Dina & Reza', 'dina.reza@email.com', '081111222333', '081111222333', '@dina_reza_wedding', '2024-02-20', 'Aktif', 'Langsung'),
    (client_04, 'Lina & Budi', 'lina.budi@email.com', '081444555666', '081444555666', '@lina_budi', '2024-03-05', 'Aktif', 'Langsung'),
    (client_05, 'Ani & Joko', 'ani.joko@email.com', '081777888999', '081777888999', '@ani_joko_wed', '2024-03-15', 'Aktif', 'Langsung'),
    (client_06, 'Rita Corp (Vendor)', 'rita@ritacorp.com', '081555666777', '081555666777', '@ritacorp', '2024-03-20', 'Aktif', 'Vendor'),
    (client_07, 'Dewi & Andi', 'dewi.andi@email.com', '081222333444', '081222333444', '@dewi_andi', '2024-04-01', 'Aktif', 'Langsung'),
    (client_08, 'Sinta & Yoga', 'sinta.yoga@email.com', '081666777888', '081666777888', '@sinta_yoga', '2024-04-10', 'Aktif', 'Langsung'),
    (client_09, 'Eka & Dodi', 'eka.dodi@email.com', '081888999000', '081888999000', '@eka_dodi_love', '2024-04-20', 'Aktif', 'Langsung'),
    (client_10, 'Tuti & Agus', 'tuti.agus@email.com', '081333444555', '081333444555', '@tuti_agus', '2024-05-01', 'Aktif', 'Langsung'),
    (client_11, 'Mega & Bayu', 'mega.bayu@email.com', '081999000111', '081999000111', '@mega_bayu_wed', '2024-05-15', 'Aktif', 'Langsung');
    
    -- Insert Packages
    INSERT INTO packages (id, name, price, physical_items, digital_items, processing_time, photographers, videographers) VALUES
    (package_01, 'Basic Wedding Package', 15000000, 
     '["Album 20x30 (30 halaman)", "USB Flashdisk 32GB", "Frame 8R (2 buah)"]'::jsonb,
     '["300-400 foto teredit", "Video highlight 3-5 menit", "Raw photos (CD)"]'::jsonb,
     '30 hari kerja', '1 Fotografer', '1 Videographer'),
    (package_02, 'Premium Wedding Package', 25000000,
     '["Album 30x40 (50 halaman)", "Album keluarga 20x30", "USB Flashdisk 64GB", "Frame 8R (4 buah)", "Canvas 40x60"]'::jsonb,
     '["500-700 foto teredit", "Video cinematic 8-10 menit", "Video dokumentasi", "Same day edit", "Raw photos & videos"]'::jsonb,
     '45 hari kerja', '2 Fotografer', '2 Videographer'),
    (package_03, 'Luxury Wedding Package', 40000000,
     '["Album premium 40x60 (80 halaman)", "Album orang tua (2 buah)", "Album keluarga (2 buah)", "USB Flashdisk 128GB", "Frame gallery (6 buah)", "Canvas 60x90", "Acrylic frame"]'::jsonb,
     '["800-1000 foto teredit", "Video cinematic 15-20 menit", "Video dokumentasi penuh", "Same day edit", "Drone footage", "Raw photos & videos", "Social media package"]'::jsonb,
     '60 hari kerja', '3 Fotografer', '2 Videographer + 1 Drone Operator'),
    (package_04, 'Pre-Wedding Package', 8000000,
     '["Album 20x30 (20 halaman)", "Frame 8R (2 buah)", "USB Flashdisk 16GB"]'::jsonb,
     '["150-200 foto teredit", "Video cinematic 3-4 menit", "Raw photos"]'::jsonb,
     '14 hari kerja', '1 Fotografer', '1 Videographer');
    
    -- Insert Add-ons
    INSERT INTO add_ons (name, price) VALUES
    ('Extra Album 20x30', 2500000),
    ('Extra Frame 8R', 300000),
    ('Canvas 40x60', 1200000),
    ('Acrylic Frame', 1500000),
    ('Extra USB 32GB', 250000),
    ('Same Day Edit', 3000000),
    ('Drone Footage', 2500000),
    ('Live Streaming', 4000000),
    ('Extra Fotografer', 1500000),
    ('Extra Videographer', 2000000),
    ('Raw Video Files', 1000000),
    ('Extended Coverage (+2 jam)', 2000000);
    
    -- Insert Team Members
    INSERT INTO team_members (id, name, role, email, phone, standard_fee, no_rek, reward_balance, rating, performance_notes) VALUES
    (team_01, 'Bayu Photographer', 'Fotografer', 'bayu@venapictures.com', '081111111111', 800000, '1234567890', 150000, 4.8, 
     '[{"id": "note-01", "date": "2024-04-15", "note": "Excellent work on Sari & Ahmad wedding", "type": "Positive"}]'::jsonb),
    (team_02, 'Citra Video', 'Videographer', 'citra@venapictures.com', '081222222222', 1000000, '2345678901', 200000, 4.9,
     '[{"id": "note-02", "date": "2024-04-20", "note": "Creative cinematic shots", "type": "Positive"}]'::jsonb),
    (team_03, 'Denny Editor', 'Video Editor', 'denny@venapictures.com', '081333333333', 600000, '3456789012', 100000, 4.7,
     '[{"id": "note-03", "date": "2024-04-10", "note": "Fast turnaround time", "type": "Positive"}]'::jsonb),
    (team_04, 'Eka Assistant', 'Asisten', 'eka@venapictures.com', '081444444444', 300000, '4567890123', 50000, 4.5, '[]'::jsonb),
    (team_05, 'Fandi Drone', 'Drone Operator', 'fandi@venapictures.com', '081555555555', 750000, '5678901234', 125000, 4.6,
     '[{"id": "note-04", "date": "2024-03-25", "note": "Great aerial shots", "type": "Positive"}]'::jsonb),
    (team_06, 'Gina MUA', 'Make Up Artist', 'gina@venapictures.com', '081666666666', 500000, '6789012345', 75000, 4.8, '[]'::jsonb);
    
    -- Insert Projects
    INSERT INTO projects (id, project_name, client_id, project_type, package_id, date, deadline_date, location, progress, status, total_cost, amount_paid, payment_status, team, notes) VALUES
    (project_01, 'Wedding Sari & Ahmad', client_01, 'Pernikahan', package_02, '2024-06-15', '2024-07-30', 'Ballroom Hotel Grand Indonesia', 85, 'Editing', 25000000, 15000000, 'DP Terbayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000)
     ),
     'Tema dekorasi gold & cream. Client request extra coverage untuk akad nikah.'),
    (project_02, 'Pre-Wedding Maya & Rudi', client_02, 'Pre-wedding', package_04, '2024-05-20', '2024-06-03', 'Kebun Raya Bogor', 100, 'Selesai', 8000000, 8000000, 'Lunas',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000)
     ),
     'Outdoor session, cuaca sempurna. Client sangat puas dengan hasil.'),
    (project_03, 'Wedding Dina & Reza', client_03, 'Pernikahan', package_01, '2024-07-10', '2024-08-09', 'Gedung Serbaguna Kemayoran', 40, 'Persiapan', 15000000, 7500000, 'DP Terbayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_03, 'name', 'Denny Editor', 'role', 'Video Editor', 'fee', 600000)
     ),
     'Pernikahan adat Jawa. Perlu koordinasi dengan pihak keluarga untuk prosesi adat.'),
    (project_04, 'Wedding Lina & Budi', client_04, 'Pernikahan', package_03, '2024-08-05', '2024-10-04', 'The Mulia Bali', 20, 'Persiapan', 40000000, 20000000, 'DP Terbayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000),
       jsonb_build_object('id', team_05, 'name', 'Fandi Drone', 'role', 'Drone Operator', 'fee', 750000)
     ),
     'Destination wedding di Bali. Perlu arrange transportasi dan akomodasi tim.'),
    (project_05, 'Lamaran Ani & Joko', client_05, 'Lamaran', package_04, '2024-06-01', '2024-06-15', 'Rumah Orang Tua Ani', 90, 'Editing', 8000000, 8000000, 'Lunas',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000)
     ),
     'Acara intimate dengan keluarga. Dokumentasi prosesi lamaran tradisional.'),
    (project_06, 'Corporate Event Rita Corp', client_06, 'Acara Korporat', package_01, '2024-06-25', '2024-07-10', 'JCC Senayan', 60, 'Editing', 15000000, 10000000, 'DP Terbayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000)
     ),
     'Annual gathering perusahaan. Butuh dokumentasi lengkap untuk report internal.'),
    (project_07, 'Pre-Wedding Dewi & Andi', client_07, 'Pre-wedding', package_04, '2024-07-15', '2024-07-29', 'Pantai Anyer', 10, 'Persiapan', 8000000, 4000000, 'DP Terbayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000)
     ),
     'Beach session dengan tema sunset. Backup plan indoor jika cuaca buruk.'),
    (project_08, 'Wedding Sinta & Yoga', client_08, 'Pernikahan', package_02, '2024-08-20', '2024-10-04', 'Balai Kartini Jakarta', 5, 'Dikonfirmasi', 25000000, 0, 'Belum Bayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000),
       jsonb_build_object('id', team_02, 'name', 'Citra Video', 'role', 'Videographer', 'fee', 1000000)
     ),
     'Traditional Javanese wedding. Koordinasi dengan wedding organizer untuk timeline.'),
    (project_09, 'Birthday Party Eka Jr.', client_09, 'Ulang Tahun', package_04, '2024-07-05', '2024-07-12', 'McDonald Kelapa Gading', 100, 'Selesai', 5000000, 5000000, 'Lunas',
     jsonb_build_array(
       jsonb_build_object('id', team_04, 'name', 'Eka Assistant', 'role', 'Asisten', 'fee', 300000)
     ),
     'Ulang tahun anak ke-5. Tema superhero, banyak candid shots dengan anak-anak.'),
    (project_10, 'Wedding Tuti & Agus', client_10, 'Pernikahan', package_01, '2024-09-10', '2024-10-10', 'Gedung PBSI Jakarta', 0, 'Dikonfirmasi', 15000000, 0, 'Belum Bayar',
     jsonb_build_array(
       jsonb_build_object('id', team_01, 'name', 'Bayu Photographer', 'role', 'Fotografer', 'fee', 800000)
     ),
     'Simple wedding reception. Client budget terbatas tapi ingin hasil maksimal.');
    
    -- Insert Cards
    INSERT INTO cards (id, card_holder_name, bank_name, card_type, last_four_digits, expiry_date, balance, color_gradient) VALUES
    (card_01, 'Admin Vena', 'WBank', 'Prabayar', '3090', '09/24', 5250000, 'from-purple-500 to-indigo-600'),
    (card_02, 'Admin Vena', 'WBank', 'Prabayar', '9800', '04/26', 8750000, 'from-blue-500 to-cyan-500'),
    (card_visa, 'Admin Vena', 'VISA', 'Kredit', '0032', '09/24', 2500000, 'from-slate-100 to-slate-300'),
    (card_cash, 'Uang Tunai', 'Tunai', 'Debit', 'CASH', NULL, 1200000, 'from-emerald-500 to-green-600');
    
    -- Insert Financial Pockets
    INSERT INTO financial_pockets (id, name, description, icon, type, amount, goal_amount, source_card_id) VALUES
    (pocket_01, 'Dana Darurat', 'Simpanan untuk kebutuhan mendesak', '🚨', 'Terkunci', 5000000, 10000000, card_01::text),
    (pocket_02, 'Upgrade Equipment', 'Tabungan untuk beli kamera dan lensa baru', '📷', 'Nabung & Bayar', 8000000, 50000000, card_02::text),
    (pocket_03, 'Hadiah Freelancer', 'Alokasi bonus untuk tim freelancer', '🎁', 'Tabungan Hadiah Freelancer', 2000000, NULL, card_visa::text),
    (pocket_04, 'Marketing Budget', 'Anggaran untuk promosi dan iklan', '📈', 'Anggaran Pengeluaran', 3000000, 5000000, card_cash::text);
    
    -- Insert Transactions (Income)
    INSERT INTO transactions (date, description, amount, type, project_id, category, method, card_id, pocket_id) VALUES
    ('2024-05-15', 'DP Wedding Sari & Ahmad', 15000000, 'Pemasukan', project_01, 'DP Proyek', 'Transfer Bank', card_01, NULL),
    ('2024-05-20', 'Pelunasan Pre-Wedding Maya & Rudi', 8000000, 'Pemasukan', project_02, 'Pelunasan Proyek', 'Transfer Bank', card_02, NULL),
    ('2024-06-01', 'DP Wedding Dina & Reza', 7500000, 'Pemasukan', project_03, 'DP Proyek', 'E-Wallet', card_01, NULL),
    ('2024-06-05', 'Pelunasan Lamaran Ani & Joko', 8000000, 'Pemasukan', project_05, 'Pelunasan Proyek', 'Transfer Bank', card_02, NULL),
    ('2024-06-10', 'DP Wedding Lina & Budi', 20000000, 'Pemasukan', project_04, 'DP Proyek', 'Transfer Bank', card_visa, NULL),
    ('2024-06-15', 'DP Corporate Event Rita Corp', 10000000, 'Pemasukan', project_06, 'DP Proyek', 'Transfer Bank', card_02, NULL),
    ('2024-06-20', 'DP Pre-Wedding Dewi & Andi', 4000000, 'Pemasukan', project_07, 'DP Proyek', 'Tunai', card_cash, NULL),
    ('2024-06-25', 'Pelunasan Birthday Party Eka Jr.', 5000000, 'Pemasukan', project_09, 'Pelunasan Proyek', 'Transfer Bank', card_01, NULL);
    
    -- Insert Transactions (Expenses)
    INSERT INTO transactions (date, description, amount, type, project_id, category, method, card_id, pocket_id) VALUES
    ('2024-05-16', 'Fee Bayu - Wedding Sari & Ahmad', 800000, 'Pengeluaran', project_01, 'Gaji Freelancer', 'Transfer Bank', card_01, NULL),
    ('2024-05-16', 'Fee Citra - Wedding Sari & Ahmad', 1000000, 'Pengeluaran', project_01, 'Gaji Freelancer', 'Transfer Bank', card_01, NULL),
    ('2024-05-21', 'Fee Bayu - Pre-Wedding Maya & Rudi', 800000, 'Pengeluaran', project_02, 'Gaji Freelancer', 'Transfer Bank', card_02, NULL),
    ('2024-05-21', 'Fee Citra - Pre-Wedding Maya & Rudi', 1000000, 'Pengeluaran', project_02, 'Gaji Freelancer', 'Transfer Bank', card_02, NULL),
    ('2024-06-01', 'Sewa Kamera Canon 5D Mark IV', 500000, 'Pengeluaran', project_03, 'Sewa Alat', 'Transfer Bank', card_01, NULL),
    ('2024-06-02', 'Transportasi ke Bogor', 200000, 'Pengeluaran', project_02, 'Transportasi', 'Tunai', card_cash, NULL),
    ('2024-06-03', 'Konsumsi Tim Shooting', 300000, 'Pengeluaran', project_02, 'Konsumsi', 'Tunai', card_cash, NULL),
    ('2024-06-05', 'Cetak Album Wedding Maya & Rudi', 1500000, 'Pengeluaran', project_02, 'Cetak Album', 'Transfer Bank', card_02, NULL),
    ('2024-06-06', 'Bonus Bayu - Excellent Performance', 150000, 'Pengeluaran', NULL, 'Hadiah Freelancer', 'Sistem', NULL, pocket_03),
    ('2024-06-06', 'Bonus Citra - Creative Work', 200000, 'Pengeluaran', NULL, 'Hadiah Freelancer', 'Sistem', NULL, pocket_03),
    ('2024-06-10', 'Iklan Instagram Ads', 500000, 'Pengeluaran', NULL, 'Marketing', 'Kartu', card_visa, pocket_04),
    ('2024-06-12', 'Sewa Studio untuk Meeting', 400000, 'Pengeluaran', NULL, 'Sewa Tempat', 'Transfer Bank', card_01, NULL),
    ('2024-06-15', 'Beli Memory Card 128GB', 800000, 'Pengeluaran', NULL, 'Peralatan', 'Transfer Bank', card_02, NULL);
    
    -- Insert Leads
    INSERT INTO leads (name, whatsapp, contact_channel, location, status, date, notes) VALUES
    ('Putri & Andi', '081999888777', 'WhatsApp', 'Jakarta Selatan', 'Sedang Diskusi', '2024-06-01', 'Tertarik paket premium, budget 30jt. Follow up minggu depan.'),
    ('Sarah Wedding Organizer', '081777666555', 'Instagram', 'Bandung', 'Menunggu Follow Up', '2024-06-03', 'WO ingin kerjasama untuk 3 wedding bulan Juli. Nego harga paket.'),
    ('Budi & Siti', '081555444333', 'Website', 'Bekasi', 'Sedang Diskusi', '2024-06-05', 'Wedding Februari 2025. Minta proposal detail paket luxury.'),
    ('Maya Corp', '081333222111', 'Telepon', 'Jakarta Pusat', 'Dikonversi', '2024-05-28', 'Sudah deal untuk corporate event. Jadi klien Rita Corp.'),
    ('Dewi & Rahmat', '081222111000', 'Referensi', 'Depok', 'Ditolak', '2024-05-25', 'Budget tidak sesuai dengan ekspektasi paket yang diinginkan.'),
    ('Lestari & Doni', '081111000999', 'WhatsApp', 'Bogor', 'Sedang Diskusi', '2024-06-07', 'Pre-wedding Agustus, lokasi Puncak. Tunggu konfirmasi tanggal.'),
    ('Event Plus Jakarta', '081000999888', 'Instagram', 'Jakarta Barat', 'Menunggu Follow Up', '2024-06-08', 'EO besar, potensi kerjasama banyak project. Schedule meeting.'),
    ('Rina & Yoga', '081888777666', 'Form Saran', 'Tangerang', 'Sedang Diskusi', '2024-06-10', 'Dapat referensi dari Sari & Ahmad. Interested paket premium.');
    
    -- Insert Client Feedback
    INSERT INTO client_feedback (client_name, rating, satisfaction, feedback, date) VALUES
    ('Sari & Ahmad', 5, 'Sangat Puas', 'Tim Vena Pictures sangat profesional! Hasil foto dan video melebihi ekspektasi. Terima kasih sudah mendokumentasikan hari bahagia kami dengan sempurna.', '2024-05-22'),
    ('Maya & Rudi', 5, 'Sangat Puas', 'Pre-wedding session di Kebun Raya Bogor luar biasa! Bayu dan Citra sangat kreatif dan sabar dalam directing. Hasil fotonya natural banget.', '2024-05-25'),
    ('Ani & Joko', 4, 'Puas', 'Dokumentasi lamaran bagus, tapi agak kurang angle untuk keluarga besar. Overall puas dengan pelayanan dan hasil editing cepat.', '2024-06-02'),
    ('Eka & Dodi (Ulang Tahun)', 5, 'Sangat Puas', 'Dokumentasi ulang tahun anak saya perfect! Eka assistant sangat baik dengan anak-anak. Banyak candid moments yang terekam dengan bagus.', '2024-07-06'),
    ('Dina (Ibu dari Dina & Reza)', 4, 'Puas', 'Preparation bagus, tim datang tepat waktu. Hanya saja komunikasi bisa lebih intensif untuk koordinasi prosesi adat.', '2024-06-15');
    
    -- Insert Assets
    INSERT INTO assets (name, category, purchase_date, purchase_price, serial_number, status, notes) VALUES
    ('Canon EOS 5D Mark IV', 'Kamera', '2023-01-15', 35000000, 'CN5D4-001', 'Tersedia', 'Kondisi excellent, rutin maintenance'),
    ('Canon EOS R6', 'Kamera', '2023-06-20', 28000000, 'CNR6-001', 'Tersedia', 'Mirrorless utama untuk wedding'),
    ('Canon EF 24-70mm f/2.8L II', 'Lensa', '2023-01-15', 18000000, 'CNLENS-001', 'Tersedia', 'Lensa serba guna, tajam'),
    ('Canon EF 70-200mm f/2.8L IS III', 'Lensa', '2023-03-10', 22000000, 'CNLENS-002', 'Digunakan', 'Sedang dipinjam untuk project Dina & Reza'),
    ('Sony FX3 Cinema Camera', 'Kamera', '2023-08-05', 45000000, 'SNFX3-001', 'Tersedia', 'Kamera video utama, hasil cinematic'),
    ('DJI Mini 3 Pro', 'Drone', '2023-04-12', 12000000, 'DJIM3P-001', 'Tersedia', 'Drone compact untuk aerial shots'),
    ('Godox AD600Pro Flash', 'Lighting', '2023-02-28', 8500000, 'GDXAD-001', 'Tersedia', 'Studio flash portable'),
    ('Manfrotto Carbon Fiber Tripod', 'Tripod & Stabilizer', '2023-01-20', 4500000, 'MNFR-001', 'Tersedia', 'Tripod professional, ringan dan stabil'),
    ('DJI Ronin SC2', 'Tripod & Stabilizer', '2023-07-15', 7500000, 'DJIRSC2-001', 'Tersedia', 'Gimbal untuk smooth video handheld'),
    ('Rode VideoMic Pro Plus', 'Audio', '2023-03-25', 3500000, 'RDEVMP-001', 'Tersedia', 'Microphone directional untuk video'),
    ('MacBook Pro 16" M2', 'Lainnya', '2023-09-10', 42000000, 'APLMBP-001', 'Digunakan', 'Laptop editing utama, performance excellent'),
    ('LaCie 8TB External Drive', 'Lainnya', '2023-05-15', 4200000, 'LCIE8TB-001', 'Tersedia', 'Storage backup untuk raw files');
    
    -- Insert SOPs
    INSERT INTO sops (title, category, content, last_updated) VALUES
    ('Persiapan Shooting Wedding', 'Fotografi', 
     E'1. Meeting dengan klien 1 minggu sebelum H-Day\n2. Survey lokasi jika belum pernah ke venue\n3. Prepare equipment checklist\n4. Koordinasi dengan WO atau keluarga tentang timeline\n5. Charge semua battery dan format memory card\n6. Backup equipment siap sedia\n7. Datang 30 menit sebelum waktu yang dijadwalkan',
     '2024-04-15'),
    ('Teknik Foto Pre-Wedding', 'Fotografi',
     E'1. Golden hour: 30 menit sebelum sunset optimal\n2. Gunakan reflektor untuk fill light pada backlit\n3. Variasi pose: walking, sitting, candid interaction\n4. Close-up detail: cincin, hands, eyes\n5. Wide shot untuk environment\n6. Gunakan depth of field untuk isolasi subject\n7. Capture genuine emotion dan interaction',
     '2024-03-20'),
    ('Workflow Video Editing', 'Videografi',
     E'1. Import dan organize footage by sequence\n2. Rough cut sesuai musik dan beat\n3. Color grading untuk konsistensi tone\n4. Audio sync dan cleaning\n5. Transition dan effects minimal, elegant\n6. Export preview untuk client approval\n7. Final export dengan multiple format\n8. Backup project file dan raw footage',
     '2024-05-10'),
    ('Standar Komunikasi dengan Klien', 'Layanan Klien',
     E'1. Response WhatsApp maksimal 2 jam di jam kerja\n2. Update progress mingguan via foto/video\n3. Konfirmasi detail H-3 sebelum event\n4. Kirim preview hasil 24 jam setelah shooting\n5. Delivery hasil sesuai timeline yang dijanjikan\n6. Follow up satisfaction setelah delivery\n7. Maintain relationship untuk repeat order',
     '2024-04-25'),
    ('Prosedur Maintenance Equipment', 'Umum',
     E'1. Cleaning sensor kamera setiap bulan\n2. Check fungsi semua button dan dial\n3. Kalibrasi lensa jika ada masalah fokus\n4. Update firmware equipment secara berkala\n5. Professional service setiap 6 bulan\n6. Storage equipment dengan silica gel\n7. Dokumentasi kondisi dan serial number',
     '2024-06-01');
    
    -- Insert Contracts
    INSERT INTO contracts (contract_number, client_id, project_id, signing_date, signing_location, client_name1, client_address1, client_phone1, 
                          shooting_duration, guaranteed_photos, album_details, delivery_timeframe, dp_date, final_payment_date, 
                          cancellation_policy, jurisdiction, personnel_count) VALUES
    ('KK/001/2024', client_01, project_01, '2024-05-10', 'Jakarta', 'Sari Indira', 'Jl. Mawar No. 15, Jakarta Selatan', '081234567890',
     '8 jam (akad + resepsi)', '500-700 foto teredit + raw files', 'Album premium 30x40 (50 halaman) + Album keluarga 20x30',
     '45 hari kerja', '2024-05-15', '2024-06-15', 
     'Pembatalan H-30 refund 50%, H-14 refund 25%, H-7 no refund', 'Jakarta', '2 Fotografer + 2 Videographer'),
    ('KK/002/2024', client_02, project_02, '2024-05-05', 'Jakarta', 'Maya Sari', 'Jl. Anggrek No. 22, Jakarta Barat', '081987654321',
     '4 jam outdoor session', '150-200 foto teredit', 'Album 20x30 (20 halaman)',
     '14 hari kerja', '2024-05-10', '2024-05-20',
     'Pembatalan H-7 refund 50%, H-3 no refund', 'Jakarta', '1 Fotografer + 1 Videographer'),
    ('KK/003/2024', client_04, project_04, '2024-06-01', 'Jakarta', 'Lina Permata', 'Jl. Melati No. 8, Jakarta Timur', '081444555666',
     '10 jam (akad + resepsi + after party)', '800-1000 foto teredit + raw files + drone', 
     'Album premium 40x60 (80 halaman) + Album orang tua (2 buah) + Album keluarga (2 buah)',
     '60 hari kerja', '2024-06-10', '2024-08-05',
     'Pembatalan H-60 refund 75%, H-30 refund 50%, H-14 refund 25%, H-7 no refund', 'Jakarta', 
     '3 Fotografer + 2 Videographer + 1 Drone Operator');
    
    -- Insert Social Media Posts
    INSERT INTO social_media_posts (project_id, post_type, platform, scheduled_date, caption, status, notes) VALUES
    (project_02, 'Instagram Feed', 'Instagram', '2024-06-01', 
     'Maya & Rudi Pre-Wedding Session di Kebun Raya Bogor 🌿✨\n\nMomen manis yang terekam indah di tengah alam hijau. Love is in the air! 💕\n\n#VenaPictures #PreWedding #KebunRayaBogor #LoveStory #WeddingPhotography #Jakarta', 
     'Diposting', 'Post perform well, 150+ likes'),
    (project_01, 'Instagram Reels', 'Instagram', '2024-06-20',
     'Behind the scenes Wedding Sari & Ahmad 💒\n\nDari persiapan hingga momen bahagia, setiap detik diabadikan dengan cinta 📸\n\n#VenaPictures #WeddingDay #BTS #Jakarta #WeddingPhotographer',
     'Diposting', 'Reels viral, 500+ views'),
    (project_04, 'Instagram Story', 'Instagram', '2024-08-10',
     'Destination Wedding Prep: Bali bound! ✈️🏝️\n\nGetting ready untuk mengabadikan momen indah Lina & Budi di The Mulia Bali',
     'Terjadwal', 'Story untuk building anticipation'),
    (project_06, 'Instagram Feed', 'Instagram', '2024-07-05',
     'Corporate Event Rita Corp Annual Gathering 🏢\n\nDokumentasi profesional untuk momen penting perusahaan. Every moment matters!\n\n#VenaPictures #CorporateEvent #JCC #EventPhotography #ProfessionalDocumentation',
     'Draf', 'Tunggu approval dari client corporate'),
    (project_05, 'TikTok Video', 'TikTok', '2024-06-15',
     'Lamaran Ani & Joko: Momen Haru yang Tak Terlupakan 💍\n\nFrom nervous to happiness in seconds! 🥰\n\n#Lamaran #VenaPictures #WeddingTikTok #Jakarta',
     'Diposting', 'Good engagement dari audience muda');
    
    -- Insert Team Project Payments
    INSERT INTO team_project_payments (project_id, team_member_id, date, status, fee, reward) VALUES
    (project_01, team_01, '2024-05-16', 'Paid', 800000, 0),
    (project_01, team_02, '2024-05-16', 'Paid', 1000000, 0),
    (project_02, team_01, '2024-05-21', 'Paid', 800000, 50000),
    (project_02, team_02, '2024-05-21', 'Paid', 1000000, 75000),
    (project_03, team_01, '2024-07-15', 'Unpaid', 800000, 0),
    (project_03, team_03, '2024-07-15', 'Unpaid', 600000, 0),
    (project_05, team_01, '2024-06-02', 'Paid', 800000, 25000),
    (project_09, team_04, '2024-07-06', 'Paid', 300000, 10000),
    (project_06, team_01, '2024-06-30', 'Unpaid', 800000, 0),
    (project_06, team_02, '2024-06-30', 'Unpaid', 1000000, 0);
    
    -- Insert Reward Ledger Entries
    INSERT INTO reward_ledger_entries (team_member_id, date, description, amount, project_id) VALUES
    (team_01, '2024-05-22', 'Bonus Pre-Wedding Maya & Rudi - Excellent Work', 50000, project_02),
    (team_02, '2024-05-22', 'Bonus Pre-Wedding Maya & Rudi - Creative Shots', 75000, project_02),
    (team_01, '2024-06-03', 'Bonus Lamaran Ani & Joko - Client Very Happy', 25000, project_05),
    (team_04, '2024-07-07', 'Bonus Birthday Party - Good with Kids', 10000, project_09),
    (team_01, '2024-04-15', 'Monthly Performance Bonus', 75000, NULL),
    (team_02, '2024-04-15', 'Monthly Performance Bonus', 100000, NULL),
    (team_03, '2024-04-15', 'Fast Editing Bonus', 50000, NULL),
    (team_05, '2024-03-25', 'Drone Skills Bonus', 25000, NULL);
    
    -- Insert Promo Codes
    INSERT INTO promo_codes (code, discount_type, discount_value, is_active, max_usage, expiry_date, usage_count) VALUES
    ('WEDDING2024', 'percentage', 10, true, 50, '2024-12-31', 3),
    ('NEWCLIENT', 'fixed', 1000000, true, 100, '2024-08-31', 8),
    ('PREWED50', 'percentage', 15, true, 20, '2024-07-31', 2),
    ('CORPORATE20', 'percentage', 20, true, 10, '2024-09-30', 1),
    ('LOYALTY15', 'percentage', 15, true, NULL, '2024-12-31', 12),
    ('FLASH500', 'fixed', 500000, false, 30, '2024-06-30', 25),
    ('BIRTHDAY25', 'percentage', 25, true, 15, '2024-10-31', 0);

END $$;
