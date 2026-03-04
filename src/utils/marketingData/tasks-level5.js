const tasksLevel5 = [
  {
    id: "501",
    title: "E-posta Pazarlamasına Giriş",
    description: `E-posta pazarlamasının temellerini, önemini ve başarılı e-posta kampanyalarının bileşenlerini öğreneceksiniz.

Öğrenilecek Konular:
- E-posta pazarlamasının tanımı ve önemi
- E-posta pazarlamasının avantajları ve dezavantajları
- E-posta türleri (hoş geldin, bilgilendirme, promosyon vb.)
- E-posta pazarlaması metrikleri
- GDPR ve e-posta pazarlaması yasal gereklilikleri

Kazanımlar:
- E-posta pazarlamasının iş hedeflerine katkısını anlama
- Farklı e-posta türlerini ve kullanım alanlarını öğrenme
- Temel metrikleri ve başarı göstergelerini tanıma`,
    deadline: "29.08.2025",
    status: "Henüz Başlanmadı",
    points: 150,
    duration: 120,
    requiredTasks: ["404"],
    resources: {
      articles: [
        "E-posta Pazarlaması Rehberi - HubSpot Blog",
        "E-posta Pazarlamasının Temelleri - MailChimp",
        "GDPR ve E-posta Pazarlaması"
      ],
      videos: [
        "E-posta Pazarlaması Nasıl Yapılır?",
        "Başarılı E-posta Kampanyaları Örnekleri"
      ],
      templates: [
        "E-posta Pazarlama Planı Şablonu",
        "E-posta Metrikleri Takip Tablosu"
      ]
    },
    quiz: {
      questions: [
        {
          question: "E-posta pazarlamasının en önemli metrikleri nelerdir?",
          options: [
            "Açılma oranı, tıklama oranı, dönüşüm oranı",
            "Sayfa görüntüleme, ziyaret süresi",
            "Sosyal medya etkileşimleri",
            "Website trafiği"
          ],
          correctAnswer: 0
        },
        {
          question: "GDPR kapsamında e-posta listesi oluştururken dikkat edilmesi gereken en önemli unsur nedir?",
          options: [
            "E-posta tasarımı",
            "Açık rıza ve onay alma",
            "Gönderim sıklığı",
            "İçerik uzunluğu"
          ],
          correctAnswer: 1
        }
      ]
    },
    tasks: [
      "E-posta pazarlaması hakkında 500 kelimelik bir araştırma raporu hazırlayın",
      "Farklı e-posta türlerine ait 3 örnek bulup analiz edin",
      "Temel metrikleri içeren bir takip tablosu oluşturun"
    ]
  },
  {
    id: "502",
    title: "E-posta Listesi Oluşturma ve Segmentasyon",
    description: `Kaliteli bir e-posta listesi oluşturma, büyütme ve etkili segmentasyon stratejileri geliştirme konularını öğreneceksiniz.

Öğrenilecek Konular:
- Liste büyütme stratejileri
- Lead magnet oluşturma
- Optin formları ve landing page'ler
- Segmentasyon kriterleri ve teknikleri
- Liste temizliği ve bakımı

Kazanımlar:
- Etkili lead magnet'lar oluşturabilme
- Hedef kitleye uygun segmentasyon yapabilme
- Liste sağlığını koruma ve geliştirme`,
    deadline: "05.09.2025",
    status: "Henüz Başlanmadı",
    points: 200,
    duration: 180,
    requiredTasks: ["501"],
    resources: {
      articles: [
        "E-posta Listesi Büyütme Taktikleri",
        "Etkili Lead Magnet Örnekleri",
        "E-posta Segmentasyonu Rehberi"
      ],
      videos: [
        "Lead Magnet Nasıl Oluşturulur?",
        "E-posta Segmentasyonu Uygulamalı Eğitim"
      ],
      templates: [
        "Lead Magnet Planlama Şablonu",
        "Segmentasyon Stratejisi Şablonu"
      ]
    },
    quiz: {
      questions: [
        {
          question: "Etkili bir lead magnet'ın özellikleri nelerdir?",
          options: [
            "Sadece uzun olması",
            "Spesifik bir soruna çözüm sunması ve hemen uygulanabilir olması",
            "Sadece ücretsiz olması",
            "Genel bilgiler içermesi"
          ],
          correctAnswer: 1
        }
      ]
    },
    tasks: [
      "Bir lead magnet oluşturun (örn: PDF rehber, kontrol listesi)",
      "Hedef kitleniz için 3 farklı segment tanımlayın",
      "Bir optin formu tasarlayın"
    ]
  },
  {
    id: "503",
    title: "E-posta Tasarımı ve İçerik Oluşturma",
    description: `Etkili e-posta tasarımı ve içerik oluşturma tekniklerini öğreneceksiniz.

Öğrenilecek Konular:
- E-posta tasarım prensipleri
- Mobil uyumlu e-posta tasarımı
- Etkili konu satırları yazma
- A/B testi
- Call-to-action (CTA) optimizasyonu

Kazanımlar:
- Mobil uyumlu e-postalar tasarlayabilme
- Yüksek açılma oranı sağlayan konu satırları yazabilme
- Etkili CTA'lar oluşturabilme`,
    deadline: "12.09.2025",
    status: "Henüz Başlanmadı",
    points: 250,
    duration: 210,
    requiredTasks: ["501", "502"],
    resources: {
      articles: [
        "E-posta Tasarım Best Practices",
        "Konu Satırı Yazma Rehberi",
        "CTA Optimizasyonu"
      ],
      videos: [
        "E-posta Tasarım Eğitimi",
        "A/B Test Nasıl Yapılır?"
      ],
      templates: [
        "E-posta Tasarım Şablonları",
        "A/B Test Planlama Dokümanı"
      ]
    },
    quiz: {
      questions: [
        {
          question: "Etkili bir CTA'nın özellikleri nelerdir?",
          options: [
            "Belirsiz ve genel olmalı",
            "Aciliyet hissi yaratmalı ve net olmalı",
            "Çok uzun olmalı",
            "Birden fazla aksiyon içermeli"
          ],
          correctAnswer: 1
        }
      ]
    },
    tasks: [
      "Mobil uyumlu bir e-posta şablonu tasarlayın",
      "5 farklı e-posta türü için konu satırları yazın",
      "Bir A/B testi planı oluşturun"
    ]
  },
  {
    id: "504",
    title: "E-posta Otomasyonu",
    description: `E-posta otomasyonunun temellerini ve müşteri yolculuğuna göre otomasyon akışları oluşturmayı öğreneceksiniz.

Öğrenilecek Konular:
- E-posta otomasyonu temelleri
- Tetikleyici olaylar ve koşullar
- Drip kampanyaları
- Müşteri yolculuğu haritalama
- Otomasyon araçları ve platformları

Kazanımlar:
- Temel otomasyon akışları kurabilme
- Müşteri yolculuğuna uygun e-postalar planlayabilme
- Otomasyon platformlarını kullanabilme`,
    deadline: "19.09.2025",
    status: "Henüz Başlanmadı",
    points: 300,
    duration: 240,
    requiredTasks: ["501", "502", "503"],
    resources: {
      articles: [
        "E-posta Otomasyonu Rehberi",
        "Drip Kampanyaları Nasıl Oluşturulur?",
        "Müşteri Yolculuğu Haritalama"
      ],
      videos: [
        "E-posta Otomasyonu Eğitimi",
        "Otomasyon Platformları Karşılaştırması"
      ],
      templates: [
        "Otomasyon Akış Şablonu",
        "Müşteri Yolculuğu Haritası Şablonu"
      ]
    },
    quiz: {
      questions: [
        {
          question: "Drip kampanyası nedir?",
          options: [
            "Tek seferlik toplu e-posta gönderimi",
            "Önceden planlanmış, sıralı e-posta serisi",
            "Sadece promosyon e-postaları",
            "Manuel gönderilen e-postalar"
          ],
          correctAnswer: 1
        }
      ]
    },
    tasks: [
      "Bir hoş geldin e-posta serisi için otomasyon akışı oluşturun",
      "Müşteri yolculuğu haritası çıkarın",
      "Bir drip kampanyası planlayın"
    ]
  },
  {
    id: "505",
    title: "E-posta Analizi ve Optimizasyon",
    description: `E-posta kampanyalarının performansını analiz etme ve optimizasyon stratejileri geliştirme konularını öğreneceksiniz.

Öğrenilecek Konular:
- Temel ve ileri düzey metrikler
- Raporlama ve analiz
- Optimizasyon teknikleri
- Deliverability (ulaşılabilirlik) yönetimi
- ROI hesaplama

Kazanımlar:
- Kampanya performansını analiz edebilme
- Veri odaklı optimizasyon yapabilme
- ROI hesaplayabilme ve raporlayabilme`,
    deadline: "26.09.2025",
    status: "Henüz Başlanmadı",
    points: 350,
    duration: 180,
    requiredTasks: ["501", "502", "503", "504"],
    resources: {
      articles: [
        "E-posta Metrikleri Detaylı Rehber",
        "Deliverability İyileştirme Taktikleri",
        "E-posta ROI Hesaplama"
      ],
      videos: [
        "E-posta Analizi Eğitimi",
        "Optimizasyon Teknikleri"
      ],
      templates: [
        "E-posta Analiz Raporu Şablonu",
        "ROI Hesaplama Tablosu"
      ]
    },
    quiz: {
      questions: [
        {
          question: "E-posta pazarlamasında ROI nasıl hesaplanır?",
          options: [
            "Sadece e-posta açılma oranına bakılır",
            "(Kampanyadan elde edilen gelir - Kampanya maliyeti) / Kampanya maliyeti x 100",
            "Toplam abone sayısı",
            "Tıklama oranı"
          ],
          correctAnswer: 1
        }
      ]
    },
    tasks: [
      "Bir e-posta kampanyası için detaylı analiz raporu hazırlayın",
      "Deliverability skorunu iyileştirmek için öneriler listesi oluşturun",
      "Örnek bir kampanya için ROI hesaplaması yapın"
    ]
  }
];

export default tasksLevel5; 