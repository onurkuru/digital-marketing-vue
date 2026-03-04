import { marked } from 'marked';

export const renderMarkdown = (markdownText) => {
  return marked.parse(markdownText);
};

export const fundamentalsMarkdown = `# Dijital Pazarlama Temelleri

## Dijital Pazarlama Nedir?

Dijital pazarlama, bir ürün veya hizmeti tanıtmak için dijital kanalları kullanma sürecidir. Arama motorlarından sosyal medya platformlarına kadar çeşitli dijital kanallar bu kapsamda değerlendirilir. Geleneksel pazarlamada olduğu gibi dijital pazarlama da potansiyel müşterilere ulaşmayı ve potansiyel müşteri ya da satış yaratmayı amaçlar.

### Dijital Pazarlamanın Geleneksel Pazarlamadan Farkları:

1. **Veri Odaklılık**: Dijital pazarlama çok daha veri odaklıdır. İşletmeler, müşteri davranışlarından kampanyalarının sonuçlarına kadar her şeyi gerçek zamanlı olarak takip edebilir.

2. **Etkileşim**: Dijital pazarlama daha etkileşimli ve ilgi çekicidir. Müşteriler geri bildirimde bulunabilir ve geleneksel pazarlamada mümkün olmayan bir şekilde markayla etkileşime geçebilir.

3. **Maliyet Verimliliği**: Dijital pazarlama geleneksel pazarlamaya göre daha uygun maliyetlidir. Daha az parayla daha geniş bir kitleye ulaşılabilir.

4. **Hedefleme**: Dijital pazarlama daha hedefe yöneliktir, bu da kimsenin görmeyeceği reklamlara para harcama olasılığını düşürür.

## Dijital Pazarlama Kanalları

İşletmelerin hedef müşterilerine ulaşmak için kullanabilecekleri çeşitli dijital pazarlama kanalları bulunmaktadır:

### 1. Arama Motoru Optimizasyonu (SEO)
SEO, web sitesini Google gibi arama motorları için optimize etme sürecidir. Web sitesini optimize etmek, arama sonuçlarındaki sıralamayı iyileştirerek daha fazla trafik ve potansiyel müşteri elde etmeyi sağlar.

### 2. İçerik Pazarlama
İçerik pazarlama, hedef kitlenin ilgisini çekecek değerli, ilgili ve ilgi çekici içerikler oluşturmaktır. Blog yazıları, e-kitaplar, infografikler ve video gibi yüksek kaliteli içerikler bu kapsamda değerlendirilir.

### 3. Sosyal Medya Pazarlama
Sosyal medya pazarlama, markanızı tanıtmak için Facebook, Twitter ve Instagram gibi sosyal medya platformlarını kullanmaktır. İlgi çekici içerikler oluşturup paylaşarak daha geniş bir kitleye ulaşabilir ve daha fazla potansiyel müşteri oluşturabilirsiniz.`;

export const strategiesMarkdown = `# Dijital Pazarlama Stratejileri ve Taktikleri

## 1. Arama Motoru Optimizasyonu (SEO)
SEO, web sitesini arama motor sonuç sayfalarında daha yüksek sıralamaya ulaştırmak için optimize etme sürecidir. Bu, web sitesinin trafik miktarını artırma işlemidir. SEO sadece anahtar kelime yerleştirmekten ibaret değildir. Aynı zamanda web sitenizin teknik yapısını iyileştirmeyi ve kullanıcı deneyimini geliştirmeyi içerir.

## 2. Sosyal Medya Pazarlaması
Sosyal medya pazarlaması, marka bilinirliğini artırmak, trafik eklemek ve işletme için potansiyel müşteriler oluşturmak için marka ve içeriği sosyal medya kanallarında teşvik etmektir. Facebook, Twitter, LinkedIn, Instagram, Snapchat, Pinterest ve Google+ sosyal medya pazarlamasında kullanabilen kanallar arasındadır.

## 3. İçerik Pazarlaması
İçerik pazarlaması, marka bilinirliği, trafik artışı, müşteri adayları ve müşteriler oluşturmak amacıyla içerik varlıklarının oluşturulmasını ve tanıtımını ifade eder. Blog yazıları, videolar ve infografikler gibi içerik türleri, müşterilerinizle anlamlı bir bağ kurmanızı sağlar. Dahası, bu tür içerikler SEO performansınızı da artırabilir.`;

export const researchMarkdown = `# Dijital Pazarlama Eğitim Yolculuğu

Dijital pazarlama alanında yeni başlayanlar için bir öğrenme yolculuğu oluşturmak amacıyla, çeşitli kaynaklardan kapsamlı bir araştırma yaptım. Bu araştırma sonucunda, dijital pazarlamanın temel kavramlarını, stratejilerini ve taktiklerini içeren bilgileri topladım.

## Araştırma Kaynakları

1. [Yeni Başlayanlar İçin Dijital Pazarlamanın Temelleri - IIENSTITU](https://www.iienstitu.com/blog/yeni-baslayanlar-icin-dijital-pazarlamanin-temelleri)
2. [Yeni Başlayanlar İçin Dijital Pazarlama Rehberi - Dijitork](https://www.dijitork.com/yeni-baslayanlar-icin-dijital-pazarlama-rehberi/)
3. [Dijital Pazarlama Temelleri | Başlangıç Rehberi - LEVELUP](https://levelupagency.com.tr/dijital-pazarlama-temelleri/)`;

export const roadmapTasks = [
  {
    title: 'Dijital Pazarlama Temelleri',
    status: 'Completed',
    href: '/fundamentals'
  },
  {
    title: 'Arama Motoru Optimizasyonu (SEO)',
    status: 'In Progress',
    href: '/strategies'
  },
  {
    title: 'İçerik Pazarlama',
    status: 'In Progress',
    href: '/strategies'
  },
  {
    title: 'Sosyal Medya Pazarlama',
    status: 'Not Started',
    href: '/strategies'
  },
  {
    title: 'E-posta Pazarlama',
    status: 'Not Started',
    href: '/strategies'
  },
  {
    title: 'Tıklama Başına Ödeme (PPC) Reklamcılığı',
    status: 'Not Started',
    href: '/strategies'
  }
]; 