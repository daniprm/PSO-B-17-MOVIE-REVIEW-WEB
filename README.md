# README - Alur CI/CD Filminisme

Dokumen ini menjelaskan alur *Continuous Integration/Continuous Deployment* (CI/CD) yang diimplementasikan untuk situs web ulasan film "Filminisme". Kami menggunakan GitHub Actions untuk mengembangkan CI/CD. Dalam proyek ini, CI/CD dikembangkan untuk mengotomatiskan proses dari tahap pengujian (unit test dan integration test), *build*, *containerization*, penyimpanan *image* ke *container registry*, hingga melakukan *deployment* ke lingkungan *staging* dan *production*. Proses ini hanya memerlukan satu kali klik, yaitu ketika pengembang melakukan *push* kode ke *branch main*.

## *Tools* yang Digunakan

Berikut adalah daftar *tools* utama yang digunakan dalam alur CI/CD ini:

* **Next.js**: Kami menggunakan Next.js, sebuah kerangka kerja dari *library* React yang menggunakan bahasa Javascript/Typescript, untuk mengembangkan situs web ini.
* **Supabase**: Digunakan untuk mengatur basis data dan seluruh tugas *backend* seperti autentikasi *login* dan *register*. Kami memilih Supabase karena kemudahannya dalam menyediakan berbagai layanan *backend as a service* (BaaS) dengan basis data PostgreSQL, autentikasi, penyimpanan *file*, dan fungsi *serverless* hanya melalui API. Dengan ini, kami dapat fokus pada pengembangan *front end* situs web sementara seluruh tugas *backend* dikelola oleh Supabase.
* **GitHub Actions**: Berperan sebagai alat yang mengatur keseluruhan alur kerja CI/CD. GitHub Actions bertugas memberikan perintah untuk menjalankan setiap tugas, mulai dari *testing* hingga *deployment*.
* **NPM**: Karena situs web dikembangkan dengan Next.js, kami menggunakan Node Package Manager (NPM) untuk mengelola dependensi proyek dan menjalankan perintah-perintah seperti *lint*, *test*, dan lainnya.
* **ESLint**: Digunakan untuk melakukan *linting*, yaitu proses untuk membantu menemukan dan memperbaiki masalah dalam kode Javascript/Typescript.
* **Jest**: Digunakan untuk melakukan *unit testing*. Kami memilih Jest karena umum digunakan untuk *unit testing* dalam bahasa pemrograman Javascript.
* **Cypress**: Digunakan untuk melakukan *integration testing*. Kami memilih Cypress karena kemudahannya dalam membuat *integration test* pada kode Javascript.
* **Docker**: Dalam proyek ini, Docker digunakan untuk membuat *container image* dari situs web yang dikembangkan. Untuk membuat *docker image*, digunakan lingkungan *runtime* Node.js versi 20 sebagai *runner*. Node.js dipilih karena Next.js berjalan di atasnya.
* **Docker Hub**: Berfungsi sebagai *registry* yang menyimpan *Docker image*. *Container registry* ini dibutuhkan sebagai tempat penyimpanan *Docker image* yang akan diambil untuk digunakan pada tahap *deployment*.
* **Azure Web App**: Kami menggunakan Azure Web App sebagai tempat *deployment* situs web. Azure Web App dipilih karena menyediakan akses gratis bagi mahasiswa selama setahun. Selain itu, Azure Web App juga memungkinkan pembuatan *deployment slot* untuk *staging* , yang diperlukan sebagai lingkungan pengujian sebelum rilis ke pengguna di lingkungan *production*.

## Tahapan CI/CD

Alur CI/CD ini terdiri dari beberapa tahapan (*jobs*) yang dijalankan secara berurutan. Alur ini akan terpicu setiap kali ada *push* atau *pull_request* ke *branch main*.

### 1. Lint & Test

Tahap ini bertanggung jawab untuk memastikan kualitas dan fungsionalitas kode sebelum di-*deploy*.

* **Pemicu**: `push` atau `pull_request` ke *branch* `main`.
* **Langkah-langkah**:
    * **Checkout Kode**: Mengunduh kode sumber dari repositori.
    * **Setup Node.js**: Mengonfigurasi lingkungan Node.js versi 20.
    * **Cache Dependensi**: Menyimpan *cache* dari dependensi npm untuk mempercepat proses instalasi di masa mendatang.
    * **Install Dependensi**: Menginstal semua dependensi yang dibutuhkan menggunakan `npm ci`.
    * **Jalankan Lint**: Menjalankan *linter* dengan perintah `npm run lint` untuk memeriksa konsistensi gaya kode.
    * **Jalankan Tests**: Menjalankan *unit test* dengan `npm test`.
    * **Jalankan Integration Tests**: Melakukan *build* dengan perintah `npm run build` dan kemudian menjalankan *integration test* menggunakan Cypress.
    * **Upload Artefak Build**: Jika semua pengujian berhasil, hasil *build* dan `node_modules` diunggah sebagai artefak menggunakan `actions/upload-artifact@v4` untuk digunakan pada tahap selanjutnya.

### 2. Build & Push Docker Image

Setelah tahap pengujian berhasil, *Docker image* akan dibuat dan diunggah ke Docker Hub.

* **Pemicu**: Hanya berjalan jika ada `push` ke *branch* `main` dan tahap `test` berhasil.
* **Langkah-langkah**:
    * **Checkout Kode**: Mengunduh kode sumber.
    * **Download Artefak Build**: Mengunduh artefak yang telah diunggah dari tahap sebelumnya.
    * **Login ke Docker Hub**: Melakukan autentikasi ke Docker Hub menggunakan *username* dan *token*.
    * **Build dan Push Docker Image**: Membuat *Docker image* sesuai perintah di `Dockerfile` dan mengunggahnya ke Docker Hub dengan dua *tag*: `latest` dan berdasarkan `commit SHA`.

### 3. Deploy & Smoke Test Staging

*Image* yang berhasil dibuat kemudian di-*deploy* ke lingkungan *staging* untuk pengujian lebih lanjut.

* **Pemicu**: Tahap `Build & Push Docker Image` selesai.
* **Langkah-langkah**:
    * **Deploy ke Azure Web App Staging**: Melakukan *deployment Docker image* ke *slot staging* di Azure Web App. Autentikasi ke Azure Web App menggunakan *publish profile*.
    * **Smoke Test Staging**: Melakukan *smoke test* dengan mengirimkan permintaan `curl` ke URL *staging* untuk memastikan aplikasi berjalan dengan baik setelah *deployment*.

### 4. Deploy to Production

Setelah verifikasi di lingkungan *staging* berhasil, aplikasi siap untuk di-*deploy* ke *production*.

* **Pemicu**: Tahap `deploy_staging` selesai.
* **Langkah-langkah**:
    * **Deploy ke Azure Web App Production**: Melakukan *deployment Docker image* ke lingkungan *production* di Azure Web App. Proses autentikasi juga menggunakan *publish profile*.
