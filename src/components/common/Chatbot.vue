<template>
  <div class="chatbot" :class="{ 'chatbot--open': isOpen }">
    <!-- Chatbot Toggle Button -->
    <button 
      class="chatbot__toggle"
      @click="toggleChatbot"
      :aria-label="isOpen ? 'Close chatbot' : 'Open chatbot'"
    >
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-comments'"></i>
    </button>

    <!-- Chatbot Window -->
    <div v-if="isOpen" class="chatbot__window">
      <!-- Header -->
      <div class="chatbot__header">
        <div class="chatbot__header-info">
          <i class="fas fa-robot"></i>
          <div>
            <h3 class="chatbot__title">Document Assistant</h3>
            <p class="chatbot__subtitle">Ask me about Sunny's documents</p>
          </div>
        </div>
        <button class="chatbot__close" @click="toggleChatbot">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- File Upload Section -->
      <div v-if="!hasDocuments" class="chatbot__upload-section">
        <div class="chatbot__upload-area" :class="{ 'chatbot__upload-area--dragover': isDragOver }">
          <input
            ref="fileInput"
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt,.md,.csv"
            @change="handleFileUpload"
            class="chatbot__file-input"
          >
          <div 
            class="chatbot__upload-content"
            @click="$refs.fileInput.click()"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleFileDrop"
          >
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drop files here or click to upload</p>
            <small>Supports PDF, Word, TXT, Markdown, CSV</small>
          </div>
        </div>

        <div v-if="uploadStatus" class="chatbot__upload-status" :class="`chatbot__upload-status--${uploadStatus.type}`">
          {{ uploadStatus.message }}
        </div>
      </div>

      <!-- Document Stats -->
      <div v-if="hasDocuments" class="chatbot__stats">
        <div class="chatbot__stats-item">
          <i class="fas fa-file"></i>
          <span>{{ vectorStore.getStats().uniqueFiles }} files</span>
        </div>
        <div class="chatbot__stats-item">
          <i class="fas fa-database"></i>
          <span>{{ vectorStore.getStats().totalDocuments }} chunks</span>
        </div>
        <div v-if="vectorStore.getStats().fallbackMode" class="chatbot__stats-item chatbot__stats-item--warning">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Fallback mode</span>
        </div>
        <button class="chatbot__clear-btn" @click="clearDocuments">
          <i class="fas fa-trash"></i>
          Clear
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chatbot__messages" ref="messagesContainer">
        <div v-if="!hasDocuments && !isInitializing" class="chatbot__welcome">
          <i class="fas fa-robot"></i>
          <p>Hi! I'm your document assistant. Upload some documents about Sunny to get started, and I'll help you find information from them.
            <span v-if="vectorStore.getStats().fallbackMode" class="chatbot__fallback-notice">
              <br><small><i class="fas fa-info-circle"></i> Running in fallback mode with basic text matching.</small>
            </span>
          </p>
        </div>

        <div 
          v-for="message in messages" 
          :key="message.id"
          class="chatbot__message"
          :class="`chatbot__message--${message.type}`"
        >
          <div class="chatbot__message-avatar">
            <i :class="message.type === 'user' ? 'fas fa-user' : 'fas fa-robot'"></i>
          </div>
          <div class="chatbot__message-content">
            <div class="chatbot__message-text">{{ message.text }}</div>
            <div v-if="message.sources && message.sources.length > 0" class="chatbot__message-sources">
              <h4>Sources:</h4>
              <div 
                v-for="source in message.sources" 
                :key="source.id"
                class="chatbot__source"
              >
                <div class="chatbot__source-header">
                  <i class="fas fa-file-alt"></i>
                  <span>{{ source.filename }}</span>
                  <span class="chatbot__source-similarity">{{ Math.round(source.similarity * 100) }}% match</span>
                </div>
                <div class="chatbot__source-content">{{ source.content }}</div>
              </div>
            </div>
            <div class="chatbot__message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>

        <div v-if="isProcessing" class="chatbot__message chatbot__message--bot">
          <div class="chatbot__message-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="chatbot__message-content">
            <div class="chatbot__typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div v-if="hasDocuments && !isInitializing" class="chatbot__input-area">
        <div class="chatbot__input-wrapper">
          <input
            v-model="currentMessage"
            type="text"
            placeholder="Ask me anything about the documents..."
            class="chatbot__input"
            @keypress.enter="sendMessage"
            :disabled="isProcessing"
          >
          <button 
            class="chatbot__send-btn"
            @click="sendMessage"
            :disabled="!currentMessage.trim() || isProcessing"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { DocumentProcessor } from '@/utils/documentProcessor'
