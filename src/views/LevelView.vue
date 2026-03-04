<template>
  <div class="level-view">
    <div class="page-header">
      <div class="breadcrumbs">
        <router-link to="/">Ana Sayfa</router-link> 
        <span class="separator">/</span>
        <router-link to="/roadmap">Öğrenme Yolculuğu</router-link>
        <span class="separator">/</span>
        <span>{{ level.title }}</span>
      </div>
      
      <h1>{{ level.title }}</h1>
      <p class="subtitle">{{ level.description }}</p>
    </div>
    
    <!-- Level Progress -->
    <div class="level-progress card">
      <div class="progress-info">
        <div class="progress-stats">
          <div class="progress-stat">
            <div class="stat-label">Tamamlanan İçerik</div>
            <div class="stat-value">{{ level.completedContent }}/{{ level.totalContent }}</div>
          </div>
          <div class="progress-stat">
            <div class="stat-label">Tamamlanan Görevler</div>
            <div class="stat-value">{{ level.completedTasks }}/{{ level.totalTasks }}</div>
          </div>
          <div class="progress-stat">
            <div class="stat-label">Quiz Puanı</div>
            <div class="stat-value">{{ level.quizScore ? level.quizScore + '%' : 'Henüz alınmadı' }}</div>
          </div>
        </div>
        
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: `${levelProgress}%` }"></div>
        </div>
        <div class="progress-text">Toplam İlerleme: {{ levelProgress }}%</div>
      </div>
    </div>
    
    <!-- Level Content -->
    <div class="level-content card">
      <h2>{{ level.title }}</h2>
      
      <div v-if="level.id == 1" class="content-sections">
        <div class="content-section">
          <h3>Dijital Pazarlama Nedir?</h3>
          <p>Dijital pazarlama, bir ürün veya hizmeti tanıtmak için dijital kanalları kullanma sürecidir. Arama motorlarından sosyal medya platformlarına kadar çeşitli dijital kanallar bu kapsamda değerlendirilir. Geleneksel pazarlamada olduğu gibi dijital pazarlama da potansiyel müşterilere ulaşmayı ve potansiyel müşteri ya da satış yaratmayı amaçlar.</p>
          
          <h4>Dijital Pazarlamanın Geleneksel Pazarlamadan Farkları:</h4>
          <ul>
            <li><strong>Veri Odaklılık:</strong> Dijital pazarlama çok daha veri odaklıdır. İşletmeler, müşteri davranışlarından kampanyalarının sonuçlarına kadar her şeyi gerçek zamanlı olarak takip edebilir.</li>
            <li><strong>Etkileşim:</strong> Dijital pazarlama daha etkileşimli ve ilgi çekicidir. Müşteriler geri bildirimde bulunabilir ve geleneksel pazarlamada mümkün olmayan bir şekilde markayla etkileşime geçebilir.</li>
            <li><strong>Maliyet Verimliliği:</strong> Dijital pazarlama geleneksel pazarlamaya göre daha uygun maliyetlidir. Daha az parayla daha geniş bir kitleye ulaşılabilir.</li>
            <li><strong>Hedefleme:</strong> Dijital pazarlama daha hedefe yöneliktir, bu da kimsenin görmeyeceği reklamlara para harcama olasılığını düşürür.</li>
          </ul>
        </div>
        
        <div class="content-section">
          <h3>Dijital Pazarlama Kanalları</h3>
          <p>İşletmelerin hedef müşterilerine ulaşmak için kullanabilecekleri çeşitli dijital pazarlama kanalları bulunmaktadır:</p>
          
          <div class="channel-card">
            <h4>1. Arama Motoru Optimizasyonu (SEO)</h4>
            <p>SEO, web sitesini Google gibi arama motorları için optimize etme sürecidir. Web sitesini optimize etmek, arama sonuçlarındaki sıralamayı iyileştirerek daha fazla trafik ve potansiyel müşteri elde etmeyi sağlar.</p>
          </div>
          
          <div class="channel-card">
            <h4>2. İçerik Pazarlama</h4>
            <p>İçerik pazarlama, hedef kitlenin ilgisini çekecek değerli, ilgili ve ilgi çekici içerikler oluşturmaktır. Blog yazıları, e-kitaplar, infografikler ve video gibi yüksek kaliteli içerikler bu kapsamda değerlendirilir.</p>
          </div>
          
          <div class="channel-card">
            <h4>3. Sosyal Medya Pazarlama</h4>
            <p>Sosyal medya pazarlama, markanızı tanıtmak için Facebook, Twitter ve Instagram gibi sosyal medya platformlarını kullanmaktır. İlgi çekici içerikler oluşturup paylaşarak daha geniş bir kitleye ulaşabilir ve daha fazla potansiyel müşteri oluşturabilirsiniz.</p>
          </div>
        </div>
      </div>
      
      <div v-if="level.id == 2" class="content-sections">
        <div class="content-section">
          <h3>SEO (Arama Motoru Optimizasyonu) Temelleri</h3>
          <p>SEO, web sitesini arama motor sonuç sayfalarında daha yüksek sıralamaya ulaştırmak için optimize etme sürecidir. Bu, web sitesinin trafik miktarını artırma işlemidir. SEO sadece anahtar kelime yerleştirmekten ibaret değildir. Aynı zamanda web sitenizin teknik yapısını iyileştirmeyi ve kullanıcı deneyimini geliştirmeyi içerir.</p>
          
          <h4>SEO'nun Temel Bileşenleri:</h4>
          <ul>
            <li><strong>On-Page SEO:</strong> Web sitenizin içeriğini ve yapısını optimize etme</li>
            <li><strong>Off-Page SEO:</strong> Web sitenize gelen bağlantıları ve sosyal sinyalleri artırma</li>
            <li><strong>Teknik SEO:</strong> Web sitenizin taranabilirliğini ve indekslenebilirliğini iyileştirme</li>
          </ul>
        </div>
      </div>
      
      <div v-if="level.id == 3" class="content-sections">
        <div class="content-section">
          <h3>Sosyal Medya Pazarlaması</h3>
          <p>Sosyal medya pazarlaması, marka bilinirliğini artırmak, trafik eklemek ve işletme için potansiyel müşteriler oluşturmak için marka ve içeriği sosyal medya kanallarında teşvik etmektir. Facebook, Twitter, LinkedIn, Instagram, Snapchat, Pinterest gibi platformlar sosyal medya pazarlamasında kullanabilen kanallar arasındadır.</p>
        </div>
      </div>
      
      <div v-if="level.id == 5" class="content-sections">
        <div class="content-section">
          <h3>E-posta Pazarlaması Nedir?</h3>
          <p>E-posta pazarlaması, potansiyel veya mevcut müşterilere ticari ya da içerik açısından değerli iletiler göndermek için elektronik postaları kullanma sürecidir. E-posta pazarlaması, pazarlama kanalları arasında en yüksek ROI (Return On Investment - Yatırım Getirisi) sağlayan kanallardan biridir.</p>
          
          <div class="info-card">
            <div class="info-icon">📊</div>
            <div class="info-content">
              <h4>Biliyor muydunuz?</h4>
              <p>Ortalama olarak, e-posta pazarlamasında harcanan her 1$ için 42$ geri dönüş elde edilir. Bu, diğer pazarlama kanallarına göre oldukça yüksek bir ROI anlamına gelir.</p>
            </div>
          </div>
          
          <h4>E-posta Pazarlamasının Avantajları:</h4>
          <ul class="feature-list">
            <li>
              <span class="feature-icon">💰</span>
              <div>
                <strong>Maliyet Etkinliği:</strong> 
                <span>E-posta pazarlaması, diğer pazarlama kanallarına göre daha düşük maliyetlidir.</span>
              </div>
            </li>
            <li>
              <span class="feature-icon">👤</span>
              <div>
                <strong>Kişiselleştirme:</strong> 
                <span>E-postaları alıcının tercihlerine ve davranışlarına göre kişiselleştirme imkanı sunar.</span>
              </div>
            </li>
            <li>
              <span class="feature-icon">📈</span>
              <div>
                <strong>Ölçeklenebilirlik:</strong> 
                <span>Küçük ya da büyük kitlelere aynı anda ulaşmanızı sağlar.</span>
              </div>
            </li>
            <li>
              <span class="feature-icon">📏</span>
              <div>
                <strong>Ölçülebilirlik:</strong> 
                <span>Açılma oranları, tıklama oranları, dönüşüm oranları gibi metrikleri takip ederek kampanya performansınızı analiz edebilirsiniz.</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="content-section">
          <h3>E-posta Pazarlaması Metrikleri</h3>
          <p>E-posta pazarlaması kampanyalarının başarısını ölçmek için kullanılan temel metrikleri öğrenmek önemlidir:</p>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-header">
                <div class="metric-icon">📨</div>
                <h4>Açılma Oranı (Open Rate)</h4>
              </div>
              <p>Gönderilen e-postaların kaç tanesinin açıldığını gösteren orandır.</p>
              <div class="metric-detail">
                <span class="metric-label">Ortalama değer:</span>
                <span class="metric-value">%15-25</span>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <div class="metric-icon">👆</div>
                <h4>Tıklama Oranı (CTR)</h4>
              </div>
              <p>E-posta içerisindeki linklere tıklayan alıcıların oranıdır.</p>
              <div class="metric-detail">
                <span class="metric-label">Ortalama değer:</span>
                <span class="metric-value">%2-5</span>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <div class="metric-icon">🎯</div>
                <h4>Dönüşüm Oranı</h4>
              </div>
              <p>E-postadaki çağrı butonuna (CTA) tıklayıp belirli bir aksiyonu tamamlayan alıcıların oranıdır.</p>
              <div class="metric-detail">
                <span class="metric-label">Hedef:</span>
                <span class="metric-value">%1+</span>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <div class="metric-icon">❌</div>
                <h4>Bounce Oranı</h4>
              </div>
              <p>Gönderilen e-postalardan adrese ulaşmayanların yüzdesidir.</p>
              <div class="metric-detail">
                <span class="metric-label">Sağlıklı değer:</span>
                <span class="metric-value"><%2</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Marketing Quizzes Section -->
        <div class="content-section">
          <h3>E-posta Pazarlaması Quiz'leri</h3>
          <p>E-posta pazarlaması konusundaki bilgilerinizi test etmek için aşağıdaki quizleri çözebilirsiniz:</p>
          
          <div class="quiz-grid">
            <div v-for="(quiz, index) in emailMarketingQuizzes" :key="quiz.id" class="quiz-card">
              <div class="quiz-header">
                <div class="quiz-icon">✓</div>
                <h4>{{ quiz.title }}</h4>
              </div>
              <p>{{ quiz.description }}</p>
              <div class="quiz-detail">
                <span class="quiz-label">Soru sayısı:</span>
                <span class="quiz-value">{{ quiz.questions.length }}</span>
              </div>
              <router-link :to="`/email-marketing-quizzes/${quiz.id}`" class="btn btn-primary mt-4">Quiz'e Başla</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="content-actions">
        <router-link v-if="level.hasQuiz && level.id != 5" :to="'/quiz/' + level.id" class="btn btn-primary">Quiz'e Başla</router-link>
        <router-link v-else-if="level.id == 5" to="/email-marketing-quizzes" class="btn btn-primary">E-posta Quizlerine Git</router-link>
        <button v-else class="btn btn-secondary">İçerik Tamamlandı</button>
      </div>
    </div>
    
    <!-- Level Tasks -->
    <div class="level-tasks card">
      <h2>Seviye Görevleri</h2>
      
      <div class="task-list">
        <div v-for="(task, index) in level.tasks" :key="index" class="task-item">
          <div class="task-status">
            <div v-if="task.completed" class="status-circle completed">
              <span class="icon">✓</span>
            </div>
            <div v-else-if="task.inProgress" class="status-circle in-progress">
              <span class="icon">⋯</span>
            </div>
            <div v-else class="status-circle">
              <span class="icon">●</span>
            </div>
          </div>
          
          <div class="task-details">
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.description }}</p>
            
            <div class="task-actions">
              <router-link :to="'/task/' + task.id" class="btn btn-outline">Göreve Git</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emailMarketingQuizzes } from '@/utils/marketingData/email-marketing-quiz';

