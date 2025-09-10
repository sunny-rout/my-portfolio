<template>
  <header class="app-header" :class="{ 'app-header--scrolled': isScrolled }">
    <nav class="app-header__nav">
      <div class="app-header__brand">
        <a href="#hero" class="app-header__logo" @click.prevent="$emit('navigate', 'hero')">
          {{ personalData.avatar }}
        </a>
      </div>
      
      <ul class="app-header__menu" :class="{ 'app-header__menu--active': isMobileMenuOpen }">
        <li v-for="item in navigationItems" :key="item.id" class="app-header__item">
          <a 
            :href="`#${item.id}`" 
            class="app-header__link"
            :class="{ 'app-header__link--active': activeSection === item.id }"
            @click.prevent="handleNavigation(item.id)"
          >
            <i :class="item.icon" class="app-header__link-icon"></i>
            <span class="app-header__link-text">{{ item.label }}</span>
          </a>
        </li>
      </ul>
      
      <button 
        class="app-header__toggle" 
        :class="{ 'app-header__toggle--active': isMobileMenuOpen }"
        @click.stop="toggleMobileMenu"
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  navigationItems: Array,
  personalData: Object,
  activeSection: String
})

const emit = defineEmits(['navigate'])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleNavigation = (sectionId) => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
  emit('navigate', sectionId)
}

const toggleMobileMenu = () => {
  console.log('Toggle mobile menu clicked - before:', isMobileMenuOpen.value)
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  console.log('Toggle mobile menu clicked - after:', isMobileMenuOpen.value)
  
  // Add/remove body scroll lock when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}
)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Clean up body overflow on unmount
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  will-change: transform;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  
  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  &__nav {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;
    box-sizing: border-box;
    
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
  }
  
  &__brand {
    flex-shrink: 0;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
  }
  
  &__menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    @media (max-width: 768px) {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      transform: translateY(-110%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      overflow-x: visible;
      max-height: calc(100vh - 70px);
      overflow-y: auto;
      z-index: 999;
      
      &--active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
  
  &__item {
    margin: 0;
    flex-shrink: 0;
  }
  
  &__link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    white-space: nowrap;
    min-width: 0;
    
    @media (max-width: 900px) and (min-width: 769px) {
      padding: 0.75rem 1rem;
    }
    
    &:hover {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
    }
    
    &--active {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.15);
    }
    
    @media (max-width: 768px) {
      justify-content: center;
      padding: 1rem;
      width: 100%;
    }
  }
  
  &__link-icon {
    margin-right: 0.5rem;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  &__link-text {
    @media (max-width: 900px) and (min-width: 769px) {
      display: none;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
  
  &__toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    @media (max-width: 768px) {
      display: flex;
    }
    
    span {
      width: 100%;
      height: 2px;
      background: #64748b;
      margin: 2px 0;
      transition: all 0.3s ease;
      transform-origin: center;
    }
    
    &--active {
      span:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
      }
      
      span:nth-child(2) {
        opacity: 0;
      }
      
      span:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
      }
    }
  }
}
</style>