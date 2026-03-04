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
          <a :href="resource.url || '#'" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Görüntüle</a>
        </div>
      </div>
    </div>

    <div class="task-submission card">
      <h2>Görev Teslimi</h2>

      <div class="submission-note">
        <p>
          Form üzerinden gönderilen teslimler spam korumalıdır ve sunucu tarafında işlenir.
          Hedef e-posta adresi istemci kodunda görünmez.
        </p>
      </div>

      <div v-if="task.status === 'Tamamlandı'" class="submission-complete">
        <div class="success-icon">✓</div>
        <div class="success-message">
          <h3>Bu görev tamamlandı.</h3>
          <p>{{ completedDateText }} tarihinde tamamlandı</p>
        </div>
      </div>

      <form class="submission-form" @submit.prevent="submitDelivery">
        <div class="form-grid">
          <div class="form-group">
            <label for="fullName">Ad Soyad</label>
            <input
              id="fullName"
              v-model.trim="submissionForm.fullName"
              type="text"
              maxlength="120"
              autocomplete="name"
              placeholder="Ad Soyad"
              required
            />
          </div>

          <div class="form-group">
            <label for="senderEmail">Kurumsal E-posta</label>
            <input
              id="senderEmail"
              v-model.trim="submissionForm.senderEmail"
              type="email"
              maxlength="180"
              autocomplete="email"
              placeholder="ornek@firma.com"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="deliverySubject">Konu</label>
          <input
            id="deliverySubject"
            v-model.trim="submissionForm.subject"
            type="text"
            maxlength="180"
            placeholder="Görev teslim konusu"
            required
          />
        </div>

        <div class="form-group">
          <label for="deliveryDetails">Teslim Detayı</label>
          <textarea
            id="deliveryDetails"
            v-model.trim="submissionForm.details"
            rows="6"
            maxlength="6000"
            placeholder="Görev kapsamında ne yaptığınızı, sonuçları ve bağlantıları yazın..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="taskNotes">Ek Notlar (Opsiyonel)</label>
          <textarea
            id="taskNotes"
            v-model.trim="submissionNotes"
            rows="3"
            maxlength="4000"
            placeholder="Ek notlarınızı buraya yazabilirsiniz..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="attachments">Görev Dosyaları</label>
          <input
            id="attachments"
            class="file-input"
            type="file"
            multiple
            :accept="acceptedFileTypes"
            @change="handleFileSelection"
          />
          <p class="field-help">En fazla 3 dosya, dosya başına maksimum 2 MB.</p>

          <div v-if="submissionForm.attachments.length" class="attachment-list">
            <div
              v-for="(attachment, index) in submissionForm.attachments"
              :key="`${attachment.name}-${index}`"
              class="attachment-item"
            >
              <div class="attachment-meta">
                <strong>{{ attachment.name }}</strong>
                <span>{{ formatFileSize(attachment.size) }}</span>
              </div>
              <button type="button" class="btn-link" @click="removeAttachment(index)">Kaldır</button>
            </div>
          </div>
        </div>

        <div class="honeypot-field" aria-hidden="true">
          <label for="websiteField">Website</label>
          <input id="websiteField" v-model="submissionForm.website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div class="captcha-block" v-if="captchaSiteKey">
          <label>Spam Koruması</label>
          <div ref="captchaContainer"></div>
          <p class="error-text" v-if="captchaError">{{ captchaError }}</p>
        </div>

        <div class="warning-text" v-else>
          Captcha site anahtarı yapılandırılmadığı için form gönderimi kapalı.
        </div>

        <p class="success-text" v-if="submitSuccessMessage">{{ submitSuccessMessage }}</p>
        <p class="error-text" v-if="submitErrorMessage">{{ submitErrorMessage }}</p>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="saveProgress">İlerlemeyi Kaydet</button>
          <button type="submit" class="btn btn-primary" :disabled="!canSubmitDelivery || isSubmitting">
            {{ isSubmitting ? 'Gönderiliyor...' : 'Teslimi Gönder' }}
          </button>
        </div>
      </form>
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
import {
  getTaskStatus,
  isLevelUnlocked,
  loadProgress,
  markTaskCompleted,
  markTaskStarted,
  subscribeProgress
} from '@/utils/progressStore';

