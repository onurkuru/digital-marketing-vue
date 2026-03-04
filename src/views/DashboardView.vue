<template>
  <div class="dashboard-view">
    <div class="page-header">
      <h1>Dijital Pazarlama Kursu</h1>
      <p class="subtitle">Kariyerinizi dijital pazarlama alanında ilerletmek için öğrenme yolculuğuna başlayın</p>
    </div>

    <div class="dashboard-overview">
      <div class="dashboard-greeting card">
        <h2>Hoş Geldin, {{ userName }}</h2>
        <p>Öğrenmeye kaldığın yerden devam et ve öğrenme yolculuğunda ilerle.</p>
        
        <div class="progress-overview">
          <div class="progress-bar-wrapper">
            <div class="progress-text">Genel İlerleme: {{ overallProgress }}%</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${overallProgress}%` }"></div>
            </div>
          </div>
          
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">{{ completedModules }}</div>
              <div class="stat-label">Tamamlanan Modül</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ completedTasks }}</div>
              <div class="stat-label">Tamamlanan Görev</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ earnedPoints }}</div>
              <div class="stat-label">Toplam Puan</div>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <router-link to="/roadmap" class="btn btn-primary">Yol Haritasına Git</router-link>
        </div>
      </div>

      <div class="user-stats card">
        <div class="streak-info">
          <div class="streak-icon">🔥</div>
          <div class="streak-details">
            <div class="streak-count">{{ currentStreak }} Gün</div>
            <div class="streak-label">Mevcut Çalışma Serisi</div>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="level-info">
          <div class="level-badge">Seviye {{ userLevel }}</div>
          <div class="level-title">{{ levelTitle }}</div>
          <div class="level-progress-bar">
            <div class="level-progress-fill" :style="{ width: `${levelProgress}%` }"></div>
          </div>
          <div class="level-progress-text">{{ levelPoints }}/{{ nextLevelPoints }} puan bir sonraki seviyeye</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="section-continue-learning card">
        <div class="section-header">
          <h2>Kaldığın Yerden Devam Et</h2>
          <router-link to="/roadmap" class="link-all">Tüm Modüller</router-link>
        </div>
        
        <div v-if="currentModule" class="continue-module">
          <div class="module-icon" v-html="getModuleTypeIcon(currentModule.type)"></div>
          <div class="module-details">
            <div class="module-stage">{{ getStageTitle(currentModule.stageId) }}</div>
            <h3 class="module-title">{{ currentModule.title }}</h3>
            <div class="module-progress-bar">
              <div class="module-progress-fill" :style="{ width: `${currentModule.progress}%` }"></div>
            </div>
            <div class="module-meta">
              <div class="module-progress-text">{{ currentModule.progress }}% tamamlandı</div>
              <div class="module-time">Kalan: {{ currentModule.remainingTime }} dakika</div>
            </div>
          </div>
          <button class="btn btn-primary" @click="continueModule">Devam Et</button>
        </div>
        
        <div v-else class="no-current-module">
          <div class="no-module-icon">🎉</div>
          <div class="no-module-text">
            <h3>Harika İş!</h3>
            <p>Şu anda devam eden bir modülünüz bulunmuyor. Yol haritasından yeni bir modüle başlayın.</p>
          </div>
          <router-link to="/roadmap" class="btn btn-primary">Yol Haritasına Git</router-link>
        </div>
      </div>
      
      <div class="section-current-tasks card">
        <div class="section-header">
          <h2>Mevcut Görevleriniz</h2>
          <router-link to="/tasks" class="link-all">Tüm Görevler</router-link>
        </div>
        
        <div v-if="currentTasks.length > 0" class="tasks-list">
          <div v-for="task in currentTasks" :key="task.id" class="task-item">
            <div class="task-checkbox" :class="{ 'completed': task.completed }" @click="toggleTaskComplete(task.id)">
              <div v-if="task.completed" class="task-checkbox-icon">✓</div>
            </div>
            <div class="task-details">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-meta">
                <div class="task-module">{{ task.moduleTitle }}</div>
                <div v-if="task.dueDate" class="task-due-date">Son: {{ formatDate(task.dueDate) }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="no-tasks">
          <div class="no-tasks-icon">✅</div>
          <div class="no-tasks-text">Tüm görevleri tamamladınız!</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="section-achievements card">
        <div class="section-header">
          <h2>Başarılarınız</h2>
          <router-link to="/achievements" class="link-all">Tüm Başarılar</router-link>
        </div>
        
        <div class="achievements-grid">
          <div v-for="achievement in recentAchievements" :key="achievement.id" class="achievement-item">
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-info">
              <div class="achievement-title">{{ achievement.title }}</div>
              <div class="achievement-date">{{ formatDate(achievement.earnedAt) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-recommended card">
        <div class="section-header">
          <h2>Sizin İçin Öneriler</h2>
          <router-link to="/roadmap" class="link-all">Tümünü Gör</router-link>
        </div>
        
        <div class="recommended-modules">
          <div v-for="module in recommendedModules" :key="module.id" class="recommended-module">
            <div class="recommended-module-icon" v-html="getModuleTypeIcon(module.type)"></div>
            <div class="recommended-module-details">
              <h3 class="recommended-module-title">{{ module.title }}</h3>
              <div class="recommended-module-meta">
                <div class="module-difficulty">
                  <span class="meta-icon">🔥</span>
                  <span>{{ getDifficultyText(module.difficulty) }}</span>
                </div>
                <div class="module-duration">
                  <span class="meta-icon">⏱️</span>
                  <span>{{ module.duration }} dakika</span>
                </div>
              </div>
            </div>
            <button class="btn btn-outline" @click="startModule(module.id)">Başla</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      userName: 'Ahmet',
      overallProgress: 33,
      completedModules: 4,
      completedTasks: 12,
      earnedPoints: 2450,
      currentStreak: 5,
      userLevel: 3,
      levelTitle: 'Uzman Aday',
      levelProgress: 65,
      levelPoints: 1950,
      nextLevelPoints: 3000,
      
      currentModule: {
        id: 'module-103',
        stageId: 'stage-1',
        title: 'Hedef Kitle Analizi',
        type: 'activity',
        progress: 68,
        remainingTime: 25
      },
      
      currentTasks: [
        {
          id: 'task-101',
          title: 'Hedef Kitle Personası Oluşturma',
          moduleTitle: 'Hedef Kitle Analizi',
          dueDate: '2023-08-25',
          completed: false
        },
        {
          id: 'task-102',
          title: 'Rakip Analizi Raporu',
          moduleTitle: 'Hedef Kitle Analizi',
          dueDate: '2023-08-27',
          completed: false
        },
        {
          id: 'task-103',
          title: 'Dijital Pazarlama Stratejisi Taslağı',
          moduleTitle: 'Dijital Pazarlama Stratejisi Geliştirme',
          dueDate: '2023-08-30',
          completed: false
        }
      ],
      
      recentAchievements: [
        {
          id: 'achievement-1',
          title: 'Dijital Pazarlamaya İlk Adım',
          icon: '🏆',
          earnedAt: '2023-08-10'
        },
        {
          id: 'achievement-2',
          title: '3 Gün Üst Üste Çalışma',
          icon: '🔥',
          earnedAt: '2023-08-15'
        },
        {
          id: 'achievement-3',
          title: 'İlk 5 Görevi Tamamla',
          icon: '🌟',
          earnedAt: '2023-08-18'
        }
      ],
      
      recommendedModules: [
        {
          id: 'module-201',
          title: 'SEO Temelleri',
          type: 'learning',
          difficulty: 'medium',
          duration: 60
        },
        {
          id: 'module-105',
          title: 'Dijital Pazarlama Araçları',
          type: 'learning',
          difficulty: 'medium',
          duration: 45
        },
        {
          id: 'module-202',
          title: 'İçerik Pazarlaması Stratejileri',
          type: 'learning',
          difficulty: 'medium',
          duration: 50
        }
      ],
      
      stages: [
        {
          id: 'stage-1',
          title: 'Dijital Pazarlama Temelleri'
        },
        {
          id: 'stage-2',
          title: 'SEO ve İçerik Stratejisi'
        },
        {
          id: 'stage-3',
          title: 'Sosyal Medya Pazarlaması'
        },
        {
          id: 'stage-4',
          title: 'Ücretli Reklamcılık'
        },
        {
          id: 'stage-5',
          title: 'Veri Analizi ve Raporlama'
        }
      ]
    }
  },
  methods: {
    getStageTitle(stageId) {
      const stage = this.stages.find(s => s.id === stageId);
      return stage ? stage.title : '';
    },
    getModuleTypeIcon(type) {
      switch(type) {
        case 'learning':
          return '📚';
        case 'quiz':
          return '📝';
        case 'activity':
          return '🔄';
        case 'project':
          return '🏗️';
        default:
          return '📌';
      }
    },
    getDifficultyText(difficulty) {
      switch(difficulty) {
        case 'easy':
          return 'Kolay';
        case 'medium':
          return 'Orta';
        case 'hard':
          return 'Zor';
        default:
          return difficulty;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long'
      });
    },
    continueModule() {
      // In a real application, this would navigate to the current module
      console.log('Continuing module:', this.currentModule.id);
    },
    startModule(moduleId) {
      // In a real application, this would start the specified module
      console.log('Starting module:', moduleId);
    },
    toggleTaskComplete(taskId) {
      const taskIndex = this.currentTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        this.currentTasks[taskIndex].completed = !this.currentTasks[taskIndex].completed;
      }
    }
  }
}
</script>

<style scoped>
.dashboard-view {
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

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0;
}

.dashboard-overview {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.dashboard-greeting {
  display: flex;
  flex-direction: column;
}

.dashboard-greeting h2 {
  margin-bottom: 0.5rem;
}

.dashboard-greeting p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.progress-overview {
  margin-bottom: 1.5rem;
}

.progress-bar-wrapper {
  margin-bottom: 1.5rem;
}

.progress-text {
  font-size: 0.875rem;
  color: #212529;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.progress-bar {
  height: 10px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #0d6efd;
  border-radius: 100px;
  transition: width 0.3s ease;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.stat-item {
  flex: 1;
  min-width: 100px;
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6c757d;
  font-size: 0.875rem;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.user-stats {
  display: flex;
  flex-direction: column;
}

.streak-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.streak-icon {
  font-size: 2rem;
}

.streak-count {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.streak-label {
  color: #6c757d;
  font-size: 0.875rem;
}

.divider {
  height: 1px;
  background-color: #e9ecef;
  margin: 0.5rem 0 1.5rem;
}

.level-badge {
  display: inline-block;
  background-color: #212529;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.level-title {
  font-weight: 600;
  margin-bottom: 1rem;
}

.level-progress-bar {
  height: 6px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.level-progress-fill {
  height: 100%;
  background-color: #198754;
  border-radius: 100px;
  transition: width 0.3s ease;
}

.level-progress-text {
  color: #6c757d;
  font-size: 0.875rem;
  text-align: right;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.link-all {
  font-size: 0.875rem;
  color: #0d6efd;
  text-decoration: none;
}

.link-all:hover {
  text-decoration: underline;
}

.continue-module {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.module-icon {
  font-size: 2rem;
}

.module-details {
  flex: 1;
}

.module-stage {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.module-progress-bar {
  height: 6px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.module-progress-fill {
  height: 100%;
  background-color: #fd7e14;
  border-radius: 100px;
  transition: width 0.3s ease;
}

.module-meta {
  display: flex;
  font-size: 0.75rem;
  color: #6c757d;
  justify-content: space-between;
}

.no-current-module {
  text-align: center;
  padding: 2rem 0;
}

.no-module-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-module-text h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.no-module-text p {
  color: #6c757d;
  margin-bottom: 1.5rem;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.task-item:hover {
  background-color: #f8f9fa;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #adb5bd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s;
}

.task-checkbox.completed {
  background-color: #198754;
  border-color: #198754;
}

.task-checkbox-icon {
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
}

.task-details {
  flex: 1;
}

.task-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.task-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #6c757d;
}

.no-tasks {
  text-align: center;
  padding: 2rem 0;
  color: #6c757d;
}

.no-tasks-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.achievement-item {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.achievement-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.achievement-date {
  font-size: 0.75rem;
  color: #6c757d;
}

.recommended-modules {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommended-module {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.recommended-module:hover {
  background-color: #f8f9fa;
}

.recommended-module-icon {
  font-size: 1.5rem;
}

.recommended-module-details {
  flex: 1;
}

.recommended-module-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.recommended-module-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #6c757d;
}

.meta-icon {
  margin-right: 0.25rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #212529;
  color: #212529;
  white-space: nowrap;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

@media (max-width: 992px) {
  .dashboard-overview,
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .continue-module {
    flex-direction: column;
    text-align: center;
  }
  
  .module-details {
    margin-bottom: 1rem;
  }
  
  .actions,
  .module-meta {
    justify-content: center;
  }
  
  .achievements-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style> 