<template>
  <div class="skill-bar">
    <div class="skill-bar__info">
      <div class="skill-bar__name">
        <i :class="skill.icon" class="skill-bar__icon"></i>
        <span>{{ skill.name }}</span>
      </div>
      <div class="skill-bar__meta">
        <span class="skill-bar__years">{{ skill.years }} years</span>
        <span class="skill-bar__level">{{ skill.level }}%</span>
      </div>
    </div>
    
    <div class="skill-bar__progress">
      <div 
        class="skill-bar__fill" 
        :class="{ 'skill-bar__fill--animate': animate }"
        :style="{ 
          '--target-width': `${skill.level}%`,
          '--skill-color': skill.color || '#3b82f6'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skill: Object,
  animate: Boolean
})
</script>

<style lang="scss" scoped>
.skill-bar {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  &__name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  &__icon {
    font-size: 1.1rem;
    color: var(--skill-color, #3b82f6);
  }
  
  &__meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
  }
  
  &__years {
    color: #64748b;
  }
  
  &__level {
    color: var(--skill-color, #3b82f6);
    font-weight: 600;
  }
  
  &__progress {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  &__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--skill-color, #3b82f6), color-mix(in srgb, var(--skill-color, #3b82f6) 80%, white));
    border-radius: 4px;
    width: 0%;
    transition: width 1.5s ease-out;
    position: relative;
    
    &--animate {
      width: var(--target-width, 0%);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
    }
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
