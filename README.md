
# Project Title

Aplikasi web sederhana untuk membuat dan mengelola daftar kontak. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, dan menghapus kontak. Pengguna juga dapat mencari kontak berdasarkan nama atau email.


## Installation

### Backend

Pastikan Komputer sudah terinstall php8.0 karena Aplikasi laravel yang digunakan adalah laravel versi 9.x dan juga membutuhkan web-server serta Aplikasi RDBMS menggunakan MySQL.

Jika belum, bisa Aplikasi XAMPP pada link berikut: [XAMPP](https://www.apachefriends.org/download.html)

Jika sudah selesai jangan lupa untuk memasukkan php yang ada pada folder XAMPP ke System Environment Variables.
1. Buka Start / Windows
2. Ketik "edit the system environment variables", Buka
3. Lalu Pilih "Environment Variables"
4. Klik Variable dengan nama "Path"
5. Lalu "New"
6. Setelah itu Copy folder php yang ada pada XAMPP. Contoh biasanya 
```bash
C:\xampp\php
```
7. Pilih Oke
8. Jangan lupa untuk System variables juga diisi yang sama pada Variable nama "Path".


Jika sudah maka dapat menjalankan command php pada terminal. Maka selanjutnya adalah menginstall Composer.
bisa langsung copy dan paste ke terminal command dibawah:
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```
```bash
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```
```bash
php composer-setup.php
```
```bash
php -r "unlink('composer-setup.php');"
```

Buka folder XAMPP untuk menjalakan webserver. cari dipaling bawah Aplikasi bernama "xampp-control.exe".
lakukan Start untuk Module Apache dan MySQL.

Setelah itu copy folder "laravel-api" ke folder htdocs pada XAMPP. Jika sudah selesai melakukan proses copy. Buka terminal pada folder "C:\xampp\htdocs\laravel-api". jalankan command:
```bash
composer install
php artisan migrate:fresh --seed
```
dan ubah file .env.example menjadi .env

maka Backend laravel sudah siap digunakan.

### Frontend
Pastikan sudah terintall [NodeJS](https://nodejs.org/en/download)
Lalu buka Folder frontend, ubah file .env.example menjadi .env. Dan jalankan command pada terminal:
```bash
npm install
npm run start
```

maka Frontend NodeJS menggnakan React sudah siap digunakan.
## Documentation

Dokumentasi API: [https://documenter.getpostman.com/view/24635335/2s946mZUyM]