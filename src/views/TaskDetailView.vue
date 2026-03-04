<template>
  <div class="task-detail-view">
    <div class="page-header">
      <div class="breadcrumbs">
        <router-link to="/">Ana Sayfa</router-link> 
        <span class="separator">/</span>
        <router-link :to="'/level/' + task.levelId">{{ getLevelTitle(task.levelId) }}</router-link>
        <span class="separator">/</span>
        <span>Görev</span>
      </div>
      
      <h1>{{ task.title }}</h1>
      <div class="task-meta">
        <div class="task-status" :class="getStatusClass(task.status)">
          {{ task.status }}
        </div>
        <div class="task-deadline">
          <span class="icon">⏰</span>
          <span>Teslim Tarihi: {{ task.deadline }}</span>
        </div>
      </div>
    </div>
    
    <div class="task-content card">
      <h2>Görev Açıklaması</h2>
      <p class="task-description">{{ task.description }}</p>
      
      <div class="task-instructions">
        <h3>Görev Adımları</h3>
        <div class="steps-container">
          <div v-for="(step, index) in task.steps" :key="index" class="step-item">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-description">{{ step.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="task-resources card">
      <h2>Kaynaklar</h2>
      <div class="resources-list">
        <div v-for="(resource, index) in task.resources" :key="index" class="resource-item">
          <div class="resource-icon" :class="resource.type">
            <span v-if="resource.type === 'document'" class="icon">📄</span>
            <span v-else-if="resource.type === 'video'" class="icon">🎬</span>
            <span v-else-if="resource.type === 'link'" class="icon">🔗</span>
            <span v-else class="icon">📚</span>
          </div>
          <div class="resource-details">
            <div class="resource-title">{{ resource.title }}</div>
            <div class="resource-description" v-if="resource.description">{{ resource.description }}</div>
          </div>
          <a :href="resource.url" target="_blank" class="btn btn-outline">Görüntüle</a>
        </div>
      </div>
    </div>
    
    <div class="task-submission card">
      <h2>Görev Teslimi</h2>
      
      <div v-if="task.status === 'Tamamlandı'" class="submission-complete">
        <div class="success-icon">✓</div>
        <div class="success-message">
          <h3>Tebrikler! Bu görevi tamamladınız.</h3>
          <p>{{ task.completedDate }} tarihinde tamamlandı</p>
        </div>
      </div>
      
      <div v-else class="submission-form">
        <div class="form-group">
          <label for="taskNotes">Görev Notları</label>
          <textarea 
            id="taskNotes" 
            v-model="submissionNotes" 
            rows="4" 
            placeholder="Görevle ilgili notlarınızı buraya yazın..."
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button @click="saveProgress" class="btn btn-secondary">İlerlemeyi Kaydet</button>
          <button @click="completeTask" class="btn btn-primary">Görevi Tamamla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      submissionNotes: '',
      tasks: [
        {
          id: '101',
          levelId: '1',
          title: 'Task 1.1: Digital Marketing 101',
          description: 'Dijital pazarlamanın temellerini, avantajlarını ve çeşitli kanallarını öğrenin.',
          status: 'Tamamlandı',
          deadline: '10.04.2025',
          completedDate: '05.04.2025',
          steps: [
            {
              title: 'Dijital Pazarlama Kavramlarını Öğrenin',
              description: 'Dijital pazarlamanın ne olduğunu ve geleneksel pazarlamadan farklarını anlayın.'
            },
            {
              title: 'Farklı Dijital Pazarlama Kanallarını İnceleyin',
              description: 'SEO, içerik pazarlama, sosyal medya gibi dijital pazarlama kanallarını ve stratejilerini öğrenin.'
            },
            {
              title: 'Temel Kavramlar İçin Notlar Çıkarın',
              description: 'Öğrendiklerinizden kendi notlarınızı çıkararak kavramları daha iyi anlamlayın.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'Dijital Pazarlama Temelleri Rehberi',
              description: 'Başlangıç seviyesi dijital pazarlama kavramlarının detaylı açıklamaları',
              url: '#'
            },
            {
              type: 'video',
              title: 'Dijital Pazarlama Giriş Videosu',
              description: '15 dakikalık dijital pazarlama tanıtım videosu',
              url: '#'
            }
          ]
        },
        {
          id: '102',
          levelId: '1',
          title: 'Task 1.2: Temel Terminoloji',
          description: 'Dijital pazarlama terminolojisini öğrenerek sektördeki terimlere hakim olun.',
          status: 'Devam Ediyor',
          deadline: '17.04.2025',
          steps: [
            {
              title: 'Dijital Pazarlama Sözlüğünü İnceleyin',
              description: 'Terimleri ve açıklamalarını okuyarak dijital pazarlama dilini öğrenin.'
            },
            {
              title: 'Kendi Terim Kartlarınızı Oluşturun',
              description: 'En önemli 20 terimi seçip kendi notlarınızla birlikte kartlar halinde düzenleyin.'
            },
            {
              title: 'Terminoloji Quiz\'ini Tamamlayın',
              description: 'Öğrendiğiniz terimleri test edin ve bilginizi pekiştirin.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'Dijital Pazarlama Terimleri Sözlüğü',
              description: '100+ dijital pazarlama terimi ve açıklamaları',
              url: '#'
            },
            {
              type: 'video',
              title: 'Terminoloji Eğitim Videosu',
              description: 'Sektör profesyonelleri tarafından kullanılan terimlerin açıklandığı video',
              url: '#'
            }
          ]
        },
        {
          id: '103',
          levelId: '1',
          title: 'Task 1.3: Marka Hedefleri',
          description: 'Dijital pazarlama hedeflerinizi belirleyin ve marka stratejisi geliştirin.',
          status: 'Henüz Başlanmadı',
          deadline: '24.04.2025',
          steps: [
            {
              title: 'Hedef Kitle Analizi',
              description: 'Örnek bir marka için hedef kitle analizi yapın ve persona oluşturun.'
            },
            {
              title: 'Pazarlama Hedefleri Belirleme',
              description: 'SMART (Spesifik, Ölçülebilir, Ulaşılabilir, İlgili, Zaman Çerçevesi) prensiplerine uygun hedefler oluşturun.'
            },
            {
              title: 'Marka Konumlandırma Stratejisi',
              description: 'Markanın pazardaki konumunu ve rekabet avantajını belirleyin.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'Marka Stratejisi Şablonu',
              description: 'Adım adım marka stratejisi geliştirme rehberi',
              url: '#'
            },
            {
              type: 'link',
              title: 'Dijital Pazarlama Hedefleri Örnek Çalışması',
              description: 'Başarılı markalardan gerçek örnekler',
              url: '#'
            }
          ]
        },
        {
          id: '201',
          levelId: '2',
          title: 'Task 2.1: Anahtar Kelime Araştırması',
          description: 'Anahtar kelime araştırması yaparak hedef kitlenizin arama davranışlarını anlayın.',
          status: 'Henüz Başlanmadı',
          deadline: '01.05.2025',
          steps: [
            {
              title: 'Anahtar Kelime Araştırma Temellerini Öğrenin',
              description: 'Anahtar kelime araştırmasının ne olduğunu ve neden önemli olduğunu anlayın.'
            },
            {
              title: 'Araştırma Araçlarını Kullanın',
              description: 'Google Keyword Planner, Ahrefs veya SEMrush gibi araçları kullanarak anahtar kelime araştırması yapın.'
            },
            {
              title: 'Bir Anahtar Kelime Listesi Oluşturun',
              description: 'Seçtiğiniz bir niş için kapsamlı bir anahtar kelime listesi hazırlayın.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'Anahtar Kelime Araştırma Rehberi',
              description: 'Adım adım anahtar kelime araştırma süreci',
              url: '#'
            },
            {
              type: 'video',
              title: 'SEO için Anahtar Kelime Araştırması',
              description: 'Uzman tarafından anlatılan detaylı anahtar kelime araştırma süreci',
              url: '#'
            }
          ]
        },
        {
          id: '501',
          levelId: '5',
          title: 'E-posta Pazarlamasına Giriş',
          description: 'E-posta pazarlamasının temellerini, önemini ve başarılı e-posta kampanyalarının bileşenlerini öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '29.08.2025',
          steps: [
            {
              title: 'E-posta Pazarlaması Kavramları',
              description: 'E-posta pazarlamasının ne olduğunu ve dijital pazarlamadaki önemini anlayın.'
            },
            {
              title: 'E-posta Pazarlaması Metrikleri',
              description: 'Açılma oranı, tıklama oranı, dönüşüm oranı gibi önemli metrikleri öğrenin.'
            },
            {
              title: 'GDPR ve Yasal Gereklilikler',
              description: 'E-posta pazarlamasında uyulması gereken yasal düzenlemeleri ve GDPR\'ı öğrenin.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'E-posta Pazarlaması Rehberi',
              description: 'Kapsamlı e-posta pazarlama rehberi',
              url: '#'
            },
            {
              type: 'video',
              title: 'E-posta Pazarlamasının Temelleri',
              description: 'E-posta pazarlaması eğitim videosu',
              url: '#'
            }
          ]
        },
        {
          id: '502',
          levelId: '5',
          title: 'E-posta Listesi Oluşturma ve Segmentasyon',
          description: 'Kaliteli bir e-posta listesi oluşturma, büyütme ve etkili segmentasyon stratejileri geliştirme konularını öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '05.09.2025',
          steps: [
            {
              title: 'Liste Büyütme Stratejileri',
              description: 'E-posta listesi oluşturma ve büyütme için etkili stratejiler geliştirin.'
            },
            {
              title: 'Lead Magnet Oluşturma',
              description: 'E-posta listesi büyütmek için lead magnet tasarlayın.'
            },
            {
              title: 'Segmentasyon Teknikleri',
              description: 'E-posta listesini segmentlere ayırma teknikleri ve faydalarını öğrenin.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'E-posta Listesi Büyütme Rehberi',
              description: 'Liste büyütme stratejileri ve taktikleri',
              url: '#'
            },
            {
              type: 'video',
              title: 'Segmentasyon Eğitimi',
              description: 'E-posta segmentasyonu uygulama videosu',
              url: '#'
            }
          ]
        },
        {
          id: '503',
          levelId: '5',
          title: 'E-posta Tasarımı ve İçerik Oluşturma',
          description: 'Etkili e-posta tasarımı ve içerik oluşturma tekniklerini öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '12.09.2025',
          steps: [
            {
              title: 'E-posta Tasarım Prensipleri',
              description: 'Mobil uyumlu e-posta tasarımı prensiplerini öğrenin.'
            },
            {
              title: 'Etkili Konu Satırları',
              description: 'Yüksek açılma oranı elde edecek konu satırları yazma teknikleri.'
            },
            {
              title: 'Call-to-Action (CTA) Optimizasyonu',
              description: 'Etkili CTA butonları oluşturma ve optimize etme.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'E-posta Tasarım Best Practices',
              description: 'Etkili e-posta tasarımı için en iyi uygulamalar',
              url: '#'
            },
            {
              type: 'video',
              title: 'A/B Test Nasıl Yapılır?',
              description: 'A/B testleriyle e-posta performansını artırma',
              url: '#'
            }
          ]
        },
        {
          id: '504',
          levelId: '5',
          title: 'E-posta Otomasyonu',
          description: 'E-posta otomasyonunun temellerini ve müşteri yolculuğuna göre otomasyon akışları oluşturmayı öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '19.09.2025',
          steps: [
            {
              title: 'E-posta Otomasyonu Temelleri',
              description: 'Otomasyon kavramları ve temel prensipleri.'
            },
            {
              title: 'Drip Kampanyaları',
              description: 'Etkili drip kampanyaları oluşturma ve yönetme.'
            },
            {
              title: 'Müşteri Yolculuğu Haritalama',
              description: 'Müşteri yolculuğuna göre e-posta akışları tasarlama.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'E-posta Otomasyonu Rehberi',
              description: 'Kapsamlı e-posta otomasyon rehberi',
              url: '#'
            },
            {
              type: 'video',
              title: 'Otomasyon Platformları Karşılaştırması',
              description: 'Popüler e-posta otomasyon platformlarının karşılaştırması',
              url: '#'
            }
          ]
        },
        {
          id: '505',
          levelId: '5',
          title: 'E-posta Analizi ve Optimizasyon',
          description: 'E-posta kampanyalarının performansını analiz etme ve optimizasyon stratejileri geliştirme konularını öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '26.09.2025',
          steps: [
            {
              title: 'Temel ve İleri Düzey Metrikler',
              description: 'E-posta performans metriklerini anlama ve yorumlama.'
            },
            {
              title: 'Deliverability Yönetimi',
              description: 'E-postaların ulaşılabilirliğini artırma teknikleri.'
            },
            {
              title: 'ROI Hesaplama',
              description: 'E-posta kampanyalarında yatırım getirisi hesaplama yöntemleri.'
            }
          ],
          resources: [
            {
              type: 'document',
              title: 'E-posta Metrikleri Detaylı Rehber',
              description: 'E-posta metrikleri ve analizi hakkında kapsamlı rehber',
              url: '#'
            },
            {
              type: 'video',
              title: 'Optimizasyon Teknikleri',
              description: 'E-posta kampanyalarını optimize etme yöntemleri',
              url: '#'
            }
          ]
        }
      ]
    }
  },
  computed: {
    task() {
      return this.tasks.find(task => task.id === this.id) || {}
    }
  },
  methods: {
    getLevelTitle(levelId) {
      const levels = {
        '1': 'Seviye 1: Temel Kavramlar',
        '2': 'Seviye 2: SEO Temelleri',
        '3': 'Seviye 3: Sosyal Medya',
        '5': 'Seviye 5: E-posta Pazarlaması'
      }
      return levels[levelId] || 'Seviye'
    },
    getStatusClass(status) {
      if (status === 'Tamamlandı') return 'completed'
      if (status === 'Devam Ediyor') return 'in-progress'
      return 'not-started'
    },
    saveProgress() {
      alert('İlerlemeniz kaydedildi!')
    },
    completeTask() {
      alert('Tebrikler! Görev tamamlandı.')
      this.$router.push('/level/' + this.task.levelId)
    }
  }
}
</script>

