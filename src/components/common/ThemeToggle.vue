<template>
  <div class="theme-toggle">
    <button 
      class="theme-toggle__button"
      @click="toggleTheme"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <Transition name="theme-icon" mode="out-in">
        <i 
          v-if="isDark" 
          key="sun"
          class="fas fa-sun theme-toggle__icon theme-toggle__icon--sun"
        ></i>
        <i 
          v-else 
          key="moon"
          class="fas fa-moon theme-toggle__icon theme-toggle__icon--moon"
        ></i>
      </Transition>
    </button>
    
    <!-- Optional: Theme selector dropdown -->
    <div v-if="showSelector" class="theme-toggle__selector">
      <select 
        v-model="storedTheme" 
        class="theme-toggle__select"
        @change="handleThemeChange"
      >
        <option :value="THEMES.SYSTEM">System</option>
        <option :value="THEMES.LIGHT">Light</option>
        <option :value="THEMES.DARK">Dark</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const props = defineProps({
  showSelector: {
    type: Boolean,
    default: false
  }
})

const { currentTheme, storedTheme, isDark, toggleTheme, setTheme, THEMES } = useTheme()

const handleThemeChange = (event) => {
  setTheme(event.target.value)
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--color-theme-toggle-bg);
    color: var(--color-theme-toggle-text);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:hover {
      background: var(--color-theme-toggle-hover);
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
    
    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }
  
  &__icon {
    font-size: 1.1rem;
    transition: all 0.3s ease;
    
    &--sun {
      color: #f59e0b;
    }
    
    &--moon {
      color: #6366f1;
    }
  }
  
  &__selector {
    position: relative;
  }
  
  &__select {
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.9rem;
    cursor: pointer;
    
    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 1px;
    }
  }
}

// Theme icon transitions
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
</style>