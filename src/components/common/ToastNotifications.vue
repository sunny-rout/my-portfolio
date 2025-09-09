<template>
  <div class="toast-notifications">
    <TransitionGroup name="toast" tag="div" class="toast-notifications__container">
      <div 
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-notification"
        :class="`toast-notification--${toast.type}`"
        @click="removeToast(toast.id)"
      >
        <div class="toast-notification__icon">
          <i :class="getToastIcon(toast.type)"></i>
        </div>
        <div class="toast-notification__content">
          <div class="toast-notification__title">{{ toast.title }}</div>
          <div v-if="toast.message" class="toast-notification__message">{{ toast.message }}</div>
        </div>
        <button class="toast-notification__close" @click.stop="removeToast(toast.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])

const getToastIcon = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }
  return icons[type] || icons.info
}

const addToast = (toast) => {
  const id = Date.now() + Math.random()
  const newToast = { id, ...toast }
  toasts.value.push(newToast)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(id)
  }, 5000)
  
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose methods for external use
defineExpose({
  addToast,
  removeToast
})
</script>

<style lang="scss" scoped>
.toast-notifications {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  
  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
  }
}

.toast-notification {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-left: 4px solid;
  
  &--success {
    border-left-color: #10b981;
    
    .toast-notification__icon {
      color: #10b981;
    }
  }
  
  &--error {
    border-left-color: #ef4444;
    
    .toast-notification__icon {
      color: #ef4444;
    }
  }
  
  &--warning {
    border-left-color: #f59e0b;
    
    .toast-notification__icon {
      color: #f59e0b;
    }
  }
  
  &--info {
    border-left-color: #3b82f6;
    
    .toast-notification__icon {
      color: #3b82f6;
    }
  }
  
  &__icon {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
  
  &__content {
    flex: 1;
  }
  
  &__title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  
  &__message {
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.4;
  }
  
  &__close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: #6b7280;
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
