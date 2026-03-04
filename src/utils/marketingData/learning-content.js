import { levels } from './levels';
import tasksLevel1 from './tasks-level1';
import tasksLevel2 from './tasks-level2';
import tasksLevel3 from './tasks-level3';
import tasksLevel4 from './tasks-level4';
import tasksLevel5 from './tasks-level5';

const tasksLevel6 = [
  {
    id: '601',
    levelId: '6',
    order: 1,
    title: 'Google Ads Kampanya Temelleri',
    description: 'Arama ağı kampanyası kurulumunu, hedeflemeyi ve teklif stratejilerini öğrenin.',
    longDescription: 'Bu görevde Google Ads arama ağı kampanyası kurulumunu uçtan uca ele alacaksınız. Anahtar kelime eşleme türleri, teklif stratejileri, reklam metni yazımı ve kalite puanı gibi temel kavramları uygulamalı öğreneceksiniz.',
    deadline: '10.03.2026',
    status: 'Henüz Başlanmadı',
    points: 180,
    duration: '150 dakika',
    requiredTasks: ['505'],
    resources: [
      {
        type: 'article',
        title: 'Google Ads Arama Ağı Başlangıç Rehberi',
        url: '#'
      },
      {
        type: 'video',
        title: 'Kalite Puanı ve Reklam Sıralaması',
        url: '#'
      }
    ],
    quiz: {
      id: 'q601',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Kampanya Kurulumu',
        description: 'Örnek bir ürün için arama ağı kampanyası kurun.',
        deliverable: 'Kampanya kurulum ekran görüntüleri'
      },
      {
        title: 'Reklam Metni Yazımı',
        description: '3 farklı reklam grubu için başlık ve açıklama yazın.',
        deliverable: 'Reklam metni dokümanı'
      }
    ]
  },
  {
    id: '602',
    levelId: '6',
    order: 2,
    title: 'Meta Ads Hedefleme ve Kreatif',
    description: 'Meta reklamlarında hedef kitle, kreatif formatı ve kampanya hedefi seçimini öğrenin.',
    longDescription: 'Bu görevde Meta reklam yöneticisinde kampanya hedeflerinin nasıl seçildiğini, ilgi alanı ve lookalike hedefleme ile dönüşüm odaklı kreatif üretimini öğreneceksiniz.',
    deadline: '17.03.2026',
    status: 'Henüz Başlanmadı',
    points: 200,
    duration: '170 dakika',
    requiredTasks: ['601'],
    resources: [
      {
        type: 'article',
        title: 'Meta Ads Kampanya Hedefleri',
        url: '#'
      },
      {
        type: 'template',
        title: 'Reklam Kreatif Brief Şablonu',
        url: '#'
      }
    ],
    quiz: {
      id: 'q602',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Hedef Kitle Segmentleri',
        description: 'En az 3 farklı hedef kitle segmenti tanımlayın.',
        deliverable: 'Hedef kitle planı'
      },
      {
        title: 'Kreatif Test Planı',
        description: '2 görsel ve 2 metin varyasyonu için A/B planı oluşturun.',
        deliverable: 'A/B test matrisi'
      }
    ]
  },
  {
    id: '603',
    levelId: '6',
    order: 3,
    title: 'Bütçe ve Teklif Optimizasyonu',
    description: 'Kampanya bütçesi, teklif stratejisi ve maliyet optimizasyonunu yönetin.',
    longDescription: 'Bu görevde günlük/ömür boyu bütçe yönetimi, teklif stratejileri ve CPA/ROAS hedefleriyle optimizasyon süreçlerini uygulayacaksınız.',
    deadline: '24.03.2026',
    status: 'Henüz Başlanmadı',
    points: 220,
    duration: '180 dakika',
    requiredTasks: ['602'],
    resources: [
      {
        type: 'article',
        title: 'Teklif Stratejileri Karşılaştırması',
        url: '#'
      },
      {
        type: 'checklist',
        title: 'Haftalık Reklam Optimizasyon Kontrol Listesi',
        url: '#'
      }
    ],
    quiz: {
      id: 'q603',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Bütçe Dağılımı',
        description: '3 kampanya için bütçe dağılım planı oluşturun.',
        deliverable: 'Bütçe plan tablosu'
      },
      {
        title: 'Teklif Simülasyonu',
        description: 'Farklı teklif stratejilerinin sonuçlarını karşılaştırın.',
        deliverable: 'Karşılaştırma raporu'
      }
    ]
  },
  {
    id: '604',
    levelId: '6',
    order: 4,
    title: 'Remarketing Kurgusu',
    description: 'Yeniden pazarlama segmentleri ve çok adımlı reklam akışlarını tasarlayın.',
    longDescription: 'Bu görevde siteyi ziyaret eden ancak dönüşmeyen kullanıcılar için remarketing segmentleri, frekans yönetimi ve yaratıcı mesaj kurgusu oluşturacaksınız.',
    deadline: '31.03.2026',
    status: 'Henüz Başlanmadı',
    points: 240,
    duration: '190 dakika',
    requiredTasks: ['603'],
    resources: [
      {
        type: 'article',
        title: 'Remarketing Strateji Rehberi',
        url: '#'
      },
      {
        type: 'video',
        title: 'Dönüşüm Hunisinde Remarketing',
        url: '#'
      }
    ],
    quiz: {
      id: 'q604',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Segment Tasarımı',
        description: 'En az 4 remarketing segmenti tanımlayın.',
        deliverable: 'Segment şeması'
      },
      {
        title: 'Mesaj Akışı',
        description: 'Segment bazlı 3 aşamalı reklam mesajı kurgulayın.',
        deliverable: 'Mesaj akış dokümanı'
      }
    ]
  },
  {
    id: '605',
    levelId: '6',
    order: 5,
    title: 'Ücretli Reklam Performans Raporu',
    description: 'Kampanya sonuçlarını KPI bazlı analiz ederek aksiyon planı çıkarın.',
    longDescription: 'Bu görevde CPC, CTR, CPA, ROAS gibi metrikleri okuyacak ve bir haftalık aksiyon planı hazırlayacaksınız.',
    deadline: '07.04.2026',
    status: 'Henüz Başlanmadı',
    points: 260,
    duration: '200 dakika',
    requiredTasks: ['604'],
    resources: [
      {
        type: 'template',
        title: 'Reklam Performans Dashboard Şablonu',
        url: '#'
      },
      {
        type: 'article',
        title: 'ROAS ve CPA Yorumlama Rehberi',
        url: '#'
      }
    ],
    quiz: {
      id: 'q605',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Aylık Rapor',
        description: 'Kampanya sonuçlarını KPI bazında raporlayın.',
        deliverable: 'Sunum + dashboard'
      },
      {
        title: 'Aksiyon Planı',
        description: 'Sonuçlara göre 30 günlük optimizasyon planı hazırlayın.',
        deliverable: 'Aksiyon plan dokümanı'
      }
    ]
  }
];

const tasksLevel7 = [
  {
    id: '701',
    levelId: '7',
    order: 1,
    title: 'GA4 Ölçümleme Mimarisi',
    description: 'GA4 kurulum, event modeli ve temel ölçümleme planını oluşturun.',
    longDescription: 'Bu görevde GA4 event yapısını, önerilen event isimlendirmelerini ve dönüşüm hedeflerini planlayacaksınız.',
    deadline: '14.04.2026',
    status: 'Henüz Başlanmadı',
    points: 180,
    duration: '150 dakika',
    requiredTasks: ['605'],
    resources: [
      {
        type: 'article',
        title: 'GA4 Event Planlama Rehberi',
        url: '#'
      },
      {
        type: 'template',
        title: 'Ölçüm Planı Şablonu',
        url: '#'
      }
    ],
    quiz: {
      id: 'q701',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Event Envanteri',
        description: 'Ana kullanıcı aksiyonları için event listesi çıkarın.',
        deliverable: 'Event tablosu'
      },
      {
        title: 'Dönüşüm Tanımı',
        description: 'En az 3 dönüşüm hedefi tanımlayın.',
        deliverable: 'Dönüşüm tanım dokümanı'
      }
    ]
  },
  {
    id: '702',
    levelId: '7',
    order: 2,
    title: 'UTM ve Kanal Takibi',
    description: 'Kampanya linkleri için standart UTM yapısı ve kanal takibi geliştirin.',
    longDescription: 'Bu görevde tutarlı UTM parametre yapısı kurarak kanal raporlamasında veri kalitesini artıracaksınız.',
    deadline: '21.04.2026',
    status: 'Henüz Başlanmadı',
    points: 200,
    duration: '160 dakika',
    requiredTasks: ['701'],
    resources: [
      {
        type: 'article',
        title: 'UTM Parametre Standartları',
        url: '#'
      },
      {
        type: 'checklist',
        title: 'Kampanya Link Kontrol Listesi',
        url: '#'
      }
    ],
    quiz: {
      id: 'q702',
      questionCount: 5
    },
    tasks: [
      {
        title: 'UTM Naming Guide',
        description: 'Organizasyonunuz için UTM isimlendirme standardı yazın.',
        deliverable: 'Naming guide dokümanı'
      },
      {
        title: 'Kampanya Etiketleme',
        description: 'En az 10 kampanya linkini standartlara göre etiketleyin.',
        deliverable: 'Etiketlenmiş URL listesi'
      }
    ]
  },
  {
    id: '703',
    levelId: '7',
    order: 3,
    title: 'KPI ve Funnel Analizi',
    description: 'Pazarlama funnel metriklerini belirleyip darboğaz analizi yapın.',
    longDescription: 'Bu görevde awareness, consideration ve conversion katmanlarında KPI seti kurup, funnel darboğazlarını tespit edeceksiniz.',
    deadline: '28.04.2026',
    status: 'Henüz Başlanmadı',
    points: 220,
    duration: '180 dakika',
    requiredTasks: ['702'],
    resources: [
      {
        type: 'article',
        title: 'Funnel Analizi ve KPI Tasarımı',
        url: '#'
      },
      {
        type: 'template',
        title: 'Funnel Dashboard Şablonu',
        url: '#'
      }
    ],
    quiz: {
      id: 'q703',
      questionCount: 5
    },
    tasks: [
      {
        title: 'KPI Ağacı',
        description: 'Şirket hedeflerinden kampanya KPI ağacını çıkarın.',
        deliverable: 'KPI hiyerarşi diyagramı'
      },
      {
        title: 'Darboğaz Tespiti',
        description: 'Dönüşüm hunisinde en az 2 darboğazı tespit edin.',
        deliverable: 'Analiz notu'
      }
    ]
  },
  {
    id: '704',
    levelId: '7',
    order: 4,
    title: 'Dashboard ve Rapor Otomasyonu',
    description: 'Yönetim ve operasyon ekipleri için iki farklı rapor katmanı oluşturun.',
    longDescription: 'Bu görevde üst seviye karar vericiler ve uygulayıcı ekipler için farklı detay seviyelerinde dashboard tasarlayacaksınız.',
    deadline: '05.05.2026',
    status: 'Henüz Başlanmadı',
    points: 240,
    duration: '200 dakika',
    requiredTasks: ['703'],
    resources: [
      {
        type: 'article',
        title: 'Pazarlama Dashboard Tasarım İlkeleri',
        url: '#'
      },
      {
        type: 'video',
        title: 'Raporlama Otomasyonu Pratikleri',
        url: '#'
      }
    ],
    quiz: {
      id: 'q704',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Executive Dashboard',
        description: 'Üst yönetim için 1 sayfalık KPI dashboard tasarlayın.',
        deliverable: 'Dashboard prototipi'
      },
      {
        title: 'Operasyon Raporu',
        description: 'Kanal bazlı detay rapor şablonu oluşturun.',
        deliverable: 'Rapor şablonu'
      }
    ]
  },
  {
    id: '705',
    levelId: '7',
    order: 5,
    title: 'Veri Odaklı Optimizasyon Planı',
    description: 'Analiz bulgularından 90 günlük büyüme ve optimizasyon planı çıkarın.',
    longDescription: 'Bu görevde veri bulgularını aksiyona dönüştürüp hipotez, deney ve başarı kriteri içeren plan oluşturacaksınız.',
    deadline: '12.05.2026',
    status: 'Henüz Başlanmadı',
    points: 260,
    duration: '210 dakika',
    requiredTasks: ['704'],
    resources: [
      {
        type: 'template',
        title: 'Deney Backlog Şablonu',
        url: '#'
      },
      {
        type: 'article',
        title: 'Growth Deney Çerçevesi',
        url: '#'
      }
    ],
    quiz: {
      id: 'q705',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Hipotez Listesi',
        description: 'En az 8 test hipotezi üretin.',
        deliverable: 'Hipotez backlogu'
      },
      {
        title: '90 Günlük Yol Haritası',
        description: 'Önceliklendirilmiş deney ve optimizasyon planı yazın.',
        deliverable: '90 günlük plan'
      }
    ]
  }
];

