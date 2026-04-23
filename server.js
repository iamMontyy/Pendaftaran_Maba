const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/kampus_db')
    .then(() => console.log('Terhubung ke database kampus!'))
    .catch((err) => console.log('Gagal terhubung:', err));
    const prodiSchema = new mongoose.Schema({
    nama_prodi: String,
    fakultas: String,
    akreditasi: String
});
const Prodi = mongoose.model('Prodi', prodiSchema);

const mabaSchema = new mongoose.Schema({
    nama_lengkap: String,
    asal_sekolah: String,
    pilihan_prodi: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Prodi' 
    }
});
const Maba = mongoose.model('Maba', mabaSchema);
