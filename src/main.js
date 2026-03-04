import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkXn_qoiFB2BFWrEstSUBt9stEvC20xwI",
  authDomain: "markett-d5909.firebaseapp.com",
  projectId: "markett-d5909",
  storageBucket: "markett-d5909.firebasestorage.app",
  messagingSenderId: "1069191593749",
  appId: "1:1069191593749:web:a4e924856cf7de3948f31c",
  measurementId: "G-165TDBWJCB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)

app.use(router)
app.mount('#app') 