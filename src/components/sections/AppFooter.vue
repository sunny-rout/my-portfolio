<template>
  <footer class="app-footer">
    <div class="app-footer__container">
      <div class="app-footer__content">
        <div class="app-footer__brand">
          <h3 class="app-footer__name">{{ personalData.name }}</h3>
          <p class="app-footer__tagline">Principal Software Engineer</p>
          <p class="app-footer__description">
            Driving innovation through technical excellence and collaborative leadership.
          </p>
        </div>
        
        <div class="app-footer__links">
          <div class="app-footer__section">
            <h4 class="app-footer__section-title">Navigation</h4>
            <nav class="app-footer__nav">
              <a 
                v-for="item in navigationItems" 
                :key="item.id"
                :href="`#${item.id}`" 
                class="app-footer__link"
                @click.prevent="$emit('navigate', item.id)"
              >
                {{ item.label }}
              </a>
            </nav>
          </div>
          
          <div class="app-footer__section">
            <h4 class="app-footer__section-title">Connect</h4>
            <div class="app-footer__social">
              <a 
                v-for="social in socialMedia"
                :key="social.platform"
                :href="social.url"
                class="app-footer__social-link"
                :style="{ '--social-color': social.color }"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`Connect on ${social.platform}`"
              >
                <i :class="social.icon"></i>
                <span>{{ social.platform }}</span>
              </a>
            </div>
          </div>
          
          <div class="app-footer__section">
            <h4 class="app-footer__section-title">Contact</h4>
            <div class="app-footer__contact">
              <a :href="`mailto:${personalData.email}`" class="app-footer__contact-item">
                <i class="fas fa-envelope"></i>
                <span>{{ personalData.email }}</span>
              </a>
              <a :href="`tel:${personalData.phone}`" class="app-footer__contact-item">
                <i class="fas fa-phone"></i>
                <span>{{ personalData.phone }}</span>
              </a>
              <div class="app-footer__contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ personalData.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="app-footer__bottom">
        <div class="app-footer__bottom-content">
          <p class="app-footer__copyright">
            &copy; {{ currentYear }} {{ personalData.name }}. All rights reserved.
          </p>
          <p class="app-footer__built">
            Built with Vue.js & modern web technologies
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  personalData: Object,
  navigationItems: Array,
  socialMedia: Array
})

const emit = defineEmits(['navigate'])

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.app-footer {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #e2e8f0;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  &__content {
    padding: 4rem 2rem 2rem;
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 4rem;
    
    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  &__brand {
    max-width: 400px;
  }
  
  &__name {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }
  
  &__tagline {
    font-size: 1.1rem;
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  &__description {
    font-size: 1rem;
    line-height: 1.6;
    color: #94a3b8;
    margin-bottom: 0;
  }
  
  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
  
  &__section {
    &-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
      margin-bottom: 1rem;
    }
  }
  
  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  &__link {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #3b82f6;
      transform: translateX(4px);
    }
  }
  
  &__social {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  &__social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--social-color, #3b82f6);
      transform: translateX(4px);
    }
    
    i {
      width: 16px;
      font-size: 1rem;
    }
  }
  
  &__contact {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  &__contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #3b82f6;
    }
    
    i {
      width: 16px;
      font-size: 1rem;
    }
  }
  
  &__bottom {
    border-top: 1px solid #334155;
    padding: 2rem;
    
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      @media (max-width: 640px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  }
  
  &__copyright,
  &__built {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
  }
}
</style>
