# README - Alur CI/CD Filminisme

Dokumen ini menjelaskan alur *Continuous Integration/Continuous Deployment* (CI/CD) yang diimplementasikan untuk situs web ulasan film "Filminisme". Kami menggunakan GitHub Actions untuk mengembangkan CI/CD. Dalam proyek ini, CI/CD dikembangkan untuk mengotomatiskan proses dari tahap pengujian (unit test dan integration test), *build*, *containerization*, penyimpanan *image* ke *container registry*, hingga melakukan *deployment* ke lingkungan *staging* dan *production*. Proses ini hanya memerlukan satu kali klik, yaitu ketika pengembang melakukan *push* kode ke *branch main*.

## *Tools* yang Digunakan

Berikut adalah daftar *tools* utama yang digunakan dalam alur CI/CD ini:

### Next.js

Kami menggunakan Next.js, sebuah kerangka kerja dari *library* React yang menggunakan bahasa Javascript/Typescript, untuk mengembangkan situs web ini.

### Supabase

Digunakan untuk mengatur basis data dan seluruh tugas *backend* seperti autentikasi *login* dan *register*. Kami memilih Supabase karena kemudahannya dalam menyediakan berbagai layanan *backend as a service* (BaaS) dengan basis data PostgreSQL, autentikasi, penyimpanan *file*, dan fungsi *serverless* hanya melalui API. Dengan ini, kami dapat fokus pada pengembangan *front end* situs web sementara seluruh tugas *backend* dikelola oleh Supabase.

### GitHub Actions

Berperan sebagai alat yang mengatur keseluruhan alur kerja CI/CD. GitHub Actions bertugas memberikan perintah untuk menjalankan setiap tugas, mulai dari *testing* hingga *deployment*.

### NPM

Karena situs web dikembangkan dengan Next.js, kami menggunakan Node Package Manager (NPM) untuk mengelola dependensi proyek dan menjalankan perintah-perintah seperti *lint*, *test*, dan lainnya.

### ESLint

Digunakan untuk melakukan *linting*, yaitu proses untuk membantu menemukan dan memperbaiki masalah dalam kode Javascript/Typescript.

### Jest

Digunakan untuk melakukan *unit testing*. Kami memilih Jest karena umum digunakan untuk *unit testing* dalam bahasa pemrograman Javascript.

### Cypress

Digunakan untuk melakukan *integration testing*. Kami memilih Cypress karena kemudahannya dalam membuat *integration test* pada kode Javascript.

### Docker

Dalam proyek ini, Docker digunakan untuk membuat *container image* dari situs web yang dikembangkan. Untuk membuat *docker image*, digunakan lingkungan *runtime* Node.js versi 20 sebagai *runner*. Node.js dipilih karena Next.js berjalan di atasnya.

### Docker Hub

Berfungsi sebagai *registry* yang menyimpan *Docker image*. *Container registry* ini dibutuhkan sebagai tempat penyimpanan *Docker image* yang akan diambil untuk digunakan pada tahap *deployment*.

### Azure Web App

Kami menggunakan Azure Web App sebagai tempat *deployment* situs web. Azure Web App dipilih karena menyediakan akses gratis bagi mahasiswa selama setahun. Selain itu, Azure Web App juga memungkinkan pembuatan *deployment slot* untuk *staging* , yang diperlukan sebagai lingkungan pengujian sebelum rilis ke pengguna di lingkungan *production*.

## Tahapan CI/CD

Alur CI/CD ini terdiri dari beberapa tahapan (*jobs*) yang dijalankan secara berurutan. Alur ini akan terpicu setiap kali ada *push* atau *pull_request* ke *branch main*.

### 1. Lint & Unit Tests

Tahap awal ini bertanggung jawab untuk memastikan kualitas dan konsistensi kode melalui *linting* dan menjalankan *unit test*.

