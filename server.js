const express = require('express');
const app = express();
const PORT = 3000;

// JSON body'leri okuyabilmek için gerekli - POST isteklerinde veri almak için şart
app.use(express.json());
app.use(express.static('public'));

const urunler = [
  { id: 1, ad: "Buzdolabı X200", stok: 5, fiyat: 24999 },
  { id: 2, ad: "Çamaşır Makinesi Z50", stok: 0, fiyat: 12999 },
  { id: 3, ad: "Bulaşık Makinesi Pro", stok: 12, fiyat: 8999 }
];

// Sepet - şimdilik basit, sunucu hafızasında (yeniden başlayınca silinir)
let sepet = [];

// Ürünleri listele
app.get('/api/urunler', (req, res) => {
  res.json(urunler);
});

// Yeni ürün ekle
app.post('/api/urunler', (req, res) => {
  const { ad, stok, fiyat } = req.body;

  if (!ad || fiyat === undefined) {
    return res.status(400).json({ hata: "Ürün adı ve fiyat zorunlu" });
  }

  const yeniUrun = {
    id: urunler.length + 1,
    ad,
    stok: stok || 0,
    fiyat
  };

  urunler.push(yeniUrun);
  res.status(201).json(yeniUrun);
});

// Sepeti görüntüle
app.get('/api/sepet', (req, res) => {
  res.json(sepet);
});

// Sepete ürün ekle
app.post('/api/sepet', (req, res) => {
  const { urunId } = req.body;
  const urun = urunler.find(u => u.id === urunId);

  if (!urun) {
    return res.status(404).json({ hata: "Ürün bulunamadı" });
  }
  if (urun.stok <= 0) {
    return res.status(400).json({ hata: "Bu ürün stokta yok" });
  }

  sepet.push(urun);
  res.status(201).json({ mesaj: "Sepete eklendi", sepet });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
