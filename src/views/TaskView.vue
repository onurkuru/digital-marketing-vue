<template>
  <div class="task-view">
    <div class="page-header">
      <h1>Görevler</h1>
      <p class="subtitle">Dijital pazarlama öğrenmenizdeki görevleri takip edin</p>
    </div>
    
    <div class="task-filters">
      <div 
        v-for="filter in filters" 
        :key="filter.id" 
        class="filter-item"
        :class="{ 'active': activeFilter === filter.id }"
        @click="setActiveFilter(filter.id)">
        {{ filter.name }}
      </div>
    </div>
    
    <div class="tasks-container">
      <div v-if="filteredTasks.length === 0" class="no-tasks">
        <div class="no-tasks-icon">🔍</div>
        <h3>Görev bulunamadı</h3>
        <p>Seçili filtreye göre gösterilecek görev bulunmamaktadır.</p>
      </div>
      
      <div v-else class="task-list">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id" 
          class="task-card"
          :class="{ 'completed': task.status === 'completed' }">
          <div class="task-card-header">
            <div :class="['task-status', `status-${task.status}`]"></div>
            <div class="task-level">
              <div class="level-badge">{{ task.level }}</div>
              <span>{{ getLevelName(task.level) }}</span>
            </div>
            <div v-if="task.isImportant" class="task-important">
              <span class="important-badge">Önemli</span>
            </div>
          </div>
          
          <div class="task-card-content">
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.description }}</p>
            
            <div class="task-meta">
              <div class="task-due" v-if="task.dueDate">
                <div class="meta-icon">📅</div>
                <div>Bitiş: {{ formatDate(task.dueDate) }}</div>
              </div>
              <div class="task-points">
                <div class="meta-icon">🎯</div>
                <div>{{ task.points }} puan</div>
              </div>
              <div class="task-type">
                <div class="meta-icon">{{ getTaskTypeIcon(task.type) }}</div>
                <div>{{ getTaskTypeName(task.type) }}</div>
              </div>
            </div>
          </div>
          
          <div class="task-card-resources" v-if="task.resources && task.resources.length > 0">
            <h4>Kaynaklar</h4>
            <div class="resource-list">
              <div v-for="(resource, index) in task.resources" :key="index" class="resource-item">
                <div class="resource-icon">{{ getResourceIcon(resource.type) }}</div>
                <div class="resource-text">{{ resource.title }}</div>
                <a :href="resource.url" target="_blank" class="resource-link">Görüntüle</a>
              </div>
            </div>
          </div>
          
          <div class="task-card-footer">
            <template v-if="task.status === 'completed'">
              <div class="completed-info">
                <div class="completion-date">{{ formatDate(task.completedAt) }} tarihinde tamamlandı</div>
                <div class="earned-points">+{{ task.points }} puan kazandınız</div>
              </div>
              <button class="btn btn-secondary" @click="viewTaskDetails(task.id)">
                Detayları Görüntüle
              </button>
            </template>
            
            <template v-else-if="task.status === 'in-progress'">
              <div class="progress-info">Devam ediyor</div>
              <div class="task-actions">
                <button class="btn btn-secondary" @click="viewTaskDetails(task.id)">
                  Devam Et
                </button>
                <button class="btn btn-primary" @click="completeTask(task.id)">
                  Tamamlandı
                </button>
              </div>
            </template>
            
            <template v-else>
              <button class="btn btn-primary" @click="startTask(task.id)">
                Göreve Başla
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskView',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { id: 'all', name: 'Tüm Görevler' },
        { id: 'current', name: 'Mevcut Görevler' },
        { id: 'completed', name: 'Tamamlananlar' },
        { id: 'upcoming', name: 'Yaklaşan Görevler' }
      ],
      tasks: [
        {
          id: '101',
          title: 'Digital Marketing 101',
          description: 'Dijital pazarlama kavramlarına giriş yapın ve temel bilgileri öğrenin.',
          status: 'completed',
          level: 1,
          type: 'learning',
          points: 100,
          dueDate: '2023-08-10',
          completedAt: '2023-08-10',
          isImportant: true,
          resources: [
            {
              type: 'article',
              title: 'Dijital Pazarlamaya Giriş',
              url: '#'
            },
            {
              type: 'video',
              title: 'Dijital Pazarlama Temelleri',
              url: '#'
            }
          ]
        },
        {
          id: '102',
          title: 'Temel Terminoloji',
          description: 'Dijital pazarlamada sıkça kullanılan terimleri ve kavramları öğrenin.',
          status: 'in-progress',
          level: 1,
          type: 'learning',
          points: 150,
          dueDate: '2023-08-15',
          isImportant: false,
          resources: [
            {
              type: 'article',
              title: 'Dijital Pazarlama Terminolojisi',
              url: '#'
            }
          ]
        },
        {
          id: '103',
          title: 'Marka Hedefleri',
          description: 'Dijital pazarlamada marka hedeflerini belirlemenin önemini anlayın.',
          status: 'not-started',
          level: 1,
          type: 'activity',
          points: 200,
          dueDate: '2023-08-20',
          isImportant: false,
          resources: [
            {
              type: 'article',
              title: 'Marka Hedeflerini Belirleme',
              url: '#'
            },
            {
              type: 'video',
              title: 'Etkili Marka Stratejisi',
              url: '#'
            }
          ]
        },
        {
          id: '201',
          title: 'SEO Temelleri',
          description: 'Arama motoru optimizasyonunun temellerini ve anahtar kelime araştırmasını öğrenin.',
          status: 'not-started',
          level: 2,
          type: 'learning',
          points: 250,
          dueDate: '2023-08-25',
          isImportant: true,
          resources: [
            {
              type: 'article',
              title: 'SEO Temel Rehberi',
              url: '#'
            },
            {
              type: 'tool',
              title: 'Google Keyword Planner',
              url: '#'
            }
          ]
        },
        {
          id: '202',
          title: 'On-Page SEO Uygulaması',
          description: 'On-Page SEO tekniklerini uygulayarak web sayfalarını optimize edin.',
          status: 'not-started',
          level: 2,
          type: 'project',
          points: 300,
          dueDate: '2023-09-01',
          isImportant: false,
          resources: [
            {
              type: 'article',
              title: 'On-Page SEO Rehberi',
              url: '#'
            },
            {
              type: 'tool',
              title: 'Yoast SEO Araçları',
              url: '#'
            }
          ]
        }
      ]
    }
  },
  computed: {
    filteredTasks() {
      switch(this.activeFilter) {
        case 'current':
          return this.tasks.filter(task => task.status === 'in-progress');
        case 'completed':
          return this.tasks.filter(task => task.status === 'completed');
        case 'upcoming':
          return this.tasks.filter(task => task.status === 'not-started');
        case 'all':
        default:
          return this.tasks;
      }
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    },
    setActiveFilter(filterId) {
      this.activeFilter = filterId;
    },
    getLevelName(level) {
      const levels = {
        1: 'Temel Seviye',
        2: 'Orta Seviye',
        3: 'İleri Seviye'
      };
      return levels[level] || `Seviye ${level}`;
    },
    getTaskTypeIcon(type) {
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
    getTaskTypeName(type) {
      switch(type) {
        case 'learning':
          return 'Eğitim';
        case 'quiz':
          return 'Quiz';
        case 'activity':
          return 'Aktivite';
        case 'project':
          return 'Proje';
        default:
          return 'Görev';
      }
    },
    getResourceIcon(type) {
      switch(type) {
        case 'article':
          return '📄';
        case 'video':
          return '🎬';
        case 'tool':
          return '🔧';
        case 'course':
          return '📚';
        default:
          return '📌';
      }
    },
    startTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].status = 'in-progress';
      }
    },
    completeTask(taskId) {
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].status = 'completed';
        this.tasks[taskIndex].completedAt = new Date().toISOString().split('T')[0];
      }
    },
    viewTaskDetails(taskId) {
      this.$router.push({ name: 'task', params: { id: taskId }});
    }
  }
}
</script>

