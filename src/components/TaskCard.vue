<template>
  <div class="task-item">
    <router-link :to="href" class="task-link">
      {{ title }}
    </router-link>
    <span :class="statusClass">{{ status }}</span>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      validator: (value) => {
        return ['In Progress', 'Not Started', 'Completed'].includes(value)
      }
    },
    href: {
      type: String,
      required: true
    }
  },
  computed: {
    statusClass() {
      switch (this.status) {
        case 'In Progress':
          return 'status-in-progress'
        case 'Not Started':
          return 'status-not-started'
        case 'Completed':
          return 'status-completed'
        default:
          return 'status-not-started'
      }
    }
  }
}
</script> 