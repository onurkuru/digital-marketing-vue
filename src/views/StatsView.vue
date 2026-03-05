<template>
  <div class="stats-view">
    <div class="page-header">
      <h1>İstatistikler</h1>
      <p class="subtitle">Canlı ilerleme, quiz ve teslim performansınız</p>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-value">{{ overallProgress }}%</div>
        <div class="stat-label">Genel İlerleme</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-value">{{ completedTasks }}/{{ totalTasks }}</div>
        <div class="stat-label">Tamamlanan Görev</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ averageQuizScore }}%</div>
        <div class="stat-label">Quiz Ortalaması</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📤</div>
        <div class="stat-value">{{ submissions.length }}</div>
        <div class="stat-label">Gönderilen Teslim</div>
      </div>
    </div>

    <div class="card">
      <h2>Seviye Bazlı İlerleme</h2>
      <div class="level-list">
        <div v-for="item in levelProgress" :key="item.id" class="level-item">
          <div class="level-head">
            <span>{{ item.title }}</span>
            <span>{{ item.completed }}/{{ item.total }} ({{ item.progress }}%)</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${item.progress}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="card">
        <h2>Quiz Sonuçları</h2>
        <table v-if="quizRows.length" class="simple-table">
          <thead>
            <tr>
              <th>Seviye</th>
              <th>Skor</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in quizRows" :key="row.levelId">
              <td>{{ row.levelTitle }}</td>
              <td>{{ row.score }}%</td>
              <td>
                <span class="badge" :class="getQuizBadgeClass(row.score)">{{ getQuizStatusText(row.score) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-text">Henüz quiz sonucu bulunmuyor.</p>
      </div>

      <div class="card">
        <h2>Son Teslimler</h2>
        <div v-if="recentSubmissions.length" class="submission-list">
          <div v-for="item in recentSubmissions" :key="item.id" class="submission-item">
            <div class="submission-title">{{ item.subject || item.taskTitle || 'Görev Teslimi' }}</div>
            <div class="submission-meta">
              <span>{{ item.taskTitle || '-' }}</span>
              <span>{{ formatDateTime(item.submittedAt) }}</span>
              <span>{{ item.attachmentCount || 0 }} dosya</span>
            </div>
          </div>
        </div>
        <p v-else class="empty-text">Henüz gönderilen teslim yok.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';
import { loadProgress, subscribeProgress } from '@/utils/progressStore';
import { loadSubmissions, subscribeSubmissions } from '@/utils/submissionStore';

export default {
  name: 'StatsView',
  data() {
    return {
      levels,
      tasks: allTasks,
      progress: loadProgress(),
      submissions: loadSubmissions(),
      unsubscribeProgress: null,
      unsubscribeSubmissions: null
    };
  },
  computed: {
    totalTasks() {
      return this.tasks.length;
    },
    completedTasks() {
      return this.progress.completedTasks.length;
    },
    overallProgress() {
      if (!this.totalTasks) return 0;
      return Math.round((this.completedTasks / this.totalTasks) * 100);
    },
    quizRows() {
      const results = this.progress.quizResults || {};
      return Object.entries(results)
        .map(([levelId, score]) => {
          const level = this.levels.find((item) => item.id === String(levelId));
          return {
            levelId: String(levelId),
            levelTitle: level?.title || `Seviye ${levelId}`,
            score: Number(score || 0)
          };
        })
        .sort((a, b) => Number(a.levelId) - Number(b.levelId));
    },
    averageQuizScore() {
      if (!this.quizRows.length) return 0;
      const total = this.quizRows.reduce((sum, row) => sum + row.score, 0);
      return Math.round(total / this.quizRows.length);
    },
    levelProgress() {
      return this.levels.map((level) => {
        const levelTasks = this.tasks.filter((task) => String(task.levelId) === String(level.id));
        const completed = levelTasks.filter((task) => this.progress.completedTasks.includes(String(task.id))).length;
        const total = levelTasks.length;
        const progress = total ? Math.round((completed / total) * 100) : 0;

        return {
          id: level.id,
          title: level.title,
          completed,
          total,
          progress
        };
      });
    },
    recentSubmissions() {
      return [...this.submissions]
        .sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0))
        .slice(0, 8);
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.progress = progress;
    });

    this.unsubscribeSubmissions = subscribeSubmissions((submissions) => {
      this.submissions = submissions;
    });
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
    if (typeof this.unsubscribeSubmissions === 'function') {
      this.unsubscribeSubmissions();
    }
  },
  methods: {
    formatDateTime(value) {
      const date = new Date(value || 0);
      if (!Number.isFinite(date.getTime())) return '-';
      return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getQuizStatusText(score) {
      if (score >= 85) return 'Mükemmel';
      if (score >= 70) return 'İyi';
      if (score >= 50) return 'Orta';
      return 'Geliştirilmeli';
    },
    getQuizBadgeClass(score) {
      if (score >= 85) return 'success';
      if (score >= 70) return 'good';
      if (score >= 50) return 'average';
      return 'poor';
    }
  }
};
</script>

<style scoped>
.stats-view {
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

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  text-align: center;
  border: 1px solid #e9ecef;
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.45rem;
  font-weight: 700;
}

.stat-label {
  color: #6c757d;
  font-size: 0.86rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.2rem;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.15rem;
  margin-bottom: 0.85rem;
}

.level-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.level-item {
  border: 1px solid #eef1f4;
  border-radius: 8px;
  padding: 0.65rem;
  background: #f8f9fa;
}

.level-head {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 0.45rem;
}

.progress-bar {
  height: 8px;
  border-radius: 999px;
  background: #e9ecef;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0d6efd;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
}

.simple-table th,
.simple-table td {
  padding: 0.55rem;
  border-bottom: 1px solid #eef1f4;
  text-align: left;
  font-size: 0.9rem;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 600;
}

.badge.success {
  background: #d4edda;
  color: #155724;
}

.badge.good {
  background: #d1ecf1;
  color: #0c5460;
}

.badge.average {
  background: #fff3cd;
  color: #856404;
}

.badge.poor {
  background: #f8d7da;
  color: #721c24;
}

.submission-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.submission-item {
  border: 1px solid #eef1f4;
  border-radius: 8px;
  padding: 0.6rem;
  background: #f8f9fa;
}

.submission-title {
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.submission-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  color: #6c757d;
  font-size: 0.82rem;
}

.empty-text {
  color: #6c757d;
}

@media (max-width: 992px) {
  .stats-overview {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }

  .level-head {
    flex-direction: column;
  }
}
</style>
