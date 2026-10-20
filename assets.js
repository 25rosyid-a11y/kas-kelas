/* ========================================================
   FILE: assets.js
   FUNGSI: Mengelola logika keuangan (Perhitungan Saldo)
   ======================================================== */

// Variabel untuk menyimpan data transaksi secara sementara di memori
let daftarTransaksi = ambilData();

// Fungsi untuk menambahkan transaksi baru ke dalam daftar
function tambahTransaksiKeState(transaksiBaru) {
    daftarTransaksi.push(transaksiBaru); // Masukkan data baru ke urutan terakhir
    simpanData(daftarTransaksi);         // Langsung simpan perubahan ke database
}

// Fungsi untuk menghapus transaksi berdasarkan ID
function hapusTransaksiDariState(idTransaksi) {
    // Saring (filter) data, sisakan semua data KECUALI yang ID-nya cocok
    daftarTransaksi = daftarTransaksi.filter(transaksi => transaksi.id !== idTransaksi);
    simpanData(daftarTransaksi);         // Simpan perubahan ke database
}

// Fungsi untuk menghitung total Pemasukan, Pengeluaran, dan Sisa Saldo
function hitungRingkasanKeuangan() {
    let totalMasuk = 0;
    let totalKeluar = 0;

    // Cek satu per satu semua transaksi
    daftarTransaksi.forEach(transaksi => {
        if (transaksi.tipe === 'masuk') {
            totalMasuk += transaksi.nominal; // Tambah ke total masuk
        } else if (transaksi.tipe === 'keluar') {
            totalKeluar += transaksi.nominal; // Tambah ke total keluar
        }
    });

    let sisaSaldo = totalMasuk - totalKeluar;

    // Kembalikan 3 nilai ini agar bisa digunakan di app.js
    return {
        masuk: totalMasuk,
        keluar: totalKeluar,
        saldo: sisaSaldo
    };
}
