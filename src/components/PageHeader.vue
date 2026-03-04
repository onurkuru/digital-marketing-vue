<template>
  <div class="page-header">
    <div class="breadcrumbs" v-if="breadcrumbs && breadcrumbs.length > 0">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link v-if="crumb.to" :to="crumb.to" class="breadcrumb-link">
          {{ crumb.text }}
        </router-link>
        <span v-else class="breadcrumb-text">{{ crumb.text }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
      </template>
    </div>
    
    <h1 class="page-title">{{ title }}</h1>
    <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 1.5rem;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.breadcrumb-link {
  color: #0d6efd;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-text,
.separator {
  color: #6c757d;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6c757d;
  margin-bottom: 0;
}
</style> 