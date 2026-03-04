<template>
  <div class="quiz-view">
    <div class="page-header">
      <div class="breadcrumbs">
        <router-link to="/">Ana Sayfa</router-link> 
        <span class="separator">/</span>
        <router-link :to="'/level/' + levelId">{{ quiz.levelTitle }}</router-link>
        <span class="separator">/</span>
        <span>Quiz</span>
      </div>
      
      <h1>{{ quiz.title }}</h1>
      <p class="subtitle">{{ quiz.description }}</p>
    </div>
    
    <div class="quiz-container" v-if="!quizCompleted">
      <div class="quiz-progress">
        <div class="quiz-progress-text">Soru {{ currentQuestionIndex + 1 }}/{{ quiz.questions.length }}</div>
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: `${quizProgress}%` }"></div>
        </div>
      </div>
      
      <div class="quiz-card">
        <div class="question-number">Soru {{ currentQuestionIndex + 1 }}</div>
        <div class="question-text">{{ currentQuestion.question }}</div>
        
        <div class="options-container">
          <div 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            :class="['option', {
              'selected': selectedOption === index,
              'correct': isResultShown && index === currentQuestion.correctOption,
              'incorrect': isResultShown && selectedOption === index && index !== currentQuestion.correctOption
            }]"
            @click="selectOption(index)"
          >
            <div class="option-indicator">{{ String.fromCharCode(65 + index) }}</div>
            <div class="option-text">{{ option }}</div>
          </div>
        </div>
        
        <div v-if="isResultShown" class="result-feedback">
          <div v-if="isCorrect" class="feedback correct">
            <div class="icon">✓</div>
            <div class="text">Doğru cevap!</div>
          </div>
          <div v-else class="feedback incorrect">
            <div class="icon">✗</div>
            <div class="text">Yanlış cevap. Doğru cevap: {{ String.fromCharCode(65 + currentQuestion.correctOption) }}</div>
          </div>
          
          <div class="explanation" v-if="currentQuestion.explanation">
            <div class="explanation-title">Açıklama:</div>
            <div class="explanation-text">{{ currentQuestion.explanation }}</div>
          </div>
        </div>
        
        <div class="quiz-actions">
          <button 
            v-if="!isResultShown" 
            :disabled="selectedOption === null" 
            @click="checkAnswer" 
            class="btn btn-primary"
          >
            Cevabı Kontrol Et
          </button>
          <button 
            v-else-if="currentQuestionIndex < quiz.questions.length - 1" 
            @click="nextQuestion" 
            class="btn btn-primary"
          >
            Sonraki Soru
          </button>
          <button 
            v-else 
            @click="finishQuiz" 
            class="btn btn-primary"
          >
            Quizi Tamamla
          </button>
        </div>
      </div>
    </div>
    
    <div class="quiz-results card" v-else>
      <div class="results-header">
        <div class="results-icon" v-if="score >= 70">🏆</div>
        <div class="results-icon" v-else>📝</div>
        <h2>Quiz Tamamlandı!</h2>
      </div>
      
      <div class="results-score">
        <div class="score-circle" :class="scoreClass">
          {{ score }}%
        </div>
        <div class="score-label">{{ scoreLabel }}</div>
      </div>
      
      <div class="results-stats">
        <div class="stat">
          <div class="stat-value">{{ correctAnswers }}/{{ quiz.questions.length }}</div>
          <div class="stat-label">Doğru Cevaplar</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ quiz.questions.length - correctAnswers }}/{{ quiz.questions.length }}</div>
          <div class="stat-label">Yanlış Cevaplar</div>
        </div>
      </div>
      
      <div class="results-actions">
        <router-link :to="'/level/' + levelId" class="btn btn-outline">Seviyeye Dön</router-link>
        <button @click="restartQuiz" class="btn btn-secondary">Quizi Tekrarla</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizView',
  props: {
    levelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quizzes: [
        {
          id: 1,
          levelTitle: 'Seviye 1: Temel Kavramlar',
          title: 'Dijital Pazarlama Temelleri Quiz',
          description: 'Dijital pazarlamanın temel kavramlarını ne kadar iyi anladığınızı test edin.',
          questions: [
            {
              question: 'Dijital pazarlamanın geleneksel pazarlamadan en önemli farkı nedir?',
              options: [
                'Daha pahalı olması',
                'Daha fazla veri odaklı olması',
                'Daha az hedef kitleye ulaşması',
                'Daha az etkileşimli olması'
              ],
              correctOption: 1,
              explanation: 'Dijital pazarlama, geleneksel pazarlamaya göre çok daha fazla veri odaklıdır. İşletmeler, kampanyalarının sonuçlarını gerçek zamanlı olarak takip edebilir ve stratejilerini buna göre ayarlayabilir.'
            },
            {
              question: 'Aşağıdakilerden hangisi bir dijital pazarlama kanalı değildir?',
              options: [
                'Sosyal Medya Pazarlaması',
                'Arama Motoru Optimizasyonu (SEO)',
                'Gazete Reklamları',
                'E-posta Pazarlaması'
              ],
              correctOption: 2,
              explanation: 'Gazete reklamları geleneksel pazarlama kanalıdır, dijital pazarlama kanalı değildir.'
            },
            {
              question: 'SEO\'nun açılımı nedir?',
              options: [
                'Social Engine Optimization',
                'Search Engine Optimization',
                'Search Engine Organizer',
                'Social Email Organizer'
              ],
              correctOption: 1,
              explanation: 'SEO (Search Engine Optimization), Türkçe\'de Arama Motoru Optimizasyonu anlamına gelir ve web sitenizin arama motorlarında daha iyi sıralamalara ulaşmasını sağlar.'
            },
            {
              question: 'İçerik pazarlamasının ana amacı nedir?',
              options: [
                'Sadece ürün tanıtımı yapmak',
                'Değerli içerikler oluşturarak hedef kitleyi çekmek',
                'Rakiplerin içeriklerini kopyalamak',
                'Sadece satış odaklı içerikler üretmek'
              ],
              correctOption: 1,
              explanation: 'İçerik pazarlaması, hedef kitlenizin ilgisini çekecek değerli ve alakalı içerikler oluşturarak onları çekmeyi ve müşteri haline getirmeyi amaçlar.'
            },
            {
              question: 'Dijital pazarlamada "dönüşüm" ne anlama gelir?',
              options: [
                'Web sitenizin yeni bir tasarıma dönüştürülmesi',
                'Bir kullanıcının istediğiniz eylemi gerçekleştirmesi (satın alma, kayıt olma vb.)',
                'Geleneksel pazarlamadan dijital pazarlamaya geçiş',
                'Dijital pazarlama bütçesinin güncellenmesi'
              ],
              correctOption: 1,
              explanation: 'Dijital pazarlamada "dönüşüm", kullanıcıların sizin istediğiniz bir eylemi (ürün satın alma, form doldurma, e-posta aboneliği gibi) gerçekleştirmesini ifade eder.'
            }
          ]
        },
        {
          id: 2,
          levelTitle: 'Seviye 2: SEO Temelleri',
          title: 'SEO Temelleri Quiz',
          description: 'Arama motoru optimizasyonu bilginizi test edin.',
          questions: [
            {
              question: 'On-page SEO nedir?',
              options: [
                'Başka web sitelerinden bağlantılar almak',
                'Sosyal medya profillerini optimize etmek',
                'Web sitenizin içeriğini ve yapısını optimize etmek',
                'Ücretli reklamlar kullanmak'
              ],
              correctOption: 2,
              explanation: 'On-page SEO, web sitenizin içeriğini ve HTML kaynak kodunu optimize ederek arama motorlarında daha iyi performans göstermesini sağlar.'
            },
            {
              question: 'Aşağıdakilerden hangisi SEO için önemli bir faktör değildir?',
              options: [
                'Sayfa yükleme hızı',
                'Web sitesinin yaşı',
                'Facebook\'taki takipçi sayısı',
                'Kaliteli içerik'
              ],
              correctOption: 2,
              explanation: 'Facebook\'taki takipçi sayısı doğrudan SEO performansınızı etkilemez, ancak diğer faktörler SEO için önemlidir.'
            }
          ]
        },
        {
          id: 3,
          levelTitle: 'Seviye 3: Sosyal Medya',
          title: 'Sosyal Medya Pazarlaması Quiz',
          description: 'Sosyal medya pazarlama bilginizi test edin.',
          questions: [
            {
              question: 'Hangi sosyal medya platformu profesyonel iş ağı olarak bilinir?',
              options: [
                'Facebook',
                'Instagram',
                'LinkedIn',
                'Twitter'
              ],
              correctOption: 2,
              explanation: 'LinkedIn, profesyonel iş ağı olarak bilinen ve iş dünyasındaki bağlantıları geliştirmek için kullanılan bir sosyal medya platformudur.'
            },
            {
              question: 'Etkileşim oranı nedir?',
              options: [
                'Web sitesini ziyaret eden kullanıcı sayısı',
                'Sosyal medya gönderiyle etkileşimde bulunan takipçilerin yüzdesi',
                'Sosyal medyadan web sitenize gelen trafik miktarı',
                'Sosyal medya hesabınızı takip eden kişi sayısı'
              ],
              correctOption: 1,
              explanation: 'Etkileşim oranı, bir sosyal medya gönderisiyle etkileşimde bulunan (beğenen, yorum yapan, paylaşan) takipçilerin yüzdesini ifade eder.'
            }
          ]
        }
      ],
      currentQuestionIndex: 0,
      selectedOption: null,
      isResultShown: false,
      quizCompleted: false,
      userAnswers: [],
      correctAnswers: 0
    }
  },
  computed: {
    quiz() {
      return this.quizzes.find(quiz => quiz.id == this.levelId) || this.quizzes[0]
    },
    currentQuestion() {
      return this.quiz.questions[this.currentQuestionIndex]
    },
    quizProgress() {
      return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100
    },
    isCorrect() {
      return this.selectedOption === this.currentQuestion.correctOption
    },
    score() {
      return Math.round((this.correctAnswers / this.quiz.questions.length) * 100)
    },
    scoreClass() {
      if (this.score >= 80) return 'excellent'
      if (this.score >= 60) return 'good'
      return 'needs-improvement'
    },
    scoreLabel() {
      if (this.score >= 80) return 'Mükemmel!'
      if (this.score >= 60) return 'İyi'
      return 'Geliştirilmesi Gerekiyor'
    }
  },
  methods: {
    selectOption(index) {
      if (!this.isResultShown) {
        this.selectedOption = index
      }
    },
    checkAnswer() {
      this.isResultShown = true
      if (this.isCorrect) {
        this.correctAnswers++
      }
      this.userAnswers.push({
        questionIndex: this.currentQuestionIndex,
        selectedOption: this.selectedOption,
        isCorrect: this.isCorrect
      })
    },
    nextQuestion() {
      this.currentQuestionIndex++
      this.selectedOption = null
      this.isResultShown = false
    },
    finishQuiz() {
      this.quizCompleted = true
    },
    restartQuiz() {
      this.currentQuestionIndex = 0
      this.selectedOption = null
      this.isResultShown = false
      this.quizCompleted = false
      this.userAnswers = []
      this.correctAnswers = 0
    }
  }
}
</script>

