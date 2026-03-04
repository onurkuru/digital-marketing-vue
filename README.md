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

### Görev Teslim Formu (Captcha + Güvenli E-posta)

Görev teslimi formu `/.netlify/functions/task-submission` fonksiyonuna gider.
Fonksiyon öncelikle Netlify Email Integration (`/.netlify/functions/emails/task-submission`) ile gönderim yapar.
Hedef e-posta istemci kodunda tutulmaz, sadece Netlify ortam değişkeninde saklanır.

Netlify > Site configuration > Environment variables alanına aşağıdaki anahtarları ekleyin:

- `VITE_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile) **veya**
- `VITE_RECAPTCHA_SITE_KEY` + `SITE_RECAPTCHA_SECRET` (Google reCAPTCHA)
- `NETLIFY_EMAILS_SECRET` (Netlify Email Integration secret)
- `SUBMISSION_FROM_EMAIL` (mail gönderen adres)
- `SUBMISSION_TO_EMAIL` (teslimlerin düşeceği gizli hedef adres)

Opsiyonel (fallback için):

- `CAPTCHA_PROVIDER` (`turnstile` veya `recaptcha`)
- `EMAIL_PROVIDER` (`netlify`, `postmark` veya `resend`)
- `POSTMARK_SERVER_TOKEN`
- `POSTMARK_MESSAGE_STREAM` (`outbound` varsayılan)
- `RESEND_API_KEY`

## Kullanılan Teknolojiler

- Vue.js
- Vue Router
- Firebase
- Marked (Markdown işleme)
- Vite

## Lisans

MIT 
