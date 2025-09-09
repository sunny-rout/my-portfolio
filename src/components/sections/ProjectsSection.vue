<template>
  <section class="projects-section" id="projects">
    <div class="projects-section__container">
      <div class="projects-section__header">
        <h2 class="projects-section__heading">Featured Projects</h2>
        <p class="projects-section__subtitle">
          Showcasing impactful solutions and technical excellence
        </p>
      </div>
      
      <div class="projects-section__filters">
        <button 
          v-for="filter in filters"
          :key="filter.value"
          class="projects-section__filter"
          :class="{ 'projects-section__filter--active': activeFilter === filter.value }"
          @click="setActiveFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <div class="projects-section__grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @view-details="handleViewDetails"
        />
      </div>
      
      <div v-if="filteredProjects.length === 0" class="projects-section__empty">
        <i class="fas fa-search"></i>
        <p>No projects found for the selected category.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const props = defineProps({
  projects: Array
})

const activeFilter = ref('all')

const filters = ref([
  { label: 'All Projects', value: 'all' },
  { label: 'Desktop', value: 'desktop' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Enterprise', value: 'enterprise' }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return props.projects
  }
  return props.projects.filter(project => project.category === activeFilter.value)
})

const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

const handleViewDetails = (project) => {
  // Handle project details view
  console.log('View project details:', project)
}
</script>

<style lang="scss" scoped>
.projects-section {
  padding: 5rem 0;
  background: white;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  &__header {
    text-align: center;
    margin-bottom: 3rem;
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
  
  &__filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  
  &__filter {
    padding: 0.75rem 1.5rem;
    background: #f1f5f9;
    color: #64748b;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #e2e8f0;
      color: #475569;
    }
    
    &--active {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      
      &:hover {
        background: linear-gradient(135deg, #2563eb, #1e40af);
      }
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  &__empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
    
    i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #cbd5e1;
    }
    
    p {
      font-size: 1.1rem;
      margin: 0;
    }
  }
}
</style>