const tasksLevel8 = [
  {
    id: '801',
    levelId: '8',
    order: 1,
    title: 'Entegre Strateji Tasarımı',
    description: 'Tüm dijital kanalları kapsayan yıllık strateji omurgasını oluşturun.',
    longDescription: 'Bu görevde SEO, içerik, sosyal medya, e-posta, ücretli reklam ve analitik kanallarını aynı hedefe bağlayan entegre strateji tasarlayacaksınız.',
    deadline: '19.05.2026',
    status: 'Henüz Başlanmadı',
    points: 220,
    duration: '180 dakika',
    requiredTasks: ['705'],
    resources: [
      {
        type: 'template',
        title: 'Yıllık Pazarlama Strateji Şablonu',
        url: '#'
      },
      {
        type: 'article',
        title: 'Omni-channel Strateji İlkeleri',
        url: '#'
      }
    ],
    quiz: {
      id: 'q801',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Strateji Çerçevesi',
        description: 'Hedef, kanal rolü ve KPI eşlemesini yapın.',
        deliverable: 'Strateji matrisi'
      },
      {
        title: 'Yıllık Roadmap',
        description: 'Çeyrek bazlı kampanya takvimi çıkarın.',
        deliverable: '12 aylık takvim'
      }
    ]
  },
  {
    id: '802',
    levelId: '8',
    order: 2,
    title: 'Bütçe Planlama ve Kaynak Tahsisi',
    description: 'Kanal bazlı bütçe dağılımı ve ekip kapasite planı hazırlayın.',
    longDescription: 'Bu görevde geçmiş performans, hedef KPI ve risk senaryolarına göre bütçe tahsisi ve kaynak planlama yapacaksınız.',
    deadline: '26.05.2026',
    status: 'Henüz Başlanmadı',
    points: 240,
    duration: '190 dakika',
    requiredTasks: ['801'],
    resources: [
      {
        type: 'template',
        title: 'Kanal Bazlı Bütçe Planı',
        url: '#'
      },
      {
        type: 'article',
        title: 'Pazarlama Bütçesi Tahsis Metodları',
        url: '#'
      }
    ],
    quiz: {
      id: 'q802',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Bütçe Senaryoları',
        description: 'Temel, iyimser ve kötü senaryo için bütçe hazırlayın.',
        deliverable: '3 senaryo tablosu'
      },
      {
        title: 'Kapasite Planı',
        description: 'Ekip ve ajans iş yükü planı çıkarın.',
        deliverable: 'Kapasite plan dokümanı'
      }
    ]
  },
  {
    id: '803',
    levelId: '8',
    order: 3,
    title: 'Kanal Entegrasyonu ve Mesaj Mimarisi',
    description: 'Kanal geçişlerini ve tutarlı marka mesaj mimarisini tasarlayın.',
    longDescription: 'Bu görevde farklı kanallarda kullanıcı yolculuğu bütünlüğünü sağlayan mesaj ve içerik mimarisini oluşturacaksınız.',
    deadline: '02.06.2026',
    status: 'Henüz Başlanmadı',
    points: 250,
    duration: '200 dakika',
    requiredTasks: ['802'],
    resources: [
      {
        type: 'article',
        title: 'Kanal Entegrasyon Best Practices',
        url: '#'
      },
      {
        type: 'template',
        title: 'Mesaj Mimari Haritası',
        url: '#'
      }
    ],
    quiz: {
      id: 'q803',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Mesaj Haritası',
        description: 'Awareness, consideration, conversion için ana mesajları yazın.',
        deliverable: 'Mesaj matrisi'
      },
      {
        title: 'Kanal Geçiş Kurgusu',
        description: 'Kullanıcıyı kanal boyunca taşıyan akış kurgusu oluşturun.',
        deliverable: 'Kanal geçiş diyagramı'
      }
    ]
  },
  {
    id: '804',
    levelId: '8',
    order: 4,
    title: 'Kriz Senaryosu ve İtibar Yönetimi',
    description: 'Dijital kriz senaryoları için müdahale planı ve iletişim protokolü yazın.',
    longDescription: 'Bu görevde olası kriz durumlarını sınıflandırıp yanıt süresi, sorumluluk matrisi ve iletişim planı oluşturacaksınız.',
    deadline: '09.06.2026',
    status: 'Henüz Başlanmadı',
    points: 260,
    duration: '190 dakika',
    requiredTasks: ['803'],
    resources: [
      {
        type: 'article',
        title: 'Dijital Kriz İletişimi Rehberi',
        url: '#'
      },
      {
        type: 'template',
        title: 'Kriz Müdahale Planı Şablonu',
        url: '#'
      }
    ],
    quiz: {
      id: 'q804',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Kriz Matrisi',
        description: 'Risk seviyesine göre kriz sınıflandırması yapın.',
        deliverable: 'Kriz matrisi dokümanı'
      },
      {
        title: 'Yanıt Protokolü',
        description: 'İlk 24 saat aksiyon planı hazırlayın.',
        deliverable: 'Yanıt protokolü'
      }
    ]
  },
  {
    id: '805',
    levelId: '8',
    order: 5,
    title: 'Final Strateji Sunumu',
    description: 'Kapsamlı dijital pazarlama stratejisini metrik, bütçe ve operasyon planıyla sunun.',
    longDescription: 'Bu final görevinde tüm seviyelerde öğrendiğiniz yaklaşımı bir araya getirerek uçtan uca dijital pazarlama stratejisi sunacaksınız.',
    deadline: '16.06.2026',
    status: 'Henüz Başlanmadı',
    points: 300,
    duration: '240 dakika',
    requiredTasks: ['804'],
    resources: [
      {
        type: 'template',
        title: 'Final Strateji Sunum Şablonu',
        url: '#'
      },
      {
        type: 'checklist',
        title: 'Sunum Öncesi Kontrol Listesi',
        url: '#'
      }
    ],
    quiz: {
      id: 'q805',
      questionCount: 5
    },
    tasks: [
      {
        title: 'Strateji Sunumu',
        description: '20 slaytlık yönetim sunumu hazırlayın.',
        deliverable: 'PPT / PDF sunum'
      },
      {
        title: 'Uygulama Planı',
        description: '90 günlük aksiyon planı ve KPI hedefleri çıkarın.',
        deliverable: 'Uygulama planı dokümanı'
      }
    ]
  }
];

function normalizeResourceType(type) {
  const map = {
    articles: 'article',
    videos: 'video',
    templates: 'template',
    tools: 'tool',
    links: 'link'
  };
  return map[type] || type || 'resource';
}

function buildSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function resolveResourceUrl(rawUrl, title, type) {
  const url = String(rawUrl || '').trim();

  if (url && /^https?:\/\//.test(url) && !url.includes('example')) {
    return url;
  }

  const safeTitle = title || 'digital marketing resource';
  const safeType = type || 'resource';

  if (safeType === 'video') {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(safeTitle)}`;
  }

  return buildSearchUrl(`${safeTitle} ${safeType}`);
}

function normalizeResources(resources) {
  if (Array.isArray(resources)) {
    return resources.map((resource, index) => ({
      type: resource.type || 'resource',
      title: resource.title || `Kaynak ${index + 1}`,
      description: resource.description || '',
      url: resolveResourceUrl(resource.url, resource.title, resource.type || 'resource')
    }));
  }

  if (resources && typeof resources === 'object') {
    const flattened = [];
    Object.entries(resources).forEach(([type, list]) => {
      if (Array.isArray(list)) {
        list.forEach((title) => {
          flattened.push({
            type: normalizeResourceType(type),
            title,
            description: '',
            url: resolveResourceUrl('', title, normalizeResourceType(type))
          });
        });
      }
    });
    return flattened;
  }

  return [];
}

function normalizeTaskItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return [
      {
        title: 'Çalışma Planı',
        description: 'Bu görev için kısa bir çalışma planı oluşturun.',
        deliverable: 'Plan dokümanı'
      }
    ];
  }

  if (typeof items[0] === 'string') {
    return items.map((item, index) => ({
      title: `Adım ${index + 1}`,
      description: item,
      deliverable: ''
    }));
  }

  return items.map((item, index) => ({
    title: item.title || `Adım ${index + 1}`,
    description: item.description || '',
    deliverable: item.deliverable || ''
  }));
}

function normalizeTask(task, fallbackLevelId) {
  const levelId = String(task.levelId || fallbackLevelId);
  const rawDuration = task.duration;
  const duration = typeof rawDuration === 'number' ? `${rawDuration} dakika` : (rawDuration || '120 dakika');
  const quizId = task.quiz && task.quiz.id ? String(task.quiz.id) : `q${task.id}`;
  const questionCount = task.quiz && task.quiz.questionCount ? Number(task.quiz.questionCount) : 5;

  return {
    id: String(task.id),
    levelId,
    order: Number(task.order || 1),
    title: task.title,
    description: (task.description || '').trim(),
    longDescription: task.longDescription || (task.description || '').trim(),
    deadline: task.deadline || '',
    status: 'Henüz Başlanmadı',
    points: Number(task.points || 100),
    duration,
    requiredTasks: Array.isArray(task.requiredTasks) ? task.requiredTasks.map(String) : [],
    resources: normalizeResources(task.resources),
    quiz: {
      id: quizId,
      questionCount
    },
    tasks: normalizeTaskItems(task.tasks)
  };
}

const rawTasksByLevel = {
  '1': tasksLevel1,
  '2': tasksLevel2,
  '3': tasksLevel3,
  '4': tasksLevel4,
  '5': tasksLevel5,
  '6': tasksLevel6,
  '7': tasksLevel7,
  '8': tasksLevel8
};

export const tasksByLevel = Object.fromEntries(
  Object.entries(rawTasksByLevel).map(([levelId, list]) => [
    levelId,
    list.map((task) => normalizeTask(task, levelId))
  ])
);

export const allTasks = Object.values(tasksByLevel)
  .flat()
  .sort((a, b) => Number(a.id) - Number(b.id));

export const levelContentSections = {
  '1': [
    {
      title: 'Dijital Pazarlamaya Temel Bakış',
      text: 'Dijital pazarlama; arama motorları, sosyal medya, e-posta ve içerik gibi kanallarla hedef kitleye ölçülebilir şekilde ulaşmayı sağlar.',
      bullets: [
        'Geleneksel pazarlamaya göre daha ölçülebilirdir.',
        'Hedef kitle segmentasyonu ile maliyet verimliliği sağlar.',
        'Gerçek zamanlı optimizasyon imkanı sunar.'
      ]
    },
    {
      title: 'Temel Kavramlar ve İlk Strateji',
      text: 'SEO, SEM, CTR, CPC, dönüşüm oranı ve ROI gibi metrikler pazarlama kararlarının temelidir. İlk strateji, hedef-kitle-mesaj-kanal uyumuyla kurulur.',
      bullets: [
        'SMART hedef yaklaşımı kullanın.',
        'Ana KPI setini en başta belirleyin.',
        'Öğrenme döngüsü kurarak haftalık iyileştirme yapın.'
      ]
    }
  ],
  '2': [
    {
      title: 'SEO Mimarisi',
      text: 'SEO üç ana sütundan oluşur: teknik SEO, içerik ve otorite (off-page). Uzun vadeli organik büyüme için bu üç alan birlikte çalışmalıdır.',
      bullets: [
        'Tarama ve indekslenebilirlik kontrolleri',
        'Arama niyetine uygun içerik kümeleri',
        'Kaliteli backlink ve marka otoritesi'
      ]
    },
    {
      title: 'Anahtar Kelime ve İçerik Eşleşmesi',
      text: 'Anahtar kelime araştırması, kullanıcının ihtiyacını içerik planına çevirmenin yoludur.',
      bullets: [
        'Bilgilendirici, ticari ve işlem odaklı niyetleri ayırın.',
        'Cluster modeli ile içerik haritası oluşturun.',
        'Meta alanları ve başlık yapısını optimize edin.'
      ]
    }
  ],
  '3': [
    {
      title: 'Sosyal Medya Strateji Temelleri',
      text: 'Her platformun rolü farklıdır; içerik formatı ve mesaj tonu platforma göre optimize edilmelidir.',
      bullets: [
        'Platform başına hedef ve KPI tanımı',
        'İçerik takvimi ve yayın sıklığı',
        'Topluluk yönetimi ve etkileşim ilkeleri'
      ]
    },
    {
      title: 'Etkileşimden Dönüşüme',
      text: 'Sosyal medya performansı sadece beğeni ile ölçülmez; trafik, lead ve satış etkisi de değerlendirilmelidir.',
      bullets: [
        'Hook, değer, CTA yapısına göre içerik üretin.',
        'Kısa video ve carousel formatlarını test edin.',
        'A/B test ile kreatif öğrenme döngüsü kurun.'
      ]
    }
  ],
  '4': [
    {
      title: 'İçerik Pazarlaması Sistemi',
      text: 'İçerik pazarlaması tek tek içerik üretmek değil, hedef kitle yolculuğunu destekleyen sistemli bir yayın planıdır.',
      bullets: [
        'Persona ve arama niyeti odaklı planlama',
        'TOFU-MOFU-BOFU içerik dağılımı',
        'İçerik tekrar kullanım (repurposing) stratejisi'
      ]
    },
    {
      title: 'Dağıtım ve Ölçümleme',
      text: 'İyi içerik ancak doğru dağıtım ve ölçümleme ile büyümeye katkı verir.',
      bullets: [
        'Owned, earned, paid dağıtım karışımı',
        'İçerik başına başarı metriği tanımı',
        'Düzenli içerik güncellemesi ve optimizasyon'
      ]
    }
  ],
  '5': [
    {
      title: 'E-posta Kanalı Stratejisi',
      text: 'E-posta pazarlaması, doğru segment ve kişiselleştirme ile en yüksek yatırım getirisi üreten kanallardan biridir.',
      bullets: [
        'Liste kalitesi büyüklükten daha önemlidir.',
        'Segment bazlı içerik performansı yükseltir.',
        'Otomasyon akışları dönüşüm sağlar.'
      ]
    },
    {
      title: 'Performans ve İyileştirme',
      text: 'Open rate, CTR, conversion ve unsubscribe oranları birlikte değerlendirilerek optimizasyon yapılmalıdır.',
      bullets: [
        'Konu satırı ve gönderim zamanı testleri',
        'CTA ve tasarım varyasyonları',
        'Liste hijyeni ve teslim edilebilirlik yönetimi'
      ]
    }
  ],
  '6': [
    {
      title: 'Ücretli Reklam Operasyonu',
      text: 'Ücretli reklamda başarı; doğru hedefleme, güçlü kreatif ve sürekli optimizasyon disiplinine bağlıdır.',
      bullets: [
        'Kampanya hedefi ile teklif stratejisini uyumlayın.',
        'Kreatif testi düzenli yürütün.',
        'Frekans ve dönüşüm maliyeti dengesini izleyin.'
      ]
    },
    {
      title: 'Kanal Bazlı Büyüme',
      text: 'Google Ads ve Meta Ads farklı sinyal yapılarıyla çalışır; ortak KPI dili kurmak gerekir.',
      bullets: [
        'ROAS, CPA ve LTV birlikte yorumlanmalı.',
        'Remarketing huni kurgusuna bağlanmalı.',
        'Haftalık deney takvimi işletilmeli.'
      ]
    }
  ],
  '7': [
    {
      title: 'Analitik Altyapı',
      text: 'Doğru ölçümleme olmadan doğru optimizasyon mümkün değildir. Veri kalitesi ilk önceliktir.',
      bullets: [
        'Event planı ve UTM standardı tanımlayın.',
        'Kanal kırılımında dönüşüm takibi kurun.',
        'KPI hiyerarşisini yönetim hedeflerine bağlayın.'
      ]
    },
    {
      title: 'Raporlama ve Karar Alma',
      text: 'Raporlama sadece görüntüleme değil, aksiyon üretme mekanizmasıdır.',
      bullets: [
        'Dashboard’ları rol bazlı tasarlayın.',
        'Anomali tespit kuralları oluşturun.',
        'Deney sonuçlarını karar setine dönüştürün.'
      ]
    }
  ],
  '8': [
    {
      title: 'Strateji Entegrasyonu',
      text: 'Bu seviyede tüm kanallar tek iş hedefi etrafında entegre edilir; bütçe, mesaj ve ölçüm tek çatı altında yönetilir.',
      bullets: [
        'Yıllık strateji, çeyreklik aksiyon planına indirgenmeli.',
        'Kanal rolleri net ve ölçülebilir olmalı.',
        'Risk senaryoları önceden tanımlanmalı.'
      ]
    },
    {
      title: 'Operasyonel Mükemmellik',
      text: 'Stratejinin sürdürülebilir başarısı için ekip, süreç ve performans yönetimi birlikte tasarlanmalıdır.',
      bullets: [
        'Toplantı ritmi ve karar mekanizması belirlenmeli.',
        'Önceliklendirme modeli netleştirilmeli.',
        'Sürekli öğrenme ve deney kültürü korunmalı.'
      ]
    }
  ]
};

Object.values(levelContentSections).forEach((sections) => {
  sections.forEach((section) => {
    if (!Array.isArray(section.details)) {
      section.details = [
        `${section.title} bölümünü tamamladıktan sonra seviyeye özel görevlerle pratik yapın.`,
        'Teorik bilgiyi ölçümleme ve uygulama adımlarıyla pekiştirin.'
      ];
    }
  });
});

const defaultPresentationBlueprint = {
  summary: 'Bu sunumda seviyenin ana kavramları, uygulama adımları ve başarı metrikleri birlikte ele alınır.',
  topicIntro: '{topic} başlığında temel tanım, iş etkisi ve uygulama yaklaşımı birlikte değerlendirilir.',
  topicBullets: [
    '{topic} için hedef, kitle ve kanal uyumunu netleştirin.',
    '{topic} özelinde ölçülebilir birincil KPI belirleyin.',
    '{topic} için haftalık test ve iyileştirme döngüsü kurun.'
  ],
  implementationSteps: [
    'Hedefi ölçülebilir formatta tanımlayın.',
    'Sorumlu kişi, araç ve teslim tarihini netleştirin.',
    'İlk deneyi 7 gün içinde yayına alın.',
    'Sonucu raporlayıp bir sonraki deneyi planlayın.'
  ],
  metrics: [
    'Erişim ve görünürlük göstergeleri',
    'Etkileşim ve trafik göstergeleri',
    'Dönüşüm ve gelir göstergeleri',
    'Verimlilik ve maliyet göstergeleri'
  ],
  caseStudy: {
    title: 'Uygulama Vakası',
    text: 'Yeni bir ürün lansmanında bu seviyedeki prensipleri 30 günlük plana dönüştürün.',
    bullets: [
      'İlk hafta: analiz ve hazırlık',
      'İkinci hafta: kampanya aktivasyonu',
      'Üçüncü hafta: optimizasyon',
      'Dördüncü hafta: raporlama ve karar'
    ]
  },
  wrapUp: [
    'En kritik iki öğrenimi not edin.',
    'Görev ekranından bir uygulama görevi seçin.',
    'Çıktıyı standart teslim formatı ile paylaşın.',
    'Quiz ile bilgi seviyenizi ölçün.'
  ]
};

const levelPresentationBlueprints = {
  '1': {
    summary: 'Temel Kavramlar içerik sunumu; dijital pazarlamanın sözlüğünü, temel metriklerini ve ilk strateji kurulumunu netleştirir.',
    topicIntro: '{topic} başlığında amaç, ekip içinde ortak dil oluşturmak ve kararları veriyle desteklemektir.',
    topicBullets: [
      '{topic} ile ilgili temel tanım ve kapsamı 1 cümlede ifade edin.',
      '{topic} için başlangıç KPI setini belirleyin (ör. CTR, CPC, CR).',
      '{topic} alanında sık yapılan hataları notlayıp kontrol listesine ekleyin.'
    ],
    implementationSteps: [
      'Hedef-kitle-mesaj-kanal eşleştirmesini tek tabloya toplayın.',
      'Her kanal için bir ana KPI ve bir destek KPI seçin.',
      'Haftalık değerlendirme toplantısında yalnızca veriye dayalı karar alın.',
      'Bir sonraki hafta için tek bir iyileştirme hipotezi yazın.'
    ],
    metrics: ['CTR', 'CPC', 'Dönüşüm Oranı', 'CAC / LTV oranı'],
    caseStudy: {
      title: 'Vaka: Fintech Uygulama Lansmanı',
      text: 'Yeni bir finans uygulamasının ilk kullanıcı kazanım planını temel kavramlarla kurgulayın.',
      bullets: [
        'Hedef kitleyi iki ana segmente ayırın.',
        'Her segment için tek değer önerisi yazın.',
        'İlk 14 gün için kanal-mesaj eşleştirmesi çıkarın.',
        'Lansman sonrası performansı temel metriklerle ölçün.'
      ]
    },
    wrapUp: [
      'Pazarlama sözlüğünüzü ekip içinde standardize edin.',
      'Bir KPI dashboard taslağı oluşturun.',
      'İlk görev için kısa aksiyon planı paylaşın.',
      'Quiz öncesi kritik kavramları tekrar edin.'
    ]
  },
  '2': {
    summary: 'SEO Temelleri içerik sunumu; teknik SEO, içerik stratejisi ve otorite inşasını tek bir büyüme sistemi olarak ele alır.',
    topicIntro: '{topic} başlığında arama niyeti, içerik eşleşmesi ve sıralama sinyalleri birlikte değerlendirilir.',
    topicBullets: [
      '{topic} için mevcut durum analizi yapın (teknik + içerik + otorite).',
      '{topic} kapsamında kullanıcı niyeti ile sayfa türünü eşleştirin.',
      '{topic} için 30 günlük optimizasyon backlog listesi hazırlayın.'
    ],
    implementationSteps: [
      'Site taraması ile teknik hataları önceliklendirin.',
      'Anahtar kelime kümelerini funnel aşamalarına ayırın.',
      'Her küme için bir pillar ve destek içerikler planlayın.',
      'İndeks, sıralama ve organik dönüşüm metriğini haftalık takip edin.'
    ],
    metrics: ['Organik Oturum', 'Ortalama Sıralama', 'Click Through Rate', 'Organik Dönüşüm'],
    caseStudy: {
      title: 'Vaka: B2B SaaS Organik Büyüme',
      text: 'Demo talebi artırmak için SEO odaklı içerik kümesi oluşturun.',
      bullets: [
        '3 ticari niyetli anahtar kelime kümesi seçin.',
        'Her küme için açılış sayfası ve destek blog planlayın.',
        'İç linkleme ve schema düzeni kurun.',
        '4 haftalık sıralama ve lead etkisini raporlayın.'
      ]
    },
    wrapUp: [
      'Teknik SEO öncelik listesi oluşturun.',
      'İlk içerik kümesini yayına hazırlayın.',
      'Backlink fırsat listesini başlatın.',
      'Quiz öncesi on-page / off-page farkını tekrar edin.'
    ]
  },
  '3': {
    summary: 'Sosyal Medya Pazarlaması içerik sunumu; platform rolü, içerik formatı ve dönüşüm etkisini tek çatı altında yönetir.',
    topicIntro: '{topic} başlığında platform dinamiğine uygun yaratıcı üretim ve ölçümleme yaklaşımı kurulur.',
    topicBullets: [
      '{topic} için platforma özel içerik formatı belirleyin.',
      '{topic} kapsamında hedef davranış için net CTA tanımlayın.',
      '{topic} çalışmasında etkileşim ve dönüşüm etkisini birlikte izleyin.'
    ],
    implementationSteps: [
      'Aylık içerik takvimini hedeflere göre sınıflandırın.',
      'Kısa video, carousel ve statik formatları test edin.',
      'Topluluk yönetimi için yanıt SLA standardı belirleyin.',
      'Performans raporunda yalnızca beğeni değil iş etkisini gösterin.'
    ],
    metrics: ['Etkileşim Oranı', 'Profil Ziyareti', 'Sosyal Trafik', 'Sosyal Kaynaklı Lead'],
    caseStudy: {
      title: 'Vaka: Yeni Ürün İçin Sosyal Medya Sprinti',
      text: '14 günlük lansman döneminde organik + reklam destekli sosyal medya planı oluşturun.',
      bullets: [
        'Farkındalık, düşünme ve dönüşüm içeriklerini ayırın.',
        'Her aşama için 2 farklı kreatif varyasyon hazırlayın.',
        'Kampanya ortasında düşük performanslı kreatifleri değiştirin.',
        'Sprint sonunda içerik öğrenim raporu çıkarın.'
      ]
    },
    wrapUp: [
      'Platform bazlı rol dağılımını netleştirin.',
      'En iyi performans veren formatı belirleyin.',
      'Topluluk etkileşimini görevlerle pekiştirin.',
      'Quiz öncesi KPI eşleştirmesini tekrar edin.'
    ]
  },
  '4': {
    summary: 'İçerik Pazarlaması içerik sunumu; içerik üretimini sistematik planlama, dağıtım ve ölçümleme modeliyle birleştirir.',
    topicIntro: '{topic} başlığında içerik fikrini iş hedefi ve dağıtım kanalıyla birlikte tasarlayın.',
    topicBullets: [
      '{topic} için hedef persona ve arama niyetini netleştirin.',
      '{topic} çıktısını TOFU-MOFU-BOFU akışında konumlandırın.',
      '{topic} için tekrar kullanım (repurpose) adımlarını planlayın.'
    ],
    implementationSteps: [
      '3 aylık editorial planı haftalık sprintlere bölün.',
      'Her içerik için tek ana hedef ve tek ana CTA belirleyin.',
      'Yayın sonrası dağıtımı owned-earned-paid karışımıyla yapın.',
      '30 gün sonunda güncelleme gerektiren içerikleri işaretleyin.'
    ],
    metrics: ['İçerik Başına Oturum', 'Ortalama Okuma Süresi', 'MQL / Lead', 'İçerik Kaynaklı Gelir'],
    caseStudy: {
      title: 'Vaka: Blogdan Lead Motoruna',
      text: 'Mevcut blog içeriklerini dönüşüm odaklı hale getirerek lead üretimini artırın.',
      bullets: [
        'En yüksek trafikli 5 içeriği seçin.',
        'Bu içeriklere uygun lead magnet ve CTA ekleyin.',
        'İç link yapısını funnel akışına göre güncelleyin.',
        'Aylık lead artışını raporlayın.'
      ]
    },
    wrapUp: [
      'İçerik üretim ve dağıtım sorumlularını belirleyin.',
      'İlk içerik kümenizi yayın planına alın.',
      'Düşük performanslı içerikler için revizyon takvimi çıkarın.',
      'Quiz öncesi içerik hunisi kavramını tekrar edin.'
    ]
  },
  '5': {
    summary: 'E-posta Pazarlaması içerik sunumu; segmentasyon, otomasyon ve teslim edilebilirlik odaklı bir gelir kanalı inşa eder.',
    topicIntro: '{topic} başlığında kişiselleştirme, zamanlama ve dönüşüm hedefleri birlikte optimize edilir.',
    topicBullets: [
      '{topic} için hedef segmentleri davranışa göre ayırın.',
      '{topic} kapsamında konu satırı ve içerik mesajını uyumlayın.',
      '{topic} performansını açılma, tıklama ve dönüşüm birlikte yorumlayın.'
    ],
    implementationSteps: [
      'Listeyi kaynak kalitesine göre temizleyin ve etiketleyin.',
      'Welcome, nurturing ve re-engagement akışlarını kurgulayın.',
      'Her kampanyada tek hipotezle A/B test çalıştırın.',
      'Teslim edilebilirlik sorunlarını domain sağlığıyla izleyin.'
    ],
    metrics: ['Open Rate', 'Click Rate', 'Email Conversion', 'Unsubscribe / Spam Rate'],
    caseStudy: {
      title: 'Vaka: E-ticarette Sepet Terk Kurtarma',
      text: 'Sepet terk eden kullanıcılara 3 adımlı otomasyon akışıyla geri dönüşüm sağlayın.',
      bullets: [
        '0-2 saat: hatırlatma e-postası',
        '24 saat: sosyal kanıt ve fayda mesajı',
        '48 saat: sınırlı süre teklif e-postası',
        'Akış performansını segment bazında karşılaştırın.'
      ]
    },
    wrapUp: [
      'Liste hijyen kontrolü için haftalık rutin tanımlayın.',
      'İki otomasyon akışını canlıya alın.',
      'Görev teslimi için e-posta rapor formatını hazırlayın.',
      'Quiz öncesi temel e-posta metriklerini tekrar edin.'
    ]
  },
  '6': {
    summary: 'Ücretli Reklamcılık içerik sunumu; teklif stratejisi, kreatif test ve bütçe yönetimiyle kârlı büyüme modeli kurar.',
    topicIntro: '{topic} başlığında hedefleme, teklif ve kreatif performansı birlikte optimize edilir.',
    topicBullets: [
      '{topic} için net kampanya amacı ve başarı metriği seçin.',
      '{topic} kapsamında hedef kitleyi soğuk-ılık-sıcak olarak ayırın.',
      '{topic} çalışmasında haftalık optimizasyon deneyi planlayın.'
    ],
    implementationSteps: [
      'Kampanya yapısını hedefe göre sadeleştirin.',
      'Kreatif testini tek değişken prensibiyle yönetin.',
      'Bütçeyi performans ve öğrenim hızına göre dağıtın.',
      'Negatif sinyalleri (frekans, CPA artışı) erken yakalayın.'
    ],
    metrics: ['CPA', 'ROAS', 'CTR', 'Frekans / Saturation'],
    caseStudy: {
      title: 'Vaka: Performans Kampanyası Revizyonu',
      text: 'Yüksek maliyetli kampanyayı 3 haftada kârlı seviyeye taşımak için optimizasyon planı kurun.',
      bullets: [
        'Düşük niyetli kitleleri ayırın.',
        'Yüksek intent segmentlere bütçe kaydırın.',
        'Kreatif mesajı teklif ile uyumlayın.',
        'Haftalık ROAS ve CPA trendini raporlayın.'
      ]
    },
    wrapUp: [
      'Kampanya isimlendirme standardı belirleyin.',
      'Test takvimi ve karar eşiği tanımlayın.',
      'Remarketing akışını yeniden kurgulayın.',
      'Quiz öncesi teklif stratejilerini tekrar edin.'
    ]
  },
  '7': {
    summary: 'Analitik ve Ölçümleme içerik sunumu; doğru veri modeli, KPI hiyerarşisi ve aksiyon odaklı raporlama kültürü oluşturur.',
    topicIntro: '{topic} başlığında veri toplama, yorumlama ve karar alma katmanları bir arada ele alınır.',
    topicBullets: [
      '{topic} için veri kaynağı, sahiplik ve güncellik tanımı yapın.',
      '{topic} kapsamında iş hedefiyle bağlı KPI ağacı oluşturun.',
      '{topic} raporlarında aksiyona dönüşen içgörü üretin.'
    ],
    implementationSteps: [
      'GA4 event planını iş hedeflerine göre revize edin.',
      'UTM standardı ve naming sözlüğünü sabitleyin.',
      'Yönetim ve operasyon için ayrı dashboard tasarlayın.',
      'Anomali kuralları ile otomatik uyarı sistemi kurun.'
    ],
    metrics: ['Veri Doğruluk Oranı', 'Dönüşüm İzleme Kapsamı', 'KPI Hedef Sapması', 'Raporlama Çevrim Süresi'],
    caseStudy: {
      title: 'Vaka: Dashboard’dan Karar Mekanizmasına',
      text: 'Pazarlama dashboard’unu sadece izleme değil, karar üretme aracı haline getirin.',
      bullets: [
        'Her panel için tek karar sorusu yazın.',
        'Eşik değer aşımında sorumlu kişiyi tanımlayın.',
        'Haftalık içgörü toplantısını standart ajanda ile yürütün.',
        'Alınan kararın sonraki haftaki etkisini ölçün.'
      ]
    },
    wrapUp: [
      'Ölçüm planı dokümanını güncelleyin.',
      'KPI ağacı ile ekip hedeflerini eşleyin.',
      'Rapor şablonunu aksiyon alanı ile genişletin.',
      'Quiz öncesi metrik yorumlama örneklerini tekrar edin.'
    ]
  },
  '8': {
    summary: 'Dijital Pazarlama Stratejisi içerik sunumu; kanallar arası entegrasyon, bütçe yönetimi ve risk planlamasıyla ölçeklenebilir büyüme tasarlar.',
    topicIntro: '{topic} başlığında kanal, bütçe ve ekip kararları tek iş hedefi etrafında hizalanır.',
    topicBullets: [
      '{topic} için stratejik karar setini yazılı hale getirin.',
      '{topic} kapsamında kanal rolleri ve kaynak planını netleştirin.',
      '{topic} uygulamasında risk senaryoları için alternatif plan çıkarın.'
    ],
    implementationSteps: [
      'Yıllık hedefleri çeyreklik OKR formatına dönüştürün.',
      'Kanal bütçesini büyüme ve verimlilik dengesiyle paylaştırın.',
      'Kriz anında devreye girecek karar ağacını hazırlayın.',
      'Strateji toplantılarında öğrenim-temelli revizyon yapın.'
    ],
    metrics: ['Pazarlama Kaynaklı Gelir', 'Kanal Bazlı Karlılık', 'Bütçe Gerçekleşme Oranı', 'Stratejik Hedef Tamamlanma'],
    caseStudy: {
      title: 'Vaka: 12 Aylık Entegre Büyüme Planı',
      text: 'Çok kanallı pazarlama yapısını tek bir stratejik yol haritasında birleştirin.',
      bullets: [
        'Kanal rolleri ve katkı hedeflerini tanımlayın.',
        'Bütçe dağılımını senaryo bazlı planlayın.',
        'Kritik riskler için erken uyarı göstergeleri belirleyin.',
        'Çeyrek sonlarında strateji revizyonu yapın.'
      ]
    },
    wrapUp: [
      'Strateji dokümanını tek sayfalık özetle finalize edin.',
      'Yıllık ve çeyreklik KPI setini netleştirin.',
      'Ekip sorumluluk matrisi oluşturun.',
      'Quiz öncesi entegrasyon ve bütçe konularını tekrar edin.'
    ]
  }
};

function fillTemplate(value, topic) {
  return String(value || '').replaceAll('{topic}', topic);
}

function buildTopicSlides(level, blueprint) {
  return (level.topics || []).map((topic, index) => ({
    id: `${level.id}-topic-${index + 1}`,
    layout: 'topic',
    kicker: `Konu ${index + 1}`,
    title: topic,
    text: fillTemplate(blueprint.topicIntro || defaultPresentationBlueprint.topicIntro, topic),
    bullets: (blueprint.topicBullets || defaultPresentationBlueprint.topicBullets).map((item) => fillTemplate(item, topic)),
    callouts: [
      {
        title: 'Hızlı Kontrol',
        text: `${topic} için mevcut durumda en kritik eksik noktayı belirleyin ve tek cümleyle yazın.`
      },
      {
        title: 'Uygulama Önerisi',
        text: `${topic} başlığında bu hafta bir mini deney planlayıp sonucu görev teslimine ekleyin.`
      }
    ],
    notes: ['Bu başlığı tamamladıktan sonra ilgili göreve geçerek pratik yapın.']
  }));
}

function buildSectionSlides(level, section, index) {
  const baseBullets = section.bullets || [];
  return [
    {
      id: `${level.id}-section-${index + 1}-overview`,
      layout: 'standard',
      kicker: `Çerçeve ${index + 1}`,
      title: section.title,
      text: section.text,
      bullets: baseBullets,
      notes: section.details || []
    },
    {
      id: `${level.id}-section-${index + 1}-playbook`,
      layout: 'playbook',
      kicker: `Uygulama Planı ${index + 1}`,
      title: `${section.title} Uygulama Planı`,
      text: 'Bu başlığı operasyonel hale getirmek için aşağıdaki adımları sırayla uygulayın.',
      steps: [
        `${section.title} için tek bir ana başarı hedefi belirleyin.`,
        `${baseBullets[0] || 'Uygulama adımlarını'} ekip içinde sorumlu kişilere dağıtın.`,
        '7 günlük mini deney planı ile ilk çıktıyı alın.',
        'Sonuçları raporlayıp bir sonraki sprinti başlatın.'
      ],
      callouts: [
        {
          title: 'Teslim Beklentisi',
          text: 'Bu planı görev dokümanına tablo formatında eklemek, değerlendirmeyi hızlandırır.'
        }
      ],
      notes: ['Uygulama planını küçük sprintlere bölmek öğrenme hızını artırır.']
    }
  ];
}

function buildWorkshopSlide(level) {
  const tasks = tasksByLevel[level.id] || [];
  const highlightedTasks = tasks.slice(0, 3).map((task, index) => (
    `${index + 1}. ${task.title} (${task.duration})`
  ));
  return {
    id: `${level.id}-workshop`,
    layout: 'workshop',
    kicker: 'Atölye',
    title: 'Uygulama Atölyesi',
    text: 'Sunumu bitirdikten sonra bu seviyedeki görevlerle öğrendiğini uygulamaya dönüştür.',
    bullets: highlightedTasks.length ? highlightedTasks : ['Bu seviyeye ait uygulama görevi bulunamadı.'],
    steps: [
      'Bir görev seç ve hedef çıktıyı netleştir.',
      'Görevi 2-3 parçalık mini sprintlere böl.',
      'Sonucu görev ekranına yüklemeden önce kalite kontrol yap.',
      'Bir sonraki görev için iyileştirme notu çıkart.'
    ],
    notes: ['Pratik yapmadan bilgi kalıcı hale gelmez. Sunumdan sonra mutlaka bir görev tamamlayın.']
  };
}

function buildDeliverySlide(level) {
  return {
    id: `${level.id}-delivery-email`,
    layout: 'delivery',
    kicker: 'Teslim',
    title: 'Görev Teslim E-postası Standardı',
    text: 'Yöneticiye gönderilecek teslim e-postasını standartlaştırarak geri bildirim sürecini hızlandırın.',
    steps: [
      `Konu: Seviye ${level.order} - [Görev Adı] - [Tarih]`,
      'Özet: Hedef, yapılan iş, elde edilen sonuç (3 madde).',
      'Ekler: Rapor linki, ekran görüntüleri, kullanılan dashboard.',
      'Beklenti: Onay / geri bildirim için net talep cümlesi.'
    ],
    bullets: [
      'Tek format kullanmak ilerleyiş takibini kolaylaştırır.',
      'Her teslimde bir sonraki adım önerisi ekleyin.',
      'Belirsiz ifade yerine ölçülebilir sonuç yazın.'
    ],
    notes: ['Bu sunum sonrası en az bir görev teslim e-postası hazırlayın.']
  };
}

function buildLevelSlides(level) {
  const blueprint = levelPresentationBlueprints[level.id] || defaultPresentationBlueprint;
  const sections = levelContentSections[level.id] || [];
  const caseStudy = blueprint.caseStudy || defaultPresentationBlueprint.caseStudy;

  const slides = [
    {
      id: `${level.id}-cover`,
      layout: 'cover',
      kicker: `Seviye ${level.order}`,
      title: `${level.title} içerik sunumu`,
      text: blueprint.summary || defaultPresentationBlueprint.summary,
      bullets: [
        level.subtitle,
        `Toplam görev: ${level.totalTasks}`,
        `Hedef puan: ${level.points}`
      ],
      notes: ['Bu sunum adım adım ilerler. İstediğin slayta soldaki listeden geçiş yapabilirsin.']
    },
    {
      id: `${level.id}-agenda`,
      layout: 'agenda',
      kicker: 'Sunum Akışı',
      title: `${level.title} Yol Haritasi`,
      text: 'Bu bölümde öğreneceğin konu başlıkları ve beklenen kazanımlar:',
      steps: level.topics || [],
      bullets: (level.outcomes || []).slice(0, 4),
      notes: ['Tüm başlıklar seviyedeki görev ve quiz ile birebir eşleşir.']
    }
  ];

  slides.push(...buildTopicSlides(level, blueprint));

  sections.forEach((section, index) => {
    slides.push(...buildSectionSlides(level, section, index));
  });

  slides.push({
    id: `${level.id}-metrics`,
    layout: 'metrics',
    kicker: 'Ölçümleme',
    title: 'Başarı Metrikleri ve Dashboard',
    text: 'Bu seviyedeki çalışmaları aşağıdaki metriklerle takip ederek karar kalitesini artır.',
    bullets: blueprint.metrics || defaultPresentationBlueprint.metrics,
    callouts: [
      {
        title: 'Haftalık Ritm',
        text: 'Her hafta metrik trendini yorumlayip tek bir optimizasyon aksiyonu belirleyin.'
      },
      {
        title: 'Aylık Karar',
        text: 'Aylık toplantıda kanal / içerik / bütçe kararını sadece veri kanıtıyla alın.'
      }
    ],
    notes: ['Metrik seçimi net olmazsa ekip odağını kaybeder.']
  });

  slides.push({
    id: `${level.id}-case`,
    layout: 'case',
    kicker: 'Vaka',
    title: caseStudy.title,
    text: caseStudy.text,
    bullets: caseStudy.bullets,
    notes: ['Vakayı görev teslimine mini proje olarak ekleyebilirsiniz.']
  });

  slides.push(buildWorkshopSlide(level));
  slides.push(buildDeliverySlide(level));

  slides.push({
    id: `${level.id}-wrap-up`,
    layout: 'summary',
    kicker: 'Kapanış',
    title: `${level.title} Özet ve Sonraki Adım`,
    text: 'Sunum tamamlandı. Şimdi bilgiyi uygulamaya dönüştürme zamanı.',
    bullets: blueprint.wrapUp || defaultPresentationBlueprint.wrapUp,
    notes: ['Hazırsan görevlere geç, ardından quiz ile seviyeyi tamamla.']
  });

  return slides;
}

export const levelSlides = Object.fromEntries(
  levels.map((level) => [level.id, buildLevelSlides(level)])
);

const baseLevelQuizzes = [
  {
    id: 'lq1',
    levelId: '1',
    levelTitle: 'Seviye 1: Temel Kavramlar',
    title: 'Temel Dijital Pazarlama Quiz',
    description: 'Dijital pazarlama temel kavramları ve metrik bilgini test et.',
    questions: [
      {
        question: 'Dijital pazarlamanın en güçlü yönlerinden biri hangisidir?',
        options: ['Ölçülemez olması', 'Gerçek zamanlı ölçülebilirlik', 'Sadece tek kanalda çalışması', 'Hedef kitleye göre ayrışmaması'],
        correctOption: 1,
        explanation: 'Dijital pazarlama performansı gerçek zamanlı ölçülebilir ve hızla optimize edilebilir.'
      },
      {
        question: 'CTR neyi ifade eder?',
        options: ['Tıklama oranı', 'Dönüşüm maliyeti', 'Gösterim başı maliyet', 'Sayfa hızı'],
        correctOption: 0,
        explanation: 'CTR, tıklama oranıdır; gösterimlere göre tıklama performansını gösterir.'
      },
      {
        question: 'Aşağıdakilerden hangisi dijital kanal değildir?',
        options: ['SEO', 'E-posta', 'Gazete ilanı', 'Sosyal medya'],
        correctOption: 2,
        explanation: 'Gazete ilanı geleneksel mecradır.'
      },
      {
        question: 'SMART hedef yaklaşımındaki M harfi nedir?',
        options: ['Modern', 'Measured', 'Measurable', 'Managed'],
        correctOption: 2,
        explanation: 'SMART hedeflerde M = Measurable (ölçülebilir).'
      },
      {
        question: 'ROI açılımı nedir?',
        options: ['Return on Insight', 'Return on Investment', 'Rate of Interaction', 'Reach of Impression'],
        correctOption: 1,
        explanation: 'ROI, yatırım getirisi ölçümüdür.'
      }
    ]
  },
  {
    id: 'lq2',
    levelId: '2',
    levelTitle: 'Seviye 2: SEO Temelleri',
    title: 'SEO Temelleri Quiz',
    description: 'SEO’nun teknik, içerik ve otorite boyutlarındaki bilginizi test edin.',
    questions: [
      {
        question: 'On-page SEO örneği hangisidir?',
        options: ['Backlink satın alma', 'Title ve meta açıklama optimizasyonu', 'Sosyal medya reklamı', 'TV reklamı'],
        correctOption: 1,
        explanation: 'On-page SEO sayfa içi alanlarda yapılan optimizasyondur.'
      },
      {
        question: 'Long-tail anahtar kelimelerin avantajı nedir?',
        options: ['Daha düşük niyet', 'Daha yüksek dönüşüm potansiyeli', 'Her zaman yüksek rekabet', 'Hiç trafik getirmemesi'],
        correctOption: 1,
        explanation: 'Long-tail sorgular daha niyetli kullanıcılardan gelir.'
      },
      {
        question: 'Core Web Vitals hangi alana aittir?',
        options: ['Teknik SEO', 'Off-page SEO', 'E-posta otomasyonu', 'CRM segmentasyonu'],
        correctOption: 0,
        explanation: 'Core Web Vitals teknik SEO ve kullanıcı deneyimi metriğidir.'
      },
      {
        question: 'Canonical etiketi ne için kullanılır?',
        options: ['Sayfa hızlandırmak', 'Yinelenen içerik sinyalini yönetmek', 'Reklam eklemek', 'Form doğrulamak'],
        correctOption: 1,
        explanation: 'Canonical, benzer sayfalarda tercih edilen URL’yi arama motoruna bildirir.'
      },
      {
        question: 'SERP ifadesi neyi anlatır?',
        options: ['Sosyal medya raporu', 'Arama motoru sonuç sayfası', 'Satış hunisi', 'E-posta şablonu'],
        correctOption: 1,
        explanation: 'SERP = Search Engine Results Page.'
      }
    ]
  },
  {
    id: 'lq3',
    levelId: '3',
    levelTitle: 'Seviye 3: Sosyal Medya Pazarlaması',
    title: 'Sosyal Medya Quiz',
    description: 'Platform stratejisi, içerik planlama ve etkileşim metrikleri bilgisini test et.',
    questions: [
      {
        question: 'LinkedIn hangi kullanım amacıyla öne çıkar?',
        options: ['Oyun canlı yayınları', 'Profesyonel ağ ve B2B içerik', 'Sadece kısa video eğlence', 'E-ticaret kargo yönetimi'],
        correctOption: 1,
        explanation: 'LinkedIn profesyonel ağ ve iş odaklı içerikte güçlüdür.'
      },
      {
        question: 'Engagement rate neyi ölçer?',
        options: ['Sadece takipçi sayısı', 'İçerik etkileşim oranı', 'Web sitesi sunucu hızı', 'Reklam bütçesi'],
        correctOption: 1,
        explanation: 'Engagement rate içerikle etkileşimde bulunan kitlenin oranını ifade eder.'
      },
      {
        question: 'İçerik takvimi hazırlamanın ana faydası nedir?',
        options: ['Yayınlarda tutarlılık sağlamak', 'Takipçileri azaltmak', 'Reklam maliyetini sıfırlamak', 'SEO’yu kapatmak'],
        correctOption: 0,
        explanation: 'Takvim, düzenli ve hedef odaklı yayın disiplinini destekler.'
      },
      {
        question: 'A/B testinin amacı nedir?',
        options: ['İki ekip yarışması yapmak', 'İki varyasyonun performansını kıyaslamak', 'Sadece görsel küçültmek', 'Yorumları kapatmak'],
        correctOption: 1,
        explanation: 'A/B testi en iyi performans gösteren kreatifi bulmak için yapılır.'
      },
      {
        question: 'Sosyal medyada CTA nedir?',
        options: ['Çağrı / yönlendirme ifadesi', 'Sunucu altyapısı', 'Kanal etiketi', 'Gizlilik ayarı'],
        correctOption: 0,
        explanation: 'CTA, kullanıcıdan istenen aksiyonu açıkça çağıran ifadedir.'
      }
    ]
  },
  {
    id: 'lq4',
    levelId: '4',
    levelTitle: 'Seviye 4: İçerik Pazarlaması',
    title: 'İçerik Pazarlaması Quiz',
    description: 'İçerik stratejisi, dağıtım ve performans ölçümü konularındaki bilginizi ölçer.',
    questions: [
      {
        question: 'TOFU içerikleri hangi aşamayı hedefler?',
        options: ['Farkındalık', 'Satın alma sonrası destek', 'Muhasebe', 'Kargo operasyonu'],
        correctOption: 0,
        explanation: 'TOFU içerikler farkındalık aşamasındaki kullanıcıyı hedefler.'
      },
      {
        question: 'Repurposing ne anlama gelir?',
        options: ['İçeriği silmek', 'İçeriği farklı formatlarda yeniden kullanmak', 'Sadece e-posta göndermek', 'Reklam bütçesi azaltmak'],
        correctOption: 1,
        explanation: 'Repurposing, içerikten daha fazla değer üretmek için format dönüşümüdür.'
      },
      {
        question: 'İçerik brief’te hangisi mutlaka olmalıdır?',
        options: ['Sadece renk paleti', 'Hedef kitle ve amaç', 'Sadece logo', 'Yalnızca yayın tarihi'],
        correctOption: 1,
        explanation: 'Hedef kitle ve amaç olmadan içerik yönsüz kalır.'
      },
      {
        question: 'BOFU içerik neye yakındır?',
        options: ['Satın alma kararı', 'Genel farkındalık', 'Trend eğlence', 'Sadece marka hikayesi'],
        correctOption: 0,
        explanation: 'BOFU, dönüşüm aşamasına yakın içeriktir.'
      },
      {
        question: 'İçerik performansında hangi metrik dönüşüm etkisini daha net gösterir?',
        options: ['Sayfa renk kodu', 'Dönüşüm oranı', 'Yazı karakteri sayısı', 'IP adresi'],
        correctOption: 1,
        explanation: 'Dönüşüm oranı, içerik etkisini iş sonucuna bağlar.'
      }
    ]
  },
  {
    id: 'lq5',
    levelId: '5',
    levelTitle: 'Seviye 5: E-posta Pazarlaması',
    title: 'E-posta Pazarlaması Genel Quiz',
    description: 'E-posta stratejisi, segmentasyon ve performans bilgisini test edin.',
    questions: [
      {
        question: 'Double opt-in avantajı nedir?',
        options: ['Liste kalitesini artırır', 'Gönderim maliyetini sıfırlar', 'Açılma oranını garanti eder', 'Spam’i artırır'],
        correctOption: 0,
        explanation: 'Double opt-in gerçek kullanıcı onayı ile liste kalitesini yükseltir.'
      },
      {
        question: 'Deliverability neyi ifade eder?',
        options: ['Tıklama oranı', 'Teslim edilebilirlik', 'Konu satırı uzunluğu', 'Tasarım puanı'],
        correctOption: 1,
        explanation: 'Deliverability e-postanın inbox’a düşme başarısını ifade eder.'
      },
      {
        question: 'Segmentasyonun temel amacı nedir?',
        options: ['Herkese aynı mesajı göndermek', 'İlgili kitleye ilgili mesaj iletmek', 'Listeyi küçültmek', 'Sadece kampanya isimlendirmek'],
        correctOption: 1,
        explanation: 'Segmentasyon doğru kişiye doğru içeriği göndermeyi sağlar.'
      },
      {
        question: 'A/B testinde genellikle ne kıyaslanır?',
        options: ['IP adresi', 'Konu satırı veya CTA varyasyonu', 'Sunucu markası', 'Dosya uzantısı'],
        correctOption: 1,
        explanation: 'A/B testi performans farkı yaratan varyasyonları ölçer.'
      },
      {
        question: 'E-posta ROI formülünde temel mantık nedir?',
        options: ['Gelir / tıklama', '(Gelir - maliyet) / maliyet', 'Açılma / gönderim', 'Abone / hafta'],
        correctOption: 1,
        explanation: 'ROI yatırımın geri dönüşünü maliyet bazında ölçer.'
      }
    ]
  },
  {
    id: 'lq6',
    levelId: '6',
    levelTitle: 'Seviye 6: Ücretli Reklamcılık',
    title: 'Ücretli Reklam Quiz',
    description: 'Kampanya hedefleme, teklif ve remarketing konularındaki bilginizi test edin.',
    questions: [
      {
        question: 'CPA neyi ifade eder?',
        options: ['Tıklama oranı', 'Edinim başı maliyet', 'Gösterim sayısı', 'Yayın frekansı'],
        correctOption: 1,
        explanation: 'CPA, dönüşüm başına ödenen maliyettir.'
      },
      {
        question: 'Remarketing hangi kitleyi hedefler?',
        options: ['Siteyle etkileşen kullanıcılar', 'Sadece çalışanlar', 'Rakip firmalar', 'Hiç kimse'],
        correctOption: 0,
        explanation: 'Remarketing, daha önce etkileşime giren kullanıcılara yeniden ulaşır.'
      },
      {
        question: 'ROAS hangi metriğin oranıdır?',
        options: ['Gelir / reklam harcaması', 'Tıklama / gösterim', 'Dönüşüm / ziyaret', 'Maliyet / dönüşüm'],
        correctOption: 0,
        explanation: 'ROAS reklam harcamasına karşı elde edilen geliri gösterir.'
      },
      {
        question: 'Frekansın aşırı yükselmesi hangi riski doğurur?',
        options: ['Reklam yorgunluğu', 'Daha düşük maliyet kesinliği', 'SEO artışı', 'E-posta teslim artışı'],
        correctOption: 0,
        explanation: 'Aynı kişiye çok sık reklam göstermek performansı düşürebilir.'
      },
      {
        question: 'Lookalike kitle neye dayanır?',
        options: ['Tesadüfi seçim', 'Benzer davranış profili', 'Sadece yaş aralığı', 'Sadece şehir'],
        correctOption: 1,
        explanation: 'Lookalike, mevcut değerli kitlenize benzeyen kullanıcıları hedefler.'
      }
    ]
  },
  {
    id: 'lq7',
    levelId: '7',
    levelTitle: 'Seviye 7: Analitik ve Ölçümleme',
    title: 'Analitik ve Ölçümleme Quiz',
    description: 'GA4, UTM, funnel ve KPI tasarımı konularında seviyeni ölç.',
    questions: [
      {
        question: 'UTM parametreleri neden kullanılır?',
        options: ['Kanal kaynak takibi için', 'Site hızını artırmak için', 'DNS ayarı için', 'Şifreleme için'],
        correctOption: 0,
        explanation: 'UTM parametreleri kampanya trafik kaynağını doğru izlemeyi sağlar.'
      },
      {
        question: 'Funnel darboğazı ne demektir?',
        options: ['Gereksiz sayfa renkleri', 'Huni aşamasında olağandışı düşüş', 'Daha fazla içerik', 'Yüksek takipçi sayısı'],
        correctOption: 1,
        explanation: 'Darboğaz, kullanıcı geçişlerinde kritik kayıp yaşanan noktadır.'
      },
      {
        question: 'KPI seçerken ilk kriter nedir?',
        options: ['Modaya uygun metrik', 'İş hedefiyle ilişki', 'Sadece kolay ölçüm', 'Sadece rakipte olması'],
        correctOption: 1,
        explanation: 'KPI doğrudan iş hedefini temsil etmelidir.'
      },
      {
        question: 'Dashboard tasarımında en kritik prensip nedir?',
        options: ['Çok fazla grafik eklemek', 'Karar odaklı sade görünüm', 'Sadece renk çeşitliliği', 'Uzun metin kullanımı'],
        correctOption: 1,
        explanation: 'Dashboard karar vermeyi kolaylaştırmalı, gürültüyü azaltmalıdır.'
      },
      {
        question: 'Event tabanlı ölçümleme hangi platformla öne çıkar?',
        options: ['GA4', 'FTP', 'SMTP', 'CMS'],
        correctOption: 0,
        explanation: 'GA4 event tabanlı veri modelini kullanır.'
      }
    ]
  },
  {
    id: 'lq8',
    levelId: '8',
    levelTitle: 'Seviye 8: Dijital Pazarlama Stratejisi',
    title: 'Strateji ve Entegrasyon Quiz',
    description: 'Entegre strateji, bütçe, operasyon ve kriz yönetimi bilgisini test edin.',
    questions: [
      {
        question: 'Entegre stratejide ilk adım nedir?',
        options: ['Kanal seçmeden önce iş hedefini netleştirmek', 'Sadece reklam bütçesi artırmak', 'Sadece içerik üretmek', 'Sadece sosyal medya açmak'],
        correctOption: 0,
        explanation: 'Kanal kararından önce hedef netleşmelidir.'
      },
      {
        question: 'Kanal rolleri neden tanımlanır?',
        options: ['Sadece sunumda iyi görünmesi için', 'Hedef ve KPI sorumluluğunu netleştirmek için', 'Bütçeyi gizlemek için', 'Takımı küçültmek için'],
        correctOption: 1,
        explanation: 'Kanal rolü netliği performans sahipliğini güçlendirir.'
      },
      {
        question: 'Kriz planında ilk 24 saat neden kritiktir?',
        options: ['Çünkü rapor yazımı uzun sürer', 'Algı ve hasar kontrolü bu sürede şekillenir', 'Sadece tasarım değişir', 'Metrikler değişmez'],
        correctOption: 1,
        explanation: 'İlk saatlerde doğru iletişim marka hasarını sınırlar.'
      },
      {
        question: 'Bütçe tahsisinde hangi yaklaşım daha sağlıklıdır?',
        options: ['Geçmiş performans + hedef + risk senaryosu', 'Sadece geçen yılın aynısı', 'Sadece en ucuz kanal', 'Rastgele dağıtım'],
        correctOption: 0,
        explanation: 'Veri ve hedef odaklı çoklu senaryo yaklaşımı en sağlıklıdır.'
      },
      {
        question: 'Stratejinin sürdürülebilirliği neye bağlıdır?',
        options: ['Tek seferlik kampanya', 'Süreç, ekip ritmi ve öğrenme döngüsü', 'Sadece bir rapor', 'Sadece yüksek bütçe'],
        correctOption: 1,
        explanation: 'Sürdürülebilir başarı operasyonel disiplin ve öğrenme döngüsü gerektirir.'
      }
    ]
  }
];

const deepDiveQuestionTemplates = [
  {
    question: (quiz) => `${quiz.levelTitle} kapsamında strateji belirlerken ilk kontrol edilmesi gereken nedir?`,
    options: ['Sadece tasarım tercihleri', 'İş hedefi ve KPI uyumu', 'Sadece rakip renk paleti', 'Sadece haftalık paylaşım sayısı'],
    correctOption: 1,
    explanation: 'Stratejinin etkili olabilmesi için hedef ve KPI uyumu temel şarttır.'
  },
  {
    question: () => 'A/B testinde güvenilir sonuç için hangi yaklaşım doğrudur?',
    options: ['Tek bir günde karar vermek', 'Yeterli örneklem ve net başarı metriği kullanmak', 'Sadece en ucuz seçeneği almak', 'Sadece ekip yorumuna bakmak'],
    correctOption: 1,
    explanation: 'A/B testinin güvenilirliği örneklem büyüklüğü ve net metrik tanımına bağlıdır.'
  },
  {
    question: () => 'Dönüşüm hunisi analizinde darboğaz neyi ifade eder?',
    options: ['Tüm metriklerin yükselmesi', 'Belirli adımda yüksek kayıp yaşanması', 'Ekip toplantılarının artması', 'Sadece içerik sayısının artması'],
    correctOption: 1,
    explanation: 'Darboğaz, kullanıcıların belirli bir adımda yoğun şekilde kaybedildiği noktadır.'
  },
  {
    question: () => 'Aşağıdakilerden hangisi veri odaklı karar örneğidir?',
    options: ['Sezgisel kanal seçimi', 'KPI trendine göre bütçe kaydırımı', 'Rastgele kreatif değişikliği', 'Sadece önceki yıl planını kopyalama'],
    correctOption: 1,
    explanation: 'Veri odaklı kararlar ölçüm sonuçlarına dayanır.'
  },
  {
    question: () => 'Segmentasyonun temel amacı nedir?',
    options: ['Tüm kullanıcılara aynı mesajı göstermek', 'Benzer özellikte kitlelere uygun mesaj iletmek', 'Yalnızca kampanya adını değiştirmek', 'Sadece teknik rapor üretmek'],
    correctOption: 1,
    explanation: 'Segmentasyon, doğru kişiye doğru mesajı ulaştırmayı sağlar.'
  },
  {
    question: () => 'Performans raporlarında hangi yaklaşım daha sağlıklıdır?',
    options: ['Tek metrik üzerinden karar', 'Ana ve yardımcı KPI seti ile değerlendirme', 'Sadece yorum bazlı rapor', 'Sadece görsel sayısı artırma'],
    correctOption: 1,
    explanation: 'Tek metrik yanıltabilir; KPI seti birlikte okunmalıdır.'
  },
  {
    question: () => 'Kanal seçiminde en kritik kriterlerden biri hangisidir?',
    options: ['Trend olduğu için seçmek', 'Hedef kitlenin kanal davranışı', 'Sadece düşük maliyet', 'Sadece ekip alışkanlığı'],
    correctOption: 1,
    explanation: 'Kanal seçimi hedef kitlenin davranışına göre yapılmalıdır.'
  },
  {
    question: () => 'Kampanya sonrası ilk aksiyon ne olmalıdır?',
    options: ['Hiç değerlendirme yapmamak', 'Sonuçları metrik bazında analiz etmek', 'Sadece bütçeyi artırmak', 'Tüm kanalları kapatmak'],
    correctOption: 1,
    explanation: 'Analiz olmadan iyileştirme yapılamaz.'
  },
  {
    question: () => 'Kaliteli içerik için hangi ifade doğrudur?',
    options: ['Sadece uzun olması yeterlidir', 'Kullanıcı niyetine ve probleme çözüm sunmalıdır', 'Sadece görsel yoğun olmalıdır', 'Sadece marka ismi tekrar etmelidir'],
    correctOption: 1,
    explanation: 'Kaliteli içerik kullanıcının ihtiyacına çözüm üretir.'
  },
  {
    question: () => 'Optimizasyon döngüsü hangi sırayla ilerlemelidir?',
    options: ['Uygula > Ölç > Hipotez kur', 'Ölç > Hipotez kur > Test et > Uygula', 'Sadece uygula', 'Sadece raporla'],
    correctOption: 1,
    explanation: 'Ölçüm ve hipotez tabanlı test yaklaşımı sürdürülebilir optimizasyon sağlar.'
  },
  {
    question: () => 'KPI hedefi belirlerken hangisi önemlidir?',
    options: ['Belirsiz hedefler', 'Zaman ve değer içeren ölçülebilir hedefler', 'Sadece rakibi kopyalama', 'Sadece ekip isteği'],
    correctOption: 1,
    explanation: 'Ölçülebilir, zaman bağlı KPI hedefleri takip edilebilirliği artırır.'
  },
  {
    question: () => 'Kreatif performansını iyileştirmek için ilk test alanı hangisi olabilir?',
    options: ['Sunucu markası', 'Başlık/mesaj varyasyonları', 'Dosya uzantısı', 'Ekip oturma düzeni'],
    correctOption: 1,
    explanation: 'Mesaj ve başlık değişkenleri performansı doğrudan etkiler.'
  },
  {
    question: () => 'Raporlama sıklığı nasıl belirlenmelidir?',
    options: ['Rastgele', 'Kanal hızı ve karar periyoduna göre', 'Yılda bir', 'Sadece problem olduğunda'],
    correctOption: 1,
    explanation: 'Raporlama ritmi karar alma temposuna uygun olmalıdır.'
  },
  {
    question: () => 'Başarılı kampanya sonrası en doğru yaklaşım hangisidir?',
    options: ['Öğrenimi dokümante etmeden geçmek', 'Öğrenimi standardize edip ölçeklemek', 'Sadece bütçe kesmek', 'Tüm testleri durdurmak'],
    correctOption: 1,
    explanation: 'Başarılı öğrenimlerin dokümantasyonu ölçeklenebilir başarı sağlar.'
  },
  {
    question: () => 'Kullanıcı yolculuğu analizi ne sağlar?',
    options: ['Sadece sosyal takipçi artışı', 'Temas noktalarını iyileştirerek dönüşüm fırsatı bulma', 'Sadece logo yenileme', 'Sadece e-posta arşivleme'],
    correctOption: 1,
    explanation: 'Yolculuk analizi kritik temas noktalarında iyileştirme alanlarını gösterir.'
  }
];

function buildExtendedQuestions(quiz) {
  const baseQuestions = quiz.questions || [];
  const deepDiveQuestions = deepDiveQuestionTemplates.map((template, index) => ({
    question: template.question(quiz),
    options: template.options,
    correctOption: template.correctOption,
    explanation: template.explanation,
    id: `${quiz.id}-extra-${index + 1}`
  }));

  const combined = [...baseQuestions, ...deepDiveQuestions].slice(0, 20);
  const levelSeed = Number(quiz.levelId || 1);
  return combined.map((question, index) => shuffleQuestionOptions(question, levelSeed + index));
}

export const levelQuizzes = baseLevelQuizzes.map((quiz) => ({
  ...quiz,
  questions: buildExtendedQuestions(quiz)
}));

function shuffleQuestionOptions(question, seed) {
  const options = Array.isArray(question.options) ? question.options : [];
  if (options.length <= 1) return question;

  const shift = seed % options.length;
  const rotatedOptions = [...options.slice(shift), ...options.slice(0, shift)];
  const oldCorrect = Number(question.correctOption || 0);
  const newCorrect = (oldCorrect - shift + options.length) % options.length;

  return {
    ...question,
    options: rotatedOptions,
    correctOption: newCorrect
  };
}

export const roadmapStages = levels.map((level) => ({
  id: `stage-${level.id}`,
  levelId: level.id,
  title: level.title,
  description: level.subtitle
}));

function parseDurationToMinutes(duration) {
  const parsed = Number.parseInt(String(duration), 10);
  return Number.isNaN(parsed) ? 120 : parsed;
}

function getModuleType(order) {
  const types = ['learning', 'activity', 'project', 'quiz'];
  return types[(order - 1) % types.length];
}

function getDifficulty(points) {
  if (points >= 250) return 'hard';
  if (points >= 170) return 'medium';
  return 'easy';
}

export const roadmapModules = allTasks.map((task) => ({
  id: `module-${task.id}`,
  stageId: `stage-${task.levelId}`,
  levelId: task.levelId,
  title: task.title,
  description: task.description,
  type: getModuleType(task.order),
  status: 'not-started',
  difficulty: getDifficulty(task.points),
  duration: parseDurationToMinutes(task.duration),
  taskCount: Array.isArray(task.tasks) ? task.tasks.length : 1,
  isRequired: true
}));

export function getTaskById(taskId) {
  return allTasks.find((task) => task.id === String(taskId)) || null;
}

export function getLevelById(levelId) {
  return levels.find((level) => level.id === String(levelId)) || null;
}

export function getQuizByLevelId(levelId) {
  return levelQuizzes.find((quiz) => quiz.levelId === String(levelId)) || levelQuizzes[0];
}
