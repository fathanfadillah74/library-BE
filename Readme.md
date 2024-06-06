# Backend Final

## Deskripsi
Aplikasi Backend ini dibangun dengan menggunakan Express.js sebagai server dan menggunakan beberapa dependencies seperti `bcrypt`, `jsonwebtoken`, `pg`, dan lain-lain.

## Cara Menjalankan Aplikasi

### Prasyarat
Pastikan Anda sudah menginstall Node.js dan npm. Pastikan juga Anda memiliki akses ke database PostgreSQL.

## Langkah Langkah Instalasi

1. Clone repositori ini:
    ```sh
    git clone https://github.com/username/myproject.git
    cd myproject/BE
    ```

2. Instal dependencies:
    ```sh
    npm install
    ```

3. Buat file `.env` di folder BE dengan isi sebagai berikut:
    ```env
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=your_database
    DB_PORT=5432
    PORT=2000
    ```

4. Jalankan aplikasi:
    ```sh
    npm run dev
    ```

## Migrasi Database

Jalankan skrip migrasi untuk membuat tabel di database:

```sh
node migrate.js

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
