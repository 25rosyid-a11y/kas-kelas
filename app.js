/* ========================================================
   FILE: app.js
   FUNGSI: Mengendalikan tampilan web (DOM) dan interaksi tombol
   ======================================================== */

// Pastikan semua kode HTML sudah dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Hubungkan elemen HTML dengan JavaScript
    const kasForm = document.getElementById('kasForm');
    
    // 2. Jalankan fungsi render saat aplikasi pertama kali dibuka
    renderTampilanUtama();

    // 3. Deteksi saat tombol "Simpan Transaksi" ditekan (Form Submit)
    kasForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah halaman web melakukan *refresh*
        
        // Ambil nilai yang diketik pengguna di dalam form
        const inputTanggal = document.getElementById('tanggal').value;
        const inputTipe = document.getElementById('tipe').value;
        const inputKeterangan = document.getElementById('keterangan').value;
        // Ubah teks angka menjadi tipe data Angka (Number)
        const inputNominal = Number(document.getElementById('nominal').value);

        // Buat format objek transaksi baru
        const transaksiBaru = {
            id: Date.now(), // Gunakan waktu saat ini sebagai ID Unik
            tanggal: inputTanggal,
            tipe: inputTipe,
            keterangan: inputKeterangan,
            nominal: inputNominal
        };

        // Lempar data ke state.js untuk ditambahkan
        tambahTransaksiKeState(transaksiBaru);

        // Bersihkan isian form setelah berhasil disimpan
        kasForm.reset();

        // Perbarui tampilan web
        renderTampilanUtama();
    });
});

/* --- FUNGSI-FUNGSI PENGENDALI TAMPILAN --- */

// Fungsi untuk memperbarui semua tampilan (Kartu Saldo & Tabel)
function renderTampilanUtama() {
    renderKartuRingkasan();
    renderTabelTransaksi();
}

// Fungsi untuk memperbarui angka pada Kartu Saldo
function renderKartuRingkasan() {
    // Minta hasil perhitungan dari state.js
    const ringkasan = hitungRingkasanKeuangan();

    // Fungsi kecil untuk memformat angka jadi format Rupiah (Contoh: 10000 -> 10.000)
    const formatRupiah = (angka) => {
        return angka.toLocaleString('id-ID');
    };

    // Tampilkan ke layar HTML
    document.getElementById('totalMasuk').textContent = `Rp ${formatRupiah(ringkasan.masuk)}`;
    document.getElementById('totalKeluar').textContent = `Rp ${formatRupiah(ringkasan.keluar)}`;
    document.getElementById('totalSaldo').textContent = `Rp ${formatRupiah(ringkasan.saldo)}`;
}

// Fungsi untuk menyusun daftar data ke dalam Tabel
function renderTabelTransaksi() {
    const tabelBody = document.getElementById('tabelBody');
    
    // Kosongkan tabel terlebih dahulu agar tidak menumpuk dengan data lama
    tabelBody.innerHTML = '';

    // Jika belum ada data sama sekali
    if (daftarTransaksi.length === 0) {
        tabelBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #94a3b8;">Belum ada data transaksi kas.</td>
            </tr>
        `;
        return;
    }

    // Susun data satu per satu ke dalam tabel
    daftarTransaksi.forEach(transaksi => {
        // Tentukan warna teks berdasarkan tipe (Hijau untuk masuk, Merah untuk keluar)
        const warnaTipe = transaksi.tipe === 'masuk' ? '#16a34a' : '#dc2626';
        const namaTipe = transaksi.tipe === 'masuk' ? 'MASUK' : 'KELUAR';
        
        // Buat elemen Baris (TR)
        const baris = document.createElement('tr');
        
        // Isi dari baris tersebut (TD)
        baris.innerHTML = `
            <td>${transaksi.tanggal}</td>
            <td>${transaksi.keterangan}</td>
            <td style="color: ${warnaTipe}; font-weight: bold;">${namaTipe}</td>
            <td>Rp ${transaksi.nominal.toLocaleString('id-ID')}</td>
            <td>
                <button onclick="hapusData(${transaksi.id})">Hapus</button>
            </td>
        `;
        
        // Tempelkan baris ke dalam tabel HTML
        tabelBody.appendChild(baris);
    });
}

// Fungsi ini dipanggil dari HTML saat tombol "Hapus" ditekan
// Karena dipanggil dari tag HTML secara langsung, fungsinya harus bersifat Global
window.hapusData = function(idTransaksi) {
    // Tampilkan jendela konfirmasi
    const yakin = confirm("Apakah kamu yakin ingin menghapus riwayat transaksi ini?");
    
    if (yakin) {
        // Minta state.js untuk menghapus datanya
        hapusTransaksiDariState(idTransaksi);
        // Perbarui tampilan
        renderTampilanUtama();
    }
};
