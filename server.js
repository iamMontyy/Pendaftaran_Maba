const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/kampus_db')
    .then(() => console.log('Terhubung ke database kampus!'))
    .catch((err) => console.log('Gagal terhubung !:', err));
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

app.post('/prodi', async (req, res) => {
    try {
        const prodiBaru = new Prodi(req.body);
        await prodiBaru.save();
        res.status(201).json({ pesan: "Prodi berhasil ditambahkan!", data: prodiBaru });
    } catch (error) {
        res.status(400).json({ pesan: "Gagal menambahkan prodi!", error: error.message });
    }
});

app.post('/mendaftar', async (req, res) => {
    try {
        const mabaBaru = new Maba(req.body);
        await mabaBaru.save();
        res.status(201).json({ pesan: "Pendaftaran berhasil disimpan!", data: mabaBaru });
    } catch (error) {
        res.status(400).json({ pesan: "Gagal menambahkan maba!", error: error.message });
    }
});

app.get('/pendaftar', async (req, res) => {
    try {
        const semuaPendaftar = await Maba.find().populate('pilihan_prodi');
        
        res.json({ pesan: "Data seluruh pendaftar:", data: semuaPendaftar });
    } catch (error) { ... }
});

app.listen(PORT, () => {
    console.log(`Server Pendaftaran berjalan di http://localhost:${PORT}`);
});
