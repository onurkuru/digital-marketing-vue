<template>
  <div class="fundamentals">
    <div class="markdown-content" v-html="content"></div>
  </div>
</template>

<script>
import { renderMarkdown, fundamentalsMarkdown } from '@/utils/markdown'

export default {
  name: 'FundamentalsView',
  computed: {
    content() {
      return renderMarkdown(fundamentalsMarkdown)
    }
  }
}
</script>

<style>
.markdown-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.markdown-content h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.markdown-content h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #444;
}

.markdown-content h3 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #555;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.markdown-content ul, .markdown-content ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content strong {
  font-weight: bold;
}
</style> 