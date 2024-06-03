# Backend Final

## Deskripsi
Aplikasi Backend ini dibangun dengan menggunakan Express.js sebagai server dan menggunakan beberapa dependencies seperti `bcrypt`, `jsonwebtoken`, `pg`, dan lain-lain.

## Cara Menjalankan Aplikasi

### Prasyarat
Pastikan Anda sudah menginstall Node.js dan npm. Pastikan juga Anda memiliki akses ke database PostgreSQL.

### Langkah-langkah
1. Clone repositori ini:
    ```sh
    git clone <repository-url>
    ```
2. Masuk ke direktori proyek:
    ```sh
    cd backend_final
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Konfigurasi database di file `.env` (jika diperlukan).
5. Untuk menjalankan aplikasi di mode produksi:
    ```sh
    npm start
    ```
6. Untuk menjalankan aplikasi di mode pengembangan dengan hot-reload:
    ```sh
    npm run dev
    ```

## Fitur
- **Login menggunakan JWT**: Endpoint untuk login menggunakan JSON Web Token untuk otentikasi.
- **CRUD Wishlist**: Endpoint untuk membuat, membaca, dan menghapus wishlist.
- **CRUD Profil Pengguna**: Endpoint untuk membuat, membaca, dan memperbarui profil akun pengguna.
- **Membaca Buku dari Google Books**: Endpoint untuk membaca buku langsung dari Google Books API.
- **Express Server**: Menyediakan server untuk API.
- **Bcrypt**: Digunakan untuk hashing password.
- **Body-parser**: Middleware untuk parsing request body.
- **Cors**: Middleware untuk mengizinkan cross-origin requests.
- **JSON Web Token**: Digunakan untuk otentikasi dan otorisasi.
- **Morgan**: Digunakan untuk logging request HTTP.
- **PostgreSQL**: Digunakan sebagai database utama.
- **UUID**: Digunakan untuk menghasilkan unique identifier.
- **Nodemon**: Digunakan di mode pengembangan untuk melakukan reload otomatis saat ada perubahan pada kode.
