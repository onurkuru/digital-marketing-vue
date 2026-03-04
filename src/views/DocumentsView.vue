<template>
  <div class="documents-view">
    <div class="page-header">
      <h1>Dökümanlar ve Kaynaklar</h1>
      <p class="subtitle">Görevlerde geçen tüm kaynaklar burada aktif olarak listelenir.</p>
    </div>

    <div class="documents-filters">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Kaynak ara..."
          class="search-input"
        />
      </div>

      <div class="filter-container">
        <div class="filter-group">
          <label for="categoryFilter">Seviye:</label>
          <select id="categoryFilter" v-model="categoryFilter">
            <option value="all">Tümü</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="formatFilter">Format:</label>
          <select id="formatFilter" v-model="formatFilter">
            <option value="all">Tümü</option>
            <option value="pdf">PDF</option>
            <option value="ppt">PowerPoint</option>
            <option value="doc">Word</option>
            <option value="xls">Excel</option>
            <option value="image">Görsel</option>
            <option value="video">Video</option>
            <option value="link">Web Link</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sortOrder">Sıralama:</label>
          <select id="sortOrder" v-model="sortOrder">
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="nameAsc">İsim (A-Z)</option>
            <option value="nameDesc">İsim (Z-A)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="documents-summary">
      <span>{{ filteredDocuments.length }} kaynak bulundu</span>
      <button v-if="hasActiveFilters" class="clear-filters" @click="clearFilters">Filtreleri Temizle</button>
    </div>

    <div class="documents-grid card">
      <div v-if="filteredDocuments.length" class="documents-list">
        <article v-for="document in filteredDocuments" :key="document.id" class="document-item">
          <div class="document-icon">{{ getDocumentIcon(document.format) }}</div>

          <div class="document-details">
            <h3 class="document-title">{{ document.title }}</h3>

            <div class="document-meta">
              <span class="document-category">{{ getCategoryName(document.categoryId) }}</span>
              <span class="document-format">{{ getFormatName(document.format) }}</span>
              <span class="document-size">{{ formatFileSize(document.size) }}</span>
            </div>

            <p class="document-description">{{ document.description }}</p>

            <div class="document-tags">
              <button
                v-for="tag in document.tags"
                :key="`${document.id}-${tag}`"
                type="button"
                class="document-tag"
                @click="searchByTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <div class="document-actions">
            <a :href="document.downloadUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              Kaynağı Aç
            </a>

            <button
              v-if="canPreview(document)"
              type="button"
              class="btn btn-outline"
              @click="openPreview(document)"
            >
              Önizleme
            </button>

            <router-link :to="`/task/${document.taskId}`" class="btn btn-outline">
              Göreve Git
            </router-link>
          </div>
        </article>
      </div>

      <div v-else class="no-documents">
        <div class="no-documents-icon">📄</div>
        <h3>Eşleşen kaynak bulunamadı</h3>
        <p>Arama veya filtreleri değiştirin.</p>
      </div>
    </div>

    <div v-if="showPreview && activePreviewDocument" class="document-preview-overlay" @click="closePreview">
      <div class="document-preview-container" @click.stop>
        <div class="preview-header">
          <h3>{{ activePreviewDocument.title }}</h3>
          <button class="preview-close" @click="closePreview">×</button>
        </div>

        <div class="preview-content">
          <iframe
            v-if="activePreviewDocument.previewUrl"
            :src="activePreviewDocument.previewUrl"
            class="preview-frame"
          ></iframe>

          <div v-else class="preview-unavailable">
            <div class="preview-unavailable-icon">🔍</div>
            <p>Bu kaynak için tarayıcı önizlemesi yok. "Kaynağı Aç" ile yeni sekmede açabilirsiniz.</p>
          </div>
        </div>

        <div class="preview-footer">
          <a
            :href="activePreviewDocument.downloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            Kaynağı Aç
          </a>
          <button class="btn btn-outline" @click="closePreview">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';

