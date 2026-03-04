// Digital Marketing Levels
export const levels = [
  {
    id: '1',
    order: 1,
    title: 'Temel Kavramlar',
    subtitle: 'Dijital pazarlama temelleri ve kavramlarını öğrenin',
    description: 'Bu seviyede dijital pazarlamanın temel kavramlarını, tarihçesini ve genel stratejileri öğreneceksiniz. Pazarlama ekosistemine genel bir bakış ile başlayacak ve dijital pazarlamanın temel unsurlarını keşfedeceksiniz.',
    image: '/images/levels/level1.jpg',
    totalTasks: 5,
    points: 1000,
    requirements: [],
    color: '#4CAF50',
    topics: [
      'Dijital Pazarlama Temelleri',
      'Pazarlama Terminolojisi',
      'Hedef Kitle Analizi',
      'Dijital Pazarlama Kanalları',
      'Marka Stratejisi'
    ],
    outcomes: [
      'Dijital pazarlamanın temel kavramlarını açıklayabilme',
      'Pazarlama terminolojisini anlama ve kullanabilme',
      'Hedef kitle analizi yapabilme',
      'Dijital pazarlama kanallarını tanıma',
      'Basit bir marka stratejisi oluşturabilme'
    ]
  },
  {
    id: '2',
    order: 2,
    title: 'SEO Temelleri',
    subtitle: 'Arama Motoru Optimizasyonu\'nun temellerini öğrenin',
    description: 'Bu seviyede SEO\'nun temel prensiplerini, arama motorlarının çalışma mantığını ve web sitelerinizi arama sonuçlarında üst sıralara taşıyacak stratejileri öğreneceksiniz. Anahtar kelime araştırması, on-page SEO ve teknik SEO konularını ele alacağız.',
    image: '/images/levels/level2.jpg',
    totalTasks: 5,
    points: 1200,
    requirements: ['1'],
    color: '#2196F3',
    topics: [
      'SEO\'ya Giriş',
      'Anahtar Kelime Araştırması',
      'On-Page SEO',
      'Off-Page SEO',
      'Teknik SEO',
    ],
    outcomes: [
      'SEO\'nun temel prensiplerini anlama',
      'Anahtar kelime araştırması yapabilme',
      'Web sayfalarını SEO için optimize edebilme',
      'Backlink stratejisi oluşturabilme',
      'Temel teknik SEO uygulamalarını anlama'
    ]
  },
  {
    id: '3',
    order: 3,
    title: 'Sosyal Medya Pazarlaması',
    subtitle: 'Etkili sosyal medya stratejileri geliştirin',
    description: 'Bu seviyede sosyal medya platformlarını etkili bir şekilde kullanmayı, içerik stratejileri geliştirmeyi ve sosyal medya kampanyaları oluşturmayı öğreneceksiniz. Farklı sosyal medya platformlarının özellikleri ve hedef kitleye uygun içerik oluşturma stratejileri üzerinde duracağız.',
    image: '/images/levels/level3.jpg',
    totalTasks: 5,
    points: 1500,
    requirements: ['1', '2'],
    color: '#9C27B0',
    topics: [
      'Sosyal Medya Stratejisi',
      'İçerik Oluşturma',
      'Topluluk Yönetimi',
      'Sosyal Medya Reklamcılığı',
      'Sosyal Medya Analizi'
    ],
    outcomes: [
      'Kapsamlı bir sosyal medya stratejisi oluşturabilme',
      'Farklı platformlara uygun içerik üretebilme',
      'Sosyal medya topluluğunu yönetebilme',
      'Sosyal medya reklamları oluşturabilme',
      'Sosyal medya performansını analiz edebilme'
    ]
  },
  {
    id: '4',
    order: 4,
    title: 'İçerik Pazarlaması',
    subtitle: 'Etkili içerik stratejileri ve içerik üretimi',
    description: 'Bu seviyede içerik pazarlamasının temellerini, içerik stratejisi oluşturmayı ve farklı içerik türlerini üretmeyi öğreneceksiniz. İçerik planlaması, oluşturma, dağıtım ve analiz konularını detaylı olarak ele alacağız.',
    image: '/images/levels/level4.jpg',
    totalTasks: 5,
    points: 1500,
    requirements: ['1', '2', '3'],
    color: '#FF9800',
    topics: [
      'İçerik Stratejisi',
      'Blog Yazarlığı',
      'Video İçerik Üretimi',
      'İnfografik ve Görsel İçerik',
      'İçerik Dağıtımı'
    ],
    outcomes: [
      'İçerik stratejisi oluşturabilme',
      'SEO odaklı blog yazıları yazabilme',
      'Temel video içerikleri üretebilme',
      'İnfografik ve görsel içerikler hazırlayabilme',
      'İçerik dağıtım stratejilerini uygulayabilme'
    ]
  },
  {
    id: '5',
    order: 5,
    title: 'E-posta Pazarlaması',
    subtitle: 'Etkili e-posta kampanyaları oluşturun',
    description: 'Bu seviyede e-posta pazarlamasının temellerini, liste oluşturmayı, e-posta kampanyaları tasarlamayı ve performans analizini öğreneceksiniz. E-posta otomasyonu, segmentasyon ve A/B testleri konularını detaylı olarak ele alacağız.',
    image: '/images/levels/level5.jpg',
    totalTasks: 5,
    points: 1300,
    requirements: ['1', '4'],
    color: '#E91E63',
    topics: [
      'E-posta Listesi Oluşturma',
      'E-posta Kampanyası Tasarımı',
      'E-posta Otomasyonu',
      'Segmentasyon ve Kişiselleştirme',
      'E-posta Analizi'
    ],
    outcomes: [
      'E-posta listesi oluşturma stratejileri geliştirebilme',
      'Etkili e-posta kampanyaları tasarlayabilme',
      'E-posta otomasyon akışları oluşturabilme',
      'Hedef kitleyi segmentlere ayırabilme',
      'E-posta kampanyalarının performansını analiz edebilme'
    ]
  },
  {
    id: '6',
    order: 6,
    title: 'Ücretli Reklamcılık',
    subtitle: 'Dijital reklam kampanyaları yönetin',
    description: 'Bu seviyede dijital reklam platformlarını, reklam kampanyaları oluşturmayı, hedefleme seçeneklerini ve reklam performans analizini öğreneceksiniz. Google Ads, Facebook Ads ve diğer reklam platformlarını detaylı olarak inceleyeceğiz.',
    image: '/images/levels/level6.jpg',
    totalTasks: 5,
    points: 1700,
    requirements: ['1', '2', '3'],
    color: '#F44336',
    topics: [
      'Google Ads',
      'Facebook ve Instagram Ads',
      'Reklam Stratejisi ve Hedefleme',
      'Reklam Metrikleri ve ROI',
      'Yeniden Pazarlama'
    ],
    outcomes: [
      'Google Ads kampanyaları oluşturabilme',
      'Facebook ve Instagram Ads kampanyaları yönetebilme',
      'Etkili reklam stratejileri geliştirebilme',
      'Reklam performansını analiz edebilme',
      'Yeniden pazarlama kampanyaları oluşturabilme'
    ]
  },
  {
    id: '7',
    order: 7,
    title: 'Analitik ve Ölçümleme',
    subtitle: 'Dijital pazarlama performansını analiz edin',
    description: 'Bu seviyede dijital pazarlama analitiğinin temellerini, metrikleri, raporlamayı ve veri odaklı karar vermeyi öğreneceksiniz. Google Analytics, dönüşüm izleme ve ROI hesaplama konularını detaylı olarak ele alacağız.',
    image: '/images/levels/level7.jpg',
    totalTasks: 5,
    points: 1600,
    requirements: ['1', '2', '3', '4', '5', '6'],
    color: '#795548',
    topics: [
      'Google Analytics',
      'Dönüşüm İzleme',
      'Önemli Performans Göstergeleri (KPI)',
      'Raporlama ve Dashboard Oluşturma',
      'Veri Odaklı Karar Verme'
    ],
    outcomes: [
      'Google Analytics\'i etkili kullanabilme',
      'Dönüşüm izleme sistemleri kurabilme',
      'KPI\'ları belirleme ve takip edebilme',
      'Kapsamlı pazarlama raporları hazırlayabilme',
      'Veri odaklı pazarlama kararları alabilme'
    ]
  },
  {
    id: '8',
    order: 8,
    title: 'Dijital Pazarlama Stratejisi',
    subtitle: 'Kapsamlı dijital pazarlama stratejileri oluşturun',
    description: 'Bu son seviyede, tüm dijital pazarlama kanallarını entegre eden kapsamlı bir dijital pazarlama stratejisi oluşturmayı öğreneceksiniz. Bütçe planlama, kanal entegrasyonu ve performans optimizasyonu konularını ele alacağız.',
    image: '/images/levels/level8.jpg',
    totalTasks: 5,
    points: 2000,
    requirements: ['1', '2', '3', '4', '5', '6', '7'],
    color: '#607D8B',
    topics: [
      'Entegre Dijital Pazarlama Stratejisi',
      'Bütçe Planlama ve Kaynak Tahsisi',
      'Kanal Entegrasyonu',
      'Kriz Yönetimi',
      'Gelecek Trendleri'
    ],
    outcomes: [
      'Kapsamlı dijital pazarlama stratejisi oluşturabilme',
      'Dijital pazarlama bütçesi planlayabilme',
      'Farklı pazarlama kanallarını entegre edebilme',
      'Dijital pazarlama krizlerini yönetebilme',
      'Dijital pazarlama trendlerini takip edebilme'
    ]
  }
]; 