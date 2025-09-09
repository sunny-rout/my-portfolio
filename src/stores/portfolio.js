import { defineStore } from 'pinia'
import { portfolioData } from '@/data/portfolio-data'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    ...portfolioData,
    isLoading: false,
    activeSection: 'hero',
    theme: 'light'
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter(project => project.featured),
    skillsByCategory: (state) => state.skills.categories,
    recentCertifications: (state) => state.certifications.slice(0, 3)
  },

  actions: {
    setActiveSection(sectionId) {
      this.activeSection = sectionId
    },

    setLoading(loading) {
      this.isLoading = loading
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
})            