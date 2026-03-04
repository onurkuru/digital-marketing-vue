<template>
  <div class="admin-view">
    <!-- Login Form -->
    <div v-if="!isLoggedIn" class="login-container">
      <div class="card login-card">
        <h1>Admin Paneli</h1>
        <p class="subtitle">İçerik yönetimi ve sistem kontrolü için giriş yapın</p>
        
        <div class="form-group">
          <label for="adminPassword">Yönetici Şifresi:</label>
          <input 
            type="password" 
            id="adminPassword" 
            v-model="adminPassword" 
            placeholder="Şifreyi girin"
            @keyup.enter="login"
            class="form-control"
          >
        </div>
        
        <button 
          class="btn btn-primary login-btn" 
          @click="login"
          :disabled="!adminPassword"
        >
          Giriş Yap
        </button>
        
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="admin-panel">
      <div class="page-header">
        <h1>Admin Paneli</h1>
        <p class="subtitle">İçerik yönetimi ve sistem kontrolü</p>
        <button class="btn btn-danger logout-btn" @click="logout">Çıkış Yap</button>
      </div>
      
      <div class="admin-tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.id" 
          class="tab-item" 
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </div>
      </div>
      
      <!-- Content Management Tab -->
      <div v-if="activeTab === 'content'" class="admin-content card">
        <h2>İçerik Yönetimi</h2>
        
        <div class="filter-bar">
          <select v-model="selectedLevel" class="form-control">
            <option value="">Seviye Seçin</option>
            <option 
              v-for="level in levels" 
              :key="level.id" 
              :value="level.id"
            >
              {{ level.title }}
            </option>
          </select>
          
          <button class="btn btn-primary add-content-btn" @click="showNewContentModal = true">
            Yeni İçerik Ekle
          </button>
        </div>
        
        <div v-if="selectedLevel" class="level-content-editor">
          <h3>{{ getLevelTitle(selectedLevel) }} İçeriği</h3>
          
          <div class="content-type-tabs">
            <div 
              v-for="type in contentTypes" 
              :key="type.id" 
              class="content-type-tab" 
              :class="{ active: selectedContentType === type.id }"
              @click="selectedContentType = type.id"
            >
              {{ type.label }}
            </div>
          </div>
          
          <!-- Tasks List -->
          <div v-if="selectedContentType === 'task'" class="task-list">
            <div 
              v-for="task in getTasksByLevel(selectedLevel)" 
              :key="task.id" 
              class="task-item"
            >
              <div class="task-header">
                <div>
                  <h4>{{ task.title }}</h4>
                  <div class="task-meta">
                    <span class="task-id">ID: {{ task.id }}</span>
                    <span class="task-status" :class="getStatusClass(task.status)">
                      {{ task.status }}
                    </span>
                  </div>
                </div>
                
                <div class="task-actions">
                  <button class="btn btn-sm btn-outline" @click="editTask(task)">
                    Düzenle
                  </button>
                  <button class="btn btn-sm btn-danger ms-2" @click="confirmDeleteTask(task.id)">
                    Sil
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="getTasksByLevel(selectedLevel).length === 0" class="empty-state">
              <p>Bu seviye için henüz görev eklenmemiş</p>
              <button class="btn btn-primary" @click="showNewTaskModal">Görev Ekle</button>
            </div>
          </div>
          
          <!-- Quizzes List -->
          <div v-if="selectedContentType === 'quiz'" class="quiz-list">
            <div 
              v-for="quiz in getQuizzesByLevel(selectedLevel)" 
              :key="quiz.id" 
              class="quiz-item"
            >
              <div class="quiz-header">
                <div>
                  <h4>{{ quiz.title || 'Quiz ' + quiz.id }}</h4>
                  <div class="quiz-meta">
                    <span class="quiz-id">ID: {{ quiz.id }}</span>
                    <span class="quiz-question-count">{{ getQuizQuestionCount(quiz) }} Soru</span>
                  </div>
                </div>
                
                <div class="quiz-actions">
                  <button class="btn btn-sm btn-outline" @click="editQuiz(quiz)">
                    Düzenle
                  </button>
                  <button class="btn btn-sm btn-danger ms-2" @click="confirmDeleteQuiz(quiz.id)">
                    Sil
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="getQuizzesByLevel(selectedLevel).length === 0" class="empty-state">
              <p>Bu seviye için henüz quiz eklenmemiş</p>
              <button class="btn btn-primary" @click="showNewQuizModal">Quiz Ekle</button>
            </div>
          </div>
        </div>
        
        <div v-else class="placeholder-message">
          Lütfen düzenlemek için bir seviye seçin
        </div>
      </div>
      
      <!-- User Management Tab -->
      <div v-if="activeTab === 'users'" class="admin-content card">
        <h2>Kullanıcı Yönetimi</h2>
        
        <div class="user-stats">
          <div class="stat-card">
            <div class="stat-value">{{ activeUsers }}</div>
            <div class="stat-label">Aktif Kullanıcı</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ totalTasks }}</div>
            <div class="stat-label">Tamamlanan Görev</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ averageProgress }}%</div>
            <div class="stat-label">Ortalama İlerleme</div>
          </div>
        </div>
        
        <div class="user-actions">
          <h3>Toplu İşlemler</h3>
          <button class="btn btn-warning" @click="showResetConfirmation = true">
            Tüm Kullanıcı İlerlemesini Sıfırla
          </button>
        </div>
      </div>
      
      <!-- System Tab -->
      <div v-if="activeTab === 'system'" class="admin-content card">
        <h2>Sistem Kontrolleri</h2>
        
        <div class="action-cards">
          <div class="action-card">
            <h3>Sistem Sıfırlama</h3>
            <p>Tüm kullanıcı verilerini ve ilerlemeyi sıfırlar. Bu işlem geri alınamaz.</p>
            <button class="btn btn-danger" @click="showResetConfirmation = true">
              Sistemi Sıfırla
            </button>
          </div>
          
          <div class="action-card">
            <h3>İçerik Dışa Aktarma</h3>
            <p>Tüm içerik verilerini JSON formatında dışa aktarır.</p>
            <button class="btn btn-primary" @click="exportContent">
              İçeriği Dışa Aktar
            </button>
          </div>
          
          <div class="action-card">
            <h3>İçerik İçe Aktarma</h3>
            <p>JSON formatında içerik verilerini içe aktarır.</p>
            <input type="file" ref="importFile" @change="handleFileUpload" style="display: none">
            <button class="btn btn-primary" @click="$refs.importFile.click()">
              İçeriği İçe Aktar
            </button>
          </div>
        </div>
      </div>
      
      <!-- Task Edit Modal -->
      <div v-if="showTaskEditModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Görev Düzenle: {{ editingTask.title }}</h3>
            <button class="close-btn" @click="closeTaskEditModal">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label for="taskTitle">Başlık:</label>
              <input type="text" id="taskTitle" v-model="editingTask.title" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="taskDescription">Açıklama:</label>
              <textarea id="taskDescription" v-model="editingTask.description" rows="4" class="form-control"></textarea>
            </div>
            
            <div class="form-group">
              <label for="taskStatus">Durum:</label>
              <select id="taskStatus" v-model="editingTask.status" class="form-control">
                <option value="Henüz Başlanmadı">Henüz Başlanmadı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="taskDeadline">Teslim Tarihi:</label>
              <input type="date" id="taskDeadline" v-model="editingTask.deadlineDate" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="taskPoints">Puan:</label>
              <input type="number" id="taskPoints" v-model="editingTask.points" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Görev Adımları:</label>
              <div v-for="(task, index) in editingTask.tasks" :key="index" class="task-step-edit">
                <input type="text" v-model="editingTask.tasks[index]" class="form-control">
                <button class="btn btn-sm btn-danger" @click="removeTaskStep(index)">Sil</button>
              </div>
              <button class="btn btn-sm btn-primary" @click="addTaskStep">Adım Ekle</button>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeTaskEditModal">İptal</button>
            <button class="btn btn-primary" @click="saveTaskEdit">Kaydet</button>
          </div>
        </div>
      </div>
      
      <!-- Reset Confirmation Modal -->
      <div v-if="showResetConfirmation" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Onay</h3>
            <button class="close-btn" @click="showResetConfirmation = false">&times;</button>
          </div>
          
          <div class="modal-body">
            <p class="warning-text">
              Bu işlem, tüm kullanıcı ilerlemesini, tamamlanan görevleri, testleri ve kazanılan başarıları sıfırlayacaktır.
              Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
            </p>
            
            <div class="confirmation-box">
              <div class="checkbox-container">
                <input type="checkbox" id="confirmReset" v-model="confirmationChecked">
                <label for="confirmReset">Tüm verilerin sıfırlanacağını anlıyorum</label>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showResetConfirmation = false">İptal</button>
            <button 
              class="btn btn-danger" 
              @click="confirmReset" 
              :disabled="!confirmationChecked"
            >
              Sistemi Sıfırla
            </button>
          </div>
        </div>
      </div>

      <!-- New Content Modal -->
      <div v-if="showNewContentModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Yeni İçerik Ekle</h3>
            <button class="close-btn" @click="closeNewContentModal">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label for="contentType">İçerik Türü:</label>
              <select id="contentType" v-model="newContent.type" class="form-control">
                <option value="task">Görev</option>
                <option value="article">Makale</option>
                <option value="analytics">Analitik & Ölçümleme</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contentLevel">Seviye:</label>
              <select id="contentLevel" v-model="newContent.levelId" class="form-control">
                <option 
                  v-for="level in levels" 
                  :key="level.id" 
                  :value="level.id"
                >
                  {{ level.title }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contentTitle">Başlık:</label>
              <input type="text" id="contentTitle" v-model="newContent.title" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="contentDescription">Açıklama:</label>
              <textarea id="contentDescription" v-model="newContent.description" rows="4" class="form-control"></textarea>
            </div>

            <!-- Task specific fields -->
            <div v-if="newContent.type === 'task'">
              <div class="form-group">
                <label for="contentDeadline">Teslim Tarihi:</label>
                <input type="date" id="contentDeadline" v-model="newContent.deadline" class="form-control">
              </div>
              
              <div class="form-group">
                <label for="contentPoints">Puan:</label>
                <input type="number" id="contentPoints" v-model="newContent.points" class="form-control">
              </div>
              
              <div class="form-group">
                <label>Görev Adımları:</label>
                <div v-for="(item, index) in newContent.items" :key="index" class="task-step-edit">
                  <input type="text" v-model="newContent.items[index]" class="form-control" placeholder="İçerik adımı veya bölümü">
                  <button class="btn btn-sm btn-danger" @click="removeContentItem(index)">Sil</button>
                </div>
                <button class="btn btn-sm btn-primary" @click="addContentItem">Adım Ekle</button>
              </div>
            </div>
            
            <!-- Quiz specific fields -->
            <div v-if="newContent.type === 'quiz'">
              <div class="form-group">
                <label for="contentTimeLimit">Süre Limiti (dakika):</label>
                <input type="number" id="contentTimeLimit" v-model="newContent.timeLimit" class="form-control">
              </div>
              
              <div class="form-group">
                <label for="contentPassingScore">Geçme Notu (%):</label>
                <input type="number" id="contentPassingScore" v-model="newContent.passingScore" class="form-control" min="0" max="100">
              </div>
              
              <div class="form-group">
                <label>Quiz Soruları:</label>
                <div v-for="(question, qIndex) in newContent.questions" :key="qIndex" class="quiz-question-edit">
                  <div class="question-header">
                    <h4>Soru {{ qIndex + 1 }}</h4>
                    <button class="btn btn-sm btn-danger" @click="removeQuestion(qIndex)">Soruyu Sil</button>
                  </div>
                  
                  <div class="form-group">
                    <label :for="'question-text-' + qIndex">Soru Metni:</label>
                    <textarea :id="'question-text-' + qIndex" v-model="question.text" rows="2" class="form-control"></textarea>
                  </div>
                  
                  <div class="form-group">
                    <label>Seçenekler:</label>
                    <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-edit">
                      <div class="option-input">
                        <input 
                          type="radio" 
                          :id="'option-' + qIndex + '-' + oIndex" 
                          :name="'correct-' + qIndex" 
                          :checked="question.correctAnswer === oIndex"
                          @change="question.correctAnswer = oIndex"
                        >
                        <input type="text" v-model="question.options[oIndex]" class="form-control" :placeholder="'Seçenek ' + (oIndex + 1)">
                      </div>
                      <button v-if="question.options.length > 2" class="btn btn-sm btn-danger" @click="removeOption(qIndex, oIndex)">Sil</button>
                    </div>
                    <button v-if="question.options.length < 6" class="btn btn-sm btn-outline-primary" @click="addOption(qIndex)">Seçenek Ekle</button>
                  </div>
                </div>
                <button class="btn btn-sm btn-primary mt-3" @click="addQuestion">Soru Ekle</button>
              </div>
            </div>
            
            <!-- Analytics specific fields -->
            <div v-if="newContent.type === 'analytics'" class="form-group">
              <label for="contentCategory">Kategori:</label>
              <select id="contentCategory" v-model="newContent.category" class="form-control">
                <option value="traffic">Trafik Analizi</option>
                <option value="conversion">Dönüşüm Optimizasyonu</option>
                <option value="seo">SEO Analizi</option>
                <option value="social">Sosyal Medya Ölçümleri</option>
                <option value="email">E-posta Pazarlama Metrikleri</option>
              </select>
            </div>
            
            <!-- Article and Analytics content sections -->
            <div v-if="newContent.type === 'article' || newContent.type === 'analytics'" class="form-group">
              <label>İçerik Bölümleri:</label>
              <div v-for="(item, index) in newContent.items" :key="index" class="task-step-edit">
                <input type="text" v-model="newContent.items[index]" class="form-control" placeholder="İçerik bölümü">
                <button class="btn btn-sm btn-danger" @click="removeContentItem(index)">Sil</button>
              </div>
              <button class="btn btn-sm btn-primary" @click="addContentItem">Bölüm Ekle</button>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeNewContentModal">İptal</button>
            <button class="btn btn-primary" @click="saveNewContent" :disabled="!isNewContentValid">Kaydet</button>
          </div>
        </div>
      </div>
      
      <!-- Quiz Edit Modal -->
      <div v-if="showQuizEditModal" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Quiz Düzenle: {{ editingQuiz.title }}</h3>
            <button class="close-btn" @click="closeQuizEditModal">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label for="quizTitle">Başlık:</label>
              <input type="text" id="quizTitle" v-model="editingQuiz.title" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="quizDescription">Açıklama:</label>
              <textarea id="quizDescription" v-model="editingQuiz.description" rows="4" class="form-control"></textarea>
            </div>
            
            <div class="form-group">
              <label for="quizTimeLimit">Süre Limiti (dakika):</label>
              <input type="number" id="quizTimeLimit" v-model="editingQuiz.timeLimit" class="form-control">
            </div>
            
            <div class="form-group">
              <label for="quizPassingScore">Geçme Notu (%):</label>
              <input type="number" id="quizPassingScore" v-model="editingQuiz.passingScore" class="form-control" min="0" max="100">
            </div>
            
            <div class="form-group">
              <label>Quiz Soruları:</label>
              <div v-for="(question, qIndex) in editingQuiz.questions" :key="qIndex" class="quiz-question-edit">
                <div class="question-header">
                  <h4>Soru {{ qIndex + 1 }}</h4>
                  <button class="btn btn-sm btn-danger" @click="removeQuizQuestion(qIndex)">Soruyu Sil</button>
                </div>
                
                <div class="form-group">
                  <label :for="'edit-question-text-' + qIndex">Soru Metni:</label>
                  <textarea :id="'edit-question-text-' + qIndex" v-model="question.text" rows="2" class="form-control"></textarea>
                </div>
                
                <div class="form-group">
                  <label>Seçenekler:</label>
                  <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-edit">
                    <div class="option-input">
                      <input 
                        type="radio" 
                        :id="'edit-option-' + qIndex + '-' + oIndex" 
                        :name="'edit-correct-' + qIndex" 
                        :checked="question.correctAnswer === oIndex"
                        @change="question.correctAnswer = oIndex"
                      >
                      <input type="text" v-model="option.text" class="form-control" :placeholder="'Seçenek ' + (oIndex + 1)">
                    </div>
                    <button v-if="option.text" class="btn btn-sm btn-danger" @click="removeQuizOption(qIndex, oIndex)">Sil</button>
                  </div>
                  <button v-if="option.text" class="btn btn-sm btn-outline-primary" @click="addQuizOption(qIndex)">Seçenek Ekle</button>
                </div>
              </div>
              <button class="btn btn-sm btn-primary mt-3" @click="addQuizQuestion">Soru Ekle</button>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeQuizEditModal">İptal</button>
            <button class="btn btn-primary" @click="saveQuizEdit" :disabled="!isQuizValid">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetUserProgress } from '../utils/firebaseService';
