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

    <div v-if="!isUnlocked" class="card locked-level">
      <h2>Bu Seviye Henüz Kilitli</h2>
      <p>Seviye {{ Number(level.id) - 1 }} görevlerini tamamlayıp quizden en az %70 alarak bu seviyeyi açabilirsiniz.</p>
      <router-link :to="`/level/${Math.max(1, Number(level.id) - 1)}`" class="btn btn-primary">Önceki Seviyeye Dön</router-link>
    </div>

    <template v-else>
    <div class="level-progress card">
      <div class="progress-info">
        <div class="progress-stats">
          <div class="progress-stat">
            <div class="stat-label">Tamamlanan İçerik</div>
            <div class="stat-value">{{ completedSections }}/{{ sections.length }}</div>
          </div>
          <div class="progress-stat">
            <div class="stat-label">Tamamlanan Görevler</div>
            <div class="stat-value">{{ completedTasks }}/{{ tasksInLevel.length }}</div>
          </div>
          <div class="progress-stat">
            <div class="stat-label">Quiz Puanı</div>
            <div class="stat-value">{{ quizScore ? quizScore + '%' : 'Henüz alınmadı' }}</div>
          </div>
        </div>

        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: `${levelProgress}%` }"></div>
        </div>
        <div class="progress-text">Toplam İlerleme: {{ levelProgress }}%</div>
      </div>
    </div>

    <div class="level-content card">
      <h2>{{ level.title }} Eğitimi</h2>

      <div class="slide-deck" v-if="slides.length && activeSlide">
        <div class="slide-deck-header">
          <span class="slide-deck-label">Online Konu Anlatımı</span>
          <span class="slide-deck-index">{{ currentSlideIndex + 1 }} / {{ slides.length }}</span>
        </div>

        <div class="slide-progress">
          <div class="slide-progress-fill" :style="{ width: `${slideProgress}%` }"></div>
        </div>

        <article class="slide-card">
          <h3>{{ activeSlide.title }}</h3>
          <p>{{ activeSlide.text }}</p>

          <ul v-if="activeSlide.bullets && activeSlide.bullets.length">
            <li v-for="bullet in activeSlide.bullets" :key="`${activeSlide.id}-${bullet}`">{{ bullet }}</li>
          </ul>

          <div v-if="activeSlide.notes && activeSlide.notes.length" class="slide-notes">
            <h4>Notlar</h4>
            <p v-for="note in activeSlide.notes" :key="`${activeSlide.id}-${note}`">{{ note }}</p>
          </div>
        </article>

        <div class="slide-controls">
          <button
            type="button"
            class="btn btn-outline"
            :disabled="currentSlideIndex === 0"
            @click="prevSlide"
          >
            Önceki
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="currentSlideIndex === slides.length - 1"
            @click="nextSlide"
          >
            Sonraki
          </button>
        </div>

        <div class="slide-dots">
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            type="button"
            class="slide-dot"
            :class="{ active: index === currentSlideIndex }"
            :aria-label="`${index + 1}. slayta git`"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>

      <div v-else class="empty-content">
        <p>Bu seviye için içerik yakında eklenecek.</p>
      </div>

      <div class="content-actions">
        <router-link :to="`/quiz/${level.id}`" class="btn btn-primary">
          Quiz'e Başla
        </router-link>
      </div>
    </div>

    <div class="level-tasks card">
      <h2>Seviye Görevleri</h2>

      <div class="task-list" v-if="tasksInLevel.length">
        <div v-for="task in tasksInLevel" :key="task.id" class="task-item">
          <div class="task-status">
            <div v-if="task.status === 'Tamamlandı'" class="status-circle completed">
              <span class="icon">✓</span>
            </div>
            <div v-else-if="task.status === 'Devam Ediyor'" class="status-circle in-progress">
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
              <router-link :to="`/task/${task.id}`" class="btn btn-outline">Göreve Git</router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-content">
        <p>Bu seviyeye ait görev bulunamadı.</p>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { tasksByLevel, levelContentSections, levelSlides } from '@/utils/marketingData/learning-content';
