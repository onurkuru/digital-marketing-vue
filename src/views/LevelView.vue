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

      <div class="presentation-shell" v-if="slides.length && activeSlide">
        <aside class="slide-outline">
          <div class="outline-head">
            <h3>{{ presentationTitle }}</h3>
            <p>{{ slides.length }} slayt</p>
          </div>
          <div class="outline-list">
            <button
              v-for="(slide, index) in slides"
              :key="slide.id"
              type="button"
              class="outline-item"
              :class="{ active: index === currentSlideIndex }"
              @click="goToSlide(index)"
            >
              <span class="outline-index">{{ index + 1 }}</span>
              <span class="outline-meta">
                <strong>{{ slide.title }}</strong>
                <small>{{ slide.kicker || 'Konu' }}</small>
              </span>
            </button>
          </div>
        </aside>

        <div ref="presentationStage" class="presentation-stage" :class="{ fullscreen: isFullscreen }">
          <div class="stage-toolbar">
            <div class="stage-titles">
              <span class="slide-deck-label">{{ presentationTitle }}</span>
              <span class="slide-deck-index">{{ currentSlideIndex + 1 }} / {{ slides.length }}</span>
            </div>
            <button type="button" class="btn btn-outline btn-toolbar" @click="toggleFullscreen">
              {{ isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran' }}
            </button>
          </div>

          <div class="slide-progress">
            <div class="slide-progress-fill" :style="{ width: `${slideProgress}%` }"></div>
          </div>

          <article class="slide-frame" :style="slideThemeStyle">
            <div class="slide-frame-inner">
              <span v-if="activeSlide.kicker" class="slide-kicker">{{ activeSlide.kicker }}</span>
              <h3>{{ activeSlide.title }}</h3>
              <p class="slide-main-text">{{ activeSlide.text }}</p>

              <ol v-if="activeSlide.steps && activeSlide.steps.length" class="slide-steps">
                <li v-for="step in activeSlide.steps" :key="`${activeSlide.id}-${step}`">{{ step }}</li>
              </ol>

              <ul v-if="activeSlide.bullets && activeSlide.bullets.length" class="slide-bullets">
                <li v-for="bullet in activeSlide.bullets" :key="`${activeSlide.id}-${bullet}`">{{ bullet }}</li>
              </ul>

              <div v-if="activeSlide.callouts && activeSlide.callouts.length" class="slide-callouts">
                <article
                  v-for="(callout, calloutIndex) in activeSlide.callouts"
                  :key="`${activeSlide.id}-callout-${calloutIndex}`"
                  class="slide-callout"
                >
                  <h4>{{ callout.title }}</h4>
                  <p>{{ callout.text }}</p>
                </article>
              </div>

              <div v-if="activeSlide.notes && activeSlide.notes.length" class="slide-notes">
                <h4>Eğitmen Notu</h4>
                <p v-for="note in activeSlide.notes" :key="`${activeSlide.id}-${note}`">{{ note }}</p>
              </div>
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
            <span class="slide-progress-text">İlerleme {{ slideProgress }}%</span>
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
              :key="`${slide.id}-dot`"
              type="button"
              class="slide-dot"
              :class="{ active: index === currentSlideIndex }"
              :aria-label="`${index + 1}. slayta git`"
              @click="goToSlide(index)"
            ></button>
          </div>
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
      isFullscreen: false,
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
    presentationTitle() {
      return `${this.level.title} İçerik Sunumu`;
    },
    activeSlide() {
      return this.slides[this.currentSlideIndex] || null;
    },
    slideProgress() {
      if (!this.slides.length) return 0;
      return Math.round(((this.currentSlideIndex + 1) / this.slides.length) * 100);
    },
    slideThemeStyle() {
      const defaultColor = '#0d6efd';
      const accent = this.level.color || defaultColor;
      const rgb = this.hexToRgb(accent) || '13, 110, 253';
      return {
        '--slide-accent': accent,
        '--slide-accent-soft': `rgba(${rgb}, 0.16)`,
        '--slide-accent-border': `rgba(${rgb}, 0.35)`
      };
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
      this.exitFullscreen();
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
    hexToRgb(color) {
      const normalized = color.replace('#', '').trim();
      const value = normalized.length === 3
        ? normalized.split('').map((char) => char + char).join('')
        : normalized;
      if (!/^[0-9a-fA-F]{6}$/.test(value)) {
        return null;
      }
      const intValue = Number.parseInt(value, 16);
      const r = (intValue >> 16) & 255;
      const g = (intValue >> 8) & 255;
      const b = intValue & 255;
      return `${r}, ${g}, ${b}`;
    },
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
      const maxIndex = Math.max(0, this.slides.length - 1);
      this.currentSlideIndex = Math.min(Math.max(index, 0), maxIndex);
    },
    handleKeyboardNavigation(event) {
      const targetTag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) {
        return;
      }
      if (event.target && event.target.isContentEditable) {
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prevSlide();
      }
    },
    handleFullscreenChange() {
      this.isFullscreen = document.fullscreenElement === this.$refs.presentationStage;
    },
    toggleFullscreen() {
      const stage = this.$refs.presentationStage;
      if (!stage) {
        return;
      }
      if (document.fullscreenElement === stage) {
        document.exitFullscreen();
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          if (stage.requestFullscreen) {
            stage.requestFullscreen();
          }
        });
        return;
      }
      if (stage.requestFullscreen) {
        stage.requestFullscreen();
      }
    },
    exitFullscreen() {
      if (document.fullscreenElement === this.$refs.presentationStage) {
        document.exitFullscreen();
      }
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.progress = progress;
    });
    window.addEventListener('keydown', this.handleKeyboardNavigation);
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
    window.removeEventListener('keydown', this.handleKeyboardNavigation);
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    this.exitFullscreen();
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

