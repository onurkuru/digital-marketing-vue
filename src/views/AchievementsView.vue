<template>
  <div class="achievements-view">
    <div class="page-header">
      <h1>Başarılar</h1>
      <p class="subtitle">İlerlemenize göre rozetler ve puanlar otomatik güncellenir.</p>
    </div>

    <div class="achievements-overview card">
      <div class="stats-row">
        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">🏆</span>
            <span>Toplam Başarılar</span>
          </div>
          <div class="stats-value">{{ earnedCount }}/{{ totalAchievements }}</div>
          <div class="stats-subtitle">%{{ overallProgress }} tamamlandı</div>
        </div>

        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">⭐</span>
            <span>Toplam Puan</span>
          </div>
          <div class="stats-value">{{ earnedPoints }}</div>
          <div class="stats-subtitle">Kazanılan rozet puanı</div>
        </div>

        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">🥇</span>
            <span>Rozet Seviyesi</span>
          </div>
          <div class="stats-value">{{ badgeInfo.current }}</div>
          <div class="stats-subtitle">{{ badgeInfo.nextMessage }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Kazanılan Başarılar</h2>

      <div v-if="earnedAchievements.length" class="achievements-grid">
        <article v-for="achievement in earnedAchievements" :key="achievement.id" class="achievement-item earned">
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-details">
            <h3 class="achievement-title">{{ achievement.title }}</h3>
            <p class="achievement-description">{{ achievement.description }}</p>
            <div class="achievement-meta">
              <span class="achievement-points">{{ achievement.points }} puan</span>
              <span class="achievement-date">{{ formatDate(achievement.earnedAt) }}</span>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>Henüz kazanılmış başarı görünmüyor. İlk görevini tamamlayarak başla.</p>
      </div>
    </div>

    <div class="card">
      <h2 class="section-title">Yaklaşan Başarılar</h2>

      <div v-if="upcomingAchievements.length" class="achievements-grid">
        <article v-for="achievement in upcomingAchievements" :key="achievement.id" class="achievement-item locked">
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-details">
            <h3 class="achievement-title">{{ achievement.title }}</h3>
            <p class="achievement-description">{{ achievement.description }}</p>
            <div class="achievement-meta">
              <span class="achievement-points">{{ achievement.points }} puan</span>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${achievement.progress}%` }"></div>
                </div>
                <span class="progress-text">%{{ achievement.progress }} tamamlandı</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>Tüm başarıları tamamladınız.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';
import { loadProgress, subscribeProgress } from '@/utils/progressStore';

const ACHIEVEMENTS_STORAGE_KEY = 'achievements';

function clampProgress(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function safeParse(jsonValue) {
  try {
    const parsed = JSON.parse(jsonValue);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return {};
  } catch (error) {
    return {};
  }
}

export default {
  name: 'AchievementsView',
  data() {
    return {
      levels,
      tasks: allTasks,
      progress: loadProgress(),
      achievementState: {},
      unsubscribeProgress: null
    };
  },
  computed: {
    levelStats() {
      return this.levels.reduce((accumulator, level) => {
        const tasksInLevel = this.tasks.filter((task) => task.levelId === level.id);
        const totalTasks = tasksInLevel.length;
        const completedTasks = tasksInLevel.filter((task) => this.progress.completedTasks.includes(task.id)).length;
        const quizScore = Number(this.progress.quizResults?.[level.id] || 0);
        const taskRatio = totalTasks ? completedTasks / totalTasks : 0;
        const quizRatio = Math.min(quizScore, 70) / 70;
        const progressRatio = (taskRatio * 0.75) + (quizRatio * 0.25);

        accumulator[level.id] = {
          totalTasks,
          completedTasks,
          quizScore,
          progress: clampProgress(progressRatio * 100),
          mastered: totalTasks > 0 && completedTasks === totalTasks && quizScore >= 70
        };
        return accumulator;
      }, {});
    },
    achievementDefinitions() {
      const maxQuizScore = Math.max(0, ...Object.values(this.progress.quizResults || {}).map((score) => Number(score || 0)));
      const completedTaskCount = this.progress.completedTasks.length;
      const startedTaskCount = this.progress.startedTasks.length;
      const totalTaskCount = this.tasks.length || 1;

      const baseAchievements = [
        {
          id: 'first-start',
          icon: '🚀',
          title: 'İlk Başlangıç',
          description: 'İlk görevi başlatın.',
          points: 80,
          progress: clampProgress((startedTaskCount / 1) * 100)
        },
        {
          id: 'first-completion',
          icon: '✅',
          title: 'İlk Teslim',
          description: 'İlk görevi tamamlayın.',
          points: 120,
          progress: clampProgress((completedTaskCount / 1) * 100)
        },
        {
          id: 'five-completions',
          icon: '📚',
          title: '5 Görev Uzmanı',
          description: 'Toplam 5 görev tamamlayın.',
          points: 180,
          progress: clampProgress((completedTaskCount / 5) * 100)
        },
        {
          id: 'fifteen-completions',
          icon: '🧠',
          title: '15 Görev Uzmanı',
          description: 'Toplam 15 görev tamamlayın.',
          points: 240,
          progress: clampProgress((completedTaskCount / 15) * 100)
        },
        {
          id: 'thirty-completions',
          icon: '🔥',
          title: '30 Görev Maratonu',
          description: 'Toplam 30 görev tamamlayın.',
          points: 320,
          progress: clampProgress((completedTaskCount / 30) * 100)
        },
        {
          id: 'all-tasks',
          icon: '🏁',
          title: 'Tüm Görevler',
          description: 'Sistemdeki tüm görevleri tamamlayın.',
          points: 420,
          progress: clampProgress((completedTaskCount / totalTaskCount) * 100)
        },
        {
          id: 'quiz-70',
          icon: '🎯',
          title: 'Quiz Geçişi',
          description: 'Bir seviyede quizden en az %70 alın.',
          points: 140,
          progress: clampProgress((maxQuizScore / 70) * 100)
        },
        {
          id: 'quiz-90',
          icon: '🌟',
          title: 'Quiz Ustası',
          description: 'Bir seviyede quizden en az %90 alın.',
          points: 220,
          progress: clampProgress((maxQuizScore / 90) * 100)
        }
      ];

      const levelAchievements = this.levels.map((level, index) => ({
        id: `level-${level.id}-mastery`,
        icon: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'][index] || '🏅',
        title: `Seviye ${level.id} Tamamlandı`,
        description: `${level.title} seviyesindeki tüm görevleri tamamlayıp quizden %70+ alın.`,
        points: 180,
        progress: this.levelStats[level.id]?.progress || 0
      }));

      return [...baseAchievements, ...levelAchievements];
    },
    evaluatedAchievements() {
      return this.achievementDefinitions.map((achievement) => ({
        ...achievement,
        progress: clampProgress(achievement.progress),
        earned: clampProgress(achievement.progress) >= 100,
        earnedAt: this.achievementState[achievement.id]?.earnedAt || null
      }));
    },
    earnedAchievements() {
      return this.evaluatedAchievements
        .filter((achievement) => achievement.earned)
        .sort((a, b) => new Date(b.earnedAt || 0) - new Date(a.earnedAt || 0));
    },
    upcomingAchievements() {
      return this.evaluatedAchievements
        .filter((achievement) => !achievement.earned)
        .sort((a, b) => b.progress - a.progress);
    },
    totalAchievements() {
      return this.evaluatedAchievements.length;
    },
    earnedCount() {
      return this.earnedAchievements.length;
    },
    earnedPoints() {
      return this.earnedAchievements.reduce((total, achievement) => total + achievement.points, 0);
    },
    overallProgress() {
      if (!this.totalAchievements) return 0;
      return clampProgress((this.earnedCount / this.totalAchievements) * 100);
    },
    badgeInfo() {
      const tiers = [
        { name: 'Bronz', minPoints: 0 },
        { name: 'Gümüş', minPoints: 800 },
        { name: 'Altın', minPoints: 1600 },
        { name: 'Platin', minPoints: 2400 }
      ];

      let currentTier = tiers[0];
      tiers.forEach((tier) => {
        if (this.earnedPoints >= tier.minPoints) {
          currentTier = tier;
        }
      });

      const nextTier = tiers.find((tier) => tier.minPoints > this.earnedPoints);
      const nextMessage = nextTier
        ? `${nextTier.name} için ${nextTier.minPoints - this.earnedPoints} puan kaldı`
        : 'Tüm rozet seviyeleri açıldı';

      return {
        current: currentTier.name,
        nextMessage
      };
    }
  },
  watch: {
    evaluatedAchievements: {
      immediate: true,
      handler(list) {
        const now = new Date().toISOString();
        const nextState = { ...this.achievementState };
        let changed = false;

        list.forEach((achievement) => {
          if (achievement.earned && !nextState[achievement.id]?.earnedAt) {
            nextState[achievement.id] = { earnedAt: now };
            changed = true;
          }
        });

        if (changed) {
          this.achievementState = nextState;
          this.saveAchievementState();
        }
      }
    }
  },
  mounted() {
    this.achievementState = this.loadAchievementState();
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
    loadAchievementState() {
      if (typeof window === 'undefined' || !window.localStorage) {
        return {};
      }
      return safeParse(window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY));
    },
    saveAchievementState() {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      window.localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(this.achievementState));
    },
    formatDate(isoDate) {
      if (!isoDate) return 'Bugün';
      const parsed = new Date(isoDate);
      if (Number.isNaN(parsed.getTime())) return 'Bugün';
      return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(parsed);
    }
  }
};
</script>

<style scoped>
.achievements-view {
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
}

.card {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.stats-card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.1rem;
}

.stats-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  color: #6c757d;
  font-size: 0.86rem;
  gap: 0.4rem;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stats-subtitle {
  color: #6c757d;
  font-size: 0.78rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.9rem;
}

.achievement-item {
  display: flex;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 0.9rem;
}

.achievement-item.earned {
  border-left: 4px solid #28a745;
}

.achievement-item.locked {
  border-left: 4px solid #6c757d;
}

.achievement-icon {
  font-size: 1.9rem;
  width: 3.2rem;
  height: 3.2rem;
  background: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.achievement-details {
  flex: 1;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.achievement-description {
  color: #6c757d;
  font-size: 0.87rem;
  margin-bottom: 0.6rem;
}

.achievement-meta {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.achievement-points {
  font-weight: 600;
  color: #198754;
  font-size: 0.87rem;
}

.achievement-date {
  color: #6c757d;
  font-size: 0.76rem;
}

.achievement-progress {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.progress-bar {
  height: 0.5rem;
  background-color: #e9ecef;
  border-radius: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #0d6efd;
}

.progress-text {
  color: #6c757d;
  font-size: 0.75rem;
}

.empty-state {
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
