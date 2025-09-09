<template>
  <div id="app" class="app">
    <!-- Skip Navigation -->
    <a href="#main-content" class="app__skip-link" @click="handleSkipToMain">
      Skip to main content
    </a>
    
    <!-- Navigation Header -->
    <AppHeader 
      :navigation-items="portfolioStore.navigation"
      :personal-data="portfolioStore.personal"
      :active-section="portfolioStore.activeSection"
      @navigate="handleNavigation"
    />
    
    <!-- Main Content -->
    <main id="main-content" class="app__main">
      <HeroSection 
        :personal-data="portfolioStore.personal"
        @navigate="handleNavigation"
      />
      
      <AboutSection 
        :personal-data="portfolioStore.personal"
        :stats="portfolioStore.stats"
      />
      
      <SkillsSection :skills="portfolioStore.skills" />
      
      <ExperienceSection :experience="portfolioStore.experience" />
      
      <ProjectsSection :projects="portfolioStore.projects" />
      
      <CertificationsSection :certifications="portfolioStore.certifications" />
      
      <ContactSection 
        :personal-data="portfolioStore.personal"
        :social-media="portfolioStore.socialMedia"
      />
    </main>
    
    <!-- Footer -->
    <AppFooter 
      :personal-data="portfolioStore.personal"
      :navigation-items="portfolioStore.navigation"
      :social-media="portfolioStore.socialMedia"
    />
    
    <!-- Loading Spinner -->
    <LoadingSpinner v-if="portfolioStore.isLoading" />
    
    <!-- Back to Top Button -->
    <BackToTopButton />
    
    <!-- Toast Notifications -->
    <ToastNotifications />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'

// Components
import AppHeader from '@/components/sections/AppHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import AppFooter from '@/components/sections/AppFooter.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import BackToTopButton from '@/components/common/BackToTopButton.vue'
import ToastNotifications from '@/components/common/ToastNotifications.vue'

// Store
const portfolioStore = usePortfolioStore()

// Methods
const handleNavigation = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.offsetTop - headerOffset
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
    
    portfolioStore.setActiveSection(sectionId)
  }
}

const handleSkipToMain = (event) => {
  event.preventDefault()
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle
onMounted(() => {
  portfolioStore.setLoading(false)
})
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  color: var(--color-text-primary);
  
  &__skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    z-index: 1000;
    transition: top 0.2s ease;
    
    &:focus {
      top: 6px;
    }
  }
  
  &__main {
    flex: 1;
    
    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
    }
  }
}
</style>