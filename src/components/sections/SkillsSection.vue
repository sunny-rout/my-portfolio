<template>
  <section class="skills-section" id="skills">
    <div class="skills-section__container">
      <div class="skills-section__header">
        <h2 class="skills-section__heading">Technical Skills</h2>
        <p class="skills-section__subtitle">
          Comprehensive expertise across modern technology stack
        </p>
      </div>
      
      <div class="skills-section__content">
        <!-- Skill Categories -->
        <div 
          v-for="category in skills.categories" 
          :key="category.id" 
          class="skills-section__category"
        >
          <h3 class="skills-section__category-heading">
            <i :class="category.icon" class="skills-section__category-icon"></i>
            {{ category.name }}
          </h3>
          
          <div class="skills-section__items">
            <SkillBar 
              v-for="skill in category.items" 
              :key="skill.name"
              :skill="skill"
              :animate="isVisible"
            />
          </div>
        </div>
        
        <!-- Specializations -->
        <div class="skills-section__specializations">
          <h3 class="skills-section__specializations-heading">
            <i class="fas fa-star"></i>
            Core Specializations
          </h3>
          
          <div class="skills-section__specializations-grid">
            <div 
              v-for="spec in skills.specializations" 
              :key="spec.name"
              class="skills-section__specialization"
              :style="{ '--accent-color': spec.color }"
            >
              <div class="skills-section__specialization-icon">
                <i :class="spec.icon"></i>
              </div>
              <h4 class="skills-section__specialization-name">{{ spec.name }}</h4>
              <p class="skills-section__specialization-desc">{{ spec.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import SkillBar from '@/components/ui/SkillBar.vue'

const props = defineProps({
  skills: Object
})

const isVisible = ref(false)
const { observeElement } = useScrollAnimation()

onMounted(() => {
  const section = document.getElementById('skills')
  if (section) {
    observeElement(section, () => {
      isVisible.value = true
    }, { threshold: 0.2 })
  }
})
</script>

<style lang="scss" scoped>
.skills-section {
  padding: 5rem 0;
  background: white;
  scroll-margin-top: 80px;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  &__heading {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 2px;
    }
  }
  
  &__subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
  
  &__content {
    display: grid;
    gap: 4rem;
  }
  
  &__category {
    background: #f8fafc;
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    
    &-heading {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
    }
    
    &-icon {
      color: #3b82f6;
      font-size: 1.3rem;
    }
  }
  
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  &__specializations {
    margin-top: 2rem;
    
    &-heading {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      justify-content: center;
      
      i {
        color: #f59e0b;
      }
    }
    
    &-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
  }
  
  &__specialization {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      border-color: var(--accent-color, #3b82f6);
    }
    
    &-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1rem;
      background: var(--accent-color, #3b82f6);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    &-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }
    
    &-desc {
      color: #64748b;
      line-height: 1.6;
    }
  }
}
</style>
