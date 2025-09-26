<template>
  <div class="loading-spinner">
    <div class="loading-spinner__backdrop" @click="$emit('close')"></div>
    <div class="loading-spinner__content">
      <div class="loading-spinner__spinner">
        <div class="loading-spinner__dot"></div>
        <div class="loading-spinner__dot"></div>
        <div class="loading-spinner__dot"></div>
        <div class="loading-spinner__dot"></div>
      </div>
      <p class="loading-spinner__text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
})

const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
  }
  
  &__content {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  &__spinner {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;
  }
  
  &__dot {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
    &:nth-child(4) { animation-delay: 0.16s; }
  }
  
  &__text {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
