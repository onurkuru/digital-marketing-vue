export const emailMarketingQuizzes = [
  {
    id: "eq-501",
    title: "E-posta Pazarlaması Temelleri Testi",
    description: "E-posta pazarlamasının temelleri, avantajları ve yasal gereklilikler hakkında bilginizi test edin.",
    questions: [
      {
        question: "Aşağıdakilerden hangisi e-posta pazarlamasının bir avantajı değildir?",
        options: [
          "Düşük maliyet",
          "Yüksek ROI",
          "Hızlı sonuçlar",
          "Her zaman %100 açılma oranı"
        ],
        correctOption: 3,
        explanation: "E-posta pazarlamasının birçok avantajı vardır, ancak %100 açılma oranı garanti edilemez. E-postaların açılma oranları kampanyadan kampanyaya değişiklik gösterir."
      },
      {
        question: "GDPR kapsamında e-posta pazarlaması için hangi izin türü gereklidir?",
        options: [
          "Örtülü izin",
          "Açık izin",
          "İzin gerekmez",
          "Sadece ticari e-postalar için izin"
        ],
        correctOption: 1,
        explanation: "GDPR kapsamında, e-posta pazarlaması için açık izin (explicit consent) gereklidir. Kullanıcılar açıkça e-posta almayı kabul etmelidir."
      },
      {
        question: "Aşağıdakilerden hangisi e-posta açılma oranını artıran bir faktördür?",
        options: [
          "Çok uzun konu satırları",
          "Kişiselleştirilmiş içerik",
          "Çok fazla emoji kullanımı",
          "Gönderici adı olarak 'noreply@' kullanmak"
        ],
        correctOption: 1,
        explanation: "Kişiselleştirilmiş içerik, e-posta açılma oranlarını önemli ölçüde artırır. Alıcıya özel içerik, ilgilerini çeker ve etkileşimi artırır."
      }
    ]
  },
  {
    id: "eq-502",
    title: "E-posta Listesi Oluşturma ve Segmentasyon Testi",
    description: "E-posta listesi oluşturma stratejileri ve segmentasyon teknikleri hakkında bilginizi test edin.",
    questions: [
      {
        question: "Aşağıdakilerden hangisi etkili bir lead magnet örneği değildir?",
        options: [
          "Ücretsiz e-kitap",
          "Webinar kaydı",
          "İndirim kuponu",
          "Abonelik faturası"
        ],
        correctOption: 3,
        explanation: "Abonelik faturası bir lead magnet değildir. Lead magnetler, kullanıcıların e-posta adreslerini vermek için değerli buldukları ücretsiz içerik veya tekliflerdir."
      },
      {
        question: "E-posta segmentasyonu nedir?",
        options: [
          "E-postaları farklı sunuculara bölmek",
          "Aboneleri belirli kriterlere göre gruplara ayırmak",
          "E-postaları farklı zamanlarda göndermek",
          "E-posta sunucusu seçme süreci"
        ],
        correctOption: 1,
        explanation: "E-posta segmentasyonu, aboneleri demografik bilgiler, davranışlar, satın alma geçmişi gibi çeşitli kriterlere göre gruplara ayırma işlemidir."
      },
      {
        question: "Double opt-in ne anlama gelir?",
        options: [
          "Kullanıcıların iki farklı e-posta listesine kaydolması",
          "Kullanıcıların aboneliklerini iki kez onaylaması",
          "İki farklı içerik türü için izin almak",
          "E-postayı iki farklı adrese göndermek"
        ],
        correctOption: 1,
        explanation: "Double opt-in, kullanıcıların önce bir form doldurduğu, ardından e-posta yoluyla gönderilen bir onay bağlantısına tıklayarak aboneliklerini doğruladığı iki aşamalı bir süreçtir."
      }
    ]
  },
  {
    id: "eq-503",
    title: "E-posta Tasarımı ve İçerik Oluşturma Testi",
    description: "Etkili e-posta tasarımı ve içerik oluşturma stratejileri hakkında bilginizi test edin.",
    questions: [
      {
        question: "Mobil uyumlu e-posta tasarımında dikkat edilmesi gereken en önemli unsur nedir?",
        options: [
          "Büyük dosya boyutu",
          "Çok kolonlu tasarım",
          "Tek kolonlu basit tasarım",
          "Çok sayıda resim kullanımı"
        ],
        correctOption: 2,
        explanation: "Mobil uyumlu e-posta tasarımında tek kolonlu basit tasarım kullanmak en önemli unsurdur. Bu sayede içerik küçük ekranlarda bile rahatça okunabilir."
      },
      {
        question: "Etkili bir CTA (Call to Action) için hangisi doğrudur?",
        options: [
          "E-postada mümkün olduğunca çok CTA bulunmalıdır",
          "CTA belirsiz olmalıdır (örn. 'Tıkla')",
          "CTA belirgin ve eylem odaklı olmalıdır (örn. 'Şimdi İncele')",
          "CTA e-postanın en altında küçük bir şekilde yer almalıdır"
        ],
        correctOption: 2,
        explanation: "Etkili bir CTA belirgin, eylem odaklı olmalı ve kullanıcıya ne yapması gerektiğini açıkça söylemelidir. 'Şimdi İncele', 'Hemen Başvur' gibi ifadeler daha etkilidir."
      },
      {
        question: "A/B testi e-posta pazarlamasında neyi ölçmek için kullanılır?",
        options: [
          "E-posta sunucusunun hızını",
          "Farklı e-posta versiyonlarının performansını",
          "Abonelerin e-posta okuma hızını",
          "E-posta boyutunu"
        ],
        correctOption: 1,
        explanation: "A/B testi, iki farklı e-posta versiyonunun (konu satırı, içerik, tasarım vb.) hangisinin daha iyi performans gösterdiğini belirlemek için kullanılır."
      }
    ]
  },
  {
    id: "eq-504",
    title: "E-posta Otomasyonu Testi",
    description: "E-posta otomasyonu ve otomatik akışlar hakkında bilginizi test edin.",
    questions: [
      {
        question: "Drip kampanyası nedir?",
        options: [
          "Sadece indirim kuponları içeren e-postalar",
          "Önceden belirlenmiş bir programa göre gönderilen bir dizi e-posta",
          "Tıklanma oranı düşük olan e-postalar",
          "Sadece görsel içeren e-postalar"
        ],
        correctOption: 1,
        explanation: "Drip kampanyası, belirli bir zaman çizelgesine göre veya kullanıcı davranışlarına bağlı olarak otomatik olarak gönderilen bir dizi e-postadır."
      },
      {
        question: "Hoş geldin e-posta serisi genellikle ne zaman tetiklenir?",
        options: [
          "Kullanıcı bir satın alma yaptığında",
          "Kullanıcı e-postayı açtığında",
          "Kullanıcı listeye kaydolduğunda",
          "Kullanıcı web sitesini ziyaret ettiğinde"
        ],
        correctOption: 2,
        explanation: "Hoş geldin e-posta serisi, kullanıcı e-posta listesine kaydolduğunda tetiklenir ve genellikle markanın tanıtımını yapan, değer sunan bir dizi e-postadan oluşur."
      },
      {
        question: "Aşağıdakilerden hangisi e-posta otomasyonu için uygun bir senaryo değildir?",
        options: [
          "Terk edilmiş sepet hatırlatmaları",
          "Doğum günü kutlama mesajları",
          "Satın alma sonrası teşekkür e-postaları",
          "Her e-postanın manuel olarak gönderilmesi"
        ],
        correctOption: 3,
        explanation: "Her e-postanın manuel olarak gönderilmesi, e-posta otomasyonunun tam tersidir. Otomasyon, e-postaların belirli tetikleyicilere dayalı olarak otomatik gönderilmesini sağlar."
      }
    ]
  },
  {
    id: "eq-505",
    title: "E-posta Analizi ve Optimizasyon Testi",
    description: "E-posta kampanyası analizi ve performans optimizasyonu hakkında bilginizi test edin.",
    questions: [
      {
        question: "Bounce rate (geri dönüş oranı) neyi ifade eder?",
        options: [
          "Açılan e-postaların yüzdesini",
          "Tıklanan bağlantıların yüzdesini",
          "Teslim edilemeyen e-postaların yüzdesini",
          "Yanıtlanan e-postaların yüzdesini"
        ],
        correctOption: 2,
        explanation: "Bounce rate (geri dönüş oranı), çeşitli nedenlerle (geçersiz adres, dolu posta kutusu vb.) alıcıya teslim edilemeyen e-postaların yüzdesini ifade eder."
      },
      {
        question: "E-posta pazarlamasında ROI nasıl hesaplanır?",
        options: [
          "(Kazanç - Maliyet) / Maliyet × 100",
          "Toplam Gelir / Açılma Oranı",
          "Tıklama Sayısı / Gönderim Sayısı",
          "Abone Sayısı / Maliyet"
        ],
        correctOption: 0,
        explanation: "E-posta pazarlamasında ROI (Yatırım Getirisi), (Kazanç - Maliyet) / Maliyet × 100 formülü ile hesaplanır ve genellikle yüzde olarak ifade edilir."
      },
      {
        question: "Deliverability (teslim edilebilirlik) oranını artırmak için en etkili yöntem hangisidir?",
        options: [
          "Daha fazla e-posta göndermek",
          "Liste temizliği yapmak ve etkileşime girmeyen aboneleri çıkarmak",
          "Daha büyük dosya boyutları kullanmak",
          "Konu satırlarında 'Ücretsiz' gibi kelimeler kullanmak"
        ],
        correctOption: 1,
        explanation: "Liste temizliği yapmak ve etkileşime girmeyen aboneleri çıkarmak, deliverability (teslim edilebilirlik) oranını artırmak için en etkili yöntemdir. Bu, spam şikayetlerini azaltır ve gönderen itibarını iyileştirir."
      }
    ]
  }
]; 