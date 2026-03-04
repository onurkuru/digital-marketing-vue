<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="icon">📚</span>
          <span>InvestAZ Digital Pazarlama</span>
        </div>
      </div>
      
      <nav class="sidebar-nav primary-nav">
        <router-link to="/" class="nav-item">
          <span class="icon">🏠</span>
          <span>Ana Sayfa</span>
        </router-link>
        
        <router-link to="/roadmap" class="nav-item">
          <span class="icon">🗺️</span>
          <span>Yol Haritası</span>
        </router-link>
        
        <router-link to="/tasks" class="nav-item">
          <span class="icon">📋</span>
          <span>Görevler</span>
        </router-link>
        
        <router-link to="/resources" class="nav-item">
          <span class="icon">📤</span>
          <span>Gönderilenler</span>
        </router-link>
        
        <router-link to="/stats" class="nav-item">
          <span class="icon">📊</span>
          <span>İstatistikler</span>
        </router-link>
      </nav>
      
      <div class="sidebar-section">
        <h3>Seviyeler</h3>
        <nav class="sidebar-nav levels-nav">
          <router-link 
            v-for="level in visibleLevels" 
            :key="level.id" 
            :to="`/level/${level.id}`" 
            class="nav-item level-item"
          >
            <span class="icon level-icon">{{ getLevelIcon(level.order) }}</span>
            <span class="level-title">{{ level.title }}</span>
          </router-link>
        </nav>
      </div>
      
      <div class="sidebar-section">
        <h3>Kaynaklar</h3>
        <nav class="sidebar-nav resources-nav">
          <router-link to="/documents" class="nav-item">
            <span class="icon">📄</span>
            <span>Dökümanlar</span>
          </router-link>
          
          <router-link to="/calendar" class="nav-item">
            <span class="icon">📅</span>
            <span>Takvim</span>
          </router-link>
          
          <router-link to="/achievements" class="nav-item">
            <span class="icon">🏆</span>
            <span>Başarılar</span>
          </router-link>
        </nav>
      </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p>Yükleniyor...</p>
      </div>
      <div v-else class="content-shell">
        <router-view />
        <footer class="app-footer">© ONUR KURU</footer>
      </div>
    </main>
  </div>
</template>

<script>
import { initUserSession } from './utils/firebaseService';
import { levels } from './utils/marketingData/levels';
import { loadProgress, subscribeProgress } from './utils/progressStore';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      userId: null,
      userProgress: loadProgress(),
      levels: levels,
      visibleLevels: [],
      unsubscribeProgress: null
    };
  },
  async created() {
    this.userProgress = loadProgress();
    this.filterVisibleLevels();

    try {
      this.userId = await initUserSession();
      
      if (this.userId) {
        localStorage.setItem('userId', this.userId);
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      this.loading = false;
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.userProgress = progress;
      this.filterVisibleLevels();
    });
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
  },
  methods: {
    filterVisibleLevels() {
      this.visibleLevels = this.levels;
    },
    getLevelIcon(order) {
      const icons = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
      return icons[order - 1] || `${order}`;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

html,
body,
#app {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e9ecef;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
}

.sidebar-header {
  padding: 0 1rem 1rem;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.sidebar-section {
  padding: 0 1rem;
  margin-top: 1.5rem;
}

.sidebar-section h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #6c757d;
  margin-bottom: 0.75rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.2s;
  min-width: 0;
}

.nav-item:hover {
  background-color: #f1f3f5;
}

.nav-item.router-link-exact-active {
  background-color: #e9ecef;
  font-weight: 500;
}

.icon {
  font-size: 1.1rem;
  min-width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  padding: 1.5rem;
  max-width: calc(100% - 250px);
  position: relative;
  min-height: 100vh;
  min-width: 0;
}

.content-shell {
  min-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
}

.content-shell > *:first-child {
  flex: 1;
}

.app-footer {
  margin-top: 1.5rem;
  padding: 1rem 0;
  text-align: center;
  color: #6c757d;
  border-top: 1px solid #e9ecef;
  font-weight: 500;
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Card styles */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Common styles for views */
.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: #212529;
  color: white;
}

.btn-primary:hover {
  background-color: #343a40;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-outline {
  border: 1px solid #ced4da;
  color: #555;
  padding: 0.375rem 0.75rem;
  font-size: 0.9rem;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.level-item {
  margin-bottom: 2px;
  padding: 0.6rem 0.8rem;
}

.level-icon {
  background-color: #f1f3f5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.level-title {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
    padding: 0.75rem 0;
  }

  .sidebar-header {
    padding: 0 0.9rem 0.75rem;
    margin-bottom: 0.75rem;
  }

  .sidebar-section {
    padding: 0 0.9rem;
    margin-top: 0.9rem;
  }

  .primary-nav,
  .resources-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem;
    padding: 0 0.9rem;
  }

  .levels-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem;
  }

  .nav-item {
    padding: 0.55rem 0.65rem;
    min-width: 0;
    align-items: flex-start;
  }

  .main-content {
    max-width: 100%;
    padding: 1rem;
    min-height: auto;
  }

  .content-shell {
    min-height: auto;
  }

  .level-title {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    line-height: 1.25;
  }
}

@media (max-width: 640px) {
  .primary-nav,
  .resources-nav,
  .levels-nav {
    grid-template-columns: 1fr;
  }

  .sidebar-logo {
    font-size: 1rem;
  }

  .sidebar {
    padding-bottom: 0.5rem;
  }
}
</style> 