export default {
  name: 'LevelView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      emailMarketingQuizzes,
      levels: [
        {
          id: 1,
          title: 'Seviye 1: Temel Kavramlar',
          description: 'Dijital pazarlamanın temel kavramlarını öğrenin ve pazarlama stratejisi geliştirmeye başlayın.',
          completedContent: 1,
          totalContent: 2,
          completedTasks: 1,
          totalTasks: 3,
          quizScore: 80,
          hasQuiz: true,
          tasks: [
            {
              id: 101,
              title: 'Task 1.1: Digital Marketing 101',
              description: 'Dijital pazarlamanın temellerini, avantajlarını ve çeşitli kanallarını öğrenin.',
              completed: true,
              inProgress: false
            },
            {
              id: 102,
              title: 'Task 1.2: Temel Terminoloji',
              description: 'Dijital pazarlama terminolojisini öğrenerek sektördeki terimlere hakim olun.',
              completed: false,
              inProgress: true
            },
            {
              id: 103,
              title: 'Task 1.3: Marka Hedefleri',
              description: 'Dijital pazarlama hedeflerinizi belirleyin ve marka stratejisi geliştirin.',
              completed: false,
              inProgress: false
            }
          ]
        },
        {
          id: 2,
          title: 'Seviye 2: SEO Temelleri',
          description: 'Arama motoru optimizasyonunun temelleri ve web sitenizi nasıl optimize edeceğinizi öğrenin.',
          completedContent: 0,
          totalContent: 3,
          completedTasks: 0,
          totalTasks: 2,
          quizScore: null,
          hasQuiz: true,
          tasks: [
            {
              id: 201,
              title: 'Task 2.1: Anahtar Kelime Araştırması',
              description: 'Anahtar kelime araştırması yaparak hedef kitlenizin arama davranışlarını anlayın.',
              completed: false,
              inProgress: false
            },
            {
              id: 202,
              title: 'Task 2.2: On-Page SEO Uygulaması',
              description: 'Bir web sayfasını SEO prensiplerine göre optimize edin.',
              completed: false,
              inProgress: false
            }
          ]
        },
        {
          id: 3,
          title: 'Seviye 3: Sosyal Medya',
          description: 'Sosyal medya pazarlaması stratejileri ve platformların etkili kullanımını öğrenin.',
          completedContent: 0,
          totalContent: 4,
          completedTasks: 0,
          totalTasks: 3,
          quizScore: null,
          hasQuiz: true,
          tasks: [
            {
              id: 301,
              title: 'Task 3.1: Sosyal Medya Stratejisi',
              description: 'Bir marka için sosyal medya stratejisi geliştirin.',
              completed: false,
              inProgress: false
            },
            {
              id: 302,
              title: 'Task 3.2: İçerik Takvimi',
              description: 'Bir aylık sosyal medya içerik takvimi oluşturun.',
              completed: false,
              inProgress: false
            },
            {
              id: 303,
              title: 'Task 3.3: Sosyal Medya Analizi',
              description: 'Sosyal medya performansını analiz edin ve rapor hazırlayın.',
              completed: false,
              inProgress: false
            }
          ]
        },
        {
          id: 5,
          title: 'Seviye 5: E-posta Pazarlaması',
          description: 'E-posta pazarlamasının temellerini, liste oluşturmayı, e-posta kampanyaları tasarlamayı ve optimizasyon tekniklerini öğrenin.',
          completedContent: 0,
          totalContent: 5,
          completedTasks: 0,
          totalTasks: 5,
          quizScore: null,
          hasQuiz: true,
          tasks: [
            {
              id: 501,
              title: 'Task 5.1: E-posta Pazarlamasına Giriş',
              description: 'E-posta pazarlamasının temellerini, önemini ve başarılı e-posta kampanyalarının bileşenlerini öğreneceksiniz.',
              completed: false,
              inProgress: false
            },
            {
              id: 502,
              title: 'Task 5.2: E-posta Listesi Oluşturma ve Segmentasyon',
              description: 'Kaliteli bir e-posta listesi oluşturma, büyütme ve etkili segmentasyon stratejileri geliştirme konularını öğreneceksiniz.',
              completed: false,
              inProgress: false
            },
            {
              id: 503,
              title: 'Task 5.3: E-posta Tasarımı ve İçerik Oluşturma',
              description: 'Etkili e-posta tasarımı ve içerik oluşturma tekniklerini öğreneceksiniz.',
              completed: false,
              inProgress: false
            },
            {
              id: 504,
              title: 'Task 5.4: E-posta Otomasyonu',
              description: 'E-posta otomasyonunun temellerini ve müşteri yolculuğuna göre otomasyon akışları oluşturmayı öğreneceksiniz.',
              completed: false,
              inProgress: false
            },
            {
              id: 505,
              title: 'Task 5.5: E-posta Analizi ve Optimizasyon',
              description: 'E-posta kampanyalarının performansını analiz etme ve optimizasyon stratejileri geliştirme konularını öğreneceksiniz.',
              completed: false,
              inProgress: false
            }
          ]
        }
      ]
    }
  },
  computed: {
    level() {
      return this.levels.find(level => level.id == this.id) || this.levels[0]
    },
    levelProgress() {
      const level = this.level
      const contentWeight = 0.4 // Content completion is 40% of total progress
      const tasksWeight = 0.4 // Tasks are 40% of total progress
      const quizWeight = 0.2 // Quiz is 20% of total progress
      
      const contentProgress = level.completedContent / level.totalContent
      const tasksProgress = level.completedTasks / level.totalTasks
      const quizProgress = level.quizScore ? level.quizScore / 100 : 0
      
      const totalProgress = (contentProgress * contentWeight) + 
                           (tasksProgress * tasksWeight) + 
                           (quizProgress * quizWeight)
      
      return Math.round(totalProgress * 100)
    }
  }
}
</script>

