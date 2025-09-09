<template>
  <section class="about-section" id="about">
    <div class="about-section__container">
      <div class="about-section__header">
        <h2 class="about-section__heading">About Me</h2>
        <p class="about-section__subtitle">
          Driving change through technical excellence and collaborative leadership
        </p>
      </div>
      
      <div class="about-section__content">
        <div class="about-section__text" :class="{ 'about-section__text--visible': isVisible }">
          <div class="about-section__intro">
            <p class="about-section__paragraph">
              As a seasoned Software Engineer with over <strong>{{ personalData.yearsExperience }}+ years of experience</strong>, 
              I excel at driving change and bridging the gap between technical teams and business goals. 
              My focus isn't just on code; it's on <strong>orchestrating projects, optimizing processes</strong>, 
              and mentoring teams to deliver high-impact, scalable solutions that drive business value.
            </p>
            
            <p class="about-section__paragraph">
              I champion <strong>agile methodologies</strong> and use a transparent, collaborative approach 
              to solve complex challenges across <strong>DevOps, CI/CD automation</strong>, and full-stack development. 
              My expertise spans from architecting cloud-native solutions to leading cross-functional teams 
              in delivering mission-critical applications.
            </p>
          </div>
          
          <div class="about-section__highlights">
            <h3 class="about-section__highlights-heading">What Sets Me Apart</h3>
            <ul class="about-section__highlights-list">
              <li class="about-section__highlight-item">
                <i class="fas fa-rocket about-section__highlight-icon"></i>
                <span><strong>Process Leadership:</strong> Successfully reduced deployment time by 70% and build times by 40%</span>
              </li>
              <li class="about-section__highlight-item">
                <i class="fas fa-users about-section__highlight-icon"></i>
                <span><strong>Team Mentoring:</strong> Guided teams through complex technical transformations and agile adoption</span>
              </li>
              <li class="about-section__highlight-item">
                <i class="fas fa-cloud about-section__highlight-icon"></i>
                <span><strong>Cloud Architecture:</strong> Designed scalable serverless solutions and Infrastructure as Code implementations</span>
              </li>
              <li class="about-section__highlight-item">
                <i class="fas fa-shield-alt about-section__highlight-icon"></i>
                <span><strong>Security Focus:</strong> Implemented threat modeling and security-first development practices</span>
              </li>
            </ul>
          </div>
          
          <div class="about-section__actions">
            <button class="about-section__resume-btn">
              <i class="fas fa-download"></i>
              <span>Download Resume</span>
            </button>
          </div>
        </div>
        
        <div class="about-section__stats">
          <div 
            v-for="(value, key) in stats" 
            :key="key" 
            class="about-section__stat-item"
            :class="{ 'about-section__stat-item--animated': isVisible }"
          >
            <div 
              class="about-section__stat-number" 
              :data-target="value"
            >
              {{ animatedStats[key] || 0 }}{{ getStatSuffix(key, value) }}
            </div>
            <div class="about-section__stat-label">{{ formatStatLabel(key) }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  personalData: Object,
  stats: Object
})

const isVisible = ref(false)
const animatedStats = reactive({})

const { observeElement } = useScrollAnimation()

// Methods
const formatStatLabel = (key) => {
  const labels = {
    yearsExperience: 'Years Experience',
    projectsCompleted: 'Projects Completed',
    usersImpacted: 'Users Impacted',
    genAICertifications: 'Gen AI Certifications',
    awsCertifications: 'AWS Certifications',
    technologiesUsed: 'Technologies Used',
    teamsLed: 'Teams Led'
  }
  return labels[key] || key
}

const displayValue = (value) => {
  if (value > 1000000) return (value / 1000000)
  if (value >= 1000) return (value / 1000)
  return value
}
const displaySuffix = (value) => {
  if (value > 1000000) return 'M+'
  if (value >= 1000) return 'K+'
  return value
}

const getStatSuffix = (key, value) => {
  if (key === 'usersImpacted' && value >= 1000000) return displaySuffix(value)
  if (key === 'technologiesUsed') return '+'
  if (key === 'projectsCompleted') return '+'
  return ''
}

const animateStats = () => {
  Object.keys(props.stats).forEach((key) => {
    const target = displayValue(props.stats[key])
    const increment = target / 100
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedStats[key] = target
        clearInterval(timer)
      } else {
        animatedStats[key] = Math.floor(current)
      }
    }, 20)
  })
}

onMounted(() => {
  const section = document.getElementById('about')
  if (section) {
    observeElement(section, () => {
      if (!isVisible.value) { // Prevent multiple triggers
        isVisible.value = true
        setTimeout(animateStats, 300)
      }
    }, { threshold: 0.3 })
  }
})
</script>

<style lang="scss" scoped>
.about-section {
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
  
  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
    
    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  &__text {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  &__intro {
    margin-bottom: 2rem;
  }
  
  &__paragraph {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #475569;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    strong {
      color: #1e293b;
      font-weight: 600;
    }
  }
  
  &__highlights {
    margin-bottom: 2rem;
    
    &-heading {
      font-size: 1.3rem;
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
  
  &__highlight-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__highlight-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    margin-top: 0.1rem;
  }
  
  &__actions {
    margin-top: 2rem;
  }
  
  &__resume-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
  }
  
  &__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
    @media (max-width: 968px) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  &__stat-item {
    background: white;
    padding: 2rem 1.5rem;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    &--animated {
      animation: fadeInUp 0.6s ease-out;
    }
  }
  
  &__stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  
  &__stat-label {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
