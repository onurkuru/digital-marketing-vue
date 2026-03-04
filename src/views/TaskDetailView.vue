<template>
  <div class="task-detail-view" v-if="task && isUnlocked">
    <div class="page-header">
      <div class="breadcrumbs">
        <router-link to="/">Ana Sayfa</router-link>
        <span class="separator">/</span>
        <router-link :to="`/level/${task.levelId}`">{{ getLevelTitle(task.levelId) }}</router-link>
        <span class="separator">/</span>
        <span>Görev</span>
      </div>

      <h1>{{ task.title }}</h1>
      <div class="task-meta">
        <div class="task-status" :class="getStatusClass(task.status)">
          {{ task.status }}
        </div>
        <div class="task-deadline" v-if="task.deadline">
          <span class="icon">⏰</span>
          <span>Teslim Tarihi: {{ task.deadline }}</span>
        </div>
      </div>
    </div>

    <div class="task-content card">
      <h2>Görev Açıklaması</h2>
      <p class="task-description">{{ task.longDescription || task.description }}</p>

      <div class="task-instructions" v-if="task.tasks && task.tasks.length">
        <h3>Görev Adımları</h3>
        <div class="steps-container">
          <div v-for="(step, index) in task.tasks" :key="`${task.id}-${index}`" class="step-item">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-description">{{ step.description }}</div>
              <div v-if="step.deliverable" class="step-deliverable">Teslim: {{ step.deliverable }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="task-resources card" v-if="task.resources && task.resources.length">
      <h2>Kaynaklar</h2>
      <div class="resources-list">
        <div v-for="(resource, index) in task.resources" :key="`${task.id}-resource-${index}`" class="resource-item">
          <div class="resource-icon">
            <span class="icon">{{ getResourceIcon(resource.type) }}</span>
          </div>
          <div class="resource-details">
            <div class="resource-title">{{ resource.title }}</div>
            <div class="resource-description" v-if="resource.description">{{ resource.description }}</div>
          </div>
          <a :href="resource.url || '#'" target="_blank" class="btn btn-outline">Görüntüle</a>
        </div>
      </div>
    </div>

    <div class="task-submission card">
      <h2>Görev Teslimi</h2>

      <div class="email-delivery">
        <h3>E-posta ile Teslim</h3>
        <p>
          Görevi tamamladıktan sonra yöneticinize e-posta gönderin. Konu ve içerik otomatik hazırlanır.
        </p>
        <a :href="submissionEmailLink" class="btn btn-outline">Yöneticiye E-posta Gönder</a>
      </div>

      <div v-if="task.status === 'Tamamlandı'" class="submission-complete">
        <div class="success-icon">✓</div>
        <div class="success-message">
          <h3>Tebrikler! Bu görevi tamamladınız.</h3>
          <p>{{ completedDateText }} tarihinde tamamlandı</p>
        </div>
      </div>

      <div v-else class="submission-form">
        <div class="form-group">
          <label for="taskNotes">Görev Notları</label>
          <textarea
            id="taskNotes"
            v-model="submissionNotes"
            rows="4"
            placeholder="Görevle ilgili notlarınızı buraya yazın..."
          ></textarea>
        </div>

        <div class="form-actions">
          <button @click="saveProgress" class="btn btn-secondary">İlerlemeyi Kaydet</button>
          <button @click="completeTask" class="btn btn-primary">Görevi Tamamla</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="task && !isUnlocked" class="card">
    <h2>Bu Görev Henüz Kilitli</h2>
    <p>Önceki seviyedeki görevleri ve quizi tamamladıktan sonra bu göreve erişebilirsiniz.</p>
    <router-link :to="`/level/${Math.max(1, Number(task.levelId) - 1)}`" class="btn btn-primary">Önceki Seviyeye Dön</router-link>
  </div>

  <div v-else class="card">
    <h2>Görev bulunamadı</h2>
    <p>Geçerli bir görev seçerek tekrar deneyin.</p>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';
import { getTaskStatus, isLevelUnlocked, loadProgress, markTaskCompleted, markTaskStarted, subscribeProgress } from '@/utils/progressStore';

export default {
  name: 'TaskDetailView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      submissionNotes: '',
      completedAt: null,
      levels,
      tasks: allTasks,
      progress: loadProgress(),
      unsubscribeProgress: null,
      managerEmail: import.meta.env.VITE_MANAGER_EMAIL || 'yonetici@example.com'
    };
  },
  computed: {
    task() {
      const baseTask = this.tasks.find((item) => item.id === this.id);
      if (!baseTask) return null;
      return {
        ...baseTask,
        status: getTaskStatus(baseTask.id, this.progress)
      };
    },
    isUnlocked() {
      if (!this.task) return false;
      return isLevelUnlocked(this.task.levelId, this.progress);
    },
    completedDateText() {
      if (!this.completedAt) return 'Bugün';
      return this.completedAt;
    },
    submissionEmailLink() {
      if (!this.task) return '#';
      const subject = `Görev Teslimi - ${this.task.title}`;
      const body = [
        `Merhaba,`,
        ``,
        `${this.task.title} görevini tamamladım.`,
        ``,
        `Notlar:`,
        `${this.submissionNotes || 'Not eklenmedi.'}`,
        ``,
        `Görev ID: ${this.task.id}`,
        `Seviye: ${this.task.levelId}`,
        ``,
        `Teşekkürler.`
      ].join('\n');

      return `mailto:${this.managerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    getLevelTitle(levelId) {
      const level = this.levels.find((item) => item.id === String(levelId));
      return level ? `Seviye ${level.id}: ${level.title}` : 'Seviye';
    },
    getStatusClass(status) {
      if (status === 'Tamamlandı') return 'completed';
      if (status === 'Devam Ediyor') return 'in-progress';
      return 'not-started';
    },
    getResourceIcon(type) {
      switch (type) {
        case 'article':
        case 'document':
          return '📄';
        case 'video':
          return '🎬';
        case 'template':
          return '🧩';
        case 'tool':
          return '🛠️';
        case 'link':
          return '🔗';
        default:
          return '📚';
      }
    },
    saveProgress() {
      if (!this.task) return;
      markTaskStarted(this.id);
      alert('İlerlemeniz kaydedildi!');
    },
    completeTask() {
      if (!this.task) return;
      markTaskCompleted(this.id);
      this.completedAt = new Date().toLocaleDateString('tr-TR');
      alert('Tebrikler! Görev tamamlandı.');
      this.$router.push(`/level/${this.task.levelId}`);
    }
  }
};
</script>

<style scoped>
.task-detail-view {
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
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.task-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.task-status.completed {
  background-color: #d4edda;
  color: #155724;
}

.task-status.in-progress {
  background-color: #fff3cd;
  color: #856404;
}

.task-status.not-started {
  background-color: #e9ecef;
  color: #6c757d;
}

.task-deadline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.task-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  white-space: pre-line;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.steps-container {
  margin-top: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #e9ecef;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-title {
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.step-description {
  font-size: 0.95rem;
  color: #495057;
}

.step-deliverable {
  font-size: 0.85rem;
  margin-top: 0.4rem;
  color: #6c757d;
}

.resources-list {
  margin-top: 1rem;
}

.resource-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  background-color: #e9ecef;
}

.resource-details {
  flex: 1;
}

.resource-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.resource-description {
  font-size: 0.9rem;
  color: #6c757d;
}

.submission-complete {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.email-delivery {
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.email-delivery h3 {
  margin-bottom: 0.5rem;
}

.email-delivery p {
  color: #6c757d;
  margin-bottom: 0.75rem;
}

.success-icon {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: #198754;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.75rem;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: #212529;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-outline {
  border-color: #dee2e6;
  color: #212529;
  background: white;
}

@media (max-width: 768px) {
  .resource-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
