const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let totalRequests = 0;
let clients = [];

// Middleware untuk menghitung total requests dan mengirim update ke clients
app.use((req, res, next) => {
    totalRequests++;
    sendUpdateToClients();
    next();
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Route untuk halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "api.html"));
});

// Dynamic API routes
const routes = ["igdl", "fbdl", "ttdl", "githubstalk", "searchgroups", "llama-3.3-70b-versatile"];
routes.forEach((route) => {
    try {
        app.use(`/api/${route}`, require(`./api/${route}`));
    } catch (error) {
        console.error(`Gagal memuat route /api/${route}:`, error.message);
    }
});
// Github YossCasaster
// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;

// Fungsi untuk mengirim update ke clients
function sendUpdateToClients() {
    // Implementasi fungsi ini sesuai kebutuhan mu
}