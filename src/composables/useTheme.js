import { ref, computed, watch, onMounted } from 'vue'

const THEME_KEY = 'portfolio-theme'
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// Global theme state
const storedTheme = ref(localStorage.getItem(THEME_KEY) || THEMES.SYSTEM)
const systemTheme = ref('light')

export function useTheme() {
  // Computed current theme based on stored preference and system theme
  const currentTheme = computed(() => {
    if (storedTheme.value === THEMES.SYSTEM) {
      return systemTheme.value
    }
    return storedTheme.value
  })

  // Check if current theme is dark
  const isDark = computed(() => currentTheme.value === THEMES.DARK)

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT
    }
    return THEMES.LIGHT
  }

  // Update system theme
  const updateSystemTheme = () => {
    systemTheme.value = getSystemTheme()
  }

  // Set theme preference
  const setTheme = (theme) => {
    if (Object.values(THEMES).includes(theme)) {
      storedTheme.value = theme
      localStorage.setItem(THEME_KEY, theme)
    }
  }

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    const newTheme = currentTheme.value === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    setTheme(newTheme)
  }

  // Apply theme to document
  const applyTheme = (theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove(THEMES.LIGHT, THEMES.DARK)
      root.classList.add(theme)
      root.setAttribute('data-theme', theme)
    }
  }

  // Initialize theme system
  const initTheme = () => {
    updateSystemTheme()
    
    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateSystemTheme)
      
      // Cleanup function
      return () => {
        mediaQuery.removeEventListener('change', updateSystemTheme)
      }
    }
  }

  // Watch for theme changes and apply them
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  return {
    currentTheme,
    storedTheme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
    THEMES
  }
}