function inferFormat(url, type) {
  const normalizedUrl = String(url || '').toLowerCase().split('?')[0];
  const normalizedType = String(type || '').toLowerCase();

  if (normalizedType === 'video' || normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) {
    return 'video';
  }
  if (/\.(pdf)$/.test(normalizedUrl)) return 'pdf';
  if (/\.(ppt|pptx)$/.test(normalizedUrl)) return 'ppt';
  if (/\.(doc|docx)$/.test(normalizedUrl)) return 'doc';
  if (/\.(xls|xlsx)$/.test(normalizedUrl)) return 'xls';
  if (/\.(jpg|jpeg|png|webp|gif)$/.test(normalizedUrl)) return 'image';
  return 'link';
}

function estimateSizeByFormat(format) {
  const map = {
    pdf: 2400000,
    ppt: 5000000,
    doc: 1600000,
    xls: 1200000,
    image: 900000,
    video: 0,
    link: 0
  };
  return map[format] || 0;
}

function toPreviewUrl(document) {
  const url = String(document.downloadUrl || '');
  if (!/^https?:\/\//.test(url)) return null;

  if (document.format === 'pdf' && !url.includes('google.com/search')) {
    return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;
  }

  if (document.format === 'image') {
    return url;
  }

  if (document.format === 'video') {
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    return null;
  }

  return null;
}

export default {
  name: 'DocumentsView',
  data() {
    return {
      searchQuery: '',
      categoryFilter: 'all',
      formatFilter: 'all',
      sortOrder: 'newest',
      showPreview: false,
      activePreviewDocument: null,
      levels,
      tasks: allTasks
    };
  },
  computed: {
    categories() {
      return this.levels.map((level) => ({
        id: `level-${level.id}`,
        name: `Seviye ${level.id}: ${level.title}`
      }));
    },
    documents() {
      const documents = [];
      const seenKeys = new Set();
      const levelMap = Object.fromEntries(this.levels.map((level) => [level.id, level]));

      this.tasks.forEach((task, taskIndex) => {
        (task.resources || []).forEach((resource, resourceIndex) => {
          const key = `${resource.title}::${resource.url}`;
          if (seenKeys.has(key)) return;
          seenKeys.add(key);

          const format = inferFormat(resource.url, resource.type);
          const categoryId = `level-${task.levelId}`;
          const levelTitle = levelMap[task.levelId]?.title || `Seviye ${task.levelId}`;
          const baseDocument = {
            id: `doc-${task.id}-${resourceIndex}-${taskIndex}`,
            title: resource.title || `Kaynak ${resourceIndex + 1}`,
            description: resource.description || `${task.title} görevi için kaynak materyal.`,
            categoryId,
            format,
            size: estimateSizeByFormat(format),
            tags: [levelTitle, task.title, resource.type || 'kaynak'],
            downloadUrl: resource.url,
            uploadDate: this.parseTaskDate(task.deadline),
            taskId: task.id
          };

          documents.push({
            ...baseDocument,
            previewUrl: toPreviewUrl(baseDocument)
          });
        });
      });

      return documents;
    },
    hasActiveFilters() {
      return this.searchQuery.trim() !== '' || this.categoryFilter !== 'all' || this.formatFilter !== 'all';
    },
    filteredDocuments() {
      let result = [...this.documents];

      if (this.categoryFilter !== 'all') {
        result = result.filter((document) => document.categoryId === this.categoryFilter);
      }

      if (this.formatFilter !== 'all') {
        result = result.filter((document) => document.format === this.formatFilter);
      }

      if (this.searchQuery.trim()) {
        const searchTerm = this.searchQuery.toLowerCase().trim();
        result = result.filter((document) => {
          const searchableText = [
            document.title,
            document.description,
            ...document.tags,
            this.getCategoryName(document.categoryId)
          ].join(' ').toLowerCase();
          return searchableText.includes(searchTerm);
        });
      }

      switch (this.sortOrder) {
        case 'newest':
          return result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        case 'oldest':
          return result.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        case 'nameAsc':
          return result.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
        case 'nameDesc':
          return result.sort((a, b) => b.title.localeCompare(a.title, 'tr'));
        default:
          return result;
      }
    }
  },
  methods: {
    parseTaskDate(deadline) {
      const match = String(deadline || '').match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
      if (!match) return '2026-01-01';
      const day = Number(match[1]);
      const month = Number(match[2]) - 1;
      const year = Number(match[3]);
      const parsed = new Date(year, month, day);
      if (Number.isNaN(parsed.getTime())) return '2026-01-01';
      const yyyy = String(parsed.getFullYear());
      const mm = String(parsed.getMonth() + 1).padStart(2, '0');
      const dd = String(parsed.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((item) => item.id === categoryId);
      return category ? category.name : 'Diğer';
    },
    getFormatName(format) {
      const map = {
        pdf: 'PDF',
        doc: 'Word',
        ppt: 'PowerPoint',
        xls: 'Excel',
        image: 'Görsel',
        video: 'Video',
        link: 'Web Link'
      };
      return map[format] || format;
    },
    getDocumentIcon(format) {
      const map = {
        pdf: '📄',
        doc: '📝',
        ppt: '📊',
        xls: '📈',
        image: '🖼️',
        video: '🎬',
        link: '🔗'
      };
      return map[format] || '📁';
    },
    formatFileSize(bytes) {
      if (!bytes) return 'Boyut bilgisi yok';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1048576).toFixed(1)} MB`;
    },
    clearFilters() {
      this.searchQuery = '';
      this.categoryFilter = 'all';
      this.formatFilter = 'all';
      this.sortOrder = 'newest';
    },
    searchByTag(tag) {
      this.searchQuery = tag;
    },
    canPreview(document) {
      return Boolean(document.previewUrl);
    },
    openPreview(doc) {
      this.activePreviewDocument = doc;
      this.showPreview = true;
      if (typeof window !== 'undefined') {
        window.document.body.classList.add('no-scroll');
      }
    },
    closePreview() {
      this.showPreview = false;
      this.activePreviewDocument = null;
      if (typeof window !== 'undefined') {
        window.document.body.classList.remove('no-scroll');
      }
    }
  }
};
</script>

<style scoped>
.documents-view {
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

.documents-filters {
  margin-bottom: 1rem;
}

.search-container {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
}

.filter-group select {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
}

.documents-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.clear-filters {
  border: none;
  background: none;
  color: #0d6efd;
  cursor: pointer;
  text-decoration: underline;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.document-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 0.9rem;
}

.document-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.document-title {
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.document-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.document-meta span {
  background: #f1f3f5;
  border-radius: 999px;
  padding: 0.12rem 0.5rem;
  font-size: 0.75rem;
  color: #495057;
}

.document-description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.document-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.document-tag {
  border: 1px solid #dee2e6;
  background: #fff;
  color: #495057;
  border-radius: 999px;
  font-size: 0.75rem;
  padding: 0.15rem 0.55rem;
  cursor: pointer;
}

.document-actions {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 130px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.42rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid #ced4da;
  background: #fff;
  color: #212529;
  cursor: pointer;
}

.btn-primary {
  background: #212529;
  border-color: #212529;
  color: white;
}

.btn-primary:hover {
  background: #000;
}

.btn-outline:hover {
  background: #f8f9fa;
}

.no-documents {
  text-align: center;
  padding: 2rem 1rem;
  color: #6c757d;
}

.no-documents-icon {
  font-size: 2rem;
}

.document-preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.document-preview-container {
  width: min(1100px, 100%);
  height: min(85vh, 720px);
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.preview-header,
.preview-footer {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.preview-footer {
  border-top: 1px solid #e9ecef;
  border-bottom: none;
}

.preview-close {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.preview-content {
  flex: 1;
  min-height: 0;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.preview-unavailable {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6c757d;
  padding: 1rem;
}

.preview-unavailable-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 900px) {
  .document-item {
    grid-template-columns: 1fr;
  }

  .document-actions {
    flex-direction: row;
    min-width: 0;
    flex-wrap: wrap;
  }
}
</style>