const MAX_FILE_COUNT = 3;
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.xls',
  '.xlsx',
  '.zip',
  '.png',
  '.jpg',
  '.jpeg',
  '.txt'
];

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
      submissionForm: {
        fullName: '',
        senderEmail: '',
        subject: '',
        details: '',
        attachments: [],
        website: ''
      },
      runtimeCaptchaConfig: {
        provider: '',
        siteKey: ''
      },
      captchaToken: '',
      captchaError: '',
      captchaWidgetId: null,
      isSubmitting: false,
      submitSuccessMessage: '',
      submitErrorMessage: ''
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
    acceptedFileTypes() {
      return ACCEPTED_FILE_TYPES.join(',');
    },
    captchaProvider() {
      if (import.meta.env.VITE_TURNSTILE_SITE_KEY) return 'turnstile';
      if (import.meta.env.VITE_RECAPTCHA_SITE_KEY || import.meta.env.VITE_SITE_RECAPTCHA_KEY) return 'recaptcha';
      if (this.runtimeCaptchaConfig.provider) return this.runtimeCaptchaConfig.provider;
      return '';
    },
    captchaSiteKey() {
      if (this.captchaProvider === 'turnstile') {
        return import.meta.env.VITE_TURNSTILE_SITE_KEY || this.runtimeCaptchaConfig.siteKey || '';
      }
      if (this.captchaProvider === 'recaptcha') {
        return import.meta.env.VITE_RECAPTCHA_SITE_KEY
          || import.meta.env.VITE_SITE_RECAPTCHA_KEY
          || this.runtimeCaptchaConfig.siteKey
          || '';
      }
      return '';
    },
    canSubmitDelivery() {
      if (!this.captchaSiteKey) return false;
      const hasRequiredFields = Boolean(
        this.task &&
        this.submissionForm.fullName &&
        this.submissionForm.senderEmail &&
        this.submissionForm.subject &&
        this.submissionForm.details
      );
      const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.submissionForm.senderEmail);
      return hasRequiredFields && hasValidEmail && Boolean(this.captchaToken) && !this.isSubmitting;
    }
  },
  watch: {
    id() {
      this.initializeForm();
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.progress = progress;
    });
    this.initializeForm();
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
    this.resetCaptchaWidget();
  },
  methods: {
    async initializeForm() {
      this.resetSubmissionForm();
      await this.loadRuntimeCaptchaConfig();
      this.renderCaptcha();
    },
    async loadRuntimeCaptchaConfig() {
      if (import.meta.env.VITE_TURNSTILE_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY || import.meta.env.VITE_SITE_RECAPTCHA_KEY) {
        return;
      }

      try {
        const response = await fetch('/api/runtime-config', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) return;
        const data = await response.json();
        const provider = String(data?.captcha?.provider || '').trim().toLowerCase();
        const siteKey = String(data?.captcha?.siteKey || '').trim();
        if (!provider || !siteKey) return;

        if (provider === 'turnstile' || provider === 'recaptcha') {
          this.runtimeCaptchaConfig = { provider, siteKey };
        }
      } catch (error) {
        // no-op
      }
    },
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
    formatFileSize(bytes) {
      if (!bytes) return '0 B';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1048576).toFixed(1)} MB`;
    },
    async readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || '');
          resolve(result.split(',').pop() || '');
        };
        reader.onerror = () => reject(new Error(`"${file.name}" dosyası okunamadı.`));
        reader.readAsDataURL(file);
      });
    },
    async handleFileSelection(event) {
      const selectedFiles = Array.from(event.target.files || []);
      this.submitErrorMessage = '';
      this.submitSuccessMessage = '';

      if (!selectedFiles.length) return;

      if (selectedFiles.length > MAX_FILE_COUNT) {
        this.submitErrorMessage = `En fazla ${MAX_FILE_COUNT} dosya yükleyebilirsiniz.`;
        event.target.value = '';
        return;
      }

      const attachments = [];
      for (const file of selectedFiles) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          this.submitErrorMessage = `"${file.name}" dosyası 2 MB sınırını aşıyor.`;
          event.target.value = '';
          return;
        }

        try {
          const base64Content = await this.readFileAsBase64(file);
          attachments.push({
            name: file.name,
            type: file.type || 'application/octet-stream',
            size: file.size,
            content: base64Content
          });
        } catch (error) {
          this.submitErrorMessage = error.message || 'Dosya yüklenirken hata oluştu.';
          event.target.value = '';
          return;
        }
      }

      this.submissionForm.attachments = attachments;
      event.target.value = '';
    },
    removeAttachment(index) {
      this.submissionForm.attachments.splice(index, 1);
    },
    resetSubmissionForm() {
      this.submitSuccessMessage = '';
      this.submitErrorMessage = '';
      this.captchaError = '';
      this.captchaToken = '';
      this.submissionNotes = '';
      this.submissionForm = {
        fullName: '',
        senderEmail: '',
        subject: this.task ? `Görev Teslimi - ${this.task.title}` : '',
        details: '',
        attachments: [],
        website: ''
      };
      this.resetCaptchaWidget();
    },
    resetCaptchaWidget() {
      if (typeof window === 'undefined' || this.captchaWidgetId === null) {
        return;
      }

      if (this.captchaProvider === 'turnstile' && window.turnstile) {
        try {
          window.turnstile.remove(this.captchaWidgetId);
        } catch (error) {
          // no-op
        }
      } else if (this.captchaProvider === 'recaptcha' && window.grecaptcha) {
        try {
          window.grecaptcha.reset(this.captchaWidgetId);
        } catch (error) {
          // no-op
        }
      }

      const container = this.$refs.captchaContainer;
      if (container) {
        container.innerHTML = '';
      }
      this.captchaWidgetId = null;
    },
    renderCaptchaWidget() {
      if (!this.captchaSiteKey || typeof window === 'undefined') {
        return;
      }

      this.$nextTick(() => {
        const container = this.$refs.captchaContainer;
        if (!container) return;

        const render = () => {
          this.resetCaptchaWidget();

          if (this.captchaProvider === 'turnstile') {
            if (!window.turnstile) return;
            this.captchaWidgetId = window.turnstile.render(container, {
              sitekey: this.captchaSiteKey,
              callback: (token) => {
                this.captchaToken = token;
                this.captchaError = '';
              },
              'expired-callback': () => {
                this.captchaToken = '';
              },
              'error-callback': () => {
                this.captchaToken = '';
                this.captchaError = 'Captcha doğrulaması başarısız. Lütfen tekrar deneyin.';
              }
            });
            return;
          }

          if (this.captchaProvider === 'recaptcha') {
            if (!window.grecaptcha || !window.grecaptcha.render) return;
            this.captchaWidgetId = window.grecaptcha.render(container, {
              sitekey: this.captchaSiteKey,
              callback: (token) => {
                this.captchaToken = token;
                this.captchaError = '';
              },
              'expired-callback': () => {
                this.captchaToken = '';
              },
              'error-callback': () => {
                this.captchaToken = '';
                this.captchaError = 'Captcha doğrulaması başarısız. Lütfen tekrar deneyin.';
              }
            });
          }
        };

        if (
          (this.captchaProvider === 'turnstile' && window.turnstile) ||
          (this.captchaProvider === 'recaptcha' && window.grecaptcha && window.grecaptcha.render)
        ) {
          render();
          return;
        }

        const scriptId = this.captchaProvider === 'turnstile'
          ? 'cf-turnstile-script'
          : 'google-recaptcha-script';
        const scriptSrc = this.captchaProvider === 'turnstile'
          ? 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
          : 'https://www.google.com/recaptcha/api.js?render=explicit';

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.addEventListener('load', render, { once: true });
          return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = scriptSrc;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', render, { once: true });
        script.addEventListener('error', () => {
          this.captchaError = 'Captcha script yüklenemedi.';
        }, { once: true });
        document.head.appendChild(script);
      });
    },
    resetCaptcha() {
      this.captchaToken = '';
      if (typeof window === 'undefined' || this.captchaWidgetId === null) {
        return;
      }

      if (this.captchaProvider === 'turnstile' && window.turnstile) {
        window.turnstile.reset(this.captchaWidgetId);
      } else if (this.captchaProvider === 'recaptcha' && window.grecaptcha) {
        window.grecaptcha.reset(this.captchaWidgetId);
      }
    },
    saveProgress() {
      if (!this.task) return;
      markTaskStarted(this.id);
      alert('İlerlemeniz kaydedildi.');
    },
    async submitDelivery() {
      if (!this.task || !this.canSubmitDelivery) {
        this.submitErrorMessage = 'Lütfen tüm zorunlu alanları doldurun ve captcha doğrulamasını tamamlayın.';
        return;
      }

      this.isSubmitting = true;
      this.submitSuccessMessage = '';
      this.submitErrorMessage = '';
      markTaskStarted(this.id);

      const payload = {
        taskId: this.task.id,
        taskTitle: this.task.title,
        levelId: this.task.levelId,
        fullName: this.submissionForm.fullName,
        senderEmail: this.submissionForm.senderEmail,
        subject: this.submissionForm.subject,
        details: this.submissionForm.details,
        notes: this.submissionNotes,
        attachments: this.submissionForm.attachments,
        captchaToken: this.captchaToken,
        website: this.submissionForm.website
      };

      try {
        const response = await fetch('/api/task-submission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(result.error || 'Teslim gönderilemedi.');
        }

        markTaskCompleted(this.id);
        this.completedAt = new Date().toLocaleDateString('tr-TR');
        this.submitSuccessMessage = 'Teslim başarıyla gönderildi. Görev tamamlandı olarak işaretlendi.';
        this.submissionForm.details = '';
        this.submissionForm.attachments = [];
        this.submissionNotes = '';
      } catch (error) {
        this.submitErrorMessage = error.message || 'Teslim gönderilirken hata oluştu.';
      } finally {
        this.isSubmitting = false;
        this.resetCaptcha();
      }
    },
    renderCaptcha() {
      this.renderCaptchaWidget();
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

.submission-note {
  padding: 0.9rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
  color: #495057;
}

.submission-complete {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

.submission-form {
  margin-top: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.75rem;
  font: inherit;
}

textarea {
  resize: vertical;
}

.file-input {
  padding: 0.45rem;
}

.field-help {
  margin-top: -0.2rem;
  color: #6c757d;
  font-size: 0.82rem;
}

.attachment-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.attachment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 0.5rem 0.65rem;
}

.attachment-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.attachment-meta span {
  font-size: 0.8rem;
  color: #6c757d;
}

.btn-link {
  border: none;
  background: none;
  color: #dc3545;
  cursor: pointer;
  font-weight: 500;
}

.honeypot-field {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

.captcha-block {
  margin-bottom: 1rem;
}

.warning-text {
  margin-bottom: 1rem;
  border: 1px solid #ffeeba;
  background: #fff3cd;
  color: #856404;
  border-radius: 8px;
  padding: 0.75rem;
}

.success-text,
.error-text {
  margin-bottom: 0.8rem;
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.success-text {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-text {
  background: #f8d7da;
  color: #842029;
  border: 1px solid #f5c2c7;
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

.btn[disabled] {
  opacity: 0.65;
  cursor: not-allowed;
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

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