<style scoped>
.task-view {
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

.task-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
}

.filter-item {
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f8f9fa;
}

.filter-item:hover {
  background-color: #e9ecef;
}

.filter-item.active {
  background-color: #212529;
  color: white;
}

.no-tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
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

.no-tasks p {
  color: #6c757d;
  max-width: 400px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.task-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.task-card.completed {
  border-left: 5px solid #198754;
}

.task-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.task-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e9ecef;
}

.status-completed {
  background-color: #198754;
}

.status-in-progress {
  background-color: #fd7e14;
}

.status-not-started {
  background-color: #6c757d;
}

.task-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.level-badge {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.task-important {
  margin-left: auto;
}

.important-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.task-card-content {
  padding: 1.25rem;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.task-description {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.task-due, .task-points, .task-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.meta-icon {
  font-size: 1rem;
}

.task-card-resources {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid #e9ecef;
  padding-top: 1.25rem;
}

.task-card-resources h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.resource-icon {
  font-size: 1rem;
}

.resource-text {
  flex: 1;
  font-size: 0.85rem;
}

.resource-link {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #212529;
  font-size: 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

.resource-link:hover {
  background-color: #dee2e6;
}

.task-card-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.completed-info {
  font-size: 0.85rem;
}

.completion-date {
  color: #198754;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.earned-points {
  color: #6c757d;
}

.progress-info {
  color: #fd7e14;
  font-weight: 500;
  font-size: 0.85rem;
}

.task-actions {
  display: flex;
  gap: 0.75rem;
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

.btn-secondary {
  background-color: transparent;
  border: 1px solid #212529;
  color: #212529;
}

.btn-secondary:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .task-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .task-card-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .task-actions {
    width: 100%;
  }
  
  .task-actions .btn {
    flex: 1;
    text-align: center;
  }
}
</style> 