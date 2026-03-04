<template>
  <div class="calendar-view">
    <div class="page-header">
      <h1>Takvim</h1>
      <p class="subtitle">Dijital pazarlama görevlerinizi ve önemli tarihleri takip edin</p>
    </div>
    
    <div class="calendar-container card">
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="btn-icon" aria-label="Önceki Ay">&lt;</button>
          <h2 class="current-month">Nisan 2025</h2>
          <button class="btn-icon" aria-label="Sonraki Ay">&gt;</button>
        </div>
        
        <div class="view-options">
          <div class="tab active">Ay</div>
          <div class="tab">Hafta</div>
          <div class="tab">Gün</div>
        </div>
      </div>
      
      <div class="calendar-weekdays">
        <div class="weekday">Pzt</div>
        <div class="weekday">Sal</div>
        <div class="weekday">Çar</div>
        <div class="weekday">Per</div>
        <div class="weekday">Cum</div>
        <div class="weekday">Cmt</div>
        <div class="weekday">Paz</div>
      </div>
      
      <div class="calendar-days">
        <!-- Previous month days (greyed out) -->
        <div class="day prev-month">31</div>
        
        <!-- Current month days -->
        <div class="day">1</div>
        <div class="day">2</div>
        <div class="day">3</div>
        <div class="day">4</div>
        <div class="day">5</div>
        <div class="day">6</div>
        <div class="day">7</div>
        <div class="day">8</div>
        <div class="day">9</div>
        <div class="day has-events">
          10
          <div class="day-indicator"></div>
        </div>
        <div class="day">11</div>
        <div class="day">12</div>
        <div class="day">13</div>
        <div class="day">14</div>
        <div class="day">15</div>
        <div class="day">16</div>
        <div class="day has-events">
          17
          <div class="day-indicator">1</div>
        </div>
        <div class="day">18</div>
        <div class="day">19</div>
        <div class="day">20</div>
        <div class="day">21</div>
        <div class="day">22</div>
        <div class="day">23</div>
        <div class="day has-events">
          24
          <div class="day-indicator">1</div>
        </div>
        <div class="day">25</div>
        <div class="day">26</div>
        <div class="day">27</div>
        <div class="day">28</div>
        <div class="day">29</div>
        <div class="day">30</div>
        
        <!-- Next month days (greyed out) -->
        <div class="day next-month">1</div>
        <div class="day next-month">2</div>
        <div class="day next-month">3</div>
        <div class="day next-month">4</div>
      </div>
    </div>
    
    <div class="upcoming-events card">
      <h2 class="card-title">Yaklaşan Görevler ve Etkinlikler</h2>
      
      <div class="event-list">
        <div class="event-item">
          <div class="event-date">
            <div class="date-num">17</div>
            <div class="date-month">Nis</div>
          </div>
          
          <div class="event-details">
            <h3 class="event-title">Temel Terminoloji Görevi Son Teslim</h3>
            <p class="event-description">Dijital pazarlama terminolojisi görevinin teslim tarihi</p>
            <div class="event-meta">
              <span class="event-type task">Görev Teslimi</span>
            </div>
          </div>
        </div>
        
        <div class="event-item">
          <div class="event-date">
            <div class="date-num">24</div>
            <div class="date-month">Nis</div>
          </div>
          
          <div class="event-details">
            <h3 class="event-title">Marka Hedefleri Görevi Son Teslim</h3>
            <p class="event-description">Dijital pazarlama hedefleri ve marka stratejisi görevinin teslim tarihi</p>
            <div class="event-meta">
              <span class="event-type task">Görev Teslimi</span>
            </div>
          </div>
        </div>
        
        <div class="event-item">
          <div class="event-date">
            <div class="date-num">10</div>
            <div class="date-month">Nis</div>
          </div>
          
          <div class="event-details">
            <h3 class="event-title">Dijital Pazarlama Webinarı</h3>
            <p class="event-description">Sektör uzmanları ile canlı webinar</p>
            <div class="event-meta">
              <span class="event-type webinar">Webinar</span>
              <span class="event-time">19:00 - 20:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',
  data() {
    return {
      // Calendar data could be added here for dynamic implementation
    }
  },
  methods: {
    // Calendar methods could be added here
  }
}
</script>

<style scoped>
.calendar-view {
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

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-month {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  color: #212529;
}

.btn-icon:hover {
  background-color: #f8f9fa;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.tab.active {
  background-color: #212529;
  color: white;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.weekday {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.day {
  height: 5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prev-month, .next-month {
  color: #adb5bd;
  background-color: #f8f9fa;
}

.has-events {
  font-weight: 600;
}

.day-indicator {
  position: absolute;
  bottom: 0.5rem;
  background-color: #0d6efd;
  color: white;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.75rem;
}

.upcoming-events {
  margin-top: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.event-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  height: 3.5rem;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
}

.date-num {
  font-size: 1.25rem;
  font-weight: 600;
}

.date-month {
  font-size: 0.75rem;
  color: #6c757d;
}

.event-details {
  flex: 1;
}

.event-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.event-description {
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
}

.event-type {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
}

.event-type.task {
  background-color: #cff4fc;
  color: #055160;
}

.event-type.webinar {
  background-color: #e2e3e5;
  color: #41464b;
}

.event-time {
  color: #6c757d;
}
</style> 