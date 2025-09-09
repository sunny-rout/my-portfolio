<template>
  <section class="hero-section" id="hero">
    <div class="hero-section__container">
      <div class="hero-section__content">
        <div class="hero-section__text">
          <h1 class="hero-section__name">
            <span 
              v-for="(line, index) in nameLines" 
              :key="index"
              class="hero-section__name-line"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              {{ line }}
            </span>
          </h1>
          
          <div class="hero-section__tagline">
            <span class="hero-section__typing-text">{{ typedText }}</span>
            <span 
              class="hero-section__cursor" 
              :class="{ 'hero-section__cursor--active': isTyping }"
            >|</span>
          </div>
          
          <p class="hero-section__description">
            {{ personalData.summary }}
          </p>
          
          <div class="hero-section__actions">
            <button 
              class="hero-section__cta hero-section__cta--primary"
              @click="$emit('navigate', 'projects')"
            >
              <i class="fas fa-briefcase"></i>
              <span>View My Work</span>
            </button>
            
            <button 
              class="hero-section__cta hero-section__cta--secondary"
              @click="$emit('navigate', 'contact')"
            >
              <i class="fas fa-envelope"></i>
              <span>Contact Me</span>
            </button>
          </div>
        </div>
        
        <div class="hero-section__visual">
          <div class="hero-section__avatar">
            <span class="hero-section__avatar-text">{{ personalData.avatar }}</span>
          </div>
          
          <div class="hero-section__tech-icons">
            <div 
              v-for="(tech, index) in floatingTechs" 
              :key="tech.name"
              class="hero-section__tech-icon"
              :style="{ animationDelay: `${index * 0.5}s` }"
            >
              <i :class="tech.icon"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-section__scroll-indicator" @click="scrollToNext">
        <div class="hero-section__scroll-mouse">
          <div class="hero-section__scroll-wheel"></div>
        </div>
        <span class="hero-section__scroll-text">Scroll Down</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTypewriter } from '@/composables/useTypeWriter'

const props = defineProps({
  personalData: Object
})

const emit = defineEmits(['navigate'])

// Computed properties
const nameLines = computed(() => props.personalData.name.split(' '))

// Typewriter effect
const taglines = [
  props.personalData.tagline,
  'AWS & DevOps Expert',
  'CI/CD Automation Specialist',
  'Process Leader & Mentor'
]

const { typedText, isTyping, startTyping } = useTypewriter(taglines, {
  speed: 80,
  deleteSpeed: 40,
  pauseTime: 2500
})

// Floating tech icons
const floatingTechs = ref([
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Javascript', icon: 'fab fa-js-square' },
  { name: 'Docker', icon: 'fab fa-docker' }
])

// Methods
const scrollToNext = () => {
  emit('navigate', 'about')
}

// Lifecycle
onMounted(() => {
  startTyping()
})
</script>

<style lang="scss" scoped>
.hero-section {
  min-height: 100svh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  touch-action: pan-y;
  width: 100%;
  max-width: 100vw;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
  }
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
  }
  
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }
  
  &__text {
    max-width: 600px;
    width: 100%;
    min-width: 0;
  }
  
  &__name {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
    word-wrap: break-word;
    hyphens: auto;
    
    &-line {
      display: block;
      opacity: 0;
      animation: slideUp 0.8s ease-out forwards;
    }
  }
  
  &__tagline {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    margin-bottom: 1.5rem;
    height: 3rem;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    overflow: hidden;
  }
  
  &__typing-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
  }
  
  &__cursor {
    font-weight: 300;
    opacity: 0;
    animation: blink 1s infinite;
    
    &--active {
      animation: blink 1s infinite;
    }
  }
  
  &__description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.85);
    max-width: 500px;
    width: 100%;
    word-wrap: break-word;
  }
  
  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
    
    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
  
  &__cta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-width: 0;
    white-space: nowrap;
    
    @media (max-width: 480px) {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
    
    &--primary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }
    }
    
    &--secondary {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: white;
        transform: translateY(-2px);
      }
    }
  }
  
  &__visual {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    min-width: 0;
  }
  
  &__avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 600;
    color: white;
    position: relative;
    z-index: 2;
    animation: float 6s ease-in-out infinite;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
      width: 150px;
      height: 150px;
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      width: 120px;
      height: 120px;
      font-size: 2rem;
    }
  }
  
  &__tech-icons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    pointer-events: none;
    
    @media (max-width: 768px) {
      width: 250px;
      height: 250px;
    }
    
    @media (max-width: 480px) {
      width: 200px;
      height: 200px;
    }
  }
  
  &__tech-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    animation: orbit 10s linear infinite, float 3s ease-in-out infinite alternate;
    
    &:nth-child(1) { top: 0; left: 50%; margin-left: -20px; animation-delay: 0s, 0s; }
    &:nth-child(2) { top: 50%; right: 0; margin-top: -20px; animation-delay: -2.5s, -0.5s; }
    &:nth-child(3) { bottom: 0; left: 50%; margin-left: -20px; animation-delay: -5s, -1s; }
    &:nth-child(4) { top: 50%; left: 0; margin-top: -20px; animation-delay: -7.5s, -1.5s; }
    
    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
      font-size: 1.3rem;
      
      &:nth-child(1) { margin-left: -17.5px; }
      &:nth-child(2) { margin-top: -17.5px; }
      &:nth-child(3) { margin-left: -17.5px; }
      &:nth-child(4) { margin-top: -17.5px; }
    }
    
    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
      font-size: 1.1rem;
      
      &:nth-child(1) { margin-left: -15px; }
      &:nth-child(2) { margin-top: -15px; }
      &:nth-child(3) { margin-left: -15px; }
      &:nth-child(4) { margin-top: -15px; }
    }
  }
  
  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
    
    @media (max-width: 480px) {
      bottom: 1rem;
    }
  }
  
  &__scroll-mouse {
    width: 24px;
    height: 40px;
    border: 2px solid white;
    border-radius: 12px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 6px;
      background: white;
      border-radius: 1px;
      animation: scroll 2s infinite;
    }
  }
  
  &__scroll-text {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
}

@keyframes scroll {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  50% { opacity: 1; transform: translateX(-50%) translateY(8px); }
  100% { opacity: 0; transform: translateX(-50%) translateY(16px); }
}
</style>
