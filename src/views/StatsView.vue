<template>
  <div class="stats-view">
    <div class="page-header">
      <h1>İstatistikler ve Analizler</h1>
      <p class="subtitle">Öğrenme yolculuğunuza dair detaylı istatistikler ve analizler</p>
    </div>
    
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-value">{{ overallProgress }}%</div>
        <div class="stat-label">Genel İlerleme</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-value">{{ studyTimeFormatted }}</div>
        <div class="stat-label">Toplam Çalışma Süresi</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-value">{{ pointsEarned }}</div>
        <div class="stat-label">Toplam Puan</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ averageQuizScore }}%</div>
        <div class="stat-label">Ortalama Quiz Skoru</div>
      </div>
    </div>
    
    <div class="stats-charts">
      <div class="chart-container card">
        <div class="chart-header">
          <h2>Haftalık Aktivite</h2>
          <div class="chart-options">
            <select v-model="activityTimeRange">
              <option value="week">Son 1 Hafta</option>
              <option value="month">Son 1 Ay</option>
              <option value="3months">Son 3 Ay</option>
            </select>
          </div>
        </div>
        
        <div class="activity-chart">
          <div class="chart-days">
            <div v-for="day in activityData" :key="day.date" class="chart-day">
              <div 
                class="chart-bar" 
                :style="{ height: `${day.percentage}%` }"
                :class="{
                  'low': day.percentage < 30,
                  'medium': day.percentage >= 30 && day.percentage < 70,
                  'high': day.percentage >= 70
                }"
              ></div>
              <div class="chart-label">{{ formatDayLabel(day.date) }}</div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color high"></div>
              <div class="legend-text">1 saat+</div>
            </div>
            <div class="legend-item">
              <div class="legend-color medium"></div>
              <div class="legend-text">30dk - 1 saat</div>
            </div>
            <div class="legend-item">
              <div class="legend-color low"></div>
              <div class="legend-text">< 30dk</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container card">
        <div class="chart-header">
          <h2>Modül İlerleme Durumu</h2>
        </div>
        
        <div class="progress-chart">
          <div v-for="stage in stageProgress" :key="stage.id" class="stage-progress">
            <div class="stage-title">{{ stage.title }}</div>
            <div class="progress-bar-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${stage.progress}%` }"></div>
              </div>
              <div class="progress-percentage">{{ stage.progress }}%</div>
            </div>
            <div class="progress-detail">
              <span>{{ stage.completed }}/{{ stage.total }} Modül</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="stats-details">
      <div class="performance-container card">
        <div class="chart-header">
          <h2>Quiz Performansı</h2>
          <div class="chart-options">
            <select v-model="quizFilter">
              <option value="all">Tüm Quizler</option>
              <option value="recent">Son 5 Quiz</option>
            </select>
          </div>
        </div>
        
        <div class="quiz-performance">
          <table class="quiz-table">
            <thead>
              <tr>
                <th>Quiz Adı</th>
                <th>Tarih</th>
                <th>Doğru</th>
                <th>Yanlış</th>
                <th>Skor</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quiz in filteredQuizzes" :key="quiz.id">
                <td>{{ quiz.title }}</td>
                <td>{{ formatDate(quiz.date) }}</td>
                <td>{{ quiz.correctAnswers }}</td>
                <td>{{ quiz.wrongAnswers }}</td>
                <td class="quiz-score">{{ getQuizScorePercentage(quiz) }}%</td>
                <td>
                  <span 
                    class="quiz-status" 
                    :class="getQuizStatusClass(quiz)"
                  >
                    {{ getQuizStatusText(quiz) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="time-distribution-container card">
        <div class="chart-header">
          <h2>Zaman Dağılımı</h2>
        </div>
        
        <div class="time-distribution">
          <div class="distribution-chart">
            <div v-for="(category, index) in timeDistribution" :key="category.type" class="distribution-segment">
              <div 
                class="segment-fill" 
                :style="{
                  width: `${category.percentage}%`,
                  backgroundColor: getSegmentColor(index)
                }"
              ></div>
            </div>
          </div>
          
          <div class="distribution-legend">
            <div v-for="(category, index) in timeDistribution" :key="category.type" class="legend-item">
              <div class="legend-color" :style="{ backgroundColor: getSegmentColor(index) }"></div>
              <div class="legend-text">
                <span>{{ category.label }}</span>
                <span class="legend-percentage">{{ category.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="stats-achievements card">
      <div class="chart-header">
        <h2>Başarılar ve Rozetler</h2>
      </div>
      
      <div class="achievements-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id" 
          class="achievement-item"
          :class="{ 'locked': !achievement.earned }"
        >
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-details">
            <div class="achievement-title">{{ achievement.title }}</div>
            <div class="achievement-description">{{ achievement.description }}</div>
            <div v-if="achievement.earned" class="achievement-earned">
              Kazanıldı: {{ formatDate(achievement.earnedDate) }}
            </div>
            <div v-else class="achievement-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${achievement.progress}%` }"></div>
              </div>
              <div class="progress-text">{{ achievement.progress }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsView',
  data() {
    return {
      // Overall stats
      overallProgress: 43,
      studyTimeHours: 38,
      studyTimeMinutes: 45,
      pointsEarned: 2750,
      averageQuizScore: 82,
      
      // Activity chart
      activityTimeRange: 'week',
      activityData: [
        { date: '2023-08-17', minutes: 45, percentage: 45 },
        { date: '2023-08-18', minutes: 75, percentage: 75 },
        { date: '2023-08-19', minutes: 30, percentage: 30 },
        { date: '2023-08-20', minutes: 0, percentage: 0 },
        { date: '2023-08-21', minutes: 60, percentage: 60 },
        { date: '2023-08-22', minutes: 90, percentage: 90 },
        { date: '2023-08-23', minutes: 25, percentage: 25 }
      ],
      
      // Stage progress
      stageProgress: [
        { 
          id: 'stage-1', 
          title: 'Dijital Pazarlama Temelleri', 
          progress: 85, 
          completed: 6, 
          total: 7 
        },
        { 
          id: 'stage-2', 
          title: 'SEO ve İçerik Stratejisi', 
          progress: 60, 
          completed: 3, 
          total: 5 
        },
        { 
          id: 'stage-3', 
          title: 'Sosyal Medya Pazarlaması', 
          progress: 20, 
          completed: 1, 
          total: 5 
        },
        { 
          id: 'stage-4', 
          title: 'Ücretli Reklamcılık', 
          progress: 0, 
          completed: 0, 
          total: 4 
        },
        { 
          id: 'stage-5', 
          title: 'Veri Analizi ve Raporlama', 
          progress: 0, 
          completed: 0, 
          total: 4 
        }
      ],
      
      // Quiz data
      quizFilter: 'all',
      quizzes: [
        {
          id: 'quiz-101',
          title: 'Dijital Pazarlama Temelleri',
          date: '2023-08-10',
          totalQuestions: 10,
          correctAnswers: 9,
          wrongAnswers: 1
        },
        {
          id: 'quiz-102',
          title: 'Hedef Kitle Analizi',
          date: '2023-08-12',
          totalQuestions: 15,
          correctAnswers: 12,
          wrongAnswers: 3
        },
        {
          id: 'quiz-103',
          title: 'Dijital Pazarlama Stratejisi',
          date: '2023-08-15',
          totalQuestions: 10,
          correctAnswers: 7,
          wrongAnswers: 3
        },
        {
          id: 'quiz-104',
          title: 'SEO Temelleri',
          date: '2023-08-18',
          totalQuestions: 15,
          correctAnswers: 13,
          wrongAnswers: 2
        },
        {
          id: 'quiz-105',
          title: 'İçerik Pazarlaması',
          date: '2023-08-21',
          totalQuestions: 10,
          correctAnswers: 8,
          wrongAnswers: 2
        }
      ],
      
      // Time distribution
      timeDistribution: [
        { type: 'learning', label: 'Öğrenim Materyalleri', percentage: 40 },
        { type: 'practice', label: 'Uygulama', percentage: 25 },
        { type: 'quiz', label: 'Quizler', percentage: 15 },
        { type: 'assignment', label: 'Ödevler', percentage: 20 }
      ],
      
      // Achievements
      achievements: [
        {
          id: 'achievement-1',
          title: 'Dijital Pazarlamaya İlk Adım',
          description: 'İlk modülü tamamlayın',
          icon: '🏆',
          earned: true,
          earnedDate: '2023-08-10'
        },
        {
          id: 'achievement-2',
          title: '3 Gün Üst Üste Çalışma',
          description: '3 gün üst üste platforma giriş yapın',
          icon: '🔥',
          earned: true,
          earnedDate: '2023-08-15'
        },
        {
          id: 'achievement-3',
          title: 'İlk 5 Görevi Tamamla',
          description: '5 görevi başarıyla tamamlayın',
          icon: '🌟',
          earned: true,
          earnedDate: '2023-08-18'
        },
        {
          id: 'achievement-4',
          title: '90% Quiz Skoru',
          description: 'En az 5 quizde %90 ve üzeri skor alın',
          icon: '🧠',
          earned: false,
          progress: 60
        },
        {
          id: 'achievement-5',
          title: 'İlk Seviyeyi Tamamla',
          description: 'Dijital Pazarlama Temelleri seviyesini tamamlayın',
          icon: '🎯',
          earned: false,
          progress: 85
        },
        {
          id: 'achievement-6',
          title: 'Üstat Paylaşımcı',
          description: '10 ödev ve proje gönderin',
          icon: '📚',
          earned: false,
          progress: 30
        }
      ]
    }
  },
  computed: {
    studyTimeFormatted() {
      return `${this.studyTimeHours} saat ${this.studyTimeMinutes} dk`
    },
    filteredQuizzes() {
      if (this.quizFilter === 'recent') {
        return [...this.quizzes].slice(-5)
      }
      return this.quizzes
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long' 
      })
    },
    formatDayLabel(dateString) {
      const date = new Date(dateString)
      const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
      return days[date.getDay()]
    },
    getQuizScorePercentage(quiz) {
      return Math.round((quiz.correctAnswers / quiz.totalQuestions) * 100)
    },
    getQuizStatusClass(quiz) {
      const score = this.getQuizScorePercentage(quiz)
      if (score >= 85) return 'success'
      if (score >= 70) return 'good'
      if (score >= 50) return 'average'
      return 'poor'
    },
    getQuizStatusText(quiz) {
      const score = this.getQuizScorePercentage(quiz)
      if (score >= 85) return 'Mükemmel'
      if (score >= 70) return 'İyi'
      if (score >= 50) return 'Orta'
      return 'Zayıf'
    },
    getSegmentColor(index) {
      const colors = ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b']
      return colors[index % colors.length]
    }
  }
}
</script>

<style scoped>
.stats-view {
  margin-bottom: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e9ecef;
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.stats-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stats-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.chart-options select {
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background-color: #fff;
  font-size: 0.9rem;
}

/* Activity Chart */
.activity-chart {
  height: 250px;
}

.chart-days {
  display: flex;
  justify-content: space-between;
  height: 200px;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.chart-day {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-bar {
  width: 80%;
  max-width: 30px;
  min-height: 5px;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s;
}

.chart-bar.low {
  background-color: #e74a3b;
}

.chart-bar.medium {
  background-color: #f6c23e;
}

.chart-bar.high {
  background-color: #1cc88a;
}

.chart-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.chart-legend {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.high {
  background-color: #1cc88a;
}

.legend-color.medium {
  background-color: #f6c23e;
}

.legend-color.low {
  background-color: #e74a3b;
}

.legend-text {
  font-size: 0.85rem;
  color: #6c757d;
}

/* Stage Progress */
.stage-progress {
  margin-bottom: 1.25rem;
}

.stage-progress:last-child {
  margin-bottom: 0;
}

.stage-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4e73df;
  border-radius: 100px;
  transition: width 0.3s;
}

.progress-percentage {
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

.progress-detail {
  color: #6c757d;
  font-size: 0.85rem;
}

/* Quiz Table */
.quiz-performance {
  overflow-x: auto;
}

.quiz-table {
  width: 100%;
  border-collapse: collapse;
}

.quiz-table th,
.quiz-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.quiz-table th {
  font-weight: 600;
  color: #495057;
}

.quiz-score {
  font-weight: 600;
}

.quiz-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.quiz-status.success {
  background-color: #d4edda;
  color: #155724;
}

.quiz-status.good {
  background-color: #d1ecf1;
  color: #0c5460;
}

.quiz-status.average {
  background-color: #fff3cd;
  color: #856404;
}

.quiz-status.poor {
  background-color: #f8d7da;
  color: #721c24;
}

/* Time Distribution */
.time-distribution {
  margin-top: 2rem;
}

.distribution-chart {
  display: flex;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.distribution-segment {
  height: 100%;
  position: relative;
}

.segment-fill {
  height: 100%;
  width: 100%;
}

.distribution-legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.legend-percentage {
  font-weight: 600;
  margin-left: 0.5rem;
}

/* Achievements */
.stats-achievements {
  margin-bottom: 1.5rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.achievement-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.achievement-item.locked {
  opacity: 0.7;
}

.achievement-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.achievement-details {
  flex: 1;
}

.achievement-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.achievement-description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.achievement-earned {
  color: #28a745;
  font-weight: 500;
  font-size: 0.85rem;
}

.achievement-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-text {
  font-size: 0.85rem;
  font-weight: 500;
}

@media (max-width: 992px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-charts,
  .stats-details {
    grid-template-columns: 1fr;
  }
  
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .distribution-legend {
    grid-template-columns: 1fr;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style> 