const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 1. Configuración de tu base de datos MySQL
const db = mysql.createConnection({
	host: "localhost",
	user: "root", // Tu usuario de MySQL (normalmente root)
	password: "", // Tu contraseña de MySQL
	database: "datapixel-final", // El nombre de tu base de datos
});

db.connect((err) => {
	if (err) {
		console.log("Error conectando a MySQL:", err);
	} else {
		console.log("¡Conectado a la base de datos MySQL!");
	}
});

// 2. Ruta de Login (Esta es la que llama React)
app.post("/login", (req, res) => {
	const { email, password } = req.body;

	const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

	db.query(sql, [email, password], (err, result) => {
		if (err) return res.status(500).json({ message: "Error en el servidor" });

		if (result.length > 0) {
			// Enviamos los datos reales del usuario a React
			const user = result[0];
			res.json({
				nombre: user.nombre,
				email: user.email,
				rol: user.rol || "Usuario",
			});
		} else {
			res.status(401).json({ message: "Credenciales incorrectas" });
		}
	});
});

app.listen(8081, () => {
	console.log("Servidor backend corriendo en http://localhost:8081");
});
