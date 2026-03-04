<template>
  <div class="strategies">
    <div class="markdown-content" v-html="content"></div>
  </div>
</template>

<script>
import { renderMarkdown, strategiesMarkdown } from '@/utils/markdown'

export default {
  name: 'StrategiesView',
  computed: {
    content() {
      return renderMarkdown(strategiesMarkdown)
    }
  }
}
</script>

<style scoped>
.strategies {
  margin-top: 1rem;
}
</style> 