<template>
  <div class="documents-view">
    <div class="page-header">
      <h1>Dökümanlar ve Kaynaklar</h1>
      <p class="subtitle">Dijital pazarlama eğitimi için materyaller ve indirilebilir kaynaklar</p>
    </div>
    
    <div class="documents-filters">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Döküman ara..." 
          class="search-input"
        />
      </div>
      
      <div class="filter-container">
        <div class="filter-group">
          <label for="categoryFilter">Kategori:</label>
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
            <option value="video">Video</option>
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
    
    <div class="active-filters" v-if="hasActiveFilters">
      <div class="filter-tags">
        <span class="filter-tag" v-if="searchQuery">
          "{{ searchQuery }}"
          <button class="clear-tag" @click="searchQuery = ''">×</button>
        </span>
        <span class="filter-tag" v-if="categoryFilter !== 'all'">
          {{ getCategoryName(categoryFilter) }}
          <button class="clear-tag" @click="categoryFilter = 'all'">×</button>
        </span>
        <span class="filter-tag" v-if="formatFilter !== 'all'">
          {{ getFormatName(formatFilter) }}
          <button class="clear-tag" @click="formatFilter = 'all'">×</button>
        </span>
      </div>
      
      <button class="clear-filters" @click="clearFilters">Filtreleri Temizle</button>
    </div>
    
    <div class="documents-grid card">
      <div v-if="filteredDocuments.length > 0" class="documents-list">
        <div v-for="document in filteredDocuments" :key="document.id" class="document-item">
          <div class="document-icon" v-html="getDocumentIcon(document.format)"></div>
          
          <div class="document-details">
            <h3 class="document-title">{{ document.title }}</h3>
            
            <div class="document-meta">
              <span class="document-category">{{ getCategoryName(document.categoryId) }}</span>
              <span class="document-format">{{ getFormatName(document.format) }}</span>
              <span class="document-size">{{ formatFileSize(document.size) }}</span>
            </div>
            
            <p class="document-description">{{ document.description }}</p>
            
            <div class="document-tags">
              <span 
                v-for="tag in document.tags" 
                :key="tag"
                class="document-tag"
                @click="searchByTag(tag)"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="document-actions">
            <a :href="document.downloadUrl" class="btn btn-primary">İndir</a>
            
            <button 
              v-if="canPreview(document.format)" 
              class="btn btn-outline"
              @click="previewDocument(document)"
            >
              Önizleme
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="no-documents">
        <div class="no-documents-icon">📄</div>
        <h3>Eşleşen döküman bulunamadı</h3>
        <p>Lütfen arama terimlerinizi değiştirin veya filtreleri temizleyin.</p>
        <button class="btn btn-primary" @click="clearFilters">Filtreleri Temizle</button>
      </div>
    </div>
    
    <div v-if="showPreview" class="document-preview-overlay" @click="closePreview">
      <div class="document-preview-container" @click.stop>
        <div class="preview-header">
          <h3>{{ previewDocument.title }}</h3>
          <button class="preview-close" @click="closePreview">×</button>
        </div>
        
        <div class="preview-content">
          <iframe 
            v-if="previewDocument.previewUrl" 
            :src="previewDocument.previewUrl" 
            class="preview-frame"
          ></iframe>
          
          <div v-else class="preview-unavailable">
            <div class="preview-unavailable-icon">🔍</div>
            <p>Önizleme kullanılamıyor. Lütfen dosyayı indirin.</p>
          </div>
        </div>
        
        <div class="preview-footer">
          <a :href="previewDocument.downloadUrl" class="btn btn-primary">İndir</a>
          <button class="btn btn-outline" @click="closePreview">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentsView',
  data() {
    return {
      // Search and filters
      searchQuery: '',
      categoryFilter: 'all',
      formatFilter: 'all',
      sortOrder: 'newest',
      
      // Preview state
      showPreview: false,
      previewDocument: null,
      
      // Categories data
      categories: [
        { id: 'basics', name: 'Dijital Pazarlama Temelleri' },
        { id: 'seo', name: 'SEO ve İçerik Stratejisi' },
        { id: 'social', name: 'Sosyal Medya Pazarlaması' },
        { id: 'ads', name: 'Ücretli Reklamcılık' },
        { id: 'analytics', name: 'Veri Analizi ve Raporlama' }
      ],
      
      // Documents data
      documents: [
        {
          id: 'doc-1',
          title: 'Dijital Pazarlama Giriş Rehberi',
          description: 'Dijital pazarlamanın temel kavramlarını ve stratejilerini içeren kapsamlı bir başlangıç rehberi.',
          categoryId: 'basics',
          format: 'pdf',
          size: 2500000,
          tags: ['Temel', 'Başlangıç', 'Strateji'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/guide.pdf',
          uploadDate: '2023-08-05'
        },
        {
          id: 'doc-2',
          title: 'SEO İçin Anahtar Kelime Araştırması',
          description: 'SEO stratejiniz için etkili anahtar kelime araştırması yapmanın adımları ve kullanılacak araçlar.',
          categoryId: 'seo',
          format: 'pdf',
          size: 1800000,
          tags: ['SEO', 'Anahtar Kelime', 'Araştırma'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/seo_research.pdf',
          uploadDate: '2023-08-10'
        },
        {
          id: 'doc-3',
          title: 'Sosyal Medya Platformları Karşılaştırması',
          description: 'Farklı sosyal medya platformlarının avantajları, dezavantajları ve hedef kitle analizleri.',
          categoryId: 'social',
          format: 'ppt',
          size: 5200000,
          tags: ['Sosyal Medya', 'Platform', 'Analiz'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-08-12'
        },
        {
          id: 'doc-4',
          title: 'Google Ads Kampanya Oluşturma Adımları',
          description: 'Google Ads üzerinde etkili kampanyalar oluşturma, yönetme ve optimize etme adımları.',
          categoryId: 'ads',
          format: 'doc',
          size: 1300000,
          tags: ['Google Ads', 'Kampanya', 'PPC'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-08-15'
        },
        {
          id: 'doc-5',
          title: 'Google Analytics Kurulum ve Raporlama',
          description: 'Google Analytics hesabı kurma, temel metrikler ve önemli raporlar hakkında bilgiler.',
          categoryId: 'analytics',
          format: 'pdf',
          size: 3100000,
          tags: ['Analytics', 'Ölçümleme', 'Raporlama'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/analytics_guide.pdf',
          uploadDate: '2023-08-18'
        },
        {
          id: 'doc-6',
          title: 'Sosyal Medya Takip ve Analiz Tablosu',
          description: 'Sosyal medya kampanyalarınızı takip etmek ve analiz etmek için kullanabileceğiniz Excel şablonu.',
          categoryId: 'social',
          format: 'xls',
          size: 890000,
          tags: ['Sosyal Medya', 'Takip', 'Analiz', 'Şablon'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-08-20'
        },
        {
          id: 'doc-7',
          title: 'Dijital Pazarlama Bütçe Planlama',
          description: 'Dijital pazarlama kanalları için bütçe planlama ve optimizasyon stratejileri.',
          categoryId: 'basics',
          format: 'xls',
          size: 1200000,
          tags: ['Bütçe', 'Planlama', 'ROI'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-08-22'
        },
        {
          id: 'doc-8',
          title: 'Etkili İçerik Oluşturma Teknikleri',
          description: 'Farklı dijital kanallar için optimize edilmiş içerik oluşturma ve planlama rehberi.',
          categoryId: 'seo',
          format: 'pdf',
          size: 2900000,
          tags: ['İçerik', 'Yazma', 'Optimizasyon'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/content_creation.pdf',
          uploadDate: '2023-08-25'
        },
        {
          id: 'doc-9',
          title: 'Facebook ve Instagram Reklamları Sunumu',
          description: 'Facebook ve Instagram reklam türleri, hedefleme seçenekleri ve başarılı kampanya örnekleri.',
          categoryId: 'ads',
          format: 'ppt',
          size: 4800000,
          tags: ['Facebook', 'Instagram', 'Reklam'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-08-27'
        },
        {
          id: 'doc-10',
          title: 'Dijital Pazarlama Terimleri Sözlüğü',
          description: 'Dijital pazarlama alanında sık kullanılan terimlerin açıklamaları ve örnekleri.',
          categoryId: 'basics',
          format: 'pdf',
          size: 1700000,
          tags: ['Terimler', 'Sözlük', 'Referans'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/dictionary.pdf',
          uploadDate: '2023-08-30'
        },
        {
          id: 'doc-11',
          title: 'Dijital Pazarlama Metrikleri ve KPI\'lar',
          description: 'Önemli dijital pazarlama metriklerini anlama ve KPI\'ları belirleme rehberi.',
          categoryId: 'analytics',
          format: 'pdf',
          size: 2200000,
          tags: ['Metrikler', 'KPI', 'Ölçümleme'],
          downloadUrl: '#',
          previewUrl: 'https://docs.google.com/viewer?embedded=true&url=example.com/documents/kpis.pdf',
          uploadDate: '2023-09-01'
        },
        {
          id: 'doc-12',
          title: 'SEO Stratejisi Oluşturma',
          description: 'Kapsamlı bir SEO stratejisi oluşturmak için adım adım rehber ve kontrol listesi.',
          categoryId: 'seo',
          format: 'doc',
          size: 1600000,
          tags: ['SEO', 'Strateji', 'Planlama'],
          downloadUrl: '#',
          previewUrl: null,
          uploadDate: '2023-09-05'
        }
      ]
    }
  },
  computed: {
    hasActiveFilters() {
      return this.searchQuery !== '' || this.categoryFilter !== 'all' || this.formatFilter !== 'all'
    },
    
    filteredDocuments() {
      let result = [...this.documents]
      
      // Apply category filter
      if (this.categoryFilter !== 'all') {
        result = result.filter(doc => doc.categoryId === this.categoryFilter)
      }
      
      // Apply format filter
      if (this.formatFilter !== 'all') {
        result = result.filter(doc => doc.format === this.formatFilter)
      }
      
      // Apply search query
      if (this.searchQuery.trim() !== '') {
        const searchTerms = this.searchQuery.toLowerCase().trim().split(' ')
        result = result.filter(doc => {
          const searchableText = [
            doc.title,
            doc.description,
            ...doc.tags,
            this.getCategoryName(doc.categoryId)
          ].join(' ').toLowerCase()
          
          return searchTerms.every(term => searchableText.includes(term))
        })
      }
      
      // Apply sorting
      switch (this.sortOrder) {
        case 'newest':
          return result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        case 'oldest':
          return result.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate))
        case 'nameAsc':
          return result.sort((a, b) => a.title.localeCompare(b.title))
        case 'nameDesc':
          return result.sort((a, b) => b.title.localeCompare(a.title))
        default:
          return result
      }
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId)
      return category ? category.name : ''
    },
    
    getFormatName(format) {
      switch(format) {
        case 'pdf':
          return 'PDF Doküman'
        case 'doc':
          return 'Word Doküman'
        case 'ppt':
          return 'PowerPoint Sunum'
        case 'xls':
          return 'Excel Çalışma Kitabı'
        case 'video':
          return 'Video'
        default:
          return format.toUpperCase()
      }
    },
    
    getDocumentIcon(format) {
      switch(format) {
        case 'pdf':
          return '📄'
        case 'doc':
          return '📝'
        case 'ppt':
          return '📊'
        case 'xls':
          return '📈'
        case 'video':
          return '🎬'
        default:
          return '📁'
      }
    },
    
    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B'
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
      else return (bytes / 1048576).toFixed(1) + ' MB'
    },
    
    clearFilters() {
      this.searchQuery = ''
      this.categoryFilter = 'all'
      this.formatFilter = 'all'
    },
    
    searchByTag(tag) {
      this.searchQuery = tag
    },
    
    previewDocument(document) {
      this.previewDocument = document
      this.showPreview = true
      document.querySelector('body').classList.add('no-scroll')
    },
    
    closePreview() {
      this.showPreview = false
      this.previewDocument = null
      document.querySelector('body').classList.remove('no-scroll')
    },
    
    canPreview(format) {
      // In a real app, this would check if the format can be previewed in browser
      return ['pdf', 'video'].includes(format)
    }
  }
}
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
  margin-bottom: 1.5rem;
}

.documents-filters {
  margin-bottom: 1.5rem;
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
  white-space: nowrap;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background-color: #fff;
  font-size: 0.95rem;
}

.active-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  background-color: #e9ecef;
  padding: 0.375rem 0.75rem;
  border-radius: 100px;
  font-size: 0.875rem;
}

.clear-tag {
  background: none;
  border: none;
  padding: 0 0 0 0.5rem;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #6c757d;
}

.clear-tag:hover {
  color: #dc3545;
}

.clear-filters {
  background: none;
  border: none;
  color: #0d6efd;
  font-size: 0.875rem;
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
  gap: 1.5rem;
}

.document-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.document-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.document-details {
  flex: 1;
}

.document-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.document-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.document-description {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.document-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.document-tag {
  display: inline-block;
  background-color: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
}

.document-tag:hover {
  background-color: #dee2e6;
}

.document-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.no-documents {
  text-align: center;
  padding: 3rem 0;
}

.no-documents-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.no-documents h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.no-documents p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

/* Document preview overlay */
.document-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.document-preview-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 900px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.preview-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.preview-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.preview-content {
  flex: 1;
  overflow: hidden;
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.preview-unavailable {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.preview-unavailable-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.preview-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.9rem;
  border: none;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #212529;
  color: #212529;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

/* For preventing body scroll when modal is open */
:global(body.no-scroll) {
  overflow: hidden;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-group select {
    flex: 1;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .document-item {
    flex-direction: column;
    padding: 1.25rem;
  }
  
  .document-icon {
    align-self: center;
    margin-bottom: 1rem;
  }
  
  .document-actions {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style> 