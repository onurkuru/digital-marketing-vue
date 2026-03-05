<template>
  <div class="resources-view">
    <div class="page-header">
      <h1>Gönderilenler</h1>
      <p class="subtitle">Form üzerinden gönderdiğiniz görev teslimleri</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-label">Toplam Teslim</div>
        <div class="summary-value">{{ submissions.length }}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Bu Hafta</div>
        <div class="summary-value">{{ submissionsThisWeek }}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Ekli Dosya</div>
        <div class="summary-value">{{ totalAttachments }}</div>
      </div>
    </div>

    <div class="card">
      <div class="resources-header">
        <h2>Görev Teslim Listesi</h2>
        <div class="resources-filter">
          <label for="statusFilter">Durum:</label>
          <select id="statusFilter" v-model="statusFilter">
            <option value="all">Tümü</option>
            <option value="pending">Beklemede</option>
          </select>
        </div>
      </div>

      <div v-if="filteredSubmissions.length" class="resources-items">
        <article
          v-for="submission in filteredSubmissions"
          :key="submission.id"
          class="resource-item"
        >
          <div class="resource-status pending">
            <span class="status-icon">⋯</span>
          </div>

          <div class="resource-details">
            <div class="resource-meta">
              <span class="resource-task">{{ submission.taskTitle || 'Görev Teslimi' }}</span>
              <span class="resource-date">{{ formatDateTime(submission.submittedAt) }}</span>
            </div>

            <h3 class="resource-title">{{ submission.subject || 'Görev Teslimi' }}</h3>
            <p class="resource-description">{{ truncateText(submission.details, 260) }}</p>

            <div class="resource-extra">
              <span>Gönderen: {{ submission.fullName || '-' }}</span>
              <span>E-posta: {{ submission.senderEmail || '-' }}</span>
              <span>Dosya: {{ submission.attachmentCount || 0 }}</span>
            </div>
          </div>

          <div class="resource-actions">
            <router-link
              v-if="submission.taskId"
              :to="`/task/${submission.taskId}`"
              class="btn btn-primary"
            >
              Göreve Git
            </router-link>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📭</div>
        <p>Henüz teslim kaydı bulunmuyor.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { loadSubmissions, subscribeSubmissions } from '@/utils/submissionStore';

export default {
  name: 'ResourcesView',
  data() {
    return {
      statusFilter: 'all',
      submissions: loadSubmissions(),
      unsubscribeSubmissions: null
    };
  },
  computed: {
    filteredSubmissions() {
      if (this.statusFilter === 'all') return this.submissions;
      return this.submissions.filter((item) => (item.status || 'pending') === this.statusFilter);
    },
    submissionsThisWeek() {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 7);
      weekStart.setHours(0, 0, 0, 0);

      return this.submissions.filter((item) => {
        const submittedAt = new Date(item.submittedAt || 0);
        return Number.isFinite(submittedAt.getTime()) && submittedAt >= weekStart;
      }).length;
    },
    totalAttachments() {
      return this.submissions.reduce((total, item) => total + Number(item.attachmentCount || 0), 0);
    }
  },
  mounted() {
    this.unsubscribeSubmissions = subscribeSubmissions((submissions) => {
      this.submissions = submissions;
    });
  },
  beforeUnmount() {
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
    truncateText(value, maxLength = 240) {
      const text = String(value || '').trim();
      if (text.length <= maxLength) return text || '-';
      return `${text.slice(0, maxLength - 1)}…`;
    }
  }
};
</script>

<style scoped>
.resources-view {
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.summary-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
}

.summary-label {
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.resources-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.2rem;
  margin: 0;
}

.resources-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.resources-filter select {
  padding: 0.35rem 0.6rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
}

.resources-items {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.resource-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.resource-status {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.resource-status.pending {
  background: #fff3cd;
  color: #856404;
}

.resource-details {
  flex: 1;
}

.resource-meta {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.resource-title {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}

.resource-description {
  margin: 0 0 0.65rem;
  color: #495057;
  line-height: 1.45;
}

.resource-extra {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.82rem;
  color: #6c757d;
}

.resource-actions {
  display: flex;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 0.45rem 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn-primary {
  background: #212529;
  color: #fff;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  padding: 2rem 0.5rem;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 900px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .resources-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .resource-item {
    flex-direction: column;
  }

  .resource-meta {
    flex-direction: column;
  }
}
</style>
