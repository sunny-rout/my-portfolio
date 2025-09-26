<template v-if="showModal">
  <div class="cert-modal__backdrop" @click="closeModal"></div>
  <div class="cert-modal__content">
    <button class="cert-modal__close" @click="closeModal" aria-label="Close">&times;</button>
    <iframe
      v-if="modalUrl.endsWith('.pdf')"
      :src="modalUrl"
      width="100%"
      height="500px"
      frameborder="0"
    ></iframe>
    <img
      v-else
      :src="modalUrl"
      alt="Credential"
      style="max-width:100%;max-height:80vh;display:block;margin:0 auto;"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  certifications: Array
})

const showModal = ref(false)
const modalUrl = ref('')

function openModal(url) {
  modalUrl.value = url
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  modalUrl.value = ''
}
</script>
<style lang="scss" scoped>
.cert-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
}

.cert-modal__content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
  padding: 2rem 1rem 1rem 1rem;
  z-index: 10000;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

.cert-modal__close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  z-index: 10001;
}
</style>