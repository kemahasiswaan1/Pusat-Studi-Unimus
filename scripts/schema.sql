-- Pusat Studi UNIMUS - MySQL schema
-- Import with: mysql -u <user> -p <database> < scripts/schema.sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(60),
  ordering INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mitra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(190) NOT NULL,
  kategori VARCHAR(100),
  website VARCHAR(255),
  logo VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS kegiatan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  jenis VARCHAR(100),
  tanggal DATE,
  tahun INT,
  wilayah VARCHAR(150),
  lokasi VARCHAR(190),
  mitra_id INT NULL,
  pelaksana VARCHAR(190),
  deskripsi TEXT,
  tujuan TEXT,
  peserta VARCHAR(190),
  hasil TEXT,
  foto VARCHAR(255),
  video_url VARCHAR(255),
  berita_acara VARCHAR(255),
  laporan VARCHAR(255),
  proposal VARCHAR(255),
  status ENUM('draft','verifikasi','dipublikasikan','arsip') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_kegiatan_mitra FOREIGN KEY (mitra_id) REFERENCES mitra(id) ON DELETE SET NULL,
  INDEX idx_kegiatan_status (status),
  INDEX idx_kegiatan_tahun (tahun)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS anggota_kegiatan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kegiatan_id INT NOT NULL,
  nama VARCHAR(190) NOT NULL,
  peran VARCHAR(120),
  CONSTRAINT fk_anggota_kegiatan FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS berita (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt VARCHAR(500),
  content TEXT,
  cover VARCHAR(255),
  kegiatan_id INT NULL,
  tanggal DATE,
  tahun INT,
  status ENUM('draft','verifikasi','dipublikasikan','arsip') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_berita_kegiatan FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id) ON DELETE SET NULL,
  INDEX idx_berita_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS dokumentasi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tipe ENUM('foto','video') NOT NULL DEFAULT 'foto',
  url VARCHAR(255) NOT NULL,
  kegiatan_id INT NULL,
  tanggal DATE,
  tahun INT,
  status ENUM('draft','verifikasi','dipublikasikan','arsip') NOT NULL DEFAULT 'draft',
  CONSTRAINT fk_dokumentasi_kegiatan FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS dokumen (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  jenis ENUM('proposal','laporan','berita_acara','sertifikat','surat','lainnya') NOT NULL DEFAULT 'lainnya',
  file_url VARCHAR(255) NOT NULL,
  kegiatan_id INT NULL,
  tahun INT,
  status ENUM('draft','verifikasi','dipublikasikan','arsip') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_dokumen_kegiatan FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS publikasi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  jenis ENUM('jurnal','prosiding','buku','artikel','haki') NOT NULL DEFAULT 'artikel',
  authors VARCHAR(255),
  tahun INT,
  link VARCHAR(255),
  abstract TEXT,
  kegiatan_id INT NULL,
  status ENUM('draft','verifikasi','dipublikasikan','arsip') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_publikasi_kegiatan FOREIGN KEY (kegiatan_id) REFERENCES kegiatan(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  `k` VARCHAR(100) PRIMARY KEY,
  `v` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

-- Default admin (password: admin123). Change this password after first login.
INSERT INTO users (name, email, password_hash, role)
VALUES ('Administrator', 'admin@unimus.ac.id', '$2b$12$8bjKFxJ9Afx7A1ghCm2IP.HHlKBb7DZK9UuE94Kw8kJby4f31ueAG', 'admin')
ON DUPLICATE KEY UPDATE email = email;
