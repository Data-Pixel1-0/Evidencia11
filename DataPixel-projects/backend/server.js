import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "datapixel-final",
});

app.post("/login", (req, res) => {
	const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
	db.query(sql, [req.body.email, req.body.password], (err, data) => {
		if (err) return res.status(500).json({ Status: "Error" });
		if (data.length > 0) {
			// Enviamos exactamente estas llaves: nombre, email, rol
			return res.json({
				Status: "Success",
				nombre: data[0].nombre,
				email: data[0].email,
				rol: data[0].rol,
			});
		} else {
			return res.json({ Status: "Error", Message: "Credenciales incorrectas" });
		}
	});
});

app.listen(8081, () => {
	console.log("Servidor corriendo en el puerto 8081");
});