import { levels } from '../utils/marketingData/levels';
import tasksLevel1 from '../utils/marketingData/tasks-level1';
import tasksLevel2 from '../utils/marketingData/tasks-level2';
import tasksLevel3 from '../utils/marketingData/tasks-level3';
import tasksLevel4 from '../utils/marketingData/tasks-level4';
import tasksLevel5 from '../utils/marketingData/tasks-level5';

export default {
  name: 'AdminView',
  data() {
    return {
      // Authentication
      isLoggedIn: false,
      adminPassword: '',
      loginError: null,
      
      // Tab Management
      activeTab: 'content',
      tabs: [
        { id: 'content', label: 'İçerik Yönetimi' },
        { id: 'users', label: 'Kullanıcı Yönetimi' },
        { id: 'system', label: 'Sistem' }
      ],
      
      // Content Management
      selectedLevel: '',
      selectedContentType: 'task',
      contentTypes: [
        { id: 'task', label: 'Görevler' },
        { id: 'quiz', label: 'Quizler' }
      ],
      levels: levels,
      
      // Task Editing
      showTaskEditModal: false,
      editingTask: null,
      
      // New Content
      showNewContentModal: false,
      newContent: {
        type: 'task',
        levelId: '',
        title: '',
        description: '',
        deadline: '',
        points: 100,
        category: 'traffic',
        items: [''],
        timeLimit: 30,
        passingScore: 70,
        questions: [
          {
            text: '',
            options: ['', ''],
            correctAnswer: 0
          }
        ]
      },
      
      // System Reset
      showResetConfirmation: false,
      confirmationChecked: false,
      
      // User Stats (mocked data)
      activeUsers: 12,
      totalTasks: 47,
      averageProgress: 38,
      
      // Quiz Editing
      showQuizEditModal: false,
      editingQuiz: null
    }
  },
  methods: {
    login() {
      if (this.adminPassword === 'admin123') {
        this.isLoggedIn = true;
        this.loginError = null;
        localStorage.setItem('adminLoggedIn', 'true');
      } else {
        this.loginError = 'Geçersiz şifre!';
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.adminPassword = '';
      localStorage.removeItem('adminLoggedIn');
    },
    getLevelTitle(levelId) {
      const level = this.levels.find(l => l.id === levelId);
      return level ? level.title : 'Bilinmeyen Seviye';
    },
    getTasksByLevel(levelId) {
      switch(levelId) {
        case '1': return tasksLevel1;
        case '2': return tasksLevel2;
        case '3': return tasksLevel3;
        case '4': return tasksLevel4;
        case '5': return tasksLevel5;
        default: return [];
      }
    },
    getQuizzesByLevel(levelId) {
      // Mock function - in a real app, this would fetch quizzes from a database
      const mockQuizzes = [
        {
          id: `q${levelId}01`,
          levelId: levelId,
          title: `${this.getLevelTitle(levelId)} Quiz 1`,
          description: 'Bu quiz seviyedeki temel kavramları test eder',
          questions: [
            {
              question: 'Örnek soru 1?',
              options: ['Cevap A', 'Cevap B', 'Cevap C', 'Cevap D'],
              correctAnswer: 0
            },
            {
              question: 'Örnek soru 2?',
              options: ['Cevap A', 'Cevap B', 'Cevap C', 'Cevap D'],
              correctAnswer: 1
            }
          ]
        }
      ];
      
      // Find the quiz matching levelId
      return mockQuizzes.filter(quiz => quiz.levelId === levelId);
    },
    getQuizQuestionCount(quiz) {
      return quiz.questions ? quiz.questions.length : 0;
    },
    getStatusClass(status) {
      switch (status) {
        case 'Tamamlandı': return 'status-completed';
        case 'Devam Ediyor': return 'status-in-progress';
        default: return 'status-not-started';
      }
    },
    editTask(task) {
      // Create a deep copy of the task
      const taskCopy = JSON.parse(JSON.stringify(task));
      
      // Convert task steps if they are complex objects
      if (taskCopy.tasks && Array.isArray(taskCopy.tasks)) {
        taskCopy.tasks = taskCopy.tasks.map(step => {
          if (typeof step === 'object' && step !== null) {
            // If it's an object with title/description, convert to string
            if (step.title) {
              return step.title + (step.description ? ': ' + step.description : '');
            } else if (step.description) {
              return step.description;
            } else {
              return JSON.stringify(step);
            }
          }
          return step;
        });
      }
      
      this.editingTask = {
        ...taskCopy,
        deadlineDate: task.deadline ? this.formatDateForInput(task.deadline) : ''
      };
      this.showTaskEditModal = true;
    },
    closeTaskEditModal() {
      this.showTaskEditModal = false;
      this.editingTask = null;
    },
    addTaskStep() {
      if (!this.editingTask.tasks) {
        this.editingTask.tasks = [];
      }
      this.editingTask.tasks.push('');
    },
    removeTaskStep(index) {
      this.editingTask.tasks.splice(index, 1);
    },
    saveTaskEdit() {
      // Format the deadline back to string format
      if (this.editingTask.deadlineDate) {
        this.editingTask.deadline = this.formatDateFromInput(this.editingTask.deadlineDate);
      }
      
      // Here you would typically save to database
      // For demo, we'll just show an alert
      alert('Görev kaydedildi! (Gerçek bir veritabanı kaydı yapılmamaktadır)');
      
      this.closeTaskEditModal();
    },
    formatDateForInput(dateString) {
      // Convert DD.MM.YYYY to YYYY-MM-DD for input[type=date]
      const parts = dateString.split('.');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return '';
    },
    formatDateFromInput(dateString) {
      // Convert YYYY-MM-DD to DD.MM.YYYY
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.');
    },
    async confirmReset() {
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
        localStorage.removeItem('digital_marketing_learning_progress_v1');
        
        alert('Sistem başarıyla sıfırlandı!');
        this.showResetConfirmation = false;
        this.confirmationChecked = false;
      } catch (error) {
        console.error('Reset error:', error);
        alert('Sistem sıfırlama sırasında bir hata oluştu: ' + error.message);
      }
    },
    exportContent() {
      const content = {
        levels,
        tasks: {
          level1: tasksLevel1,
          level2: tasksLevel2,
          level3: tasksLevel3,
          level4: tasksLevel4,
          level5: tasksLevel5
        }
      };
      
      const dataStr = JSON.stringify(content, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'digital-marketing-content.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          alert('İçerik başarıyla yüklendi! (Gerçek bir veritabanı kaydı yapılmamaktadır)');
          console.log('Imported content:', content);
        } catch (error) {
          alert('İçerik yüklenirken bir hata oluştu: ' + error.message);
        }
      };
      reader.readAsText(file);
    },
    // New Content Methods
    closeNewContentModal() {
      this.showNewContentModal = false;
      this.resetNewContentForm();
    },
    resetNewContentForm() {
      this.newContent = {
        type: 'task',
        levelId: this.selectedLevel || '',
        title: '',
        description: '',
        deadline: '',
        points: 100,
        category: 'traffic',
        items: [''],
        timeLimit: 30,
        passingScore: 70,
        questions: [
          {
            text: '',
            options: ['', ''],
            correctAnswer: 0
          }
        ]
      };
    },
    addContentItem() {
      this.newContent.items.push('');
    },
    removeContentItem(index) {
      this.newContent.items.splice(index, 1);
      if (this.newContent.items.length === 0) {
        this.newContent.items.push('');
      }
    },
    saveNewContent() {
      // Generate an ID based on the level and content type
      const levelPrefix = this.newContent.levelId || '0';
      const typePrefix = this.newContent.type === 'task' ? 'T' : 
                          this.newContent.type === 'article' ? 'A' : 'M';
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newId = `${levelPrefix}${typePrefix}${randomId}`;
      
      // Create a new content object
      const contentToSave = {
        id: newId,
        levelId: this.newContent.levelId,
        title: this.newContent.title,
        description: this.newContent.description,
        status: 'Henüz Başlanmadı'
      };
      
      // Add type-specific properties
      if (this.newContent.type === 'task') {
        contentToSave.deadline = this.formatDateFromInput(this.newContent.deadline);
        contentToSave.points = parseInt(this.newContent.points);
        contentToSave.tasks = [...this.newContent.items];
      } else if (this.newContent.type === 'analytics') {
        contentToSave.category = this.newContent.category;
        contentToSave.sections = [...this.newContent.items];
      } else {
        contentToSave.sections = [...this.newContent.items];
      }
      
      // In a real app, save to database
      console.log('New content to save:', contentToSave);
      alert('Yeni içerik eklendi! (Gerçek bir veritabanı kaydı yapılmamaktadır)');
      
      this.closeNewContentModal();
    },
    showNewTaskModal() {
      this.newContent.type = 'task';
      this.newContent.levelId = this.selectedLevel;
      this.showNewContentModal = true;
    },
    showNewQuizModal() {
      this.newContent.type = 'quiz';
      this.newContent.levelId = this.selectedLevel;
      this.showNewContentModal = true;
    },
    editQuiz(quiz) {
      // Create a deep copy of the quiz
      const quizCopy = JSON.parse(JSON.stringify(quiz));
      
      this.editingQuiz = quizCopy;
      this.showQuizEditModal = true;
    },
    confirmDeleteTask(taskId) {
      if (confirm(`Görev #${taskId} silinecek. Emin misiniz?`)) {
        // In a real app, you would delete the task from the database
        alert(`Görev #${taskId} silindi! (Gerçek bir silme işlemi yapılmamaktadır)`);
      }
    },
    confirmDeleteQuiz(quizId) {
      if (confirm(`Quiz #${quizId} silinecek. Emin misiniz?`)) {
        // In a real app, you would delete the quiz from the database
        alert(`Quiz #${quizId} silindi! (Gerçek bir silme işlemi yapılmamaktadır)`);
      }
    },
    // Quiz Management Methods
    closeQuizEditModal() {
      this.showQuizEditModal = false;
      this.editingQuiz = null;
    },
    addQuizQuestion() {
      if (!this.editingQuiz.questions) {
        this.editingQuiz.questions = [];
      }
      this.editingQuiz.questions.push({
        text: '',
        options: ['', ''],
        correctAnswer: 0
      });
    },
    removeQuizQuestion(index) {
      this.editingQuiz.questions.splice(index, 1);
      if (this.editingQuiz.questions.length === 0) {
        this.addQuizQuestion();
      }
    },
    addQuizOption(questionIndex) {
      this.editingQuiz.questions[questionIndex].options.push('');
    },
    removeQuizOption(questionIndex, optionIndex) {
      const question = this.editingQuiz.questions[questionIndex];
      question.options.splice(optionIndex, 1);
      
      // If the correct answer was the removed option or after it, adjust it
      if (question.correctAnswer === optionIndex) {
        question.correctAnswer = 0;
      } else if (question.correctAnswer > optionIndex) {
        question.correctAnswer--;
      }
    },
    saveQuizEdit() {
      // In a real app, you would save to database
      console.log('Quiz to save:', this.editingQuiz);
      alert('Quiz kaydedildi! (Gerçek bir veritabanı kaydı yapılmamaktadır)');
      this.closeQuizEditModal();
    },
    // New Content Question Methods
    addQuestion() {
      this.newContent.questions.push({
        text: '',
        options: ['', ''],
        correctAnswer: 0
      });
    },
    removeQuestion(index) {
      this.newContent.questions.splice(index, 1);
      if (this.newContent.questions.length === 0) {
        this.addQuestion();
      }
    },
    addOption(questionIndex) {
      this.newContent.questions[questionIndex].options.push('');
    },
    removeOption(questionIndex, optionIndex) {
      const question = this.newContent.questions[questionIndex];
      question.options.splice(optionIndex, 1);
      
      // If the correct answer was the removed option or after it, adjust it
      if (question.correctAnswer === optionIndex) {
        question.correctAnswer = 0;
      } else if (question.correctAnswer > optionIndex) {
        question.correctAnswer--;
      }
    },
  },
  computed: {
    isNewContentValid() {
      if (!this.newContent.title || !this.newContent.description || !this.newContent.levelId) {
        return false;
      }
      
      if (this.newContent.type === 'quiz') {
        // Quiz validation
        return this.newContent.questions.every(q => 
          q.text.trim() !== '' && 
          q.options.filter(o => o.trim() !== '').length >= 2
        );
      } else if (this.newContent.type === 'task' || this.newContent.type === 'article' || this.newContent.type === 'analytics') {
        // Other content validation
        return this.newContent.items.some(item => item.trim() !== '');
      }
      
      return true;
    },
    isQuizValid() {
      if (!this.editingQuiz) return false;
      
      return this.editingQuiz.title && 
             this.editingQuiz.description && 
             this.editingQuiz.questions && 
             this.editingQuiz.questions.length > 0 &&
             this.editingQuiz.questions.every(q => 
               (q.question || q.text) && 
               q.options && 
               q.options.length >= 2 && 
               q.options.filter(o => o.trim() !== '').length >= 2
             );
    }
  },
  mounted() {
    // Check if admin is already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      this.isLoggedIn = true;
    }
  }
}
</script>

