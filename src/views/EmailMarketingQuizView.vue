<template>
  <div class="container mx-auto px-4 py-8">
    <PageHeader :title="currentQuiz ? currentQuiz.title : 'E-posta Pazarlaması Quizleri'" 
                :breadcrumbs="[
                  { text: 'Ana Sayfa', to: '/' },
                  { text: 'E-posta Pazarlaması', to: '/level/5' },
                  { text: 'Quizler', to: '/email-marketing-quizzes' }
                ]" />
    
    <div v-if="!selectedQuizId && !quizCompleted" class="mt-8">
      <h2 class="text-2xl font-bold mb-6">E-posta Pazarlaması Quizleri</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="quiz in emailQuizzes" :key="quiz.id" 
             class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
          <h3 class="text-xl font-bold mb-2">{{ quiz.title }}</h3>
          <p class="text-gray-600 mb-4">{{ quiz.description }}</p>
          <p class="text-sm text-gray-500 mb-4">{{ quiz.questions.length }} soru</p>
          <button @click="startQuiz(quiz.id)" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Quize Başla
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="quizCompleted" class="mt-8 bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircleIcon class="w-10 h-10 text-green-600" />
        </div>
        <h2 class="text-2xl font-bold mb-2">Quiz Tamamlandı!</h2>
        <p class="text-lg text-gray-600 mb-6">
          {{ currentQuiz.title }} quizini tamamladınız.
        </p>
        <div class="mb-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-xl font-bold mb-2">Skorunuz: {{ score }}/{{ currentQuiz.questions.length }}</p>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-green-600 h-4 rounded-full" :style="`width: ${(score / currentQuiz.questions.length) * 100}%`"></div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button @click="showResults = !showResults" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200">
            {{ showResults ? 'Sonuçları Gizle' : 'Sonuçları Göster' }}
          </button>
          <button @click="resetQuiz" 
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md transition-colors duration-200">
            Quizlere Dön
          </button>
        </div>
      </div>

      <div v-if="showResults" class="mt-8">
        <h3 class="text-xl font-bold mb-4">Sonuçlar</h3>
        <div v-for="(question, qIndex) in currentQuiz.questions" :key="qIndex" 
             class="mb-6 p-4 rounded-lg" 
             :class="userAnswers[qIndex] === question.correctOption ? 'bg-green-50' : 'bg-red-50'">
          <p class="font-bold mb-2">{{ qIndex + 1 }}. {{ question.question }}</p>
          
          <ul class="space-y-2">
            <li v-for="(option, oIndex) in question.options" :key="oIndex"
                class="p-2 rounded-md flex items-start"
                :class="{
                  'bg-green-100': oIndex === question.correctOption,
                  'bg-red-100': oIndex === userAnswers[qIndex] && oIndex !== question.correctOption
                }">
              <span class="mr-2" :class="{
                'text-green-600': oIndex === question.correctOption,
                'text-red-600': oIndex === userAnswers[qIndex] && oIndex !== question.correctOption,
                'text-gray-500': oIndex !== question.correctOption && oIndex !== userAnswers[qIndex]
              }">
                {{ oIndex === question.correctOption ? '✓' : (oIndex === userAnswers[qIndex] && oIndex !== question.correctOption ? '✗' : '') }}
              </span>
              {{ option }}
            </li>
          </ul>
          
          <div class="mt-3 text-sm italic" :class="userAnswers[qIndex] === question.correctOption ? 'text-green-600' : 'text-red-600'">
            {{ question.explanation }}
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="currentQuiz" class="mt-8 bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ currentQuiz.title }}</h2>
        <div class="text-sm text-gray-500">Soru {{ currentQuestionIndex + 1 }}/{{ currentQuiz.questions.length }}</div>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div class="bg-blue-600 h-2 rounded-full" 
             :style="`width: ${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`"></div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-bold mb-4">{{ currentQuestion.question }}</h3>
        <div class="space-y-3">
          <div v-for="(option, index) in currentQuestion.options" :key="index"
               @click="selectAnswer(index)"
               class="p-4 border rounded-lg cursor-pointer transition-colors duration-200"
               :class="selectedOption === index ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50'">
            {{ option }}
          </div>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button @click="prevQuestion" 
                :disabled="currentQuestionIndex === 0" 
                class="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          Önceki Soru
        </button>
        <button @click="nextQuestion" 
                :disabled="selectedOption === null" 
                class="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isLastQuestion ? 'Quizi Tamamla' : 'Sonraki Soru' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/PageHeader.vue';
import { emailMarketingQuizzes } from '@/utils/marketingData/email-marketing-quiz';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const route = useRoute();

// State
const emailQuizzes = ref(emailMarketingQuizzes);
const selectedQuizId = ref(null);
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const userAnswers = ref([]);
const quizCompleted = ref(false);
const showResults = ref(false);

// Get quiz ID from route if available
onMounted(() => {
  if (route.params.quizId) {
    startQuiz(route.params.quizId);
  }
});

// Computed properties
const currentQuiz = computed(() => {
  if (!selectedQuizId.value) return null;
  return emailQuizzes.value.find(quiz => quiz.id === selectedQuizId.value);
});

const currentQuestion = computed(() => {
  if (!currentQuiz.value) return null;
  return currentQuiz.value.questions[currentQuestionIndex.value];
});

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === currentQuiz.value?.questions.length - 1;
});

const score = computed(() => {
  if (!currentQuiz.value) return 0;
  return userAnswers.value.reduce((total, answer, index) => {
    return total + (answer === currentQuiz.value.questions[index].correctOption ? 1 : 0);
  }, 0);
});

// Methods
function startQuiz(quizId) {
  selectedQuizId.value = quizId;
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  userAnswers.value = new Array(emailQuizzes.value.find(q => q.id === quizId).questions.length).fill(null);
  quizCompleted.value = false;
  showResults.value = false;
  
  // Update route
  router.push(`/email-marketing-quizzes/${quizId}`);
}

function selectAnswer(index) {
  selectedOption.value = index;
}

function nextQuestion() {
  if (selectedOption.value === null) return;
  
  // Save answer
  userAnswers.value[currentQuestionIndex.value] = selectedOption.value;
  
  if (isLastQuestion.value) {
    completeQuiz();
  } else {
    currentQuestionIndex.value++;
    selectedOption.value = null;
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    selectedOption.value = userAnswers.value[currentQuestionIndex.value];
  }
}

function completeQuiz() {
  quizCompleted.value = true;
  
  // Here you would typically save the results to user progress
  // For example: saveQuizResults(selectedQuizId.value, score.value, userAnswers.value);
  
  // Update route
  router.push(`/email-marketing-quizzes/${selectedQuizId.value}/results`);
}

function resetQuiz() {
  selectedQuizId.value = null;
  quizCompleted.value = false;
  userAnswers.value = [];
  currentQuestionIndex.value = 0;
  selectedOption.value = null;
  showResults.value = false;
  
  // Update route
  router.push('/email-marketing-quizzes');
}
</script> 