<template>
  <div class="card">
    <h2 class="card-title">{{ title }}</h2>
    <p class="card-description">{{ description }}</p>
    <div class="tasks-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskListCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script> 