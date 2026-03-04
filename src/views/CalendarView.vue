<template>
  <div class="calendar-view">
    <div class="page-header">
      <h1>Takvim</h1>
      <p class="subtitle">Görev teslim tarihlerini takip edin ve doğrudan ilgili göreve geçin.</p>
    </div>

    <div class="calendar-container card">
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="btn-icon" aria-label="Önceki Ay" @click="goPreviousMonth">&lt;</button>
          <h2 class="current-month">{{ monthLabel }}</h2>
          <button class="btn-icon" aria-label="Sonraki Ay" @click="goNextMonth">&gt;</button>
        </div>
        <button class="btn btn-outline" @click="goToToday">Bugüne Dön</button>
      </div>

      <div class="calendar-weekdays">
        <div v-for="weekday in weekdays" :key="weekday" class="weekday">{{ weekday }}</div>
      </div>

      <div class="calendar-days">
        <button
          v-for="cell in calendarCells"
          :key="cell.dateKey"
          type="button"
          class="day"
          :class="{
            'prev-month': !cell.isCurrentMonth,
            'has-events': cell.eventCount > 0,
            'is-today': cell.isToday,
            'is-selected': cell.dateKey === selectedDateKey
          }"
          @click="selectDate(cell.dateKey)"
        >
          <span class="day-number">{{ cell.dayNumber }}</span>
          <span v-if="cell.eventCount > 0" class="day-indicator">{{ cell.eventCount }}</span>
        </button>
      </div>
    </div>

    <div class="events-panel card">
      <h2 class="card-title">{{ selectedDateLabel }} Etkinlikleri</h2>

      <div v-if="selectedEvents.length" class="event-list">
        <article v-for="event in selectedEvents" :key="event.id" class="event-item">
          <div class="event-date">
            <div class="date-num">{{ event.dayLabel }}</div>
            <div class="date-month">{{ event.monthLabel }}</div>
          </div>
          <div class="event-details">
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-description">{{ event.description }}</p>
            <div class="event-meta">
              <span class="event-type task">Görev Teslimi</span>
              <span class="event-level">Seviye {{ event.levelId }} · {{ event.levelTitle }}</span>
              <span class="event-status" :class="event.statusClass">{{ event.status }}</span>
            </div>
          </div>
          <router-link :to="`/task/${event.taskId}`" class="btn btn-outline">Göreve Git</router-link>
        </article>
      </div>

      <div v-else class="empty-events">
        <p>Seçtiğiniz gün için görev teslimi bulunmuyor.</p>
      </div>
    </div>

    <div class="upcoming-events card">
      <h2 class="card-title">Yaklaşan Teslimler</h2>

      <div v-if="upcomingEvents.length" class="event-list">
        <article v-for="event in upcomingEvents" :key="`upcoming-${event.id}`" class="event-item compact">
          <div class="event-date">
            <div class="date-num">{{ event.dayLabel }}</div>
            <div class="date-month">{{ event.monthLabel }}</div>
          </div>
          <div class="event-details">
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-description">{{ event.description }}</p>
          </div>
          <router-link :to="`/task/${event.taskId}`" class="btn btn-outline">Aç</router-link>
        </article>
      </div>

      <div v-else class="empty-events">
        <p>Yaklaşan teslim görünmüyor.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { levels } from '@/utils/marketingData/levels';
import { allTasks } from '@/utils/marketingData/learning-content';
import { getTaskStatus, loadProgress, subscribeProgress } from '@/utils/progressStore';

