<template>
  <div class="card">
    <h2 class="card-title">Overall Progress</h2>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
    <p class="card-description">{{ percentage }}% complete</p>
  </div>
</template>

<script>
export default {
  name: 'ProgressCard',
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (value) => {
        return value >= 0 && value <= 100
      }
    }
  }
}
</script> 