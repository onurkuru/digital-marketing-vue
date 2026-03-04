<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Dijital Pazarlama Öğrenme Yolculuğu</h1>
        <p class="subtitle">Dijital pazarlama becerilerini adım adım geliştir ve uzmanlaş.</p>
        <router-link to="/level/1" class="btn btn-primary">
          <span class="btn-icon">🚀</span>
          Sonraki Göreve Başla
        </router-link>
      </div>
      <div class="hero-image">
        <img src="../assets/digital-marketing.svg" alt="Dijital Pazarlama" />
      </div>
    </div>

    <div class="progress-summary">
      <div class="progress-card">
        <div class="progress-ring">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle class="progress-ring-circle-bg" cx="60" cy="60" r="50"></circle>
            <circle class="progress-ring-circle" cx="60" cy="60" r="50" stroke-dasharray="314.16" 
                  :stroke-dashoffset="314.16 - (314.16 * 33) / 100"></circle>
          </svg>
          <div class="progress-text">33%</div>
        </div>
        <div class="progress-label">Toplam İlerleme</div>
      </div>

      <div class="stats-cards">
        <div class="stats-card">
          <div class="stats-icon">🏆</div>
          <div class="stats-content">
            <div class="stats-value">1/3</div>
            <div class="stats-title">Tamamlanan Görevler</div>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">📚</div>
          <div class="stats-content">
            <div class="stats-value">Seviye 1</div>
            <div class="stats-title">Mevcut Seviye</div>
          </div>
        </div>

        <div class="stats-card">
          <div class="stats-icon">📝</div>
          <div class="stats-content">
            <div class="stats-value">Görev 2</div>
            <div class="stats-title">Sonraki Görev</div>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-path card">
      <div class="card-header">
        <h2>Öğrenme Yolculuğu</h2>
        <router-link to="/roadmap" class="btn btn-link">Yol Haritasını Görüntüle</router-link>
      </div>
      
      <div class="path-container">
        <div class="path-line"></div>
        
        <div class="path-item completed">
          <div class="path-icon">✅</div>
          <div class="path-content">
            <div class="path-number">Seviye 1</div>
            <div class="path-title">Temel Kavramlar</div>
            <div class="path-progress">3/3 tamamlandı</div>
          </div>
        </div>
        
        <div class="path-item active">
          <div class="path-icon">🔄</div>
          <div class="path-content">
            <div class="path-number">Seviye 2</div>
            <div class="path-title">SEO Temelleri</div>
            <div class="path-progress">0/3 tamamlandı</div>
          </div>
          <router-link to="/level/2" class="btn btn-sm">Devam Et</router-link>
        </div>
        
        <div class="path-item">
          <div class="path-icon">🔒</div>
          <div class="path-content">
            <div class="path-number">Seviye 3</div>
            <div class="path-title">Sosyal Medya</div>
          </div>
        </div>
        
        <div class="path-item">
          <div class="path-icon">🔒</div>
          <div class="path-content">
            <div class="path-number">Seviye 4</div>
            <div class="path-title">İçerik Pazarlama</div>
          </div>
        </div>
        
        <div class="path-item">
          <div class="path-icon">🔒</div>
          <div class="path-content">
            <div class="path-number">Seviye 5</div>
            <div class="path-title">E-posta Pazarlaması</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-columns">
      <div class="current-tasks card">
        <div class="card-header">
          <h2>Görevler</h2>
          <router-link to="/tasks" class="btn btn-link">Tüm Görevler</router-link>
        </div>
        
        <div class="tabs">
          <div class="tab active">Mevcut</div>
          <div class="tab">Tamamlanan</div>
          <div class="tab">Yaklaşan</div>
        </div>
        
        <div class="task-list">
          <div class="task-item current">
            <div class="task-status-indicator in-progress"></div>
            <div class="task-content">
              <div class="task-meta">
                <span class="task-level">Seviye 1</span>
                <span class="task-deadline">
                  <span class="icon">⏰</span>
                  17.04.2025
                </span>
              </div>
              <h3 class="task-title">Temel Terminoloji</h3>
              <p class="task-description">Dijital pazarlama terminolojisini öğren ve sektörde kullanılan terimleri anla.</p>
              
              <div class="task-footer">
                <div class="task-badge in-progress">Devam Ediyor</div>
                <router-link to="/task/102" class="btn btn-sm">Devam Et</router-link>
              </div>
            </div>
          </div>
          
          <div class="task-item">
            <div class="task-status-indicator not-started"></div>
            <div class="task-content">
              <div class="task-meta">
                <span class="task-level">Seviye 1</span>
                <span class="task-deadline">
                  <span class="icon">⏰</span>
                  24.04.2025
                </span>
              </div>
              <h3 class="task-title">Marka Hedefleri</h3>
              <p class="task-description">Dijital pazarlama hedeflerinizi belirleyin ve marka stratejisi geliştirin.</p>
              
              <div class="task-footer">
                <div class="task-badge not-started">Başlanmadı</div>
                <router-link to="/task/103" class="btn btn-sm">Görüntüle</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="resources-section">
        <div class="card resources-card">
          <div class="card-header">
            <h2>Önerilen Kaynaklar</h2>
            <router-link to="/resources" class="btn btn-link">Tüm Kaynaklar</router-link>
          </div>
          
          <div class="resources-list">
            <div class="resource-item">
              <div class="resource-icon">📄</div>
              <div class="resource-content">
                <h3 class="resource-title">Dijital Pazarlama Temelleri E-Kitabı</h3>
                <p class="resource-description">Kapsamlı dijital pazarlama temel kavramlar ve stratejiler.</p>
                <a href="#" class="btn btn-sm">İncele</a>
              </div>
            </div>
            
            <div class="resource-item">
              <div class="resource-icon">🎬</div>
              <div class="resource-content">
                <h3 class="resource-title">Terminoloji Eğitim Videosu</h3>
                <p class="resource-description">Dijital pazarlama terimleri ve kullanımları.</p>
                <a href="#" class="btn btn-sm">İzle</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card achievements-card">
          <div class="card-header">
            <h2>Başarılar</h2>
            <router-link to="/achievements" class="btn btn-link">Tüm Başarılar</router-link>
          </div>
          
          <div class="achievement-item unlocked">
            <div class="achievement-badge">🌟</div>
            <div class="achievement-content">
              <h3 class="achievement-title">İlk Adım</h3>
              <p class="achievement-description">İlk görevini tamamladın!</p>
            </div>
          </div>
          
          <div class="achievement-item locked">
            <div class="achievement-badge">🔒</div>
            <div class="achievement-content">
              <h3 class="achievement-title">Seviye Tamamlayıcı</h3>
              <p class="achievement-description">Bir seviyedeki tüm görevleri tamamla.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  margin-top: 1rem;
  margin-bottom: 3rem;
}

