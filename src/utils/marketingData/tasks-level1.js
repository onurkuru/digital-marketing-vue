// Tasks for Level 1: Digital Marketing Basics
export const tasksLevel1 = [
  {
    id: '101',
    levelId: '1',
    order: 1,
    title: 'Dijital Pazarlamaya Giriş',
    description: 'Dijital pazarlamanın temel kavramlarını, tarihçesini ve geleneksel pazarlamadan farkını öğrenin.',
    longDescription: `Dijital pazarlama, işletmelerin ürün ve hizmetlerini çevrimiçi kanallarda tanıtmak ve satmak için kullandıkları stratejilerin bütünüdür. Bu görevde dijital pazarlamanın ne olduğunu, nasıl geliştiğini ve geleneksel pazarlamadan nasıl ayrıldığını inceleyeceğiz.

Bu görev kapsamında:
- Dijital pazarlamanın tanımı ve kapsamı
- Dijital pazarlamanın kısa tarihçesi
- Geleneksel pazarlama ile dijital pazarlama arasındaki temel farklar
- Dijital pazarlamanın avantajları ve zorlukları
- Dijital pazarlama ekosistemi ve temel kanallar

konularını detaylı olarak ele alacağız.`,
    deadline: '15.04.2025',
    status: 'Henüz Başlanmadı',
    points: 100,
    duration: '120 dakika',
    requiredTasks: [],
    resources: [
      {
        type: 'article',
        title: 'Dijital Pazarlamanın Temelleri',
        url: '/resources/digital-marketing-basics.pdf'
      },
      {
        type: 'video',
        title: 'Dijital Pazarlamaya Giriş',
        url: 'https://www.youtube.com/watch?v=example1'
      },
      {
        type: 'infographic',
        title: 'Dijital vs Geleneksel Pazarlama',
        url: '/resources/digital-vs-traditional.jpg'
      }
    ],
    quiz: {
      id: 'q101',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Dijital Pazarlama Nedir?',
        description: 'Dijital pazarlamanın tanımını ve kapsamını araştırın ve kendi cümlelerinizle açıklayın.',
        deliverable: 'En az 300 kelimelik bir yazı'
      },
      {
        title: 'Vaka İncelemesi',
        description: 'Başarılı bir dijital pazarlama kampanyası örneği bulun ve analiz edin.',
        deliverable: 'Vaka incelemesi raporu'
      }
    ]
  },
  {
    id: '102',
    levelId: '1',
    order: 2,
    title: 'Dijital Pazarlama Terminolojisi',
    description: 'Dijital pazarlama alanında sık kullanılan terimleri ve kavramları öğrenin.',
    longDescription: `Dijital pazarlama dünyasında başarılı olmak için, alandaki jargona ve terminolojiye hakim olmak önemlidir. Bu görevde, dijital pazarlama alanında yaygın olarak kullanılan terimleri ve kavramları öğreneceksiniz.

Bu görev kapsamında:
- SEO, SEM, CPC, CPM, CTR gibi temel kısaltmalar
- Conversion, lead, funnel, landing page gibi temel kavramlar
- KPI, ROI, ROAS gibi ölçümleme terimleri
- Organik ve ücretli trafik kavramları
- Dijital pazarlama araçları ve platformları ile ilgili terimler

konularını detaylı olarak ele alacağız.`,
    deadline: '20.04.2025',
    status: 'Henüz Başlanmadı',
    points: 150,
    duration: '150 dakika',
    requiredTasks: ['101'],
    resources: [
      {
        type: 'article',
        title: 'Dijital Pazarlama Terimleri Sözlüğü',
        url: '/resources/digital-marketing-glossary.pdf'
      },
      {
        type: 'infographic',
        title: 'Dijital Pazarlama Terimleri İnfografiği',
        url: '/resources/terminology-infographic.jpg'
      },
      {
        type: 'quiz',
        title: 'Dijital Pazarlama Terimleri Quiz',
        url: '/quizzes/terminology-quiz'
      }
    ],
    quiz: {
      id: 'q102',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Terim Kartları Oluşturma',
        description: 'En az 20 önemli dijital pazarlama terimini açıklayan dijital kartlar oluşturun.',
        deliverable: 'Dijital terim kartları'
      },
      {
        title: 'Kendi Sözlüğünüzü Oluşturun',
        description: 'Dijital pazarlama alanında en çok kullanılan 50 terimi içeren kişisel bir sözlük oluşturun.',
        deliverable: 'Dijital pazarlama terimleri sözlüğü'
      }
    ]
  },
  {
    id: '103',
    levelId: '1',
    order: 3,
    title: 'Hedef Kitle Analizi',
    description: 'Dijital pazarlama stratejileri için hedef kitle belirleme ve analiz etme tekniklerini öğrenin.',
    longDescription: `Etkili bir dijital pazarlama stratejisi oluşturmanın en önemli adımlarından biri, hedef kitlenizi doğru bir şekilde tanımlamak ve anlamaktır. Bu görevde, hedef kitle analizi yapma, persona oluşturma ve hedef kitleye uygun mesajlar geliştirme konularını ele alacağız.

Bu görev kapsamında:
- Hedef kitle analizi nedir ve neden önemlidir?
- Demografik, psikografik ve davranışsal segmentasyon
- Müşteri personası oluşturma
- Hedef kitleyi anlamak için kullanılan araçlar ve teknikler
- Hedef kitle analizinin pazarlama stratejisine etkisi

konularını detaylı olarak ele alacağız.`,
    deadline: '25.04.2025',
    status: 'Henüz Başlanmadı',
    points: 200,
    duration: '180 dakika',
    requiredTasks: ['101', '102'],
    resources: [
      {
        type: 'article',
        title: 'Etkili Hedef Kitle Analizi Nasıl Yapılır?',
        url: '/resources/target-audience-analysis.pdf'
      },
      {
        type: 'template',
        title: 'Müşteri Persona Şablonu',
        url: '/resources/customer-persona-template.docx'
      },
      {
        type: 'video',
        title: 'Hedef Kitle Analizi Teknikleri',
        url: 'https://www.youtube.com/watch?v=example2'
      }
    ],
    quiz: {
      id: 'q103',
      questionCount: 8
    },
    tasks: [
      {
        title: 'Müşteri Personası Oluşturma',
        description: 'Seçtiğiniz bir ürün veya hizmet için en az 3 farklı müşteri personası oluşturun.',
        deliverable: 'Müşteri persona dokümanları'
      },
      {
        title: 'Hedef Kitle Araştırması',
        description: 'Belirlediğiniz hedef kitle için pazar araştırması yapın ve bulguları raporlayın.',
        deliverable: 'Hedef kitle araştırma raporu'
      }
    ]
  },
  {
    id: '104',
    levelId: '1',
    order: 4,
    title: 'Dijital Pazarlama Kanalları',
    description: 'Farklı dijital pazarlama kanallarını, özelliklerini ve kullanım alanlarını öğrenin.',
    longDescription: `Dijital pazarlama, çeşitli çevrimiçi kanallar aracılığıyla hedef kitlenize ulaşmanızı sağlar. Bu görevde, temel dijital pazarlama kanallarını, her birinin avantajlarını, dezavantajlarını ve en etkili kullanım alanlarını inceleyeceğiz.

Bu görev kapsamında:
- SEO (Arama Motoru Optimizasyonu)
- SEM (Arama Motoru Pazarlaması)
- Sosyal Medya Pazarlaması
- E-posta Pazarlaması
- İçerik Pazarlaması
- Etkileyici Pazarlaması
- Display Reklamcılık
- Video Pazarlama
- Mobil Pazarlama

kanallarını detaylı olarak ele alacağız.`,
    deadline: '01.05.2025',
    status: 'Henüz Başlanmadı',
    points: 250,
    duration: '210 dakika',
    requiredTasks: ['101', '102'],
    resources: [
      {
        type: 'article',
        title: 'Dijital Pazarlama Kanalları Rehberi',
        url: '/resources/digital-marketing-channels.pdf'
      },
      {
        type: 'infographic',
        title: 'Dijital Pazarlama Kanalları Karşılaştırması',
        url: '/resources/channels-comparison.jpg'
      },
      {
        type: 'case-study',
        title: 'Çok Kanallı Pazarlama Başarı Hikayeleri',
        url: '/resources/multichannel-success-stories.pdf'
      }
    ],
    quiz: {
      id: 'q104',
      questionCount: 12
    },
    tasks: [
      {
        title: 'Kanal Analizi',
        description: 'Belirlediğiniz bir sektör için en etkili olabilecek 3 dijital pazarlama kanalını analiz edin.',
        deliverable: 'Kanal analiz raporu'
      },
      {
        title: 'Kanal Stratejisi',
        description: 'Seçtiğiniz bir marka için çok kanallı dijital pazarlama stratejisi oluşturun.',
        deliverable: 'Çok kanallı pazarlama stratejisi'
      }
    ]
  },
  {
    id: '105',
    levelId: '1',
    order: 5,
    title: 'Marka Stratejisi ve Konumlandırma',
    description: 'Dijital dünyada marka stratejisi geliştirme ve etkili marka konumlandırma tekniklerini öğrenin.',
    longDescription: `Güçlü bir marka oluşturmak, dijital pazarlama çabalarınızın etkisini artırmanın en önemli yollarından biridir. Bu görevde, dijital dünyada marka stratejisi geliştirme, marka kimliği oluşturma ve etkili marka konumlandırma tekniklerini öğreneceksiniz.

Bu görev kapsamında:
- Marka nedir ve neden önemlidir?
- Marka kimliği unsurları (isim, logo, slogan, renk paleti, vb.)
- Marka sesi ve tonu belirleme
- Marka konumlandırma stratejileri
- Dijital kanallarda marka tutarlılığı sağlama
- Marka hikayesi anlatımı (storytelling)

konularını detaylı olarak ele alacağız.`,
    deadline: '08.05.2025',
    status: 'Henüz Başlanmadı',
    points: 300,
    duration: '240 dakika',
    requiredTasks: ['101', '102', '103', '104'],
    resources: [
      {
        type: 'article',
        title: 'Dijital Çağda Marka Oluşturma',
        url: '/resources/digital-branding.pdf'
      },
      {
        type: 'video',
        title: 'Etkili Marka Konumlandırma Stratejileri',
        url: 'https://www.youtube.com/watch?v=example3'
      },
      {
        type: 'template',
        title: 'Marka Stratejisi Şablonu',
        url: '/resources/brand-strategy-template.pptx'
      },
      {
        type: 'case-study',
        title: 'Başarılı Dijital Marka Hikayeleri',
        url: '/resources/successful-digital-brands.pdf'
      }
    ],
    quiz: {
      id: 'q105',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Marka Stratejisi Oluşturma',
        description: 'Hayali bir şirket için kapsamlı bir marka stratejisi ve kimliği oluşturun.',
        deliverable: 'Marka stratejisi dokümanı'
      },
      {
        title: 'Marka Rehberi Hazırlama',
        description: 'Oluşturduğunuz marka için kullanım rehberi (brand guidelines) hazırlayın.',
        deliverable: 'Marka kullanım rehberi'
      },
      {
        title: 'Dijital Varlık Analizi',
        description: 'Seçtiğiniz bir markanın dijital kanallardaki varlığını analiz edin ve iyileştirme önerileri sunun.',
        deliverable: 'Dijital marka analiz raporu'
      }
    ]
  }
];

export default tasksLevel1; 