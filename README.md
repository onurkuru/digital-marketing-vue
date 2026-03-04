# Dijital Pazarlama Roadmapi

Bu proje, dijital pazarlama alanında başlangıç seviyesinden ileri seviyeye kadar öğrenme yolculuğunu takip etmek için geliştirilmiştir. Vue.js ve Firebase teknolojileriyle tasarlanmış, interaktif bir dijital pazarlama roadmapi uygulamasıdır.

## Özellikler

- Dijital pazarlama temellerini öğrenin
- Çeşitli dijital pazarlama stratejilerini keşfedin
- İlerleme durumunuzu takip edin
- Araştırma kaynaklarına ulaşın

## Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim için derleyin
npm run build
```

## Netlify Deploy

Bu proje Netlify için `netlify.toml` ile hazırdır.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* -> /index.html (200)`

### Netlify panel ayarları

1. Projeyi Netlify'ye bağlayın (GitHub/GitLab/Bitbucket veya manuel upload).
2. Build komutu olarak `npm run build` seçin.
3. Publish dizini olarak `dist` seçin.
4. Deploy edin.

## Kullanılan Teknolojiler

- Vue.js
- Vue Router
- Firebase
- Marked (Markdown işleme)
- Vite

## Lisans

MIT 
