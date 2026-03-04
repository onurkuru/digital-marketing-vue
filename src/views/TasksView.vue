<template>
  <div class="tasks-view">
    <div class="page-header">
      <h1>Görevler</h1>
      <p class="subtitle">Tüm seviyelerden görevleri seçip istediğiniz sırayla başlayabilirsiniz.</p>
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
            <option v-for="level in levels" :key="level.id" :value="level.id">
              Seviye {{ level.id }}: {{ level.title }}
            </option>
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
              <div class="task-deadline" v-if="task.deadline">
                <span class="icon">⏰</span>
                <span>Teslim: {{ task.deadline }}</span>
              </div>
              <div class="task-points" v-if="task.points">
                <span class="icon">🏆</span>
                <span>{{ task.points }} puan</span>
              </div>
              <div class="task-duration" v-if="task.duration">
                <span class="icon">🕒</span>
                <span>{{ task.duration }}</span>
              </div>
            </div>
          </div>

          <div class="task-actions">
            <router-link :to="`/task/${task.id}`" class="btn btn-primary">Göreve Git</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';

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
      levels,
      tasks: allTasks
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) => {
        if (this.currentTab === 'in-progress' && task.status !== 'Devam Ediyor') return false;
        if (this.currentTab === 'completed' && task.status !== 'Tamamlandı') return false;
        if (this.currentTab === 'not-started' && task.status !== 'Henüz Başlanmadı') return false;

        if (this.levelFilter !== 'all' && task.levelId !== this.levelFilter) return false;

        return true;
      });
    }
  },
  methods: {
    getLevelTitle(levelId) {
      const level = this.levels.find((item) => item.id === String(levelId));
      return level ? level.title : `Seviye ${levelId}`;
    },
    getStatusClass(status) {
      if (status === 'Tamamlandı') return 'completed';
      if (status === 'Devam Ediyor') return 'in-progress';
      return 'not-started';
    }
  }
};
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
  overflow-x: auto;
}

.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: #495057;
  transition: all 0.2s;
  white-space: nowrap;
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
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
  min-width: 240px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.no-tasks {
  text-align: center;
  padding: 2rem 1rem;
}

.no-tasks-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.task-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.task-status {
  padding-top: 0.3rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ced4da;
}

.status-indicator.completed {
  background: #198754;
}

.status-indicator.in-progress {
  background: #ffc107;
}

.status-indicator.not-started {
  background: #6c757d;
}

.task-info {
  flex: 1;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.task-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #495057;
}

.level-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #212529;
  color: white;
  font-size: 0.75rem;
}

.task-status-text {
  font-size: 0.8rem;
  font-weight: 600;
}

.task-status-text.completed {
  color: #198754;
}

.task-status-text.in-progress {
  color: #a37b00;
}

.task-status-text.not-started {
  color: #6c757d;
}

.task-title {
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}

.task-description {
  color: #6c757d;
  margin-bottom: 0.8rem;
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #495057;
}

.task-meta .icon {
  margin-right: 0.25rem;
}

.task-actions {
  display: flex;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #000;
}

@media (max-width: 900px) {
  .task-item {
    flex-direction: column;
  }

  .task-actions {
    justify-content: flex-start;
  }

  .filter-item select {
    min-width: 180px;
  }
}
</style>
