import { emailMarketingQuizzes } from './email-marketing-quiz';

// Digital Marketing Quizzes
export const quizzes = [
  {
    id: 'q101',
    title: 'Dijital Pazarlamaya Giriş',
    levelId: '1',
    taskId: '101',
    description: 'Dijital pazarlamanın temel kavramlarını ne kadar biliyorsunuz?',
    timeLimit: 15, // minutes
    passingScore: 70,
    pointsPerQuestion: 20,
    questions: [
      {
        id: 'q101-1',
        text: 'Dijital pazarlama nedir?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Sadece sosyal medya üzerinden yapılan pazarlama' },
          { id: 'b', text: 'Dijital kanallar ve teknolojiler aracılığıyla ürün ve hizmetlerin pazarlanması' },
          { id: 'c', text: 'Sadece e-posta yoluyla yapılan pazarlama kampanyaları' },
          { id: 'd', text: 'Dijital ekranlarda gösterilen reklamlar' }
        ],
        correctAnswer: 'b',
        explanation: 'Dijital pazarlama, internet ve dijital teknolojilerin kullanıldığı tüm pazarlama çabalarını kapsar. Bu, sosyal medya, arama motorları, e-posta, web siteleri ve diğer dijital kanalları içerir.'
      },
      {
        id: 'q101-2',
        text: 'Dijital pazarlamanın geleneksel pazarlamaya göre avantajlarından biri hangisi değildir?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Daha düşük maliyet' },
          { id: 'b', text: 'Daha kolay ölçümlenebilir sonuçlar' },
          { id: 'c', text: 'Daha yüksek erişim garantisi' },
          { id: 'd', text: 'Daha iyi hedefleme imkanı' }
        ],
        correctAnswer: 'c',
        explanation: 'Dijital pazarlama her zaman daha yüksek erişim garantisi vermez. Erişim, stratejinin kalitesine ve uygulama başarısına bağlıdır. Diğer seçenekler dijital pazarlamanın gerçek avantajlarıdır.'
      },
      {
        id: 'q101-3',
        text: 'Aşağıdakilerden hangisi bir dijital pazarlama kanalı değildir?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'E-posta pazarlaması' },
          { id: 'b', text: 'Arama motoru optimizasyonu (SEO)' },
          { id: 'c', text: 'Gazete ilanları' },
          { id: 'd', text: 'Sosyal medya pazarlaması' }
        ],
        correctAnswer: 'c',
        explanation: 'Gazete ilanları geleneksel bir pazarlama kanalıdır, dijital değildir. Diğer seçenekler dijital pazarlama kanallarıdır.'
      },
      {
        id: 'q101-4',
        text: 'Dijital pazarlamanın ölçülebilirliği ne anlama gelir?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Kampanyaların sadece bütçelerinin ölçülebilmesi' },
          { id: 'b', text: 'Reklamların sadece görüntülenme sayısının ölçülebilmesi' },
          { id: 'c', text: 'Kampanyaların performansının ve ROI\'nin gerçek zamanlı olarak takip edilebilmesi' },
          { id: 'd', text: 'Sadece sosyal medya etkileşimlerinin ölçülebilmesi' }
        ],
        correctAnswer: 'c',
        explanation: 'Dijital pazarlamanın en önemli avantajlarından biri, kampanyaların performansının ve yatırım getirisinin (ROI) gerçek zamanlı olarak takip edilebilmesi ve analiz edilebilmesidir.'
      },
      {
        id: 'q101-5',
        text: 'Aşağıdakilerden hangisi dijital pazarlamanın temel amaçlarından biri değildir?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Marka bilinirliğini artırmak' },
          { id: 'b', text: 'Müşteri deneyimini iyileştirmek' },
          { id: 'c', text: 'Rakiplerle gerçek zamanlı tartışma ortamı oluşturmak' },
          { id: 'd', text: 'Satışları artırmak' }
        ],
        correctAnswer: 'c',
        explanation: 'Dijital pazarlamanın amacı rakiplerle tartışmak değil, kendi markasının değerini artırmak, müşteri deneyimini iyileştirmek, marka bilinirliğini artırmak ve sonuçta satışları artırmaktır.'
      }
    ]
  },
  {
    id: 'q102',
    title: 'Dijital Pazarlama Terminolojisi',
    levelId: '1',
    taskId: '102',
    description: 'Dijital pazarlama alanındaki terim ve kavramları ne kadar iyi biliyorsunuz?',
    timeLimit: 20,
    passingScore: 70,
    pointsPerQuestion: 15,
    questions: [
      {
        id: 'q102-1',
        text: 'SEO neyin kısaltmasıdır?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Search Engine Organization' },
          { id: 'b', text: 'Social Engine Optimization' },
          { id: 'c', text: 'Search Engine Optimization' },
          { id: 'd', text: 'System Engine Operation' }
        ],
        correctAnswer: 'c',
        explanation: 'SEO, Search Engine Optimization\'ın kısaltmasıdır ve Türkçe\'de Arama Motoru Optimizasyonu anlamına gelir. Web sitelerinin arama motorlarında daha iyi sıralanması için yapılan çalışmaları ifade eder.'
      },
      {
        id: 'q102-2',
        text: 'CPC neyin kısaltmasıdır?',
        type: 'multiple-choice',
        options: [
          { id: 'a', text: 'Cost Per Click' },
          { id: 'b', text: 'Click Per Cost' },
          { id: 'c', text: 'Content Per Click' },
          { id: 'd', text: 'Cost Per Campaign' }
        ],
        correctAnswer: 'a',
        explanation: 'CPC, Cost Per Click\'in kısaltmasıdır ve Türkçe\'de Tıklama Başına Maliyet anlamına gelir. Dijital reklamcılıkta, bir reklama yapılan her tıklama için ödenen tutarı ifade eder.'
      }
    ]
  },
  ...emailMarketingQuizzes
]; 