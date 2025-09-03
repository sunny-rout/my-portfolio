<template>
  <section id="home" class="hero">
    <div class="hero-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-name">
            <span class="greeting">Hello, I'm</span>
            <span class="name">Sunny Vijay Rout</span>
          </h1>
          
          <h2 class="hero-title">
            <span class="typing-text">{{ displayText }}</span>
            <span class="cursor">|</span>
          </h2>
          
          <p class="hero-description">
            Experienced Software Engineer with <strong>8+ years</strong> of expertise in building 
            secure, scalable, and cloud-native applications. Specializing in DevOps automation, 
            CI/CD pipelines, and full-stack development.
          </p>
          
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">8+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat">
              <span class="stat-number">1M+</span>
              <span class="stat-label">Users Impacted</span>
            </div>
            <div class="stat">
              <span class="stat-number">40%</span>
              <span class="stat-label">Performance Boost</span>
            </div>
          </div>
          
          <div class="hero-actions">
            <a href="#projects" class="btn btn-primary">View My Work</a>
            <a href="#contact" class="btn btn-outline">Get In Touch</a>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="profile-card">
            <div class="profile-image">
              <div class="image-placeholder">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="60" fill="url(#gradient)"/>
                  <circle cx="60" cy="45" r="20" fill="white" opacity="0.9"/>
                  <path d="M30 90c0-16.569 13.431-30 30-30s30 13.431 30 30" fill="white" opacity="0.9"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#667eea"/>
                      <stop offset="100%" style="stop-color:#764ba2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div class="tech-icons">
              <div class="tech-icon">AWS</div>
              <div class="tech-icon">Docker</div>
              <div class="tech-icon">K8s</div>
              <div class="tech-icon">CI/CD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../styles/heroSection.css'

const displayText = ref('')
const titles = [
  'Principal Software Engineer',
  'AI Generalist',
  'DevOps Automation Specialist',
  'Full Stack Developer',
  'AWS Solutions Architect'
]

let currentTitleIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typewriterInterval = null

const typeWriter = () => {
  const currentTitle = titles[currentTitleIndex]
  
  if (isDeleting) {
    displayText.value = currentTitle.substring(0, currentCharIndex - 1)
    currentCharIndex--
    
    if (currentCharIndex === 0) {
      isDeleting = false
      currentTitleIndex = (currentTitleIndex + 1) % titles.length
    }
  } else {
    displayText.value = currentTitle.substring(0, currentCharIndex + 1)
    currentCharIndex++
    
    if (currentCharIndex === currentTitle.length) {
      setTimeout(() => {
        isDeleting = true
      }, 2000)
    }
  }
}

onMounted(() => {
  typewriterInterval = setInterval(typeWriter, isDeleting ? 50 : 100)
})

onUnmounted(() => {
  if (typewriterInterval) {
    clearInterval(typewriterInterval)
  }
})
</script>
