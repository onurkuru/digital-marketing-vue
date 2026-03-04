<template>
  <div class="tasks-view">
    <div class="page-header">
      <h1>Görevler</h1>
      <p class="subtitle">Dijital pazarlama becerilerinizi geliştirmek için tamamlamanız gereken görevler</p>
    </div>
    
    <div class="tasks-filters">
      <div class="tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.value" 
          :class="['tab', { active: currentTab === tab.value }]"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
      
      <div class="filters">
        <div class="filter-item">
          <label for="levelFilter">Seviye:</label>
          <select id="levelFilter" v-model="levelFilter">
            <option value="all">Tümü</option>
            <option value="1">Seviye 1: Temel Kavramlar</option>
            <option value="2">Seviye 2: SEO Temelleri</option>
            <option value="3">Seviye 3: Sosyal Medya</option>
            <option value="4">Seviye 4: İçerik Pazarlaması</option>
            <option value="5">Seviye 5: E-posta Pazarlaması</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="tasks-list card">
      <div v-if="filteredTasks.length === 0" class="no-tasks">
        <div class="no-tasks-icon">📝</div>
        <h3>Uygun görev bulunamadı</h3>
        <p>Filtreleri değiştirerek görevleri görüntüleyebilirsiniz.</p>
      </div>
      
      <div v-else class="task-items">
        <div v-for="task in filteredTasks" :key="task.id" class="task-item">
          <div class="task-status">
            <div :class="['status-indicator', getStatusClass(task.status)]"></div>
          </div>
          
          <div class="task-info">
            <div class="task-header">
              <div class="task-level">
                <span class="level-badge">{{ task.levelId }}</span>
                {{ getLevelTitle(task.levelId) }}
              </div>
              <div class="task-status-text" :class="getStatusClass(task.status)">
                {{ task.status }}
              </div>
            </div>
            
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.description }}</p>
            
            <div class="task-meta">
              <div class="task-deadline">
                <span class="icon">⏰</span>
                <span>Teslim: {{ task.deadline }}</span>
              </div>
              <div class="task-points" v-if="task.points">
                <span class="icon">🏆</span>
                <span>{{ task.points }} puan</span>
              </div>
            </div>
          </div>
          
          <div class="task-actions">
            <router-link :to="'/task/' + task.id" class="btn btn-primary">Göreve Git</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksView',
  data() {
    return {
      tabs: [
        { label: 'Tüm Görevler', value: 'all' },
        { label: 'Devam Edenler', value: 'in-progress' },
        { label: 'Tamamlananlar', value: 'completed' },
        { label: 'Henüz Başlanmayanlar', value: 'not-started' }
      ],
      currentTab: 'all',
      levelFilter: 'all',
      tasks: [
        {
          id: '101',
          levelId: '1',
          title: 'Task 1.1: Digital Marketing 101',
          description: 'Dijital pazarlamanın temellerini, avantajlarını ve çeşitli kanallarını öğrenin.',
          status: 'Tamamlandı',
          deadline: '10.04.2025'
        },
        {
          id: '102',
          levelId: '1',
          title: 'Task 1.2: Temel Terminoloji',
          description: 'Dijital pazarlama terminolojisini öğrenerek sektördeki terimlere hakim olun.',
          status: 'Devam Ediyor',
          deadline: '17.04.2025'
        },
        {
          id: '103',
          levelId: '1',
          title: 'Task 1.3: Marka Hedefleri',
          description: 'Dijital pazarlama hedeflerinizi belirleyin ve marka stratejisi geliştirin.',
          status: 'Henüz Başlanmadı',
          deadline: '24.04.2025'
        },
        {
          id: '201',
          levelId: '2',
          title: 'Task 2.1: Anahtar Kelime Araştırması',
          description: 'Anahtar kelime araştırması yaparak hedef kitlenizin arama davranışlarını anlayın.',
          status: 'Henüz Başlanmadı',
          deadline: '01.05.2025'
        },
        {
          id: '202',
          levelId: '2',
          title: 'Task 2.2: On-Page SEO Uygulaması',
          description: 'Bir web sayfasını SEO prensiplerine göre optimize edin.',
          status: 'Henüz Başlanmadı',
          deadline: '08.05.2025'
        },
        {
          id: '301',
          levelId: '3',
          title: 'Task 3.1: Sosyal Medya Stratejisi',
          description: 'Bir marka için sosyal medya stratejisi geliştirin.',
          status: 'Henüz Başlanmadı',
          deadline: '15.05.2025'
        },
        {
          id: '501',
          levelId: '5',
          title: 'Task 5.1: E-posta Pazarlamasına Giriş',
          description: 'E-posta pazarlamasının temellerini, önemini ve başarılı e-posta kampanyalarının bileşenlerini öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '29.08.2025',
          points: 150
        },
        {
          id: '502',
          levelId: '5',
          title: 'Task 5.2: E-posta Listesi Oluşturma ve Segmentasyon',
          description: 'Kaliteli bir e-posta listesi oluşturma, büyütme ve etkili segmentasyon stratejileri geliştirme konularını öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '05.09.2025',
          points: 200
        },
        {
          id: '503',
          levelId: '5',
          title: 'Task 5.3: E-posta Tasarımı ve İçerik Oluşturma',
          description: 'Etkili e-posta tasarımı ve içerik oluşturma tekniklerini öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '12.09.2025',
          points: 250
        },
        {
          id: '504',
          levelId: '5',
          title: 'Task 5.4: E-posta Otomasyonu',
          description: 'E-posta otomasyonunun temellerini ve müşteri yolculuğuna göre otomasyon akışları oluşturmayı öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '19.09.2025',
          points: 300
        },
        {
          id: '505',
          levelId: '5',
          title: 'Task 5.5: E-posta Analizi ve Optimizasyon',
          description: 'E-posta kampanyalarının performansını analiz etme ve optimizasyon stratejileri geliştirme konularını öğreneceksiniz.',
          status: 'Henüz Başlanmadı',
          deadline: '26.09.2025',
          points: 350
        }
      ]
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        // Filter by tab (status)
        if (this.currentTab === 'in-progress' && task.status !== 'Devam Ediyor') return false
        if (this.currentTab === 'completed' && task.status !== 'Tamamlandı') return false
        if (this.currentTab === 'not-started' && task.status !== 'Henüz Başlanmadı') return false
        
        // Filter by level
        if (this.levelFilter !== 'all' && task.levelId !== this.levelFilter) return false
        
        return true
      })
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
      return levels[levelId] || `Seviye ${levelId}`
    },
    getStatusClass(status) {
      if (status === 'Tamamlandı') return 'completed'
      if (status === 'Devam Ediyor') return 'in-progress'
      return 'not-started'
    }
  }
}
</script>

