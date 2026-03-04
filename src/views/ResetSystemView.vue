<template>
  <div class="reset-system-view">
    <div class="page-header">
      <h1>Sistem Sıfırlama</h1>
      <p class="subtitle">Bu sayfadan sistemi sıfırlayabilirsiniz. Bu işlem geri alınamaz.</p>
    </div>
    
    <div class="card">
      <div v-if="!resetConfirmed">
        <h2 class="section-title">Uyarı</h2>
        <p class="warning-text">
          Bu işlem, tüm kullanıcı ilerlemesini, tamamlanan görevleri, testleri ve kazanılan başarıları sıfırlayacaktır.
          Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
        </p>
        
        <div class="confirmation-box">
          <div class="checkbox-container">
            <input type="checkbox" id="confirmReset" v-model="confirmationChecked">
            <label for="confirmReset">Tüm verilerin sıfırlanacağını anlıyorum</label>
          </div>
          
          <div class="password-container">
            <label for="adminPassword">Yönetici Şifresi:</label>
            <input type="password" id="adminPassword" v-model="adminPassword" placeholder="Şifreyi girin">
          </div>
          
          <div class="button-container">
            <button 
              class="btn btn-danger" 
              @click="confirmReset" 
              :disabled="!confirmationChecked || !adminPassword"
            >
              Sistemi Sıfırla
            </button>
            <button class="btn btn-secondary" @click="goBack">İptal</button>
          </div>
        </div>
      </div>
      
      <div v-else class="reset-success">
        <div class="success-icon">✓</div>
        <h2>Sistem Başarıyla Sıfırlandı</h2>
        <p>Tüm kullanıcı verileri ve ilerleme sıfırlandı. Sistem şu anda başlangıç durumunda.</p>
        <button class="btn btn-primary" @click="goToHomePage">Ana Sayfaya Dön</button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetUserProgress } from '../utils/firebaseService';

export default {
  name: 'ResetSystemView',
  data() {
    return {
      confirmationChecked: false,
      adminPassword: '',
      resetConfirmed: false,
      resetError: null
    }
  },
  methods: {
    async confirmReset() {
      // Check admin password (in production, this should be validated securely)
      if (this.adminPassword !== 'admin123') {
        alert('Geçersiz şifre!');
        return;
      }
      
      try {
        // Get current user ID from browser storage or wherever it's stored
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          alert('Kullanıcı oturumu bulunamadı!');
          return;
        }
        
        // Reset user progress in Firebase
        await resetUserProgress(userId);
        
        // Clear any local storage data related to progress
        localStorage.removeItem('userProgress');
        localStorage.removeItem('completedTasks');
        localStorage.removeItem('completedQuizzes');
        localStorage.removeItem('achievements');
        
        // Show success state
        this.resetConfirmed = true;
      } catch (error) {
        console.error('Reset error:', error);
        this.resetError = 'Sistem sıfırlama sırasında bir hata oluştu: ' + error.message;
        alert(this.resetError);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goToHomePage() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.reset-system-view {
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
  margin-bottom: 1rem;
}

.warning-text {
  color: #721c24;
  background-color: #f8d7da;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.confirmation-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.password-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input[type="password"] {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.button-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  border: none;
  transition: all 0.2s;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-danger:disabled {
  background-color: #e99ca3;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.reset-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  font-size: 3rem;
  color: #28a745;
  background-color: #d4edda;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}
</style> 