<style scoped>
.task-detail-view {
  margin-bottom: 2rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.breadcrumbs a {
  color: #0d6efd;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.separator {
  color: #6c757d;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}

.task-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.task-status.completed {
  background-color: #d4edda;
  color: #155724;
}

.task-status.in-progress {
  background-color: #fff3cd;
  color: #856404;
}

.task-status.not-started {
  background-color: #e9ecef;
  color: #6c757d;
}

.task-deadline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.task-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.steps-container {
  margin-top: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #e9ecef;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-description {
  font-size: 0.95rem;
  color: #495057;
}

.resources-list {
  margin-top: 1rem;
}

.resource-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  background-color: #e9ecef;
}

.resource-icon.document {
  background-color: #e3f2fd;
  color: #0d6efd;
}

.resource-icon.video {
  background-color: #ffebee;
  color: #f44336;
}

.resource-icon.link {
  background-color: #e8f5e9;
  color: #4caf50;
}

.resource-details {
  flex: 1;
}

.resource-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.resource-description {
  font-size: 0.9rem;
  color: #6c757d;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
}

.btn-outline {
  border: 1px solid #dee2e6;
  background-color: transparent;
  color: #495057;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.submission-complete {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #d4edda;
  border-radius: 8px;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.success-message h3 {
  margin-bottom: 0.25rem;
  color: #155724;
}

.success-message p {
  color: #155724;
  font-size: 0.9rem;
}

.submission-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 0.95rem;
  font-family: inherit;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}
</style> 