<style scoped>
.admin-view {
  margin-bottom: 2rem;
}

/* Login Styles */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;
}

.login-btn {
  width: 100%;
  margin-top: 1rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}

/* Admin Panel Styles */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logout-btn {
  margin-left: auto;
}

.admin-tabs {
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.tab-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 0.25rem 0.25rem 0 0;
  margin-right: 0.25rem;
  background-color: #f8f9fa;
}

.tab-item:hover {
  background-color: #e9ecef;
}

.tab-item.active {
  background-color: white;
  border-color: #dee2e6;
  border-bottom-color: white;
  margin-bottom: -1px;
  font-weight: 500;
}

.admin-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  min-height: 400px;
}

/* Content Management Styles */
.filter-bar {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-content-editor {
  margin-top: 1rem;
}

.content-type-tabs {
  display: flex;
  margin: 1rem 0;
  border-bottom: 1px solid #dee2e6;
}

.content-type-tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 0.25rem 0.25rem 0 0;
  margin-right: 0.25rem;
  background-color: #f8f9fa;
}

.content-type-tab:hover {
  background-color: #e9ecef;
}

.content-type-tab.active {
  background-color: white;
  border-color: #dee2e6;
  border-bottom-color: white;
  margin-bottom: -1px;
  font-weight: 500;
}

