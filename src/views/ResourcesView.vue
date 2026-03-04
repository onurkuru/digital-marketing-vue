<template>
  <div class="resources-view">
    <div class="page-header">
      <h1>Gönderilenler</h1>
      <p class="subtitle">Tamamladığınız görevler ve gönderdiğiniz çalışmalar</p>
    </div>
    
    <div class="resources-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.value" 
        :class="['tab', { active: currentTab === tab.value }]"
        @click="currentTab = tab.value"
      >
        {{ tab.label }}
      </div>
    </div>
    
    <div class="resources-list card" v-if="currentTab === 'assignments'">
      <div class="resources-header">
        <h2>Görev Teslimleriniz</h2>
        <div class="resources-filter">
          <label for="statusFilter">Durum:</label>
          <select id="statusFilter" v-model="statusFilter">
            <option value="all">Tümü</option>
            <option value="graded">Değerlendirildi</option>
            <option value="pending">Değerlendirme Bekliyor</option>
          </select>
        </div>
      </div>
      
      <div class="resources-items">
        <div v-for="resource in filteredAssignments" :key="resource.id" class="resource-item">
          <div class="resource-status" :class="resource.status">
            <span v-if="resource.status === 'graded'" class="status-icon">✓</span>
            <span v-else class="status-icon">⋯</span>
          </div>
          
          <div class="resource-details">
            <div class="resource-meta">
              <span class="resource-task">{{ resource.taskTitle }}</span>
              <span class="resource-date">Gönderilme: {{ formatDate(resource.submittedDate) }}</span>
            </div>
            
            <h3 class="resource-title">{{ resource.title }}</h3>
            <p class="resource-description">{{ resource.description }}</p>
            
            <div class="resource-feedback" v-if="resource.status === 'graded'">
              <div class="feedback-score">
                <span class="score-label">Puan:</span>
                <span class="score-value">{{ resource.score }}/100</span>
              </div>
              <p class="feedback-text">{{ resource.feedback }}</p>
            </div>
          </div>
          
          <div class="resource-actions">
            <a :href="resource.fileUrl" target="_blank" class="btn btn-primary">Görüntüle</a>
          </div>
        </div>
        
        <div v-if="filteredAssignments.length === 0" class="no-resources">
          <p>Henüz görev teslimi bulunmamaktadır.</p>
        </div>
      </div>
    </div>
    
    <div class="resources-list card" v-if="currentTab === 'projects'">
      <div class="resources-header">
        <h2>Proje Çalışmalarınız</h2>
      </div>
      
      <div class="resources-items">
        <div v-for="project in projects" :key="project.id" class="resource-item">
          <div class="resource-icon" v-html="getProjectTypeIcon(project.type)"></div>
          
          <div class="resource-details">
            <div class="resource-meta">
              <span class="resource-module">{{ project.moduleTitle }}</span>
              <span class="resource-date">Oluşturulma: {{ formatDate(project.createdDate) }}</span>
            </div>
            
            <h3 class="resource-title">{{ project.title }}</h3>
            <p class="resource-description">{{ project.description }}</p>
            
            <div class="resource-tags">
              <span 
                v-for="tag in project.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="resource-actions">
            <a :href="project.fileUrl" target="_blank" class="btn btn-primary">Görüntüle</a>
          </div>
        </div>
        
        <div v-if="projects.length === 0" class="no-resources">
          <p>Henüz proje çalışması bulunmamaktadır.</p>
        </div>
      </div>
    </div>
    
    <div class="resources-list card" v-if="currentTab === 'certificates'">
      <div class="resources-header">
        <h2>Sertifikalarınız</h2>
      </div>
      
      <div class="certificates-grid">
        <div v-for="certificate in certificates" :key="certificate.id" class="certificate-item">
          <div class="certificate-preview">
            <div class="certificate-icon">🏆</div>
            <div class="certificate-title">{{ certificate.title }}</div>
          </div>
          
          <div class="certificate-details">
            <div class="certificate-meta">
              <div class="meta-item">
                <span class="meta-label">Alınma Tarihi:</span>
                <span class="meta-value">{{ formatDate(certificate.issuedDate) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Tamamlama Oranı:</span>
                <span class="meta-value">{{ certificate.completionRate }}%</span>
              </div>
            </div>
            
            <div class="certificate-actions">
              <a :href="certificate.fileUrl" target="_blank" class="btn btn-primary">Görüntüle</a>
              <button class="btn btn-outline">İndir</button>
            </div>
          </div>
        </div>
        
        <div v-if="certificates.length === 0" class="no-certificates">
          <div class="no-item-icon">🏆</div>
          <p>Henüz sertifikanız bulunmamaktadır.</p>
          <p class="no-item-hint">Modülleri tamamlayarak sertifika kazanabilirsiniz.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourcesView',
  data() {
    return {
      tabs: [
        { label: 'Görev Teslimleri', value: 'assignments' },
        { label: 'Proje Çalışmalarım', value: 'projects' },
        { label: 'Sertifikalarım', value: 'certificates' }
      ],
      currentTab: 'assignments',
      statusFilter: 'all',
      
      assignments: [
        {
          id: 'assignment-101',
          taskTitle: 'Task 1.2: Temel Terminoloji',
          title: 'Dijital Pazarlama Terimleri Sözlüğü',
          description: 'Dijital pazarlama alanında sık kullanılan 25 terimin açıklamaları ve örnekleriyle oluşturduğum sözlük çalışması.',
          submittedDate: '2023-08-15',
          status: 'graded',
          score: 92,
          feedback: 'Çok iyi bir çalışma! Terimler detaylı bir şekilde açıklanmış ve güzel örneklerle desteklenmiş. SEO bölümü özellikle başarılı olmuş.',
          fileUrl: '#'
        },
        {
          id: 'assignment-102',
          taskTitle: 'Task 1.1: Digital Marketing 101',
          title: 'Dijital Pazarlama Kanalları Analizi',
          description: 'Farklı dijital pazarlama kanallarının avantaj ve dezavantajlarını incelediğim bir karşılaştırma raporu.',
          submittedDate: '2023-08-05',
          status: 'graded',
          score: 85,
          feedback: 'İyi bir analiz çalışması. Kanallar arasındaki farklar net bir şekilde ortaya konmuş. Maliyet analizinin biraz daha detaylandırılması faydalı olabilirdi.',
          fileUrl: '#'
        },
        {
          id: 'assignment-103',
          taskTitle: 'Task 1.3: Marka Hedefleri',
          title: 'XYZ Markası Dijital Pazarlama Stratejisi',
          description: 'XYZ markası için hazırladığım kapsamlı dijital pazarlama stratejisi ve hedef kitle analizi.',
          submittedDate: '2023-08-22',
          status: 'pending',
          fileUrl: '#'
        }
      ],
      
      projects: [
        {
          id: 'project-101',
          type: 'document',
          moduleTitle: 'Dijital Pazarlama Temelleri',
          title: 'Dijital Pazarlama Kampanya Planı',
          description: 'Bir e-ticaret sitesi için hazırladığım 3 aylık dijital pazarlama kampanya planı.',
          createdDate: '2023-08-18',
          tags: ['Strateji', 'E-ticaret', 'Kampanya'],
          fileUrl: '#'
        },
        {
          id: 'project-102',
          type: 'presentation',
          moduleTitle: 'Sosyal Medya Pazarlaması',
          title: 'Instagram Reklam Stratejisi Sunumu',
          description: 'Instagram reklamları için hazırladığım strateji ve başarı ölçümleri sunumu.',
          createdDate: '2023-08-20',
          tags: ['Sosyal Medya', 'Instagram', 'Reklam'],
          fileUrl: '#'
        }
      ],
      
      certificates: [
        {
          id: 'cert-101',
          title: 'Dijital Pazarlama Temelleri Sertifikası',
          issuedDate: '2023-08-17',
          completionRate: 100,
          fileUrl: '#'
        }
      ]
    }
  },
  computed: {
    filteredAssignments() {
      if (this.statusFilter === 'all') return this.assignments
      return this.assignments.filter(assignment => 
        this.statusFilter === 'graded' 
          ? assignment.status === 'graded' 
          : assignment.status === 'pending'
      )
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    },
    getProjectTypeIcon(type) {
      switch(type) {
        case 'document':
          return '📄'
        case 'presentation':
          return '📊'
        case 'spreadsheet':
          return '📈'
        case 'design':
          return '🎨'
        default:
          return '📁'
      }
    }
  }
}
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
  margin-bottom: 1.5rem;
}

