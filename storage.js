/* ========================================================
   FILE: storage.js
   FUNGSI: Mengelola penyimpanan data di LocalStorage Browser
   ======================================================== */

// Nama "kunci" untuk menyimpan data di database browser
const STORAGE_KEY = 'KAS_KELAS_DATA_V1';

// Fungsi untuk MENGAMBIL data dari database
function ambilData() {
    // Ambil teks dari LocalStorage
    const dataString = localStorage.getItem(STORAGE_KEY);
    
    // Jika ada data, ubah teks menjadi Array/Objek. Jika kosong, berikan Array kosong []
    if (dataString) {
        return JSON.parse(dataString);
    } else {
        return [];
    }
}

// Fungsi untuk MENYIMPAN data ke database
function simpanData(dataArray) {
    // Ubah Array/Objek menjadi format teks (String) lalu simpan
    const dataString = JSON.stringify(dataArray);
    localStorage.setItem(STORAGE_KEY, dataString);
}
