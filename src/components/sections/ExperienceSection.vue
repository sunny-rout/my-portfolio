<template>
  <section class="experience-section" id="experience">
    <div class="experience-section__container">
      <div class="experience-section__header">
        <h2 class="experience-section__heading">Professional Experience</h2>
        <p class="experience-section__subtitle">
          Career journey of continuous growth and impactful contributions
        </p>
      </div>
      
      <div class="experience-section__timeline">
        <ExperienceItem
          v-for="(job, index) in experience"
          :key="job.id"
          :job="job"
          :index="index"
          :is-last="index === experience.length - 1"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ExperienceItem from '@/components/ui/ExperienceItem.vue'

const props = defineProps({
  experience: Array
})
</script>

<style lang="scss" scoped>
.experience-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
  
  &__timeline {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #3b82f6, #1d4ed8);
      transform: translateX(-50%);
      
      @media (max-width: 768px) {
        left: 2rem;
      }
    }
  }
}
</style>