.presentation-shell {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: minmax(230px, 280px) minmax(0, 1fr);
  gap: 1rem;
}

.slide-outline {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  background: #f8f9fa;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 760px;
}

.outline-head {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.outline-head h3 {
  font-size: 0.98rem;
  margin-bottom: 0.3rem;
}

.outline-head p {
  margin: 0;
  color: #6c757d;
  font-size: 0.85rem;
}

.outline-list {
  padding: 0.5rem;
  overflow-y: auto;
}

.outline-item {
  width: 100%;
  text-align: left;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
  margin-bottom: 0.5rem;
  padding: 0.55rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 0.55rem;
  transition: all 0.2s ease;
}

.outline-item:hover {
  border-color: #adb5bd;
}

.outline-item.active {
  border-color: #0d6efd;
  background: #e7f1ff;
}

.outline-index {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #e9ecef;
  color: #212529;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.86rem;
  font-weight: 700;
}

.outline-item.active .outline-index {
  background: #0d6efd;
  color: white;
}

.outline-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.outline-meta strong {
  font-size: 0.85rem;
  line-height: 1.35;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.outline-meta small {
  color: #6c757d;
  font-size: 0.75rem;
}

.presentation-stage {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem;
  background: white;
}

.presentation-stage.fullscreen {
  border-radius: 0;
}

.presentation-stage:fullscreen {
  padding: 1.5rem;
  background: #f8f9fa;
}

.stage-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.stage-titles {
  display: flex;
  flex-direction: column;
}

.slide-deck-label {
  font-size: 0.86rem;
  font-weight: 700;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.slide-deck-index {
  font-size: 0.88rem;
  color: #6c757d;
}

.btn-toolbar {
  font-size: 0.85rem;
  padding: 0.45rem 0.85rem;
}

.slide-progress {
  height: 8px;
  background: #e9ecef;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.95rem;
}

.slide-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0d6efd 0%, #198754 100%);
  transition: width 0.2s ease;
}

.slide-frame {
  position: relative;
  border: 1px solid var(--slide-accent-border, #ced4da);
  border-radius: 14px;
  background: linear-gradient(160deg, #ffffff 0%, #f8fafc 65%);
  min-height: 500px;
  overflow: hidden;
}

.slide-frame::before {
  content: '';
  position: absolute;
  top: -90px;
  right: -100px;
  width: 340px;
  height: 340px;
  border-radius: 999px;
  background: var(--slide-accent-soft, rgba(13, 110, 253, 0.14));
}

.presentation-stage:fullscreen .slide-frame {
  min-height: calc(100vh - 220px);
}

.slide-frame-inner {
  position: relative;
  padding: 1.6rem;
  z-index: 1;
}

.slide-kicker {
  display: inline-flex;
  margin-bottom: 0.7rem;
  background: var(--slide-accent, #0d6efd);
  color: white;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.slide-frame h3 {
  font-size: 1.45rem;
  margin-bottom: 0.75rem;
  color: #212529;
}

.slide-main-text {
  line-height: 1.75;
  margin-bottom: 1rem;
  color: #212529;
}

.slide-steps,
.slide-bullets {
  margin: 0 0 1rem;
  padding-left: 1.4rem;
}

.slide-steps li,
.slide-bullets li {
  margin-bottom: 0.55rem;
  line-height: 1.6;
}

.slide-callouts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.slide-callout {
  border: 1px solid #dee2e6;
  border-left: 4px solid var(--slide-accent, #0d6efd);
  background: white;
  border-radius: 10px;
  padding: 0.85rem;
}

.slide-callout h4 {
  margin-bottom: 0.35rem;
  font-size: 0.93rem;
}

.slide-callout p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: #495057;
}

.slide-notes {
  border-top: 1px dashed #ced4da;
  padding-top: 0.8rem;
  margin-top: 0.6rem;
}

.slide-notes h4 {
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.slide-notes p {
  margin-bottom: 0.45rem;
  color: #495057;
}

.slide-controls {
  margin-top: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.slide-controls .btn {
  min-width: 120px;
}

.slide-controls .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-progress-text {
  font-size: 0.88rem;
  color: #6c757d;
  font-weight: 600;
}

.slide-dots {
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}

.slide-dot {
  width: 11px;
  height: 11px;
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

  .presentation-shell {
    grid-template-columns: 1fr;
  }

  .slide-outline {
    max-height: none;
  }

  .outline-list {
    max-height: 220px;
  }

  .stage-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .slide-frame {
    min-height: auto;
  }

  .slide-frame-inner {
    padding: 1.1rem;
  }

  .slide-callouts {
    grid-template-columns: 1fr;
  }

  .slide-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .slide-controls .btn {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .presentation-shell {
    grid-template-columns: 1fr;
  }

  .slide-outline {
    max-height: none;
  }

  .outline-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.5rem;
  }

  .outline-item {
    margin-bottom: 0;
  }
}
</style>