import { getTaskStatus, isLevelUnlocked, loadProgress, subscribeProgress } from '@/utils/progressStore';

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
      progress: loadProgress(),
      currentSlideIndex: 0,
      unsubscribeProgress: null
    };
  },
  computed: {
    level() {
      return levels.find((item) => item.id === this.id) || levels[0];
    },
    isUnlocked() {
      return isLevelUnlocked(this.level.id, this.progress);
    },
    sections() {
      return levelContentSections[this.level.id] || [];
    },
    slides() {
      return levelSlides[this.level.id] || [];
    },
    activeSlide() {
      return this.slides[this.currentSlideIndex] || null;
    },
    slideProgress() {
      if (!this.slides.length) return 0;
      return Math.round(((this.currentSlideIndex + 1) / this.slides.length) * 100);
    },
    tasksInLevel() {
      const levelTasks = tasksByLevel[this.level.id] || [];
      return levelTasks.map((task) => ({
        ...task,
        status: getTaskStatus(task.id, this.progress)
      }));
    },
    completedSections() {
      if (!this.sections.length) return 0;
      if ((this.quizScore || 0) >= 70) return this.sections.length;
      if (this.completedTasks > 0) return 1;
      return 0;
    },
    completedTasks() {
      return this.tasksInLevel.filter((task) => task.status === 'Tamamlandı').length;
    },
    quizScore() {
      return Number(this.progress.quizResults?.[this.level.id] || 0) || null;
    },
    levelProgress() {
      if (!this.tasksInLevel.length || !this.isUnlocked) {
        return 0;
      }
      const contentProgress = this.sections.length ? this.completedSections / this.sections.length : 0;
      const taskProgress = this.completedTasks / this.tasksInLevel.length;
      const quizProgress = this.quizScore ? this.quizScore / 100 : 0;
      const total = (contentProgress * 0.3) + (taskProgress * 0.5) + (quizProgress * 0.2);
      return Math.round(total * 100);
    }
  },
  watch: {
    id() {
      this.currentSlideIndex = 0;
    },
    slides(newSlides) {
      if (!newSlides.length) {
        this.currentSlideIndex = 0;
        return;
      }
      if (this.currentSlideIndex > newSlides.length - 1) {
        this.currentSlideIndex = newSlides.length - 1;
      }
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex += 1;
      }
    },
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
      }
    },
    goToSlide(index) {
      this.currentSlideIndex = index;
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
  }
};
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

.locked-level h2 {
  margin-bottom: 0.75rem;
}

.locked-level p {
  color: #6c757d;
  margin-bottom: 1rem;
}

.slide-deck {
  margin-top: 1.5rem;
}

.slide-deck-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.slide-deck-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.slide-deck-index {
  font-size: 0.9rem;
  color: #6c757d;
}

.slide-progress {
  height: 8px;
  background: #e9ecef;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.slide-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0d6efd 0%, #198754 100%);
  transition: width 0.2s ease;
}

.slide-card {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 1.25rem;
  background: #f8f9fa;
}

.slide-card h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
}

.slide-card p {
  line-height: 1.65;
  margin-bottom: 0.85rem;
}

.slide-card ul {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
}

.slide-card li {
  margin-bottom: 0.5rem;
}

.slide-notes {
  border-top: 1px dashed #ced4da;
  padding-top: 0.85rem;
  margin-top: 0.85rem;
}

.slide-notes h4 {
  font-size: 0.95rem;
  margin-bottom: 0.4rem;
  color: #495057;
}

.slide-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.slide-controls .btn {
  min-width: 120px;
}

.slide-controls .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-dots {
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.slide-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 1px solid #adb5bd;
  background: #dee2e6;
  cursor: pointer;
}

.slide-dot.active {
  background: #212529;
  border-color: #212529;
}

.empty-content {
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  color: #6c757d;
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
  cursor: pointer;
}

.btn-primary {
  background-color: #212529;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #000;
}

.btn-outline {
  border: 1px solid #dee2e6;
  color: #495057;
  background-color: white;
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
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.task-status {
  flex-shrink: 0;
}

.status-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.status-circle.completed {
  background-color: #198754;
  color: white;
}

.status-circle.in-progress {
  background-color: #ffc107;
  color: #212529;
}

.task-details {
  flex: 1;
}

.task-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.task-description {
  color: #6c757d;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .progress-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .content-actions {
    justify-content: stretch;
  }

  .content-actions .btn {
    width: 100%;
    text-align: center;
  }

  .slide-controls {
    flex-direction: column;
  }

  .slide-controls .btn {
    width: 100%;
  }
}
</style>
