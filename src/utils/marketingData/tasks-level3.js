// Tasks for Level 3: Social Media Marketing
export const tasksLevel3 = [
  {
    id: '301',
    levelId: '3',
    order: 1,
    title: 'Sosyal Medya Pazarlamasına Giriş',
    description: 'Sosyal medya pazarlamasının temellerini, önemini ve farklı platformların özelliklerini öğrenin.',
    longDescription: `Sosyal medya pazarlaması, markaların hedef kitleleriyle etkileşim kurmak, marka bilinirliği oluşturmak ve pazarlama hedeflerine ulaşmak için sosyal medya platformlarını kullanmasıdır. Bu görevde, sosyal medyanın pazarlamadaki rolünü, popüler platformları ve temel stratejileri anlayacaksınız.

Bu görev kapsamında:
- Sosyal medya pazarlamasının tanımı ve hedefleri
- Facebook, Instagram, Twitter, LinkedIn, TikTok vb. platformların özellikleri
- Hedef kitleye uygun platform seçimi
- Sosyal medya pazarlamasının avantajları ve zorlukları
- Sosyal medya trendleri

konularını detaylı olarak ele alacağız.`,
    deadline: '20.06.2025',
    status: 'Henüz Başlanmadı',
    points: 150,
    duration: '120 dakika',
    requiredTasks: ['205'], // Requires completion of Level 2
    resources: [
      {
        type: 'article',
        title: 'Sosyal Medya Pazarlaması 101',
        url: '/resources/social-media-marketing-101.pdf'
      },
      {
        type: 'video',
        title: 'Hangi Sosyal Medya Platformunu Seçmelisiniz?',
        url: 'https://www.youtube.com/watch?v=example9'
      },
      {
        type: 'infographic',
        title: 'Sosyal Medya Platformları Karşılaştırması',
        url: '/resources/social-media-platforms-comparison.jpg'
      }
    ],
    quiz: {
      id: 'q301',
      questionCount: 6
    },
    tasks: [
      {
        title: 'Platform Analizi',
        description: 'Seçtiğiniz bir sektördeki işletmelerin hangi sosyal medya platformlarını neden kullandığını analiz edin.',
        deliverable: 'Platform analiz raporu'
      },
      {
        title: 'Sosyal Medya Hedefleri Belirleme',
        description: 'Hayali bir marka için SMART (Specific, Measurable, Achievable, Relevant, Time-bound) sosyal medya hedefleri belirleyin.',
        deliverable: 'SMART hedefler listesi'
      }
    ]
  },
  {
    id: '302',
    levelId: '3',
    order: 2,
    title: 'İçerik Stratejisi ve Oluşturma',
    description: 'Sosyal medya platformları için etkili içerik stratejileri geliştirme ve farklı içerik türleri oluşturma.',
    longDescription: `Başarılı bir sosyal medya pazarlaması için doğru içerik stratejisi hayati önem taşır. Hedef kitlenizin ilgisini çekecek, etkileşim yaratacak ve marka mesajınızı iletecek içerikler oluşturmalısınız. Bu görevde, içerik takvimi oluşturma, farklı içerik formatları kullanma ve görsel tasarım temellerini öğreneceksiniz.

Bu görev kapsamında:
- Sosyal medya içerik stratejisi oluşturma adımları
- İçerik takvimi planlama ve yönetimi
- Metin, görsel, video, hikaye, canlı yayın gibi içerik formatları
- Kullanıcı tarafından oluşturulan içerik (UGC)
- Görsel tasarım prensipleri ve araçları (Canva vb.)
- İçerik optimizasyonu (Hashtag kullanımı, zamanlama vb.)

konularını detaylı olarak ele alacağız.`,
    deadline: '27.06.2025',
    status: 'Henüz Başlanmadı',
    points: 200,
    duration: '180 dakika',
    requiredTasks: ['301'],
    resources: [
      {
        type: 'article',
        title: 'Etkili Sosyal Medya İçerik Stratejisi Nasıl Oluşturulur?',
        url: '/resources/social-media-content-strategy.pdf'
      },
      {
        type: 'template',
        title: 'Sosyal Medya İçerik Takvimi Şablonu',
        url: '/resources/social-media-content-calendar-template.xlsx'
      },
      {
        type: 'video',
        title: 'Sosyal Medya İçin Görsel Nasıl Tasarlanır?',
        url: 'https://www.youtube.com/watch?v=example10'
      },
      {
        type: 'tool',
        title: 'Canva - Ücretsiz Tasarım Aracı',
        url: 'https://www.canva.com/'
      }
    ],
    quiz: {
      id: 'q302',
      questionCount: 8
    },
    tasks: [
      {
        title: 'İçerik Takvimi Oluşturma',
        description: 'Belirlediğiniz bir marka için 1 haftalık sosyal medya içerik takvimi oluşturun (en az 3 platform).',
        deliverable: 'Sosyal medya içerik takvimi'
      },
      {
        title: 'Sosyal Medya Gönderisi Tasarlama',
        description: 'Seçtiğiniz bir platform için 3 farklı sosyal medya gönderisi (metin ve görsel/video) tasarlayın.',
        deliverable: 'Gönderi metinleri ve görselleri/video linkleri'
      }
    ]
  },
  {
    id: '303',
    levelId: '3',
    order: 3,
    title: 'Topluluk Yönetimi ve Etkileşim',
    description: 'Sosyal medyada marka topluluğu oluşturma, yönetme ve takipçilerle etkileşim kurma stratejileri.',
    longDescription: `Sosyal medya sadece içerik yayınlamakla ilgili değildir; aynı zamanda takipçilerinizle iki yönlü bir iletişim kurmak ve sadık bir topluluk oluşturmaktır. Bu görevde, yorumlara ve mesajlara yanıt verme, tartışmaları yönetme, kriz iletişimi ve marka savunucuları oluşturma konularını öğreneceksiniz.

Bu görev kapsamında:
- Topluluk yönetimi nedir ve neden önemlidir?
- Takipçilerle etkileşim kurma yöntemleri (soru sorma, anketler, yarışmalar vb.)
- Yorum ve mesaj yönetimi
- Negatif geri bildirimlerle başa çıkma
- Sosyal medya kriz yönetimi
- Marka elçileri ve savunucuları oluşturma

konularını detaylı olarak ele alacağız.`,
    deadline: '04.07.2025',
    status: 'Henüz Başlanmadı',
    points: 250,
    duration: '180 dakika',
    requiredTasks: ['301', '302'],
    resources: [
      {
        type: 'article',
        title: 'Sosyal Medyada Topluluk Yönetimi Rehberi',
        url: '/resources/social-media-community-management.pdf'
      },
      {
        type: 'video',
        title: 'Sosyal Medyada Etkileşim Nasıl Artırılır?',
        url: 'https://www.youtube.com/watch?v=example11'
      },
      {
        type: 'case-study',
        title: 'Başarılı Topluluk Yönetimi Örnekleri',
        url: '/resources/community-management-case-studies.pdf'
      }
    ],
    quiz: {
      id: 'q303',
      questionCount: 8
    },
    tasks: [
      {
        title: 'Etkileşim Stratejisi Geliştirme',
        description: 'Belirlediğiniz bir marka için takipçi etkileşimini artırmaya yönelik bir strateji planı oluşturun.',
        deliverable: 'Etkileşim stratejisi planı'
      },
      {
        title: 'Kriz Senaryosu Yanıtı',
        description: 'Verilen bir sosyal medya kriz senaryosuna nasıl yanıt vereceğinizi adım adım açıklayın.',
        deliverable: 'Kriz yanıt planı'
      }
    ]
  },
  {
    id: '304',
    levelId: '3',
    order: 4,
    title: 'Sosyal Medya Reklamcılığı',
    description: 'Facebook, Instagram gibi platformlarda ücretli reklam kampanyaları oluşturma ve yönetme.',
    longDescription: `Sosyal medya reklamları, hedef kitlenize daha hızlı ve doğrudan ulaşmanın etkili bir yoludur. Bu görevde, popüler sosyal medya reklam platformlarının (özellikle Facebook ve Instagram) temellerini, reklam formatlarını, hedefleme seçeneklerini ve kampanya optimizasyonunu öğreneceksiniz.

Bu görev kapsamında:
- Sosyal medya reklamcılığının temelleri ve avantajları
- Facebook Business Manager (Meta Business Suite) kullanımı
- Reklam hedefleri belirleme (Bilinirlik, Etkileşim, Dönüşüm vb.)
- Hedef kitle oluşturma ve segmentasyon (Demografi, İlgi Alanları, Davranışlar)
- Reklam formatları (Görsel, Video, Carousel, Hikaye Reklamları vb.)
- Bütçe ve teklif stratejileri
- A/B testi ve kampanya optimizasyonu
- Reklam performansı ölçümleme ve raporlama

konularını detaylı olarak ele alacağız.`,
    deadline: '11.07.2025',
    status: 'Henüz Başlanmadı',
    points: 400,
    duration: '240 dakika',
    requiredTasks: ['301', '302'],
    resources: [
      {
        type: 'article',
        title: 'Facebook ve Instagram Reklamcılığına Başlangıç Rehberi',
        url: '/resources/facebook-instagram-ads-guide.pdf'
      },
      {
        type: 'video',
        title: 'Facebook Reklam Yöneticisi Kullanımı',
        url: 'https://www.youtube.com/watch?v=example12'
      },
      {
        type: 'tool',
        title: 'Meta Business Suite',
        url: 'https://business.facebook.com/'
      }
    ],
    quiz: {
      id: 'q304',
      questionCount: 12
    },
    tasks: [
      {
        title: 'Reklam Kampanyası Planı Oluşturma',
        description: 'Hayali bir ürün lansmanı için Facebook/Instagram reklam kampanyası planı oluşturun (Hedef, Kitle, Bütçe, Reklam Formatı).',
        deliverable: 'Reklam kampanyası planı'
      },
      {
        title: 'Reklam Metni ve Görseli Hazırlama',
        description: 'Oluşturduğunuz kampanya planı için 2 farklı reklam metni ve görseli/videosu hazırlayın.',
        deliverable: 'Reklam metinleri ve görselleri/video linkleri'
      },
      {
        title: 'Hedef Kitle Tanımlama',
        description: 'Belirli bir ürün veya hizmet için Facebook Ads\'de kullanılabilecek 3 farklı hedef kitle segmenti tanımlayın.',
        deliverable: 'Hedef kitle tanımları'
      }
    ]
  },
  {
    id: '305',
    levelId: '3',
    order: 5,
    title: 'Sosyal Medya Analizi ve Raporlama',
    description: 'Sosyal medya çabalarınızın performansını ölçme, analiz etme ve raporlama yöntemleri.',
    longDescription: `Sosyal medya stratejinizin ne kadar etkili olduğunu anlamak için performansı düzenli olarak ölçmeniz ve analiz etmeniz gerekir. Bu görevde, önemli sosyal medya metriklerini, analiz araçlarını ve etkili raporlama tekniklerini öğreneceksiniz.

Bu görev kapsamında:
- Önemli sosyal medya metrikleri (Erişim, Etkileşim Oranı, Tıklama Oranı, Dönüşüm Oranı vb.)
- Platform içi analiz araçları (Facebook Insights, Instagram Insights vb.)
- Üçüncü parti sosyal medya analiz araçları (Hootsuite Analytics, Buffer Analyze vb.)
- Veri görselleştirme ve raporlama
- ROI (Yatırım Getirisi) hesaplama
- Analiz sonuçlarına göre strateji optimizasyonu

konularını detaylı olarak ele alacağız.`,
    deadline: '18.07.2025',
    status: 'Henüz Başlanmadı',
    points: 500,
    duration: '210 dakika',
    requiredTasks: ['301', '302', '303', '304'],
    resources: [
      {
        type: 'article',
        title: 'Sosyal Medya Performansı Nasıl Ölçülür?',
        url: '/resources/social-media-analytics-guide.pdf'
      },
      {
        type: 'video',
        title: 'Sosyal Medya Raporu Nasıl Hazırlanır?',
        url: 'https://www.youtube.com/watch?v=example13'
      },
      {
        type: 'template',
        title: 'Sosyal Medya Rapor Şablonu',
        url: '/resources/social-media-report-template.pptx'
      }
    ],
    quiz: {
      id: 'q305',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Performans Raporu Oluşturma',
        description: 'Verilen sosyal medya verilerini kullanarak 1 aylık performans raporu hazırlayın.',
        deliverable: 'Sosyal medya performans raporu'
      },
      {
        title: 'Metrik Analizi',
        description: 'Bir sosyal medya kampanyasının metriklerini analiz edin ve iyileştirme önerileri sunun.',
        deliverable: 'Metrik analiz ve öneri raporu'
      }
    ]
  }
]; // Added closing bracket and semicolon

export default tasksLevel3;