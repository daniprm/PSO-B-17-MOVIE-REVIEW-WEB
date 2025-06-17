# Filminisme

[![CI/CD](https://github.com/daniprm/pso-b-17-movie-review-web/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/daniprm/pso-b-17-movie-review-web/actions/workflows/ci-cd.yml)

Selamat datang di Filminisme! Ini adalah dokumentasi teknis mendalam mengenai arsitektur, teknologi, dan implementasi aplikasi ulasan film ini. Aplikasi ini memungkinkan pengguna untuk mencari, melihat detail, dan mengelola daftar tontonan (watchlist) film mereka, dibangun dengan mengutamakan praktik pengembangan modern, performa, dan kualitas kode.

## Arsitektur Aplikasi

Arsitektur Filminisme mengadopsi pendekatan modern berbasis komponen dengan pemisahan yang jelas antara logika frontend, layanan backend, dan alur kerja CI/CD.

-   **Frontend (Next.js)**: Aplikasi ini menggunakan Next.js 14 dengan App Router. Ini memungkinkan arsitektur berbasis komponen yang sangat modular dan optimal, dengan strategi rendering hibrida (Server & Client Components) untuk performa maksimal.
-   **Backend (Supabase)**: Berfungsi sebagai Backend-as-a-Service (BaaS) yang menangani semua kebutuhan sisi server, termasuk otentikasi pengguna melalui Supabase Auth dan penyimpanan data pada database PostgreSQL.
-   **Styling (Tailwind CSS)**: Sebuah framework CSS utility-first yang memungkinkan pembuatan antarmuka kustom dengan cepat dan konsisten.
-   **Pengujian (Jest & Cypress)**: Kualitas kode dijamin melalui dua lapisan pengujian: Jest untuk unit testing komponen individual dan Cypress untuk integration testing alur kerja pengguna secara end-to-end.

## Arsitektur Pipeline (CI/CD)

Proyek ini mengimplementasikan alur kerja Continuous Integration/Continuous Deployment (CI/CD) yang komprehensif menggunakan GitHub Actions. Pipeline ini mengotomatiskan seluruh proses, mulai dari pengujian hingga deployment ke lingkungan produksi, memastikan setiap perubahan kode diuji secara menyeluruh sebelum sampai ke pengguna.

![Arsitektur CI/CD Pipeline](Progress%203%20PSO.png)

### Tahapan Pipeline

Alur CI/CD ini terdiri dari beberapa tahapan (jobs) yang dijalankan secara berurutan. Alur ini akan terpicu setiap kali ada `push` atau `pull_request` ke branch `main`.

**1. Lint & Unit Tests**
Tahap awal ini bertanggung jawab untuk memastikan kualitas dan konsistensi kode melalui linting dan menjalankan unit test.
-   **Langkah-langkah**:
    -   *Checkout Kode*: Mengunduh kode sumber dari repositori.
    -   *Setup Node.js*: Mengonfigurasi lingkungan Node.js versi 20.
    -   *Install Dependensi*: Menginstal semua dependensi menggunakan `npm ci`.
    -   *Jalankan Lint*: Menjalankan linter dengan `npm run lint`.
    -   *Jalankan Unit Tests*: Menjalankan unit test dengan `npm test` menggunakan Jest.

**2. Build Next.js App & Cypress Integration Test**
Setelah kode lolos dari pemeriksaan awal, aplikasi akan di-build dan diuji secara integrasi menggunakan Cypress.
-   **Langkah-langkah**:
    -   *Build Aplikasi*: Melakukan build aplikasi Next.js dengan `npm run build`.
    -   *Jalankan Cypress Tests*: Menjalankan integration test secara otomatis (`cypress run`) untuk memvalidasi alur kerja aplikasi secara end-to-end.
    -   *Upload Artefak Build*: Jika semua pengujian berhasil, hasil build diunggah sebagai artefak `nextjs-build-output` untuk digunakan pada tahap selanjutnya.

**3. Build & Push Docker Image**
Setelah tahap pengujian berhasil, Docker image akan dibuat dari artefak build dan diunggah ke Docker Hub. Tahap ini hanya berjalan jika ada `push` ke branch `main`.
-   **Langkah-langkah**:
    -   *Download Artefak Build*: Mengunduh artefak `nextjs-build-output`.
    -   *Login ke Docker Hub*: Melakukan autentikasi ke Docker Hub.
    -   *Build dan Push Docker Image*: Membuat Docker image dari `Dockerfile` dan mengunggahnya ke Docker Hub dengan dua tag: `latest` dan berdasarkan `commit SHA`.

**4. Deploy & Smoke Test Staging**
Image yang berhasil dibuat kemudian di-deploy ke lingkungan staging untuk verifikasi akhir.
-   **Langkah-langkah**:
    -   *Deploy ke Azure Web App Staging*: Melakukan deployment Docker image ke slot staging di Azure Web App.
    -   *Smoke Test Staging*: Melakukan *smoke test* dengan mengirimkan permintaan `curl` ke URL staging untuk memastikan aplikasi berjalan dengan baik.

**5. Deploy to Production**
Setelah verifikasi di staging berhasil, aplikasi siap untuk di-deploy ke lingkungan produksi.
-   **Langkah-langkah**:
    -   *Deploy ke Azure Web App Production*: Melakukan deployment Docker image yang sama ke lingkungan produksi utama di Azure Web App.

## Teknologi yang Digunakan

-   **Next.js**: Kerangka kerja React yang digunakan untuk membangun antarmuka pengguna Filminisme.
-   **Supabase**: Digunakan untuk mengatur basis data dan seluruh tugas backend seperti autentikasi.
-   **GitHub Actions**: Alat utama yang mengatur keseluruhan alur kerja CI/CD, mulai dari testing hingga deployment.
-   **Jest**: Digunakan untuk melakukan *unit testing* pada komponen dan fungsi individual dalam kode JavaScript/TypeScript.
-   **Cypress**: Digunakan untuk melakukan *integration testing*, memvalidasi alur kerja pengguna dari awal hingga akhir.
-   **Docker**: Digunakan untuk membuat *container image* dari aplikasi, memastikan konsistensi lingkungan dari lokal hingga produksi.
-   **Docker Hub**: Berfungsi sebagai *container registry* yang menyimpan Docker image yang siap di-deploy.
-   **Azure Web App**: Platform cloud dari Microsoft yang digunakan sebagai tujuan deployment untuk lingkungan Staging dan Produksi.

## Panduan Instalasi Lokal

### Prasyarat
-   Node.js (v20.x atau lebih baru)
-   NPM
-   Akun Supabase

### Langkah-langkah
1.  **Clone Repositori**: `git clone https://github.com/daniprm/pso-b-17-movie-review-web.git`
2.  **Masuk ke Direktori**: `cd pso-b-17-movie-review-web`
3.  **Instal Dependensi**: `npm install`
4.  **Konfigurasi Environment**: Salin `.env.example` ke `.env.local` dan isi dengan kredensial Supabase Anda.

### Menjalankan Aplikasi
-   **Mode Pengembangan**: `npm run dev`
-   **Menjalankan Tes Lokal**: `npm test` (untuk Jest) dan `npm run cypress:open` (untuk Cypress).