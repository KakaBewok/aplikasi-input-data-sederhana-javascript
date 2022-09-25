// mengimport module yang dibutuhkan
const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
// menginisialisasi express ke dalam variabel
const app = express();

//mensetting bodyparser
app.use(BodyParser.urlencoded({ extended: true }));

//mengatur template engine (view itu nama folder templatenya)
app.set("view engine", "ejs");
app.set("views", "view");

// membuat koneksi dengan mysql
const db = mysql.createConnection({
  host: "localhost",
  database: "db_siswa",
  user: "root",
  password: "",
});

// melakukan koneksi dengan mysql
db.connect((err) => {
  if (err) throw err;
  //jika tidak error jalan kode dibawah ini
  console.log("database connected..");

  //express mencoba merequest dan menampilkan data dari db ke browser melalui port
  app.get("/", (req, res) => {
    //membuat variabel query untuk ke db
    const queryTampilkanData = "SELECT * FROM daftar_siswa";
    //melakukan query
    db.query(queryTampilkanData, (err, result) => {
      //melakukan parsing kepada hasil query
      const siswa = JSON.parse(JSON.stringify(result));
      res.render("index", {
        daftar: siswa,
        title: "Daftar Siswa SMK 5 Bogor",
      });
    });
  });

  //express melakukan insert data
  app.post("/tambah", (req, res) => {
    //req.body didapat dari inputan yang ada di form tambah
    const queryInsertData = `INSERT INTO daftar_siswa (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}')`;
    //melakukan query insert
    db.query(queryInsertData, (err, result) => {
      if (err) throw err;

      res.redirect("/");
    });
  });
});

//merunning server dengan port 8000
app.listen(8000, () => {
  console.log("Server running...");
});
