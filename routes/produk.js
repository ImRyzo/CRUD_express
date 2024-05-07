const express = require('express');
const router = express.Router();
const m_produk = require('../module/m_produk');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/produk'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.get('/', async function(req, res, next) {
    try {
        let rows = await m_produk.getAll();
        res.render('produk/index', { title: 'Data Produk', data: rows });
    } catch (err) {
        console.log(err); 
        next(err);
    }
});

router.get('/create', async function(req, res, next) {
    try {
        let kategori = await m_produk.getAllKategori(); 
        res.render('produk/create', { title: 'Tambah Produk Baru', kategori: kategori });
    } catch (err) {
        console.log(err); 
        next(err);
    }
});

router.post('/store', upload.single('gambar_produk'), async function(req, res, next) {
    try {
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let data = {
            nama_produk,
            harga_produk: harga_produk.replace(/[^0-9]/g, ''), 
            id_kategori,
            gambar_produk: req.file ? req.file.filename : '' 
        };
        await m_produk.store(data);
        req.flash('success', 'Produk berhasil ditambahkan.');
        res.redirect('/produk');
    } catch (err) {
        console.log(err); 
        req.flash('error', 'Terjadi kesalahan saat menambahkan produk.');
        res.redirect('/produk');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let produk = await m_produk.getID(id);
        let kategori = await m_produk.getAllKategori();
        res.render('produk/edit', { title: 'Edit Produk', data: produk[0], kategori: kategori });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/update/:id', upload.single('gambar_produk'), async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let data = {
            nama_produk,
            harga_produk: harga_produk.replace(/[^0-9]/g, ''),
            id_kategori,
            gambar_produk: req.file ? req.file.filename : '' 
        };
        await m_produk.updateData(id, data);
        req.flash('success', 'Data produk berhasil diperbarui.');
        res.redirect('/produk');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Terjadi kesalahan saat memperbarui produk.');
        res.redirect('/produk');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await m_produk.deleteData(id);
        req.flash('success', 'Data produk berhasil dihapus.');
        res.redirect('/produk');
    } catch (err) {
        console.log(err);
        req.flash('error', 'Terjadi kesalahan saat menghapus produk.');
        res.redirect('/produk');
    }
});

module.exports = router;
