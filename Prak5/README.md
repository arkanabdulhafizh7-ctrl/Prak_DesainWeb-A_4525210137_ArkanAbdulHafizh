# Nama:
**-**  Arkan Abdul Hafizh (4525210137)  

# Wireframe Portal Berita

Wireframe portal berita yang dikembangkan dari wireframe perpustakaan. Gaya bento grid dan palet abu-abu dipertahankan, sedangkan seluruh konten disesuaikan untuk kebutuhan portal berita.

## HASIL
 ![Hasil-1](images/g1.png) 
 ![Hasil-2](images/g2.png) 

## Perubahan

Pencarian, buku pilihan, pinjaman, dan agenda perpustakaan diganti dengan ticker "Terkini", headline utama, daftar Berita utama, Terpopuler, Terbaru, dan buletin harian. Kode juga dipisah menjadi `index.html` untuk struktur dan `style.css` untuk tampilan.

## Masalah

1. Versi awal mengunci tinggi halaman setinggi layar (`100dvh`), sehingga konten berita yang lebih banyak berisiko terpotong.
2. Menu navbar terlalu lebar untuk layar kecil.
3. Judul berita yang panjang dan grid 4–5 kolom membuat tampilan sempit di mobile.

## Solusi

1. Tinggi halaman dibuat mengikuti isi konten tanpa `overflow: hidden`.
2. Pada lebar ≤1000px, menu navbar disembunyikan dan diganti deretan chip kategori yang bisa digeser.
3. Judul dibatasi tiga baris dengan `line-clamp`. Grid berubah dari 3 kolom ke 2 kolom lalu 1 kolom, dan kartu "Terbaru" menjadi 2×2 di mobile.

## Cara menjalankan

Simpan `index.html` dan `style.css` di folder yang sama, lalu buka `index.html` di browser.

## Anggota dan pembagian tugas

| No | Nama | Tugas |
|----|------|-------|
| 1 | Aulia Fachri - 4525210098| Menyusun struktur HTML dan konten wireframe (navbar, ticker, hero, daftar berita) |
| 2 | Arkan Abdul Hafizh - 4525210137 | Menulis CSS dan mengatur responsif untuk desktop, tablet, dan mobile |
| 3 | Naufal Fadillah - 4525210086 | Pengujian di berbagai ukuran layar, perbaikan bug, dan penyusunan README |