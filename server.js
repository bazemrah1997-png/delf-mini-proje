const express = require("express");
const app = express();
const PORT = 3000;

// Sahte ürün verimiz - normalde bu bir database'den gelir
const urunler = [
  { id: 1, ad: "Buzdolabı X200", stok: 5, fiyat: 24999 },
  { id: 2, ad: "Çamaşır Makinesi Z50", stok: 0, fiyat: 12999 },
  { id: 3, ad: "Bulaşık Makinesi Pro", stok: 12, fiyat: 8999 }
];

// index.html dosyasını göstermek için
app.use(express.static('public'));

// Bu bir API endpoint'i - frontend buradan veri çekecek
app.get('/api/urunler', (req, res) => {
  res.json(urunler);
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