<style scoped>
.level-view {
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
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.level-progress {
  margin-bottom: 1.5rem;
}

.progress-info {
  padding: 0.5rem 0;
}

.progress-stats {
  display: flex;
  margin-bottom: 1rem;
  gap: 2rem;
}

.progress-stat {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.progress-bar-fill {
  height: 100%;
  background-color: #198754;
  border-radius: 4px;
}

.progress-text {
  font-size: 0.9rem;
  color: #6c757d;
  text-align: right;
}

.level-content {
  margin-bottom: 1.5rem;
}

.content-sections {
  margin-top: 1.5rem;
}

.content-section {
  margin-bottom: 2rem;
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.content-section p {
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.content-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.content-section ul {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.content-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.channel-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  background-color: #f8f9fa;
}

.channel-card h4 {
  margin-top: 0;
}

.channel-card p {
  margin-bottom: 0;
}

.content-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-outline {
  border: 1px solid #dee2e6;
  color: #495057;
  background-color: transparent;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.task-list {
  margin-top: 1.5rem;
}

.task-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.task-status {
  display: flex;
  align-items: center;
}

.status-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.status-circle.completed {
  background-color: #198754;
  border-color: #198754;
  color: white;
}

.status-circle.in-progress {
  background-color: #fd7e14;
  border-color: #fd7e14;
  color: white;
}

.task-details {
  flex: 1;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.task-description {
  color: #6c757d;
  margin-bottom: 1rem;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.feature-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #e3f2fd;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.info-icon {
  font-size: 1.75rem;
}

.info-content h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #0d6efd;
}

.info-content p {
  margin: 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.metric-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.25rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.metric-icon {
  font-size: 1.5rem;
}

.metric-card h4 {
  margin: 0;
  font-size: 1rem;
}

.metric-card p {
  flex-grow: 1;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.metric-detail {
  display: flex;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #e9ecef;
  font-size: 0.9rem;
}

.metric-label {
  color: #6c757d;
}

.metric-value {
  font-weight: 600;
  color: #212529;
}

/* New styles for quiz cards */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.quiz-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.25rem;
  background-color: #f8f9fa;
  transition: transform 0.2s, box-shadow 0.2s;
}

.quiz-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.quiz-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  font-size: 1rem;
}

.quiz-card h4 {
  margin: 0;
  font-size: 1.1rem;
}

.quiz-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.quiz-label {
  color: #6c757d;
}

.quiz-value {
  font-weight: 500;
}

.mt-4 {
  margin-top: 1rem;
}
</style> 