<style scoped>
.quiz-view {
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
  margin-bottom: 1rem;
}

.quiz-progress {
  margin-bottom: 1rem;
}

.quiz-progress-text {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.progress-bar-fill {
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
}

.quiz-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.question-number {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 0.75rem;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover:not(.correct, .incorrect) {
  background-color: #f8f9fa;
}

.option.selected:not(.correct, .incorrect) {
  border-color: #007bff;
  background-color: #f0f7ff;
}

.option.correct {
  border-color: #28a745;
  background-color: #d4edda;
}

.option.incorrect {
  border-color: #dc3545;
  background-color: #f8d7da;
}

.option-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #e9ecef;
  font-weight: 600;
  font-size: 0.9rem;
}

.option.selected .option-indicator:not(.correct, .incorrect) {
  background-color: #007bff;
  color: white;
}

.option.correct .option-indicator {
  background-color: #28a745;
  color: white;
}

.option.incorrect .option-indicator {
  background-color: #dc3545;
  color: white;
}

.option-text {
  font-size: 0.95rem;
}

.result-feedback {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.feedback {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.feedback.correct {
  color: #28a745;
}

.feedback.incorrect {
  color: #dc3545;
}

.feedback .icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.feedback .text {
  font-weight: 600;
}

.explanation {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.explanation-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.explanation-text {
  font-size: 0.95rem;
  color: #495057;
}

.quiz-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #343a40;
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.quiz-results {
  text-align: center;
  padding: 2rem;
}

.results-header {
  margin-bottom: 1.5rem;
}

.results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.results-score {
  margin-bottom: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.score-circle.excellent {
  background-color: #d4edda;
  color: #28a745;
}

.score-circle.good {
  background-color: #fff3cd;
  color: #ffc107;
}

.score-circle.needs-improvement {
  background-color: #f8d7da;
  color: #dc3545;
}

.score-label {
  font-size: 1.25rem;
  font-weight: 600;
}

.results-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.results-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-outline {
  border: 1px solid #dee2e6;
  background-color: transparent;
  color: #495057;
  text-decoration: none;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style> 