* **Pemicu**: `push` atau `pull_request` ke *branch* `main`.
* **Langkah-langkah**:
    * **Checkout Kode**: Mengunduh kode sumber dari repositori.
    * **Setup Node.js**: Mengonfigurasi lingkungan Node.js versi 20.
    * **Cache Dependensi**: Menyimpan *cache* dari dependensi npm untuk mempercepat proses instalasi di masa mendatang.
    * **Install Dependensi**: Menginstal semua dependensi yang dibutuhkan menggunakan `npm ci`.
    * **Jalankan Lint**: Menjalankan *linter* dengan perintah `npm run lint` untuk memeriksa konsistensi gaya kode.
    * **Jalankan Unit Tests**: Menjalankan *unit test* dengan perintah `npm test`.

### 2. Build Next.js App & Cypress Integration Test

Setelah kode lolos dari pemeriksaan awal, aplikasi akan di-*build* dan diuji secara integrasi menggunakan Cypress.

* **Pemicu**: Tahap `Lint & Unit Tests` berhasil.
* **Langkah-langkah**:
    * **Checkout & Setup**: Melakukan proses *checkout* kode, *setup* Node.js, dan instalasi dependensi seperti pada tahap sebelumnya.
    * **Build Aplikasi**: Melakukan *build* aplikasi Next.js dengan perintah `npm run build`.
    * **Jalankan Cypress Tests**: Menjalankan *integration test* secara otomatis menggunakan `cypress-io/github-action@v6` untuk memvalidasi alur kerja aplikasi secara *end-to-end*.
    * **Upload Artefak Build**: Jika semua pengujian berhasil, hasil *build* (folder `.next`, `package.json`, dll.) diunggah sebagai artefak dengan nama `nextjs-build-output` untuk digunakan pada tahap selanjutnya.

### 3. Build & Push Docker Image

Setelah tahap pengujian berhasil, *Docker image* akan dibuat dari artefak *build* dan diunggah ke Docker Hub.

* **Pemicu**: Hanya berjalan jika ada `push` ke *branch* `main` dan tahap `Build Next.js App & Cypress Integration Test` berhasil.
* **Langkah-langkah**:
    * **Checkout Kode**: Mengunduh kode sumber.
    * **Download Artefak Build**: Mengunduh artefak `nextjs-build-output` yang telah diunggah dari tahap sebelumnya.
    * **Login ke Docker Hub**: Melakukan autentikasi ke Docker Hub menggunakan *username* dan *token*.
    * **Build dan Push Docker Image**: Membuat *Docker image* dari `Dockerfile` menggunakan artefak yang sudah ada dan mengunggahnya ke Docker Hub dengan dua *tag*: `latest` dan berdasarkan `commit SHA`.

### 4. Deploy & Smoke Test Staging

*Image* yang berhasil dibuat kemudian di-*deploy* ke lingkungan *staging* untuk verifikasi akhir sebelum masuk ke produksi.

* **Pemicu**: Tahap `Build & Push Docker Image` selesai.
* **Langkah-langkah**:
    * **Deploy ke Azure Web App Staging**: Melakukan *deployment Docker image* ke *slot staging* di Azure Web App. Autentikasi ke Azure menggunakan *publish profile*.
    * **Smoke Test Staging**: Menunggu selama 5 menit agar aplikasi stabil, kemudian melakukan *smoke test* dengan mengirimkan permintaan `curl` ke URL *staging* untuk memastikan aplikasi berjalan dengan baik setelah *deployment*.

### 5. Deploy to Production

Setelah verifikasi di lingkungan *staging* berhasil, aplikasi siap untuk di-*deploy* ke lingkungan produksi.

* **Pemicu**: Tahap `Deploy & Smoke Test Staging` selesai.
* **Langkah-langkah**:
    * **Deploy ke Azure Web App Production**: Melakukan *deployment Docker image* (dengan *tag* `commit SHA` yang sama seperti di *staging*) ke lingkungan produksi utama di Azure Web App.
