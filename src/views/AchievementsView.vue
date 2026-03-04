<template>
  <div class="achievements-view">
    <div class="page-header">
      <h1>Başarılar</h1>
      <p class="subtitle">Dijital pazarlama yolculuğunuzda kazandığınız rozetler ve başarılar</p>
    </div>
    
    <div class="achievements-overview card">
      <div class="stats-row">
        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">🏆</span>
            <span>Toplam Başarılar</span>
          </div>
          <div class="stats-value">4/15</div>
          <div class="stats-subtitle">4 başarı kazandınız</div>
        </div>

        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">⭐</span>
            <span>Toplam Puan</span>
          </div>
          <div class="stats-value">850</div>
          <div class="stats-subtitle">Başarılardan kazanılan puan</div>
        </div>

        <div class="stats-card">
          <div class="stats-title">
            <span class="icon">🥇</span>
            <span>En Yüksek Rozet</span>
          </div>
          <div class="stats-value">Gümüş</div>
          <div class="stats-subtitle">Bir sonraki seviye: Altın</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2 class="section-title">Kazanılan Başarılar</h2>
      
      <div class="achievements-grid">
        <div class="achievement-item earned">
          <div class="achievement-icon">🚀</div>
          <div class="achievement-details">
            <h3 class="achievement-title">İlk Adım</h3>
            <p class="achievement-description">İlk görevinizi tamamladınız</p>
            <div class="achievement-meta">
              <span class="achievement-points">100 puan</span>
              <span class="achievement-date">10.04.2025</span>
            </div>
          </div>
        </div>
        
        <div class="achievement-item earned">
          <div class="achievement-icon">📚</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Terminoloji Uzmanı</h3>
            <p class="achievement-description">Dijital pazarlama terimlerini öğrendiniz</p>
            <div class="achievement-meta">
              <span class="achievement-points">200 puan</span>
              <span class="achievement-date">17.04.2025</span>
            </div>
          </div>
        </div>
        
        <div class="achievement-item earned">
          <div class="achievement-icon">🎯</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Hedef Belirleyici</h3>
            <p class="achievement-description">Marka hedefleri görevini tamamladınız</p>
            <div class="achievement-meta">
              <span class="achievement-points">300 puan</span>
              <span class="achievement-date">24.04.2025</span>
            </div>
          </div>
        </div>
        
        <div class="achievement-item earned">
          <div class="achievement-icon">🏅</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Seviye 1 Tamamlandı</h3>
            <p class="achievement-description">Temel Kavramlar seviyesini başarıyla bitirdiniz</p>
            <div class="achievement-meta">
              <span class="achievement-points">250 puan</span>
              <span class="achievement-date">24.04.2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2 class="section-title">Yaklaşan Başarılar</h2>
      
      <div class="achievements-grid">
        <div class="achievement-item locked">
          <div class="achievement-icon">🔍</div>
          <div class="achievement-details">
            <h3 class="achievement-title">SEO Araştırmacısı</h3>
            <p class="achievement-description">Anahtar kelime araştırmasını tamamlayın</p>
            <div class="achievement-meta">
              <span class="achievement-points">200 puan</span>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 60%"></div>
                </div>
                <span class="progress-text">60% Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="achievement-item locked">
          <div class="achievement-icon">⚙️</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Sayfa Optimizasyonu</h3>
            <p class="achievement-description">On-Page SEO görevini tamamlayın</p>
            <div class="achievement-meta">
              <span class="achievement-points">250 puan</span>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 25%"></div>
                </div>
                <span class="progress-text">25% Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="achievement-item locked">
          <div class="achievement-icon">🥈</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Seviye 2 Tamamlandı</h3>
            <p class="achievement-description">SEO Temelleri seviyesini başarıyla bitirin</p>
            <div class="achievement-meta">
              <span class="achievement-points">350 puan</span>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 30%"></div>
                </div>
                <span class="progress-text">30% Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="achievement-item locked">
          <div class="achievement-icon">💬</div>
          <div class="achievement-details">
            <h3 class="achievement-title">Sosyal Medya Stratejisti</h3>
            <p class="achievement-description">Sosyal medya stratejisi görevini tamamlayın</p>
            <div class="achievement-meta">
              <span class="achievement-points">300 puan</span>
              <div class="achievement-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">0% Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementsView',
  data() {
    return {
      // Achievements data could be added here
    }
  }
}
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
  margin-bottom: 1.5rem;
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
  margin-bottom: 1.5rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stats-card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.stats-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.stats-title .icon {
  margin-right: 0.5rem;
  font-size: 1.25rem;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stats-subtitle {
  color: #6c757d;
  font-size: 0.75rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.achievement-item {
  display: flex;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.25rem;
  gap: 1rem;
  transition: transform 0.2s;
}

.achievement-item:hover {
  transform: translateY(-3px);
}

.achievement-item.earned {
  border-left: 4px solid #28a745;
}

.achievement-item.locked {
  border-left: 4px solid #6c757d;
  opacity: 0.8;
}

.achievement-icon {
  font-size: 2rem;
  background-color: #fff;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.achievement-details {
  flex: 1;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.achievement-description {
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.achievement-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.achievement-points {
  font-weight: 600;
  color: #28a745;
  font-size: 0.875rem;
}

.achievement-date {
  color: #6c757d;
  font-size: 0.75rem;
}

.achievement-progress {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  border-radius: 1rem;
}

.progress-text {
  color: #6c757d;
  font-size: 0.75rem;
}
</style> 