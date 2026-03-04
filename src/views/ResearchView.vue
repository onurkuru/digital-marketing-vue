<template>
  <div class="research">
    <div class="markdown-content" v-html="content"></div>
  </div>
</template>

<script>
import { renderMarkdown, researchMarkdown } from '@/utils/markdown'

export default {
  name: 'ResearchView',
  computed: {
    content() {
      return renderMarkdown(researchMarkdown)
    }
  }
}
</script>

<style scoped>
.research {
  margin-top: 1rem;
}
</style> 