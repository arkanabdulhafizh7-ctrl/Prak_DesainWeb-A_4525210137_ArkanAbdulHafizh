# Nama Anggota :
**-** Aulia Fachri (4525210098) <br>
**-** Naufal Fadillah (4525210086)<br>
**-**  Arkan Abdul Hafizh (4525210137)  <br>

# Pustaka: Wireframe Portal Perpustakaan

Wireframe halaman utama portal perpustakaan dengan layout **bento grid** dan sudut melengkung ala **iOS**. Satu file HTML, tanpa framework dan tanpa dependency, tinggal dibuka di browser.

Wireframe ini dibuat untuk jadi acuan sebelum masuk ke desain hi-fi di Figma dan implementasi kode.

## HASIL
 ![Hasil](images/hasil.png) 

## Fitur

- Satu halaman penuh: di desktop semua konten muat satu layar tanpa scroll
- Bento grid 3 kolom dengan 5 card:
  - **Hero**: judul, jumlah koleksi, jam buka, kolom pencarian, dan filter (Buku, Jurnal, E-book, Skripsi)
  - **Buku pilihan**: judul, edisi, lokasi rak, status stok, dan tombol Pinjam
  - **Paling sering dipinjam**: 5 buku dengan kategori dan status Tersedia atau Dipinjam
  - **Pinjaman saya**: daftar buku, tanggal jatuh tempo, dan tombol Perpanjang
  - **Agenda perpustakaan**: acara dengan tanggal, jam, dan lokasi
- Responsif untuk desktop, tablet, dan HP
- Gambar diganti kotak silang abu-abu karena ini masih wireframe

## Quick start

1. Download atau clone project ini.
2. Buka `wireframe-perpustakaan-info.html` langsung di browser.

Kalau mau auto-reload saat edit, pakai ekstensi Live Server di VS Code atau jalankan:

```bash
npx serve .
```

## Struktur file

| File | Keterangan |
|---|---|
| `wireframe-perpustakaan-info.html` | Versi final, setiap card berisi informasi yang jelas |
| `wireframe-perpustakaan-1page.html` | Versi satu layar penuh dengan placeholder (skeleton) |
| `wireframe-perpustakaan-simpel.html` | Versi paling sederhana, 5 card |
| `wireframe-perpustakaan.html` | Versi awal, 9 card dengan label tiap bagian |

Kalau cuma butuh satu, pakai `wireframe-perpustakaan-info.html`.

## Responsif

| Lebar layar | Perilaku |
|---|---|
| 1001 px ke atas | 3 kolom, 5 buku di rak populer, menu navbar tampil |
| 761 sampai 1000 px | Grid sama, 4 buku di rak populer, menu navbar disembunyikan |
| 760 px ke bawah | 1 kolom, 3 buku di rak populer, halaman bisa di-scroll |

Di desktop dengan tinggi layar kurang dari 640 px, halaman juga bisa di-scroll supaya teks tidak terpotong.

## Kustomisasi

Warna dan jarak utama ada di `:root` pada bagian `<style>`:

```css
:root{
  --bg:#ECECF0;    /* background halaman */
  --card:#fff;     /* warna card dan navbar */
  --ink:#1C1C1E;   /* teks utama dan tombol utama */
  --mid:#6E6E73;   /* teks sekunder */
  --line:#D1D1D6;  /* garis dan stroke */
  --soft:#F2F2F7;  /* isi search bar, chip, dan cover */
  --gap:14px;      /* jarak antar card */
}
```

- **Ganti isi teks**: edit langsung di bagian `<main class="bento">`.
- **Ubah susunan card**: edit `grid-template-areas` pada `.bento`.
- **Ubah kelengkungan**: ganti `border-radius: 32px` pada `.card`.

## Spesifikasi desain

| Elemen | Nilai |
|---|---|
| Font | SF Pro Display, fallback Inter dan font sistem |
| Radius card | 32 px (26 px di HP) |
| Radius tombol, chip, badge | Pill (999 px) |
| Padding card | 22 px (hero 28 px) |
| Gap antar card | 14 px |
| Shadow | Tidak ada |

Panduan lengkap untuk memindahkan desain ini ke Figma (Variables, Text styles, komponen, dan struktur Auto Layout) tersedia terpisah.

## Catatan

- Nama penulis, judul buku, dan jadwal agenda masih data contoh.
- Belum ada interaksi (pencarian, tombol, filter). Semua elemen hanya tampilan.

## Langkah selanjutnya

- [ ] Desain hi-fi di Figma
- [ ] Ganti kotak silang dengan cover buku asli
- [ ] Tambah mode gelap
- [ ] Hubungkan pencarian dan data buku ke backend

## Lisensi

Tentukan lisensi sesuai kebutuhan (misalnya MIT) sebelum project dipublikasikan.
