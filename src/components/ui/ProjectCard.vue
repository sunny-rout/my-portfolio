<template>
  <div class="project-card">
    <div class="project-card__image">
      <div class="project-card__image-placeholder">
        <i class="fas fa-code"></i>
      </div>
      <div class="project-card__status">
        <span class="project-card__status-badge" :class="`project-card__status-badge--${project.status}`">
          {{ project.status }}
        </span>
        <span v-if="project.featured" class="project-card__featured">
          <i class="fas fa-star"></i>
          Featured
        </span>
      </div>
    </div>
    
    <div class="project-card__content">
      <div class="project-card__header">
        <h3 class="project-card__title">{{ project.name }}</h3>
        <span class="project-card__year">{{ project.year }}</span>
      </div>
      
      <p class="project-card__description">{{ project.description }}</p>
      
      <div class="project-card__technologies">
        <span 
          v-for="tech in project.technologies.slice(0, 4)"
          :key="tech"
          class="project-card__tech-tag"
        >
          {{ tech }}
        </span>
        <span v-if="project.technologies.length > 4" class="project-card__tech-more">
          +{{ project.technologies.length - 4 }} more
        </span>
      </div>
      
      <div class="project-card__impact">
        <i class="fas fa-chart-line"></i>
        <span>{{ project.impact }}</span>
      </div>
      
      <div class="project-card__actions">
        <button class="project-card__btn project-card__btn--primary" @click="$emit('view-details', project)">
          <i class="fas fa-eye"></i>
          View Details
        </button>
        <button class="project-card__btn project-card__btn--secondary">
          <i class="fas fa-external-link-alt"></i>
          Demo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: Object
})

const emit = defineEmits(['view-details'])
</script>

<style lang="scss" scoped>
.project-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  &__image {
    position: relative;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &-placeholder {
      color: white;
      font-size: 3rem;
      opacity: 0.7;
    }
  }
  
  &__status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
  }
  
  &__status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    
    &--completed {
      background: #dcfce7;
      color: #166534;
    }
    
    &--in-progress {
      background: #fef3c7;
      color: #92400e;
    }
  }
  
  &__featured {
    padding: 0.25rem 0.75rem;
    background: #fbbf24;
    color: white;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  &__content {
    padding: 1.5rem;
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  
  &__title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    line-height: 1.3;
  }
  
  &__year {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
  }
  
  &__description {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  &__technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  &__tech-tag {
    padding: 0.25rem 0.75rem;
    background: #f1f5f9;
    color: #475569;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  &__tech-more {
    padding: 0.25rem 0.75rem;
    background: #e2e8f0;
    color: #64748b;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    font-style: italic;
  }
  
  &__impact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #f0f9ff;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #0369a1;
    font-weight: 500;
    
    i {
      color: #0284c7;
    }
  }
  
  &__actions {
    display: flex;
    gap: 0.75rem;
  }
  
  &__btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &--primary {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      
      &:hover {
        background: linear-gradient(135deg, #2563eb, #1e40af);
        transform: translateY(-1px);
      }
    }
    
    &--secondary {
      background: transparent;
      color: #3b82f6;
      border: 2px solid #e2e8f0;
      
      &:hover {
        border-color: #3b82f6;
        background: #f8fafc;
      }
    }
  }
}
</style>
