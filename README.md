# Movie Review Web

[![CI/CD](https://github.com/daniprm/pso-b-17-movie-review-web/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/daniprm/pso-b-17-movie-review-web/actions/workflows/ci-cd.yml)

Selamat datang di Proyek Web Review Film! Aplikasi ini adalah platform modern yang memungkinkan pengguna untuk mencari, melihat detail, dan mengelola daftar tontonan (watchlist) film mereka. Dibangun dengan teknologi web terdepan, proyek ini mengutamakan pengalaman pengguna yang cepat, responsif, dan intuitif.

## Arsitektur Aplikasi

Arsitektur aplikasi ini dirancang untuk menjadi modern, skalabel, dan mudah dikelola, dengan pemisahan yang jelas antara frontend dan backend service.

-   **Frontend**: Dibangun sebagai Single Page Application (SPA) menggunakan **Next.js**. Ini memungkinkan *Server-Side Rendering* (SSR) untuk performa pemuatan awal yang cepat dan SEO yang optimal, serta *Client-Side Rendering* (CSR) untuk navigasi yang lancar. Styling ditangani oleh **Tailwind CSS**, sebuah framework CSS utility-first yang memungkinkan pembuatan antarmuka kustom dengan cepat.
-   **Backend (BaaS)**: Kami memanfaatkan **Supabase** sebagai *Backend-as-a-Service*. Supabase menyediakan fungsionalitas penting seperti:
    -   **Otentikasi**: Mengelola pendaftaran dan login pengguna.
    -   **Database PostgreSQL**: Menyimpan data pengguna, watchlist, dan komentar.
    -   **API Otomatis**: Menyediakan endpoint API RESTful secara otomatis dari skema database.
-   **Pengujian**: Pengujian *End-to-End* (E2E) diimplementasikan dengan **Cypress** untuk memastikan semua alur pengguna, mulai dari pencarian hingga pengelolaan watchlist, berfungsi seperti yang diharapkan.

## Arsitektur Pipeline (CI/CD)

Proyek ini mengimplementasikan pipeline *Continuous Integration* (CI) menggunakan **GitHub Actions**. Pipeline ini memastikan kualitas dan stabilitas kode sebelum digabungkan ke branch utama.

-   **Trigger**: Alur kerja CI otomatis berjalan pada setiap `push` atau `pull_request` yang ditujukan ke branch `main`.
-   **Jobs**: Terdiri dari satu job utama yang berjalan di lingkungan `ubuntu-latest`.
-   **Langkah-langkah Pipeline**:
    1.  **Checkout Code**: Mengunduh kode sumber dari repositori.
    2.  **Setup Node.js**: Menginisialisasi lingkungan Node.js versi 20.
    3.  **Install Dependencies**: Menjalankan `npm install` untuk menginstal semua paket yang dibutuhkan proyek.
    4.  **Run E2E Tests**: Menjalankan seluruh rangkaian pengujian end-to-end menggunakan Cypress dengan perintah `npm run cypress:run`.
    5.  **Build Project**: Membangun aplikasi untuk produksi dengan `npm run build` untuk memverifikasi bahwa tidak ada error saat proses build.

## Fitur Utama

-   **Pencarian Film**: Cari film berdasarkan judul dengan cepat.
-   **Detail Film Komprehensif**: Lihat informasi lengkap termasuk sinopsis, genre, pemeran, dan platform streaming.
-   **Manajemen Watchlist**: Pengguna dapat masuk untuk menambahkan, melihat, dan mengelola daftar film yang ingin ditonton.
-   **Sistem Komentar**: Berikan ulasan dan lihat komentar dari pengguna lain.
-   **Desain Responsif & Mode Gelap**: Antarmuka yang nyaman digunakan di berbagai perangkat dan kondisi pencahayaan.

## Teknologi yang Digunakan

| Kategori          | Teknologi                                          | Versi    |
| :---------------- | :------------------------------------------------- | :------- |
| **Framework** | [Next.js](https://nextjs.org/)                     | 14.2.4   |
| **Pustaka UI** | [React](https://react.dev/)                        | 18       |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/)           | 3.4.1    |
| **Backend & DB** | [Supabase](https://supabase.io/)                   | ^2.43.4  |
| **Pengujian E2E** | [Cypress](https://www.cypress.io/)                 | ^13.11.0 |
| **Manajemen State**| React Context API                                  | -        |
| **Linting** | [ESLint](https://eslint.org/)                      | 8        |
| **Bahasa** | [TypeScript](https://www.typescriptlang.org/)      | 5        |

## Panduan Instalasi & Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

-   [Node.js](https://nodejs.org/) (v20.x atau lebih baru)
-   [npm](https://www.npmjs.com/) (atau package manager lain seperti yarn/pnpm)
-   Akun [Supabase](https://supabase.com/) untuk mendapatkan kredensial API.

### Langkah-langkah Instalasi

1.  **Clone Repositori**
    ```sh
    git clone [https://github.com/daniprm/pso-b-17-movie-review-web.git](https://github.com/daniprm/pso-b-17-movie-review-web.git)
    cd pso-b-17-movie-review-web
    ```

2.  **Instal Dependensi**
    Jalankan perintah berikut untuk menginstal semua paket yang diperlukan dari `package.json`.
    ```sh
    npm install
    ```

3.  **Konfigurasi Environment Variables**
    Salin file `.env.example` menjadi `.env.local` dan isi dengan kredensial dari proyek Supabase Anda.
    ```sh
    cp .env.example .env.local
    ```
    Kemudian, edit file `.env.local`:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

### Menjalankan Aplikasi

Setelah instalasi selesai, jalankan server pengembangan lokal.
```bash
npm run dev
