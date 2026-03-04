import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: () => import('../views/RoadmapView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/ResourcesView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue')
    },
    {
      path: '/level/:id',
      name: 'level',
      component: () => import('../views/LevelView.vue'),
      props: true
    },
    {
      path: '/quiz/:levelId',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
      props: true
    },
    {
      path: '/task/:id',
      name: 'task',
      component: () => import('../views/TaskDetailView.vue'),
      props: true
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue')
    },
    {
      path: '/achievements',
      name: 'achievements',
      component: () => import('../views/AchievementsView.vue')
    },
    // Email Marketing Quiz routes
    {
      path: '/email-marketing-quizzes',
      name: 'email-marketing-quizzes',
      component: () => import('../views/EmailMarketingQuizView.vue')
    },
    {
      path: '/email-marketing-quizzes/:quizId',
      name: 'email-marketing-quiz',
      component: () => import('../views/EmailMarketingQuizView.vue'),
      props: true
    },
    {
      path: '/email-marketing-quizzes/:quizId/results',
      name: 'email-marketing-quiz-results',
      component: () => import('../views/EmailMarketingQuizView.vue'),
      props: true
    },
    // Admin route
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        hidden: true // Mark as hidden so it doesn't appear in navigation
      }
    },
    // Hidden reset route
    {
      path: '/resetsystem',
      redirect: '/admin',
      meta: {
        hidden: true // Mark as hidden so it doesn't appear in navigation
      }
    },
    // Legacy routes
    {
      path: '/fundamentals',
      redirect: '/level/1'
    },
    {
      path: '/strategies',
      redirect: '/level/2'
    },
    {
      path: '/research',
      redirect: '/documents'
    }
  ]
})

export default router 