<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <div class="nav-logo">
          <a href="#home" class="logo-link">
            <img src="/sr.svg" alt="Sunny Rout Logo" class="logo-image" />
          </a>
        </div>
        
        <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
          <a href="#home" @click="closeMobileMenu" :class="{ 'active': activeSection === 'home' }">Home</a>
          <a href="#about" @click="closeMobileMenu" :class="{ 'active': activeSection === 'about' }">About</a>
          <a href="#skills" @click="closeMobileMenu" :class="{ 'active': activeSection === 'skills' }">Skills</a>
          <a href="#projects" @click="closeMobileMenu" :class="{ 'active': activeSection === 'projects' }">Projects</a>
          <a href="#experience" @click="closeMobileMenu" :class="{ 'active': activeSection === 'experience' }">Experience</a>
          <a href="#contact" @click="closeMobileMenu" :class="{ 'active': activeSection === 'contact' }">Contact</a>
        </div>
        
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../styles/navigation.css'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  // Update active section based on scroll position
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
  const scrollPosition = window.scrollY + 100
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section
        break
      }
    }
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
