<template>
  <div class="experience-item" :class="{ 'experience-item--reverse': index % 2 !== 0 }">
    <div class="experience-item__content">
      <div class="experience-item__card">
        <div class="experience-item__header">
          <h3 class="experience-item__title">{{ job.title }}</h3>
          <div class="experience-item__company">{{ job.company }}</div>
          <div class="experience-item__period">
            <i class="fas fa-calendar"></i>
            {{ job.period }}
            <span class="experience-item__duration">({{ job.duration }})</span>
          </div>
        </div>
        
        <div class="experience-item__achievements">
          <h4 class="experience-item__achievements-title">Key Achievements:</h4>
          <ul class="experience-item__achievements-list">
            <li 
              v-for="achievement in job.achievements" 
              :key="achievement"
              class="experience-item__achievement"
            >
              <i class="fas fa-check-circle"></i>
              {{ achievement }}
            </li>
          </ul>
        </div>
        
        <div class="experience-item__technologies">
          <h4 class="experience-item__technologies-title">Technologies:</h4>
          <div class="experience-item__tech-tags">
            <span 
              v-for="tech in job.technologies" 
              :key="tech"
              class="experience-item__tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="experience-item__marker">
      <div class="experience-item__dot"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: Object,
  index: Number,
  isLast: Boolean
})
</script>

<style lang="scss" scoped>
.experience-item {
  position: relative;
  display: flex;
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    
    &--reverse {
      flex-direction: row;
    }
  }
  
  &__content {
    flex: 1;
    max-width: calc(50% - 2rem);
    
    @media (max-width: 768px) {
      max-width: calc(100% - 4rem);
      margin-left: 2rem;
    }
  }
  
  &--reverse &__content {
    margin-left: auto;
    margin-right: 0;
    
    @media (max-width: 768px) {
      margin-left: 2rem;
      margin-right: 0;
    }
  }
  
  &__card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  &__header {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  &__title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  &__company {
    font-size: 1.1rem;
    font-weight: 600;
    color: #3b82f6;
    margin-bottom: 0.5rem;
  }
  
  &__period {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #64748b;
    
    i {
      color: #94a3b8;
    }
  }
  
  &__duration {
    font-style: italic;
  }
  
  &__achievements {
    margin-bottom: 1.5rem;
    
    &-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
    }
    
    &-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  
  &__achievement {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #475569;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    i {
      color: #10b981;
      margin-top: 0.2rem;
      flex-shrink: 0;
    }
  }
  
  &__technologies {
    &-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
    }
  }
  
  &__tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  &__tech-tag {
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #e0f2fe, #b3e5fc);
    color: #0369a1;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid #bae6fd;
  }
  
  &__marker {
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
    z-index: 2;
    
    @media (max-width: 768px) {
      left: 2rem;
    }
  }
  
  &__dot {
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 0 0 4px #e2e8f0;
  }
}
</style>