.task-list {
  margin-top: 1rem;
}

.task-item {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.task-id {
  color: #6c757d;
}

.task-status {
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-weight: 500;
}

.status-completed {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status-in-progress {
  background-color: #fff3cd;
  color: #664d03;
}

.status-not-started {
  background-color: #f8f9fa;
  color: #6c757d;
}

.placeholder-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6c757d;
  font-style: italic;
}

/* User Management Styles */
.user-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
  flex-grow: 1;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: #0d6efd;
}

.stat-label {
  color: #6c757d;
  margin-top: 0.5rem;
}

.user-actions {
  margin-top: 2rem;
}

/* System Tab Styles */
.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

/* Form Styles */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.task-step-edit {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.warning-text {
  color: #dc3545;
  font-weight: 500;
}

.confirmation-box {
  margin-top: 1.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .user-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
}

.subtitle {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.card {
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-warning {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-outline {
  color: #0d6efd;
  background-color: transparent;
  border-color: #0d6efd;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.add-content-btn {
  margin-left: 1rem;
}

.task-actions, .quiz-actions {
  display: flex;
}

.ms-2 {
  margin-left: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.quiz-item {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.quiz-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.quiz-id {
  color: #6c757d;
}

.quiz-question-count {
  background-color: #e9ecef;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
}

.quiz-question-edit {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.question-header h4 {
  margin: 0;
}

.option-edit {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.option-input {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 0.5rem;
}

.option-input input[type="radio"] {
  margin-right: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style> 