<style scoped>
.tasks-view {
  margin-bottom: 2rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.tasks-filters {
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: #495057;
  transition: all 0.2s;
}

.tab.active {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  font-weight: 500;
}

.tab:hover:not(.active) {
  color: #0d6efd;
  background-color: #f8f9fa;
}

.filters {
  display: flex;
  padding: 0.75rem 0;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-item label {
  font-weight: 500;
}

.filter-item select {
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background-color: #fff;
  font-size: 0.95rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.no-tasks {
  text-align: center;
  padding: 3rem 0;
  color: #6c757d;
}

.no-tasks-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.no-tasks h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.task-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.task-item:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.task-status {
  display: flex;
  align-items: flex-start;
  padding-top: 0.5rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e9ecef;
}

.status-indicator.completed {
  background-color: #28a745;
}

.status-indicator.in-progress {
  background-color: #fd7e14;
}

.status-indicator.not-started {
  background-color: #6c757d;
}

.task-info {
  flex: 1;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.task-level {
  font-size: 0.85rem;
  font-weight: 500;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-badge {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-weight: 600;
  color: #495057;
  font-size: 0.8rem;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.task-description {
  color: #495057;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.task-deadline, .task-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.task-status-text {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.task-status-text.completed {
  background-color: #d4edda;
  color: #155724;
}

.task-status-text.in-progress {
  background-color: #fff3cd;
  color: #856404;
}

.task-status-text.not-started {
  background-color: #e9ecef;
  color: #6c757d;
}

.task-actions {
  display: flex;
  align-items: center;
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

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}
</style> 