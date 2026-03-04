<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Dijital Pazarlama Öğrenme Yolculuğu</h1>
        <p class="subtitle">
          Tüm seviyeler açık. İstediğin seviyeden başlayabilir, ilerlemeni tarayıcı önbelleğinde kaydedebilirsin.
        </p>
        <router-link to="/tasks" class="btn btn-primary">
          <span class="btn-icon">🚀</span>
          Görevlere Başla
        </router-link>
      </div>
      <div class="hero-image">
        <img src="../assets/digital-marketing.svg" alt="Dijital Pazarlama" />
      </div>
    </div>

    <div class="progress-summary">
      <div class="progress-card">
        <div class="progress-ring">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle class="progress-ring-circle-bg" cx="60" cy="60" r="50"></circle>
            <circle
              class="progress-ring-circle"
              cx="60"
              cy="60"
              r="50"
              stroke-dasharray="314.16"
              :stroke-dashoffset="314.16 - (314.16 * progressPercentage) / 100"
            ></circle>
          </svg>
          <div class="progress-text">{{ progressPercentage }}%</div>
        </div>
        <div class="progress-label">Toplam İlerleme</div>
      </div>

      <div class="stats-cards">
        <div class="stats-card">
          <div class="stats-icon">🏆</div>
          <div class="stats-content">
            <div class="stats-value">{{ completedTaskCount }}/{{ totalTasks }}</div>
            <div class="stats-title">Tamamlanan Görevler</div>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">📚</div>
          <div class="stats-content">
            <div class="stats-value">{{ unlockedLevel }} / {{ levels.length }} Seviye Açık</div>
            <div class="stats-title">Mevcut Erişim</div>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">📝</div>
          <div class="stats-content">
            <div class="stats-value">Serbest Erişim</div>
            <div class="stats-title">İlerleme Modu</div>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-path card">
      <div class="card-header">
        <h2>Seviye Geçişleri</h2>
        <router-link to="/roadmap" class="btn btn-link">Yol Haritasını Görüntüle</router-link>
      </div>

      <div class="path-container">
        <div class="path-line"></div>

        <div
          class="path-item"
          :class="isLevelUnlocked(level.id) ? 'active' : 'locked'"
          v-for="level in levels"
          :key="level.id"
        >
          <div class="path-icon">{{ isLevelUnlocked(level.id) ? '🟢' : '🔒' }}</div>
          <div class="path-content">
            <div class="path-number">Seviye {{ level.id }}</div>
            <div class="path-title">{{ level.title }}</div>
            <div class="path-progress">
              {{ isLevelUnlocked(level.id) ? 'Hazır - başlayabilirsin' : `Önce Seviye ${Number(level.id) - 1} tamamlanmalı` }}
            </div>
          </div>
          <router-link v-if="isLevelUnlocked(level.id)" :to="`/level/${level.id}`" class="btn btn-sm">Başla</router-link>
          <button v-else class="btn btn-sm btn-disabled" disabled>Kilitli</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';
import { loadProgress, isLevelUnlocked as isLevelUnlockedByProgress, subscribeProgress } from '@/utils/progressStore';

export default {
  name: 'HomeView',
  data() {
    return {
      levels,
      totalTasks: allTasks.length,
      progress: loadProgress(),
      unsubscribeProgress: null
    };
  },
  computed: {
    completedTaskCount() {
      return this.progress.completedTasks.length;
    },
    progressPercentage() {
      if (!this.totalTasks) return 0;
      return Math.round((this.completedTaskCount / this.totalTasks) * 100);
    },
    unlockedLevel() {
      return Number(this.progress.unlockedLevel || 1);
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
    isLevelUnlocked(levelId) {
      return isLevelUnlockedByProgress(levelId, this.progress);
    }
  }
};
</script>

<style scoped>
.home {
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.hero-section {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

h1 {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid transparent;
}

.btn-primary {
  background: #212529;
  color: white;
}

.btn-link {
  color: #0d6efd;
}

.btn-sm {
  padding: 0.35rem 0.75rem;
  border: 1px solid #dee2e6;
  color: #212529;
  background: white;
}

.progress-summary {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.progress-card,
.card {
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.progress-ring {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.progress-ring-circle-bg {
  fill: none;
  stroke: #e9ecef;
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  stroke: #0d6efd;
  stroke-width: 8;
  transform-origin: center;
  transform: rotate(-90deg);
}

.progress-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.progress-label {
  text-align: center;
  margin-top: 0.75rem;
  color: #6c757d;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stats-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stats-icon {
  font-size: 1.5rem;
}

.stats-value {
  font-weight: 700;
}

.stats-title {
  color: #6c757d;
  font-size: 0.9rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.path-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.path-line {
  position: absolute;
  left: 12px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: #dee2e6;
}

.path-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
}

.path-item.active {
  border-color: #cce5ff;
  background: #f7fbff;
}

.path-item.locked {
  border-color: #e9ecef;
  background: #f8f9fa;
}

.path-title {
  font-weight: 600;
}

.path-progress {
  color: #6c757d;
  font-size: 0.9rem;
}

.btn-disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #f1f3f5;
}

@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .progress-summary {
    grid-template-columns: 1fr;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .path-item {
    grid-template-columns: 24px 1fr;
  }

  .path-item .btn-sm {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