function parseTrDate(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = Number(match[3]);
  const parsed = new Date(year, month, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function getStatusClass(status) {
  if (status === 'Tamamlandı') return 'completed';
  if (status === 'Devam Ediyor') return 'in-progress';
  return 'not-started';
}

export default {
  name: 'CalendarView',
  data() {
    const now = new Date();
    return {
      weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
      levels,
      tasks: allTasks,
      progress: loadProgress(),
      currentMonthStart: new Date(now.getFullYear(), now.getMonth(), 1),
      selectedDateKey: toDateKey(now),
      unsubscribeProgress: null
    };
  },
  computed: {
    monthLabel() {
      return new Intl.DateTimeFormat('tr-TR', {
        month: 'long',
        year: 'numeric'
      }).format(this.currentMonthStart);
    },
    selectedDateLabel() {
      const selectedDate = this.getDateFromKey(this.selectedDateKey);
      return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(selectedDate);
    },
    taskEvents() {
      const levelMap = Object.fromEntries(this.levels.map((level) => [level.id, level]));
      return this.tasks
        .map((task) => {
          const parsedDeadline = parseTrDate(task.deadline);
          if (!parsedDeadline) return null;

          const taskStatus = getTaskStatus(task.id, this.progress);
          return {
            id: `task-${task.id}`,
            taskId: task.id,
            title: task.title,
            description: task.description,
            date: parsedDeadline,
            dateKey: toDateKey(parsedDeadline),
            dayLabel: String(parsedDeadline.getDate()).padStart(2, '0'),
            monthLabel: new Intl.DateTimeFormat('tr-TR', { month: 'short' }).format(parsedDeadline),
            levelId: task.levelId,
            levelTitle: levelMap[task.levelId]?.title || '',
            status: taskStatus,
            statusClass: getStatusClass(taskStatus)
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.date - b.date);
    },
    eventsByDate() {
      return this.taskEvents.reduce((accumulator, event) => {
        if (!accumulator[event.dateKey]) {
          accumulator[event.dateKey] = [];
        }
        accumulator[event.dateKey].push(event);
        return accumulator;
      }, {});
    },
    calendarCells() {
      const firstDayOfMonth = new Date(this.currentMonthStart);
      const firstDayWeekIndex = (firstDayOfMonth.getDay() + 6) % 7;
      const gridStartDate = addDays(firstDayOfMonth, -firstDayWeekIndex);
      const todayKey = toDateKey(new Date());

      return Array.from({ length: 42 }, (_, offset) => {
        const date = addDays(gridStartDate, offset);
        const dateKey = toDateKey(date);
        return {
          date,
          dateKey,
          dayNumber: date.getDate(),
          isCurrentMonth: date.getMonth() === this.currentMonthStart.getMonth(),
          isToday: dateKey === todayKey,
          eventCount: (this.eventsByDate[dateKey] || []).length
        };
      });
    },
    selectedEvents() {
      return this.eventsByDate[this.selectedDateKey] || [];
    },
    upcomingEvents() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.taskEvents
        .filter((event) => event.date >= today)
        .slice(0, 8);
    }
  },
  mounted() {
    this.unsubscribeProgress = subscribeProgress((progress) => {
      this.progress = progress;
    });
  },
  beforeUnmount() {
    if (typeof this.unsubscribeProgress === 'function') {
      this.unsubscribeProgress();
    }
  },
  methods: {
    getDateFromKey(dateKey) {
      const [year, month, day] = String(dateKey).split('-').map(Number);
      return new Date(year, (month || 1) - 1, day || 1);
    },
    selectDate(dateKey) {
      this.selectedDateKey = dateKey;
    },
    goPreviousMonth() {
      const year = this.currentMonthStart.getFullYear();
      const month = this.currentMonthStart.getMonth();
      this.currentMonthStart = new Date(year, month - 1, 1);
    },
    goNextMonth() {
      const year = this.currentMonthStart.getFullYear();
      const month = this.currentMonthStart.getMonth();
      this.currentMonthStart = new Date(year, month + 1, 1);
    },
    goToToday() {
      const now = new Date();
      this.currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      this.selectedDateKey = toDateKey(now);
    }
  }
};
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
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-month {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid #dee2e6;
  background: #fff;
  color: #212529;
  cursor: pointer;
}

.btn:hover {
  background-color: #f8f9fa;
}

.btn-outline {
  border-color: #ced4da;
}

.btn-icon {
  background: none;
  border: 1px solid #dee2e6;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  cursor: pointer;
}

.btn-icon:hover {
  background: #f8f9fa;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.25rem;
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.weekday {
  padding: 0.45rem;
  color: #495057;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.3rem;
}

.day {
  min-height: 4.8rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #fff;
  text-align: left;
  padding: 0.45rem;
  cursor: pointer;
  position: relative;
}

.day:hover {
  border-color: #adb5bd;
}

.day-number {
  font-weight: 600;
}

.prev-month {
  background: #f8f9fa;
  color: #adb5bd;
}

.has-events {
  border-color: #ced4da;
}

.is-today {
  box-shadow: inset 0 0 0 2px #0d6efd;
}

.is-selected {
  background: #eef5ff;
  border-color: #0d6efd;
}

.day-indicator {
  position: absolute;
  bottom: 0.45rem;
  right: 0.45rem;
  min-width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: #0d6efd;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.event-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 0.85rem;
}

.event-item.compact {
  grid-template-columns: auto 1fr auto;
}

.event-date {
  min-width: 3.2rem;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
  padding: 0.35rem;
}

.date-num {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.1;
}

.date-month {
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
}

.event-title {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.event-description {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.45rem;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  font-size: 0.8rem;
}

.event-type {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #e9ecef;
}

.event-type.task {
  background: #e6f4ea;
  color: #256b3a;
}

.event-level {
  color: #495057;
}

.event-status {
  font-weight: 600;
}

.event-status.completed {
  color: #198754;
}

.event-status.in-progress {
  color: #b58100;
}

.event-status.not-started {
  color: #6c757d;
}

.empty-events {
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .calendar-header {
    flex-direction: column;
    align-items: stretch;
  }

  .calendar-nav {
    justify-content: space-between;
  }

  .event-item,
  .event-item.compact {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
</style>
