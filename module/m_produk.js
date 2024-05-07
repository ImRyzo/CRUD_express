var connection = require("../config/database");

class m_produk {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM produk a JOIN kategori b ON a.id_kategori = b.id_kategori ORDER BY a.id_produk DESC`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getAllKategori() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM kategori`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO produk SET ?`, data, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getID(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM produk WHERE id_produk = ?`, id, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async updateData(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE produk SET ? WHERE id_produk = ?`, [data, id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async deleteData(id) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM produk WHERE id_produk = ?`, id, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = m_produk;
