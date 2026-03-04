<template>
  <div class="roadmap-view">
    <div class="page-header">
      <h1>Öğrenme Yol Haritası</h1>
      <p class="subtitle">Dijital pazarlama kariyerinizde ilerlemeniz için yol haritası</p>
    </div>
    
    <div class="progress-overview">
      <div class="progress-stat">
        <div class="progress-number">{{ completedModules }}</div>
        <div class="progress-label">Tamamlanan Modül</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progressPercentage}%` }"></div>
      </div>
      <div class="progress-stat">
        <div class="progress-number">{{ totalModules }}</div>
        <div class="progress-label">Toplam Modül</div>
      </div>
    </div>
    
    <div class="roadmap-container">
      <div v-for="(stage, stageIndex) in stages" :key="stage.id" class="roadmap-stage">
        <div class="stage-header">
          <div class="stage-number">{{ stageIndex + 1 }}</div>
          <div class="stage-info">
            <h2 class="stage-title">{{ stage.title }}</h2>
            <p class="stage-description">{{ stage.description }}</p>
          </div>
          <div class="stage-progress">
            <div class="stage-progress-text">{{ getStageProgress(stage.id) }}</div>
            <div class="stage-status" :class="getStageStatusClass(stage.id)">
              {{ getStageStatusText(stage.id) }}
            </div>
          </div>
        </div>
        
        <div class="stage-modules">
          <div 
            v-for="module in getModulesByStage(stage.id)" 
            :key="module.id" 
            class="module-card"
            :class="getModuleStatusClass(module.status)">
            <div class="module-header">
              <div class="module-icon">{{ getModuleIcon(module.type) }}</div>
              <div class="module-status-indicator" :class="getModuleStatusClass(module.status)"></div>
              <div v-if="module.isRequired" class="module-required">Zorunlu</div>
            </div>
            
            <div class="module-content">
              <h3 class="module-title">{{ module.title }}</h3>
              <p class="module-description">{{ module.description }}</p>
              
              <div class="module-meta">
                <div class="module-difficulty">
                  <span class="meta-icon">🔥</span>
                  <span>{{ getDifficultyText(module.difficulty) }}</span>
                </div>
                <div class="module-duration">
                  <span class="meta-icon">⏱️</span>
                  <span>{{ module.duration }} dakika</span>
                </div>
                <div class="module-tasks">
                  <span class="meta-icon">📋</span>
                  <span>{{ module.taskCount }} görev</span>
                </div>
              </div>
            </div>
            
            <div class="module-footer">
              <template v-if="module.status === 'completed'">
                <div class="module-completion">
                  <div class="completion-info">
                    <span class="completion-icon">✅</span>
                    <span class="completion-date">{{ formatDate(module.completedAt) }} tarihinde tamamlandı</span>
                  </div>
                  <button class="btn btn-secondary" @click="viewModuleDetails(module.id)">
                    İçeriği Görüntüle
                  </button>
                </div>
              </template>
              
              <template v-else-if="module.status === 'in-progress'">
                <button class="btn btn-primary" @click="continueModule(module.id)">
                  Devam Et
                </button>
              </template>
              
              <template v-else-if="module.status === 'locked'">
                <div class="module-locked">
                  <div class="locked-icon">🔒</div>
                  <div class="locked-text">{{ getModuleLockedMessage(module) }}</div>
                </div>
              </template>
              
              <template v-else>
                <button 
                  class="btn btn-primary" 
                  @click="startModule(module.id)"
                  :disabled="module.status === 'locked'"
                >
                  Başla
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { roadmapStages, roadmapModules } from '@/utils/marketingData/learning-content';
import { getTaskStatus, isLevelUnlocked, loadProgress, markTaskStarted, subscribeProgress } from '@/utils/progressStore';

export default {
  name: 'RoadmapView',
  data() {
    return {
      stages: roadmapStages,
      baseModules: roadmapModules.map((module) => ({ ...module })),
      progress: loadProgress(),
      unsubscribeProgress: null
    }
  },
  computed: {
    modules() {
      return this.baseModules.map((module) => {
        const taskId = module.id.split('-')[1];
        const unlocked = isLevelUnlocked(module.levelId, this.progress);
        const status = unlocked ? this.normalizeTaskStatus(getTaskStatus(taskId, this.progress)) : 'locked';
        const completedAt = status === 'completed' ? this.progress.updatedAt : module.completedAt;
        return {
          ...module,
          status,
          completedAt,
          lockReason: unlocked ? '' : `Önce seviye ${Number(module.levelId) - 1} tamamlanmalı.`
        };
      });
    },
    completedModules() {
      return this.modules.filter(m => m.status === 'completed').length;
    },
    totalModules() {
      return this.modules.length;
    },
    progressPercentage() {
      if (!this.totalModules) return 0;
      return (this.completedModules / this.totalModules) * 100;
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.progress = progress;
    });
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
  },
  methods: {
    normalizeTaskStatus(status) {
      if (status === 'Tamamlandı') return 'completed';
      if (status === 'Devam Ediyor') return 'in-progress';
      return 'not-started';
    },
    getModulesByStage(stageId) {
      return this.modules.filter(module => module.stageId === stageId);
    },
    getStageProgress(stageId) {
      const stageModules = this.getModulesByStage(stageId);
      if (!stageModules.length) {
        return '0/0 tamamlandı';
      }
      const completedModules = stageModules.filter(m => m.status === 'completed').length;
      return `${completedModules}/${stageModules.length} tamamlandı`;
    },
    getStageStatusClass(stageId) {
      const stageModules = this.getModulesByStage(stageId);
      if (!stageModules.length) {
        return 'status-not-started';
      }
      const completedCount = stageModules.filter(m => m.status === 'completed').length;
      const inProgressCount = stageModules.filter(m => m.status === 'in-progress').length;
      
      if (completedCount === stageModules.length) {
        return 'status-completed';
      } else if (inProgressCount > 0 || completedCount > 0) {
        return 'status-in-progress';
      } else {
        return 'status-not-started';
      }
    },
    getStageStatusText(stageId) {
      const statusClass = this.getStageStatusClass(stageId);
      
      switch(statusClass) {
        case 'status-completed':
          return 'Tamamlandı';
        case 'status-in-progress':
          return 'Devam Ediyor';
        default:
          return 'Başlanmadı';
      }
    },
    getModuleStatusClass(status) {
      return `status-${status}`;
    },
    getModuleIcon(type) {
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
        month: 'long', 
        year: 'numeric' 
      });
    },
    viewModuleDetails(moduleId) {
      // Extract the level ID from the module ID (e.g., module-501 → 5)
      const levelId = moduleId.split('-')[1].charAt(0);
      
      // Navigate to the level view
      this.$router.push({ name: 'level', params: { id: levelId }});
    },
    continueModule(moduleId) {
      // Extract the level ID from the module ID
      const levelId = moduleId.split('-')[1].charAt(0);
      
      // Navigate to the level view
      this.$router.push({ name: 'level', params: { id: levelId }});
    },
    startModule(moduleId) {
      const taskId = moduleId.split('-')[1];
      markTaskStarted(taskId);
      
      // Extract the level ID from the module ID
      const levelId = moduleId.split('-')[1].charAt(0);
      
      // Navigate to the level view
      this.$router.push({ name: 'level', params: { id: levelId }});
    },
    getModuleLockedMessage(module) {
      return module.lockReason || 'Bu modül şu anda kullanılamıyor.';
    }
  }
}
</script>

<style scoped>
.roadmap-view {
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

.progress-overview {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.progress-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.progress-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  color: #6c757d;
}

.progress-bar-container {
  flex: 1;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 100px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #0d6efd;
  border-radius: 100px;
  transition: width 0.3s ease;
}

.roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.roadmap-stage {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.stage-header {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  gap: 1.25rem;
  border-bottom: 1px solid #e9ecef;
}

.stage-number {
  width: 48px;
  height: 48px;
  background-color: #212529;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.stage-info {
  flex: 1;
}

.stage-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stage-description {
  color: #6c757d;
  font-size: 0.925rem;
}

.stage-progress {
  text-align: right;
  min-width: 150px;
}

.stage-progress-text {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stage-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-completed {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status-in-progress {
  background-color: #fff3cd;
  color: #664d03;
}

.status-not-started, .status-locked {
  background-color: #e9ecef;
  color: #6c757d;
}

.stage-modules {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.module-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.module-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.module-card.status-locked {
  opacity: 0.7;
}

.module-card.status-completed {
  border-left: 4px solid #198754;
}

.module-card.status-in-progress {
  border-left: 4px solid #fd7e14;
}

.module-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.module-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.module-status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e9ecef;
}

.module-status-indicator.status-completed {
  background-color: #198754;
}

.module-status-indicator.status-in-progress {
  background-color: #fd7e14;
}

.module-required {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6c757d;
  padding: 0.25rem 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
}

.module-content {
  padding: 1.25rem;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.module-description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.module-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.module-difficulty, .module-duration, .module-tasks {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.meta-icon {
  font-size: 1rem;
}

.module-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-completion {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.completion-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.completion-icon {
  font-size: 1rem;
}

.completion-date {
  color: #198754;
  font-weight: 500;
}

.module-locked {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6c757d;
  font-size: 0.85rem;
}

.locked-icon {
  font-size: 1.25rem;
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
  width: 100%;
  text-align: center;
}

.btn-primary:hover {
  background-color: #343a40;
}

.btn-primary:disabled {
  background-color: #e9ecef;
  color: #adb5bd;
  cursor: not-allowed;
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
  .progress-overview {
    flex-direction: column;
    padding: 1rem;
  }
  
  .progress-bar-container {
    width: 100%;
    margin: 1rem 0;
  }
  
  .stage-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .stage-number {
    margin: 0 auto;
  }
  
  .stage-progress {
    text-align: center;
    min-width: auto;
    width: 100%;
  }
  
  .stage-modules {
    grid-template-columns: 1fr;
  }
  
  .module-completion {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 
