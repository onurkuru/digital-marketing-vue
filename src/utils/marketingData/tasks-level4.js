// Tasks for Level 4: Content Marketing
export const tasksLevel4 = [
  {
    id: '401',
    levelId: '4',
    order: 1,
    title: 'İçerik Pazarlamasına Giriş',
    description: 'İçerik pazarlamasının temellerini, önemini ve hedef kitleye değer sağlayan içerik oluşturma.',
    longDescription: `İçerik pazarlaması, belirli bir hedef kitleyi çekmek, elde tutmak ve nihayetinde karlı müşteri eylemine yönlendirmek için değerli, alakalı ve tutarlı içerik oluşturma ve dağıtma stratejisidir. Bu görevde, içerik pazarlamasının neden bu kadar önemli olduğunu ve nasıl çalıştığını öğreneceksiniz.

Bu görev kapsamında:
- İçerik pazarlamasının tanımı ve hedefleri
- Geleneksel reklamcılıktan farkı
- İçerik pazarlamasının faydaları (Marka bilinirliği, güven oluşturma, lead üretimi, SEO\'ya katkı vb.)
- İçerik pazarlaması hunisi (Farkındalık, Değerlendirme, Karar)
- Başarılı içerik pazarlaması örnekleri

konularını detaylı olarak ele alacağız.`,
    deadline: '25.07.2025',
    status: 'Henüz Başlanmadı',
    points: 150,
    duration: '120 dakika',
    requiredTasks: ['305'], // Requires completion of Level 3
    resources: [
      {
        type: 'article',
        title: 'İçerik Pazarlaması Nedir? Kapsamlı Bir Başlangıç Rehberi',
        url: '/resources/content-marketing-intro-guide.pdf'
      },
      {
        type: 'video',
        title: 'Neden İçerik Pazarlaması Yapmalısınız?',
        url: 'https://www.youtube.com/watch?v=example14'
      },
      {
        type: 'infographic',
        title: 'İçerik Pazarlaması İstatistikleri',
        url: '/resources/content-marketing-stats.jpg'
      }
    ],
    quiz: {
      id: 'q401',
      questionCount: 6
    },
    tasks: [
      {
        title: 'İçerik Pazarlamasının Faydalarını Araştırın',
        description: 'İçerik pazarlamasının bir işletmeye sağlayabileceği temel faydaları detaylandıran bir sunum hazırlayın.',
        deliverable: 'Sunum dosyası (PPT/Google Slides)'
      },
      {
        title: 'Rakip İçerik Analizi',
        description: 'Bir rakip markanın içerik pazarlaması stratejisini (blog, sosyal medya vb.) analiz edin ve güçlü/zayıf yönlerini belirleyin.',
        deliverable: 'Rakip içerik analiz raporu'
      }
    ]
  },
  {
    id: '402',
    levelId: '4',
    order: 2,
    title: 'İçerik Stratejisi Geliştirme',
    description: 'Hedef kitleye ve iş hedeflerine uygun, sürdürülebilir bir içerik stratejisi oluşturma.',
    longDescription: `Etkili bir içerik pazarlaması, plansız içerik üretiminden ziyade iyi düşünülmüş bir strateji gerektirir. Bu görevde, hedef kitle analizi, içerik konuları belirleme, içerik takvimi oluşturma ve başarı metrikleri tanımlama adımlarını içeren bir içerik stratejisi nasıl geliştirileceğini öğreneceksiniz.

Bu görev kapsamında:
- Hedef kitle personası ve içerik ihtiyaçları
- İş hedefleriyle içerik hedeflerini hizalama
- İçerik sütunları (Content pillars) belirleme
- Anahtar kelime araştırması ve konu seçimi
- İçerik takvimi oluşturma ve yönetme
- İçerik formatlarına karar verme (Blog, video, infografik vb.)
- Başarı metrikleri (KPI) belirleme

konularını detaylı olarak ele alacağız.`,
    deadline: '01.08.2025',
    status: 'Henüz Başlanmadı',
    points: 250,
    duration: '180 dakika',
    requiredTasks: ['401'],
    resources: [
      {
        type: 'article',
        title: 'Adım Adım İçerik Stratejisi Nasıl Oluşturulur?',
        url: '/resources/content-strategy-step-by-step.pdf'
      },
      {
        type: 'template',
        title: 'İçerik Stratejisi Şablonu',
        url: '/resources/content-strategy-template.docx'
      },
      {
        type: 'video',
        title: 'İçerik Takvimi Nasıl Planlanır?',
        url: 'https://www.youtube.com/watch?v=example15'
      }
    ],
    quiz: {
      id: 'q402',
      questionCount: 8
    },
    tasks: [
      {
        title: 'İçerik Stratejisi Oluşturma',
        description: 'Belirlediğiniz bir marka veya konu için temel bir içerik stratejisi oluşturun (Hedef kitle, hedefler, ana konular, içerik formatları, KPI\'lar).',
        deliverable: 'İçerik stratejisi dokümanı'
      },
      {
        title: 'İçerik Takvimi Hazırlama',
        description: 'Oluşturduğunuz stratejiye dayanarak 1 aylık içerik takvimi hazırlayın (En az 8 içerik fikri).',
        deliverable: 'İçerik takvimi (Excel/Google Sheet)'
      }
    ]
  },
  {
    id: '403',
    levelId: '4',
    order: 3,
    title: 'Blog Yazarlığı ve SEO Odaklı İçerik',
    description: 'Etkili blog yazıları yazma, SEO prensiplerini uygulama ve okunabilirliği artırma teknikleri.',
    longDescription: `Bloglar, içerik pazarlamasının en popüler ve etkili araçlarından biridir. Hedef kitlenize değer sağlayan, arama motorlarında iyi sıralanan ve okuyucuyu harekete geçiren blog yazıları yazmak önemlidir. Bu görevde, SEO odaklı blog yazarlığının inceliklerini öğreneceksiniz.

Bu görev kapsamında:
- Blog yazısı yapısı (Başlık, giriş, alt başlıklar, sonuç)
- Etkileyici başlıklar yazma teknikleri
- Anahtar kelimeleri doğal bir şekilde içeriğe entegre etme
- Okunabilirlik prensipleri (Kısa paragraflar, listeler, görseller)
- Görsel kullanımı ve optimizasyonu
- Dahili ve harici bağlantılar ekleme
- Call-to-action (CTA) kullanımı
- Blog yazılarını tanıtma yöntemleri

konularını detaylı olarak ele alacağız.`,
    deadline: '08.08.2025',
    status: 'Henüz Başlanmadı',
    points: 300,
    duration: '210 dakika',
    requiredTasks: ['401', '402', '203'], // Requires On-Page SEO knowledge
    resources: [
      {
        type: 'article',
        title: 'SEO Uyumlu Blog Yazısı Nasıl Yazılır?',
        url: '/resources/seo-blog-writing-guide.pdf'
      },
      {
        type: 'video',
        title: 'Okunabilirliği Yüksek Blog Yazıları Yazma İpuçları',
        url: 'https://www.youtube.com/watch?v=example16'
      },
      {
        type: 'checklist',
        title: 'Blog Yazısı Yayınlama Kontrol Listesi',
        url: '/resources/blog-post-checklist.pdf'
      }
    ],
    quiz: {
      id: 'q403',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Blog Yazısı Yazma',
        description: 'Verilen bir anahtar kelime ve konu üzerine en az 800 kelimelik, SEO uyumlu bir blog yazısı yazın.',
        deliverable: 'Blog yazısı metni (Word/Google Doc)'
      },
      {
        title: 'Başlık Optimizasyonu',
        description: 'Verilen 5 blog yazısı konusu için 3\'er adet alternatif, dikkat çekici başlık önerisi sunun.',
        deliverable: 'Başlık önerileri listesi'
      }
    ]
  },
  {
    id: '404',
    levelId: '4',
    order: 4,
    title: 'Görsel ve Video İçerik Üretimi',
    description: 'İnfografikler, sunumlar, kısa videolar gibi görsel içeriklerin oluşturulması ve pazarlanması.',
    longDescription: `Görsel ve video içerikler, metin tabanlı içeriklere göre genellikle daha fazla etkileşim alır ve bilgiyi daha hızlı aktarır. Bu görevde, temel görsel tasarım prensiplerini, infografik oluşturmayı ve basit video içerikleri üretmeyi öğreneceksiniz.

Bu görev kapsamında:
- Görsel içeriğin önemi ve türleri (İnfografik, sunum, meme, GIF vb.)
- Temel görsel tasarım ilkeleri (Renk, tipografi, kompozisyon)
- Ücretsiz ve ücretli görsel kaynakları ve araçları (Canva, Unsplash, Pexels vb.)
- İnfografik oluşturma adımları
- Video içeriğin önemi ve türleri (Eğitici, tanıtım, testimonial vb.)
- Basit video oluşturma ve düzenleme araçları (InShot, CapCut vb.)
- Görsel ve video içeriklerin sosyal medyada ve web sitesinde kullanımı

konularını detaylı olarak ele alacağız.`,
    deadline: '15.08.2025',
    status: 'Henüz Başlanmadı',
    points: 350,
    duration: '240 dakika',
    requiredTasks: ['401', '402'],
    resources: [
      {
        type: 'article',
        title: 'Görsel İçerik Pazarlaması Rehberi',
        url: '/resources/visual-content-marketing-guide.pdf'
      },
      {
        type: 'video',
        title: 'Canva ile İnfografik Nasıl Oluşturulur?',
        url: 'https://www.youtube.com/watch?v=example17'
      },
      {
        type: 'article',
        title: 'Yeni Başlayanlar İçin Video Pazarlama',
        url: '/resources/video-marketing-for-beginners.pdf'
      },
      {
        type: 'tool',
        title: 'Pexels - Ücretsiz Stok Fotoğraf ve Videolar',
        url: 'https://www.pexels.com/'
      }
    ],
    quiz: {
      id: 'q404',
      questionCount: 10
    },
    tasks: [
      {
        title: 'İnfografik Oluşturma',
        description: 'Verilen bir konu hakkında basit bir infografik tasarlayın (Canva veya benzeri bir araç kullanarak).',
        deliverable: 'İnfografik dosyası (PNG/JPG/PDF)'
      },
      {
        title: 'Kısa Video Senaryosu Yazma',
        description: 'Bir ürün veya hizmeti tanıtan 1 dakikalık bir video için senaryo ve storyboard hazırlayın.',
        deliverable: 'Video senaryosu ve storyboard'
      }
    ]
  },
  {
    id: '405',
    levelId: '4',
    order: 5,
    title: 'İçerik Dağıtımı ve Tanıtımı',
    description: 'Oluşturulan içeriği doğru kitleye ulaştırmak için farklı dağıtım kanallarını ve tanıtım stratejilerini kullanma.',
    longDescription: `Harika içerikler oluşturmak yeterli değildir; bu içerikleri doğru kişilere ulaştırmanız gerekir. Bu görevde, içeriğinizi farklı kanallarda nasıl dağıtacağınızı ve tanıtımını nasıl yapacağınızı öğreneceksiniz.

Bu görev kapsamında:
- İçerik dağıtım kanalları (Blog, sosyal medya, e-posta, web seminerleri vb.)
- Organik içerik dağıtımı (SEO, sosyal medya paylaşımı)
- Ücretli içerik dağıtımı (Sosyal medya reklamları, native advertising)
- E-posta pazarlaması ile içerik dağıtımı
- Etkileyici pazarlaması (Influencer marketing) ile içerik tanıtımı
- İçerik yeniden kullanım (Content repurposing) stratejileri
- İçerik performansını izleme ve analiz etme

konularını detaylı olarak ele alacağız.`,
    deadline: '22.08.2025',
    status: 'Henüz Başlanmadı',
    points: 450,
    duration: '210 dakika',
    requiredTasks: ['401', '402', '403', '404'],
    resources: [
      {
        type: 'article',
        title: 'Etkili İçerik Dağıtım Stratejileri',
        url: '/resources/content-distribution-strategies.pdf'
      },
      {
        type: 'video',
        title: 'İçeriğinizi Nasıl Daha Fazla Kişiye Ulaştırırsınız?',
        url: 'https://www.youtube.com/watch?v=example18'
      },
      {
        type: 'checklist',
        title: 'İçerik Tanıtım Kontrol Listesi',
        url: '/resources/content-promotion-checklist.pdf'
      }
    ],
    quiz: {
      id: 'q405',
      questionCount: 12
    },
    tasks: [
      {
        title: 'İçerik Dağıtım Planı Oluşturma',
        description: 'Yazdığınız bir blog yazısı için çok kanallı bir dağıtım ve tanıtım planı oluşturun.',
        deliverable: 'İçerik dağıtım planı'
      },
      {
        title: 'İçerik Yeniden Kullanım Fikirleri',
        description: 'Mevcut bir blog yazısını farklı formatlara (infografik, video, sosyal medya gönderisi vb.) nasıl dönüştürebileceğinize dair 3 fikir geliştirin.',
        deliverable: 'İçerik yeniden kullanım fikirleri listesi'
      }
    ]
  }
];

export default tasksLevel4; 