.resources-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  color: #495057;
  transition: all 0.2s;
}

.tab.active {
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  font-weight: 500;
}

.tab:hover:not(.active) {
  color: #0d6efd;
  background-color: #f8f9fa;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.resources-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.resources-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.resources-filter label {
  font-weight: 500;
}

.resources-filter select {
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background-color: #fff;
  font-size: 0.95rem;
}

.resources-items {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.resource-item {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.resource-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.resource-status.graded {
  background-color: #d4edda;
  color: #28a745;
}

.resource-status.pending {
  background-color: #fff3cd;
  color: #ffc107;
}

.status-icon {
  font-weight: bold;
  font-size: 1rem;
}

.resource-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.resource-details {
  flex: 1;
}

.resource-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.resource-task,
.resource-module {
  font-size: 0.85rem;
  font-weight: 500;
  color: #6c757d;
}

.resource-date {
  font-size: 0.85rem;
  color: #6c757d;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.resource-description {
  color: #495057;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.resource-feedback {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
}

.feedback-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.score-label {
  font-weight: 500;
}

.score-value {
  font-weight: 600;
  color: #28a745;
}

.feedback-text {
  font-style: italic;
  color: #495057;
  line-height: 1.5;
  margin: 0;
}

.resource-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: center;
}

.resource-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #495057;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.certificate-item {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.certificate-preview {
  background-color: #f8f9fa;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
}

.certificate-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.certificate-title {
  font-weight: 600;
  line-height: 1.4;
}

.certificate-details {
  padding: 1.25rem;
}

.certificate-meta {
  margin-bottom: 1.25rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.meta-label {
  color: #6c757d;
}

.meta-value {
  font-weight: 500;
}

.certificate-actions {
  display: flex;
  gap: 0.75rem;
}

.no-resources,
.no-certificates {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.no-item-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.no-item-hint {
  margin-top: 0.5rem;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .resources-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .resource-item {
    flex-direction: column;
  }
  
  .resource-status,
  .resource-icon {
    align-self: flex-start;
  }
  
  .resource-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .resource-actions {
    align-self: flex-end;
    margin-top: 1rem;
  }
  
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .certificate-actions {
    flex-direction: column;
  }
}
</style> 