.hero-section {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.25rem;
  color: #495057;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-icon {
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
  box-shadow: 0 4px 6px rgba(13, 110, 253, 0.25);
}

.btn-primary:hover {
  background-color: #0b5ed7;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(13, 110, 253, 0.3);
}

.btn-link {
  color: #0d6efd;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  font-weight: 500;
}

.btn-link:hover {
  text-decoration: underline;
  background-color: rgba(13, 110, 253, 0.05);
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #495057;
}

.btn-sm:hover {
  background-color: #dee2e6;
}

.progress-summary {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.progress-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.progress-ring {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
}

.progress-ring svg {
  transform: rotate(-90deg);
}

.progress-ring-circle-bg {
  fill: none;
  stroke: #e9ecef;
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  stroke: #0d6efd;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
}

.progress-label {
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
}

.stats-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.stats-card {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stats-icon {
  font-size: 1.75rem;
  margin-right: 1rem;
}

.stats-content {
  flex: 1;
}

.stats-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.25rem;
}

.stats-title {
  font-size: 0.875rem;
  color: #6c757d;
}

.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2.5rem;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.learning-path .path-container {
  position: relative;
  padding: 1.5rem;
}

.path-line {
  position: absolute;
  left: 35px;
  top: 48px;
  bottom: 48px;
  width: 3px;
  background-color: #e9ecef;
  z-index: 1;
}

.path-item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.path-item:last-child {
  margin-bottom: 0;
}

.path-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.path-item.completed .path-icon {
  background-color: #d1e7dd;
  color: #0f5132;
}

.path-item.active .path-icon {
  background-color: #fff3cd;
  color: #664d03;
}

.path-content {
  flex: 1;
}

.path-number {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.path-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.25rem;
}

.path-progress {
  font-size: 0.875rem;
  color: #0d6efd;
}

.content-columns {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  padding: 0 1.5rem;
}

.tab {
  padding: 1rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab.active {
  color: #0d6efd;
  border-color: #0d6efd;
}

.tab:hover:not(.active) {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}

.task-list {
  padding: 1.5rem;
}

.task-item {
  display: flex;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.task-item:last-child {
  margin-bottom: 0;
}

.task-status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 1rem;
  margin-top: 0.5rem;
  background-color: #e9ecef;
  flex-shrink: 0;
}

.task-status-indicator.in-progress {
  background-color: #fd7e14;
}

.task-status-indicator.not-started {
  background-color: #6c757d;
}

.task-content {
  flex: 1;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.task-level, .task-deadline {
  font-size: 0.75rem;
  color: #6c757d;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
}

.task-description {
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.task-badge.in-progress {
  background-color: #fff3cd;
  color: #664d03;
}

.task-badge.not-started {
  background-color: #e9ecef;
  color: #6c757d;
}

.resources-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.resources-card, .achievements-card {
  margin-bottom: 0;
}

.resources-list {
  padding: 1.5rem;
}

.resource-item {
  display: flex;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.resource-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.resource-item:last-child {
  margin-bottom: 0;
}

.resource-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.resource-content {
  flex: 1;
}

.resource-title {
  font-size: 1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
}

.resource-description {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.achievement-item:last-child {
  border-bottom: none;
}

.achievement-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.achievement-item.unlocked .achievement-badge {
  background-color: #d1e7dd;
  color: #0f5132;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.25rem;
}

.achievement-description {
  font-size: 0.875rem;
  color: #6c757d;
}

@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .content-columns {
    grid-template-columns: 1fr;
  }
  
  .progress-summary {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .tab {
    padding: 0.75rem 1rem;
  }
}
</style> 