import { LocalVectorStore } from '@/utils/vectorStore'

// Reactive state
const isOpen = ref(false)
const isDragOver = ref(false)
const currentMessage = ref('')
const isProcessing = ref(false)
const uploadStatus = ref(null)
const messages = reactive([])

// Initialize services
const documentProcessor = new DocumentProcessor()
const vectorStore = new LocalVectorStore()

// Refs
const messagesContainer = ref(null)
const fileInput = ref(null)

// Computed
const hasDocuments = computed(() => vectorStore.getStats().totalDocuments > 0)

// Methods
const toggleChatbot = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleFileDrop = (event) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = async (files) => {
  if (files.length === 0) return

  uploadStatus.value = { type: 'info', message: 'Processing files...' }
  
  try {
    for (const file of files) {
      uploadStatus.value = { type: 'info', message: `Processing ${file.name}...` }
      
      const document = await documentProcessor.processFile(file)
      const chunks = documentProcessor.splitIntoChunks(document.content)
      
      await vectorStore.addDocument(document, chunks)
    }

    uploadStatus.value = { type: 'success', message: `Successfully processed ${files.length} file(s)!` }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      uploadStatus.value = null
    }, 3000)

    // Add welcome message
    addMessage('bot', "Great! I've processed your documents. You can now ask me questions about Sunny's information. Try asking something like 'What is Sunny's experience?' or 'What certifications does Sunny have?'")

  } catch (error) {
    console.error('Error processing files:', error)
    uploadStatus.value = { type: 'error', message: `Error: ${error.message}` }
  }
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isProcessing.value) return

  const userMessage = currentMessage.value.trim()
  currentMessage.value = ''

  // Add user message
  addMessage('user', userMessage)

  // Process query
  isProcessing.value = true
  
  try {
    const results = await vectorStore.search(userMessage, 5)
    
    if (results.length === 0) {
      addMessage('bot', "I couldn't find relevant information in the documents to answer your question. Try rephrasing your question or ask about different topics covered in the uploaded documents.")
    } else {
      // Combine results into a coherent answer
      const answer = generateAnswer(userMessage, results)
      const sources = results.map(result => ({
        id: result.document.id,
        filename: result.document.filename,
        content: result.document.content.substring(0, 200) + (result.document.content.length > 200 ? '...' : ''),
        similarity: result.similarity
      }))

      addMessage('bot', answer, sources)
    }
  } catch (error) {
    console.error('Error processing query:', error)
    addMessage('bot', 'Sorry, I encountered an error while processing your question. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const generateAnswer = (query, results) => {
  // Simple answer generation by combining relevant chunks
  const relevantInfo = results
    .filter(result => result.similarity > 0.4)
    .map(result => result.document.content)
    .join(' ')

  if (!relevantInfo) {
    return "I found some potentially relevant information, but it doesn't seem directly related to your question. Please try rephrasing your query."
  }

  // Basic answer formatting
  let answer = "Based on the documents, here's what I found:\n\n"
  
  // Try to extract the most relevant sentences
  const sentences = relevantInfo.split(/[.!?]+/).filter(s => s.trim().length > 10)
  const relevantSentences = sentences.slice(0, 3).map(s => s.trim()).filter(s => s.length > 0)
  
  if (relevantSentences.length > 0) {
    answer += relevantSentences.join('. ') + '.'
  } else {
    answer += relevantInfo.substring(0, 500) + (relevantInfo.length > 500 ? '...' : '')
  }

  return answer
}

const addMessage = (type, text, sources = null) => {
  messages.push({
    id: Date.now() + Math.random(),
    type,
    text,
    sources,
    timestamp: new Date()
  })

  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const clearDocuments = () => {
  vectorStore.clear()
  messages.splice(0)
  uploadStatus.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Initialize vector store on mount
onMounted(async () => {
  try {
    await vectorStore.initialize()
  } catch (error) {
    console.error('Failed to initialize chatbot:', error)
    uploadStatus.value = { type: 'error', message: 'Failed to initialize chatbot. Please refresh the page.' }
  }
})
</script>

<style lang="scss" scoped>
.chatbot {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10000;
  
  &__toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
    }
  }
  
  &__window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 400px;
    height: 600px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .dark & {
      background: var(--color-surface-elevated);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }
    
    @media (max-width: 480px) {
      width: calc(100vw - 2rem);
      height: calc(100vh - 6rem);
      bottom: 1rem;
      right: 1rem;
      left: 1rem;
    }
  }
  
  &__header {
    padding: 1.5rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      i {
        font-size: 1.5rem;
      }
    }
  }
  
  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
  
  &__subtitle {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
  }
  
  &__close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  &__upload-section {
    padding: 2rem;
    text-align: center;
  }
  
  &__upload-area {
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    
    .dark & {
      border-color: var(--color-border);
    }
    
    &:hover,
    &--dragover {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.05);
    }
  }
  
  &__file-input {
    display: none;
  }
  
  &__upload-content {
    i {
      font-size: 2rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      display: block;
    }
    
    p {
      font-weight: 500;
      color: #475569;
      margin-bottom: 0.5rem;
      
      .dark & {
        color: var(--color-text);
      }
    }
    
    small {
      color: #94a3b8;
      
      .dark & {
        color: var(--color-text-secondary);
      }
    }
  }
  
  &__upload-status {
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    
    &--info {
      background: #dbeafe;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
    
    &--success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    
    &--error {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
  }
  
  &__init-section {
    padding: 3rem 2rem;
    text-align: center;
  }
  
  &__init-content {
    p {
      font-weight: 500;
      color: #475569;
      margin: 1rem 0 0.5rem 0;
      
      .dark & {
        color: var(--color-text);
      }
    }
    
    small {
      color: #94a3b8;
      
      .dark & {
        color: var(--color-text-secondary);
      }
    }
  }
  
  &__spinner {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    &-dot {
      width: 8px;
      height: 8px;
      background: #3b82f6;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
      
      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
      &:nth-child(3) { animation-delay: 0s; }
    }
  }
  
  &__stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    
    .dark & {
      background: var(--color-surface);
      border-bottom-color: var(--color-border);
    }
    
    &-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #64748b;
      
      .dark & {
        color: var(--color-text-secondary);
      }
      
      i {
        color: #3b82f6;
      }
    }
  }
  
  &__stats-item--warning {
    color: #f59e0b;
    
    i {
      color: #f59e0b;
    }
  }
  
  &__clear-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  &__welcome {
    text-align: center;
    padding: 2rem 1rem;
    color: #64748b;
    
    .dark & {
      color: var(--color-text-secondary);
    }
    
    i {
      font-size: 2rem;
      color: #3b82f6;
      margin-bottom: 1rem;
      display: block;
    }
    
    p {
      line-height: 1.6;
      margin: 0;
    }
  }
  
  &__message {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    
    &--user {
      flex-direction: row-reverse;
      
      .chatbot__message-content {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        border-radius: 18px 18px 4px 18px;
      }
      
      .chatbot__message-avatar {
        background: #3b82f6;
      }
    }
    
    &--bot {
      .chatbot__message-content {
        background: #f1f5f9;
        color: #1e293b;
        border-radius: 18px 18px 18px 4px;
        
        .dark & {
          background: var(--color-surface);
          color: var(--color-text);
        }
      }
      
      .chatbot__message-avatar {
        background: #10b981;
      }
    }
  }
  
  &__message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  
  &__message-content {
    max-width: 75%;
    padding: 0.75rem 1rem;
    word-wrap: break-word;
  }
  
  &__message-text {
    line-height: 1.5;
    white-space: pre-wrap;
  }
  
  &__message-sources {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    
    .chatbot__message--bot & {
      border-top-color: #e2e8f0;
      
      .dark & {
        border-top-color: var(--color-border);
      }
    }
    
    h4 {
      font-size: 0.8rem;
      margin: 0 0 0.5rem 0;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  &__source {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 0.8rem;
    
    .chatbot__message--bot & {
      background: rgba(0, 0, 0, 0.05);
      
      .dark & {
        background: rgba(255, 255, 255, 0.05);
      }
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__source-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
    
    i {
      opacity: 0.7;
    }
  }
  
  &__source-similarity {
    margin-left: auto;
    font-size: 0.7rem;
    opacity: 0.7;
  }
  
  &__source-content {
    opacity: 0.8;
    line-height: 1.4;
  }
  
  &__message-time {
    font-size: 0.7rem;
    opacity: 0.6;
    margin-top: 0.5rem;
  }
  
  &__typing {
    display: flex;
    gap: 0.25rem;
    
    span {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
      
      &:nth-child(1) { animation-delay: 0s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
  
  &__input-area {
    padding: 1rem;
    border-top: 1px solid #e2e8f0;
    
    .dark & {
      border-top-color: var(--color-border);
    }
  }
  
  &__input-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  &__input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.3s ease;
    
    .dark & {
      background: var(--color-surface);
      border-color: var(--color-border);
      color: var(--color-text);
      
      &::placeholder {
        color: var(--color-text-secondary);
      }
    }
    
    &:focus {
      border-color: #3b82f6;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      transform: scale(1.05);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
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

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}
</style>