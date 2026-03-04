<template>
  <div class="quiz-view">
    <div class="page-header">
      <div class="breadcrumbs">
        <router-link to="/">Ana Sayfa</router-link>
        <span class="separator">/</span>
        <router-link :to="`/level/${levelId}`">{{ quiz.levelTitle }}</router-link>
        <span class="separator">/</span>
        <span>Quiz</span>
      </div>

      <h1>{{ quiz.title }}</h1>
      <p class="subtitle">{{ quiz.description }}</p>
    </div>

    <div class="quiz-container" v-if="!quizCompleted">
      <div class="quiz-progress">
        <div class="quiz-progress-text">Soru {{ currentQuestionIndex + 1 }}/{{ quiz.questions.length }}</div>
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: `${quizProgress}%` }"></div>
        </div>
      </div>

      <div class="quiz-card">
        <div class="question-number">Soru {{ currentQuestionIndex + 1 }}</div>
        <div class="question-text">{{ currentQuestion.question }}</div>

        <div class="options-container">
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="['option', {
              selected: selectedOption === index,
              correct: isResultShown && index === currentQuestion.correctOption,
              incorrect: isResultShown && selectedOption === index && index !== currentQuestion.correctOption
            }]"
            @click="selectOption(index)"
          >
            <div class="option-indicator">{{ String.fromCharCode(65 + index) }}</div>
            <div class="option-text">{{ option }}</div>
          </div>
        </div>

        <div v-if="isResultShown" class="result-feedback">
          <div v-if="isCorrect" class="feedback correct">
            <div class="icon">✓</div>
            <div class="text">Doğru cevap!</div>
          </div>
          <div v-else class="feedback incorrect">
            <div class="icon">✗</div>
            <div class="text">Yanlış cevap. Doğru cevap: {{ String.fromCharCode(65 + currentQuestion.correctOption) }}</div>
          </div>

          <div class="explanation" v-if="currentQuestion.explanation">
            <div class="explanation-title">Açıklama:</div>
            <div class="explanation-text">{{ currentQuestion.explanation }}</div>
          </div>
        </div>

        <div class="quiz-actions">
          <button v-if="!isResultShown" :disabled="selectedOption === null" @click="checkAnswer" class="btn btn-primary">
            Cevabı Kontrol Et
          </button>
          <button v-else-if="currentQuestionIndex < quiz.questions.length - 1" @click="nextQuestion" class="btn btn-primary">
            Sonraki Soru
          </button>
          <button v-else @click="finishQuiz" class="btn btn-primary">
            Quizi Tamamla
          </button>
        </div>
      </div>
    </div>

    <div class="quiz-results card" v-else>
      <div class="results-header">
        <div class="results-icon" v-if="score >= 70">🏆</div>
        <div class="results-icon" v-else>📝</div>
        <h2>Quiz Tamamlandı!</h2>
      </div>

      <div class="results-score">
        <div class="score-circle" :class="scoreClass">{{ score }}%</div>
        <div class="score-label">{{ scoreLabel }}</div>
      </div>

      <div class="results-stats">
        <div class="stat">
          <div class="stat-value">{{ correctAnswers }}/{{ quiz.questions.length }}</div>
          <div class="stat-label">Doğru Cevaplar</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ quiz.questions.length - correctAnswers }}/{{ quiz.questions.length }}</div>
          <div class="stat-label">Yanlış Cevaplar</div>
        </div>
      </div>

      <div class="results-actions">
        <router-link :to="`/level/${levelId}`" class="btn btn-outline">Seviyeye Dön</router-link>
        <button @click="restartQuiz" class="btn btn-secondary">Quizi Tekrarla</button>
      </div>
    </div>
  </div>
</template>

<script>
import { levelQuizzes } from '@/utils/marketingData/learning-content';

export default {
  name: 'QuizView',
  props: {
    levelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quizzes: levelQuizzes,
      currentQuestionIndex: 0,
      selectedOption: null,
      isResultShown: false,
      quizCompleted: false,
      userAnswers: [],
      correctAnswers: 0
    };
  },
  computed: {
    quiz() {
      return this.quizzes.find((item) => item.levelId === this.levelId) || this.quizzes[0];
    },
    currentQuestion() {
      return this.quiz.questions[this.currentQuestionIndex];
    },
    quizProgress() {
      return ((this.currentQuestionIndex + 1) / this.quiz.questions.length) * 100;
    },
    isCorrect() {
      return this.selectedOption === this.currentQuestion.correctOption;
    },
    score() {
      return Math.round((this.correctAnswers / this.quiz.questions.length) * 100);
    },
    scoreClass() {
      if (this.score >= 80) return 'excellent';
      if (this.score >= 60) return 'good';
      return 'needs-improvement';
    },
    scoreLabel() {
      if (this.score >= 80) return 'Mükemmel!';
      if (this.score >= 60) return 'İyi';
      return 'Geliştirilmesi Gerekiyor';
    }
  },
  watch: {
    levelId() {
      this.restartQuiz();
    }
  },
  methods: {
    selectOption(index) {
      if (!this.isResultShown) {
        this.selectedOption = index;
      }
    },
    checkAnswer() {
      this.isResultShown = true;
      if (this.isCorrect) {
        this.correctAnswers += 1;
      }
      this.userAnswers.push({
        questionIndex: this.currentQuestionIndex,
        selectedOption: this.selectedOption,
        isCorrect: this.isCorrect
      });
    },
    nextQuestion() {
      this.currentQuestionIndex += 1;
      this.selectedOption = null;
      this.isResultShown = false;
    },
    finishQuiz() {
      this.quizCompleted = true;
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.selectedOption = null;
      this.isResultShown = false;
      this.quizCompleted = false;
      this.userAnswers = [];
      this.correctAnswers = 0;
    }
  }
};
</script>

<style scoped>
.quiz-view {
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
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
}

.quiz-container {
  max-width: 860px;
}

.quiz-progress {
  margin-bottom: 1rem;
}

.quiz-progress-text {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.4rem;
}

.progress-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: #0d6efd;
}

.quiz-card,
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  padding: 1.5rem;
}

.question-number {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.option {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option:hover {
  background: #f8f9fa;
}

.option.selected {
  border-color: #0d6efd;
  background: #e7f1ff;
}

.option.correct {
  border-color: #198754;
  background: #e8f6ed;
}

.option.incorrect {
  border-color: #dc3545;
  background: #fdecef;
}

.option-indicator {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f1f3f5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.result-feedback {
  margin-top: 1rem;
}

.feedback {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.feedback.correct {
  color: #198754;
}

.feedback.incorrect {
  color: #dc3545;
}

.explanation {
  margin-top: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.75rem;
}

.explanation-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.quiz-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.results-header {
  text-align: center;
}

.results-icon {
  font-size: 2rem;
}

.results-score {
  margin: 1rem 0;
  text-align: center;
}

.score-circle {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  margin: 0 auto 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  background: #f1f3f5;
  color: #212529;
}

.score-circle.excellent {
  background: #e8f6ed;
  color: #198754;
}

.score-circle.good {
  background: #fff7e0;
  color: #a37b00;
}

.score-circle.needs-improvement {
  background: #fdecef;
  color: #dc3545;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.stat {
  text-align: center;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
}

.stat-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.results-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
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

.btn-primary {
  background: #212529;
  color: white;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline {
  background: white;
  border-color: #dee2e6;
  color: #212529;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}
</style>
