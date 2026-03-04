// Tasks for Level 2: SEO Basics
export const tasksLevel2 = [
  {
    id: '201',
    levelId: '2',
    order: 1,
    title: 'SEO\'ya Giriş ve Temel Kavramlar',
    description: 'Arama Motoru Optimizasyonunun (SEO) temellerini, önemini ve arama motorlarının nasıl çalıştığını öğrenin.',
    longDescription: `SEO, web sitenizin arama motoru sonuç sayfalarında (SERP) daha görünür olmasını sağlayarak organik (ücretsiz) trafik çekme sürecidir. Bu görevde SEO\'nun neden önemli olduğunu, Google gibi arama motorlarının web sitelerini nasıl taradığını, dizine eklediğini ve sıraladığını anlayacaksınız.

Bu görev kapsamında:
- SEO\'nun tanımı ve dijital pazarlamadaki yeri
- Arama motorlarının çalışma prensipleri (Tarama, Dizine Ekleme, Sıralama)
- Organik arama sonuçları ve ücretli reklamlar arasındaki fark
- SEO\'nun işletmeler için önemi ve faydaları
- White hat vs. Black hat SEO teknikleri

konularını detaylı olarak ele alacağız.`,
    deadline: '15.05.2025',
    status: 'Henüz Başlanmadı',
    points: 120,
    duration: '120 dakika',
    requiredTasks: ['105'], // Requires completion of Level 1
    resources: [
      {
        type: 'article',
        title: 'SEO Nedir? Yeni Başlayanlar İçin Kapsamlı Rehber',
        url: '/resources/seo-nedir-rehber.pdf'
      },
      {
        type: 'video',
        title: 'Google Arama Nasıl Çalışır?',
        url: 'https://www.youtube.com/watch?v=example4'
      },
      {
        type: 'infographic',
        title: 'SEO Temel Kavramları',
        url: '/resources/seo-basics-infographic.jpg'
      }
    ],
    quiz: {
      id: 'q201',
      questionCount: 5
    },
    tasks: [
      {
        title: 'SEO\'nun Önemini Araştırın',
        description: 'SEO\'nun bir işletmenin online başarısı için neden kritik olduğunu açıklayan kısa bir makale yazın.',
        deliverable: 'En az 400 kelimelik bir makale'
      },
      {
        title: 'Arama Motoru Simülasyonu',
        description: 'Basit bir web sayfasının Google tarafından nasıl taranıp dizine eklenebileceğini adım adım açıklayın.',
        deliverable: 'Adım adım açıklama dokümanı'
      }
    ]
  },
  {
    id: '202',
    levelId: '2',
    order: 2,
    title: 'Anahtar Kelime Araştırması',
    description: 'Hedef kitlenizin arama motorlarında kullandığı terimleri (anahtar kelimeleri) bulma ve analiz etme sürecini öğrenin.',
    longDescription: `Anahtar kelime araştırması, başarılı bir SEO stratejisinin temel taşıdır. Kullanıcıların bilgi ararken veya ürün/hizmet ararken hangi kelimeleri ve ifadeleri kullandığını anlamanızı sağlar. Bu görevde, etkili anahtar kelime araştırması yapma tekniklerini ve araçlarını öğreneceksiniz.

Bu görev kapsamında:
- Anahtar kelime türleri (Short-tail, Long-tail, LSI)
- Anahtar kelime araştırma araçları (Google Keyword Planner, SEMrush, Ahrefs vb.)
- Anahtar kelime metrikleri (Arama Hacmi, Zorluk, Tıklama Başına Maliyet)
- Rakip anahtar kelime analizi
- Anahtar kelimeleri içerik stratejisine entegre etme

konularını detaylı olarak ele alacağız.`,
    deadline: '22.05.2025',
    status: 'Henüz Başlanmadı',
    points: 180,
    duration: '180 dakika',
    requiredTasks: ['201'],
    resources: [
      {
        type: 'article',
        title: 'Kapsamlı Anahtar Kelime Araştırması Nasıl Yapılır?',
        url: '/resources/keyword-research-guide.pdf'
      },
      {
        type: 'video',
        title: 'Anahtar Kelime Araştırma Araçları Kullanımı',
        url: 'https://www.youtube.com/watch?v=example5'
      },
      {
        type: 'template',
        title: 'Anahtar Kelime Araştırma Şablonu',
        url: '/resources/keyword-research-template.xlsx'
      }
    ],
    quiz: {
      id: 'q202',
      questionCount: 8
    },
    tasks: [
      {
        title: 'Anahtar Kelime Listesi Oluşturma',
        description: 'Belirlediğiniz bir niş veya sektör için en az 50 potansiyel anahtar kelime içeren bir liste oluşturun.',
        deliverable: 'Anahtar kelime listesi (Excel/Google Sheet)'
      },
      {
        title: 'Rakip Analizi',
        description: 'Bir rakip web sitesinin hangi anahtar kelimelerden trafik aldığını analiz edin ve raporlayın.',
        deliverable: 'Rakip anahtar kelime analiz raporu'
      }
    ]
  },
  {
    id: '203',
    levelId: '2',
    order: 3,
    title: 'On-Page SEO (Sayfa İçi SEO)',
    description: 'Web sayfalarınızın içeriğini ve HTML kodunu arama motorları için optimize etme tekniklerini öğrenin.',
    longDescription: `On-Page SEO, web sitenizin kendi sayfaları üzerinde yaptığınız optimizasyonları ifade eder. Bu, arama motorlarının içeriğinizi anlamasına ve kullanıcıların arama sorgularıyla eşleştirmesine yardımcı olur. Bu görevde, temel On-Page SEO faktörlerini ve uygulama yöntemlerini öğreneceksiniz.

Bu görev kapsamında:
- Başlık etiketleri (Title tags) optimizasyonu
- Meta açıklamalar (Meta descriptions) yazma
- Başlık hiyerarşisi (H1, H2, H3...) kullanımı
- İçerik optimizasyonu ve anahtar kelime kullanımı
- Görsel optimizasyonu (Alt text)
- Dahili ve harici bağlantılar (Internal & External linking)
- URL yapısı optimizasyonu

konularını detaylı olarak ele alacağız.`,
    deadline: '29.05.2025',
    status: 'Henüz Başlanmadı',
    points: 250,
    duration: '210 dakika',
    requiredTasks: ['201', '202'],
    resources: [
      {
        type: 'article',
        title: 'Sayfa İçi SEO (On-Page SEO) Rehberi',
        url: '/resources/on-page-seo-guide.pdf'
      },
      {
        type: 'checklist',
        title: 'On-Page SEO Kontrol Listesi',
        url: '/resources/on-page-seo-checklist.pdf'
      },
      {
        type: 'video',
        title: 'Pratik On-Page SEO Uygulamaları',
        url: 'https://www.youtube.com/watch?v=example6'
      }
    ],
    quiz: {
      id: 'q203',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Web Sayfası Optimizasyonu',
        description: 'Verilen bir web sayfasını On-Page SEO prensiplerine göre optimize edin ve değişiklikleri açıklayın.',
        deliverable: 'Optimize edilmiş sayfa içeriği ve açıklama raporu'
      },
      {
        title: 'Meta Açıklama Yazma',
        description: 'Belirlenen 5 farklı anahtar kelime için etkileyici ve tıklama oranını artıracak meta açıklamalar yazın.',
        deliverable: 'Meta açıklama metinleri'
      }
    ]
  },
  {
    id: '204',
    levelId: '2',
    order: 4,
    title: 'Off-Page SEO (Sayfa Dışı SEO)',
    description: 'Web sitenizin otoritesini ve güvenilirliğini artırmak için site dışında yapılan SEO çalışmalarını öğrenin.',
    longDescription: `Off-Page SEO, genellikle web sitenize başka sitelerden gelen bağlantılar (backlinkler) oluşturma sürecini ifade eder. Kaliteli backlinkler, arama motorlarına sitenizin güvenilir ve değerli olduğunu gösterir. Bu görevde, backlink oluşturma stratejilerini ve diğer Off-Page SEO faktörlerini inceleyeceğiz.

Bu görev kapsamında:
- Backlink nedir ve neden önemlidir?
- Kaliteli backlink özellikleri
- Backlink oluşturma stratejileri (Guest blogging, broken link building, outreach vb.)
- Sosyal medya sinyallerinin SEO\'ya etkisi
- Marka bilinirliği ve itibar yönetimi
- Yerel SEO ve Google My Business

konularını detaylı olarak ele alacağız.`,
    deadline: '05.06.2025',
    status: 'Henüz Başlanmadı',
    points: 300,
    duration: '240 dakika',
    requiredTasks: ['201', '202', '203'],
    resources: [
      {
        type: 'article',
        title: 'Sayfa Dışı SEO (Off-Page SEO) ve Link İnşası',
        url: '/resources/off-page-seo-link-building.pdf'
      },
      {
        type: 'video',
        title: 'Etkili Backlink Stratejileri',
        url: 'https://www.youtube.com/watch?v=example7'
      },
      {
        type: 'case-study',
        title: 'Başarılı Link İnşası Kampanyaları',
        url: '/resources/link-building-case-studies.pdf'
      }
    ],
    quiz: {
      id: 'q204',
      questionCount: 10
    },
    tasks: [
      {
        title: 'Backlink Analizi',
        description: 'Bir rakip web sitesinin backlink profilini analiz edin (araçlar kullanarak) ve raporlayın.',
        deliverable: 'Backlink analiz raporu'
      },
      {
        title: 'Link İnşası Stratejisi',
        description: 'Belirlediğiniz bir web sitesi için 3 farklı link inşası stratejisi geliştirin.',
        deliverable: 'Link inşası strateji planı'
      }
    ]
  },
  {
    id: '205',
    levelId: '2',
    order: 5,
    title: 'Teknik SEO',
    description: 'Web sitenizin arama motorları tarafından daha kolay taranmasını ve dizine eklenmesini sağlayan teknik optimizasyonları öğrenin.',
    longDescription: `Teknik SEO, web sitenizin altyapısı ve sunucu tarafındaki optimizasyonlarla ilgilidir. İyi bir teknik SEO, arama motorlarının sitenizi sorunsuz bir şekilde taramasına, anlamasına ve dizine eklemesine yardımcı olur. Bu görevde, temel teknik SEO konularını ele alacağız.

Bu görev kapsamında:
- Site hızı optimizasyonu
- Mobil uyumluluk (Mobile-friendliness)
- Site haritaları (Sitemaps)
- Robots.txt dosyası kullanımı
- SSL sertifikası ve HTTPS
- Yapılandırılmış veri (Structured data) ve Schema markup
- Site mimarisi ve gezinme (Navigation)
- Kırık linkler (Broken links) ve yönlendirmeler (Redirects)

konularını detaylı olarak ele alacağız.`,
    deadline: '12.06.2025',
    status: 'Henüz Başlanmadı',
    points: 350,
    duration: '240 dakika',
    requiredTasks: ['201', '202', '203'],
    resources: [
      {
        type: 'article',
        title: 'Teknik SEO Temelleri Rehberi',
        url: '/resources/technical-seo-basics.pdf'
      },
      {
        type: 'video',
        title: 'Web Sitesi Hızı Nasıl Optimize Edilir?',
        url: 'https://www.youtube.com/watch?v=example8'
      },
      {
        type: 'checklist',
        title: 'Teknik SEO Denetim Kontrol Listesi',
        url: '/resources/technical-seo-audit-checklist.pdf'
      },
      {
        type: 'tool',
        title: 'Google PageSpeed Insights',
        url: 'https://pagespeed.web.dev/'
      }
    ],
    quiz: {
      id: 'q205',
      questionCount: 12
    },
    tasks: [
      {
        title: 'Teknik SEO Denetimi',
        description: 'Verilen bir web sitesi için temel teknik SEO denetimi yapın ve bulgularınızı raporlayın.',
        deliverable: 'Teknik SEO denetim raporu'
      },
      {
        title: 'Site Haritası Oluşturma',
        description: 'Basit bir web sitesi için XML site haritası oluşturun.',
        deliverable: 'XML site haritası dosyası'
      },
      {
        title: 'Robots.txt Analizi',
        description: 'Bir web sitesinin robots.txt dosyasını inceleyin ve hangi sayfaların taranmasının engellendiğini açıklayın.',
        deliverable: 'Robots.txt analiz raporu'
      }
    ]
  }
];

export default tasksLevel2; 