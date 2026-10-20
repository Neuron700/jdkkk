# Desain: Website Pembelajaran IPv4, Subnetting, VirtualBox, Debian

Tanggal: 2026-10-10

## Tujuan

Website pembelajaran statis untuk materi jaringan komputer: IPv4, subnetting,
VirtualBox, dan Linux Debian. Dipakai pelajar/mahasiswa yang belajar dasar
jaringan dan ingin implementasi nyata di lab lokal. Deploy ke Vercel.

## Kendala dari pengguna

- Multi halaman, bukan satu halaman panjang
- Isi penting saja, tidak banyak paragraf
- Tidak ada emoji, ikon, atau simbol dekoratif di dalam web
- Bahasa Indonesia

## Pendekatan

Astro static, output pure HTML, tanpa adapter server. Deploy via Vercel CLI
dengan automatic static detection. Tanpa backend, tanpa database.

Alternatif yang dipertimbangkan dan ditolak:

- Next.js static export. Boilerplate terlalu banyak untuk situs murni konten.
- HTML CSS JS murni. Layout dan sidebar akan terduplikasi di setiap file.

## Arsitektur

```
src/
  layouts/Docs.astro      sidebar, header, pager, meta
  components/
    Sidebar.astro         daftar halaman aktif
    Pager.astro           navigasi halaman sebelumnya dan berikutnya
    Terminal.astro        blok kode bergaya terminal
    Callout.astro         blok catatan
  pages/
    index.astro
    ipv4.astro
    subnetting.astro
    virtualbox.astro
    debian-cli.astro
    debian-jaringan.astro
    kalkulator.astro
  styles/global.css
  scripts/subnet.js        logika kalkulator, vanilla JS
```

Data navigasi reside di satu array pada `src/nav.js` supaya sidebar, pager,
dan sitemap tetap sinkron.

## Struktur halaman

Urutan materi linear dari konsep ke praktik.

| Route | Isi |
| --- | --- |
| / | Ringkasan materi, urutan belajar, prasyarat |
| /ipv4 | Struktur alamat 32 bit, notasi desimal,network vs host, kelas A sampai E, privat vs publik |
| /subnetting | Prefix, subnet mask, cara membagi, tabel prefix, soal singkat |
| /virtualbox | Membuat VM, konfigurasi RAM dan disk, setelan adapter, mode NAT bridge host-only |
| /debian-cli | Navigasi direktori, manipulasi file, permission, user, sudo |
| /debian-jaringan | Konfigurasi IP statis, route, DNS, systemctl, SSH |
| /kalkulator | Hitung langsung dari input IP dan prefix |

Setiap halaman materi memuat blok implementasi nyata sebagai kode, bukan
langkah screenshot.

## Aturan penulisan konten

- Kalimat pendek, maksimal dua baris per paragraf
- Preferensi tabel dan daftar langkah daripada paragraf naratif
- Setiap klaim teknis disertai kode atau angka yang bisa diverifikasi
- Tidak ada emoji, ikon, panah, atau bullet dekoratif
- Kode ditulis tanpa prompt `$` agar bisa disalin langsung
- Istilah teknis memakai Bahasa Indonesia, istilah standar tetap dalam
  Bahasa Inggris

## Desain visual

Gaya dokumentasi teknis.

- Latar putih, teks gelap
- Sidebar navigasi tetap di kiri, lebar 240px
- Konten di kanan, lebar baca 72ch
- Satu warna aksen untuk link dan state aktif
- Border tipis, tanpa bayangan berat
- Font sistem, sans-serif
- Dark mode mengikuti `prefers-color-scheme`

Tanpa logo, tanpa ikon, tanpa gambar dekoratif.

## Kalkulator subnetting

Halaman terpisah di `/kalkulator`. JavaScript vanilla, tanpa framework.

Input: alamat IPv4 dan prefix (0 sampai 32). Output:

- Alamat network
- Alamat broadcast
- Subnet mask
- Jumlah total alamat
- Jumlah host yang bisa dipakai
- Rentang alamat usable
- Network address dan broadcast address dalam bentuk biner

Validasi input dengan pesan error yang jelas, bukan alert browser.

## Model data

Tidak ada model data. Semua konten statis di dalam file `.astro`.

## Penanganan error

- Input kalkulator tidak valid: pesan inline di bawah field
- Halaman tidak ditemukan: halaman 404 Astro dengan link ke beranda

## Pengujian

Tidak ada framework test. Verifikasi manual:

- `npm run build` selesai tanpa error
- Semua 7 route menghasilkan HTML
- Kalkulator benar untuk `/24`, `/25`, `/30`, `/32`
- Tampilan benar di lebar 360px, 768px, dan 1440px

## Deployment

Vercel CLI, mode production, tanpa variabel lingkungan, tanpa framework preset
selain deteksi otomatis Astro.
