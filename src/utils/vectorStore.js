import { pipeline, env } from '@xenova/transformers'

// Configure transformers to use CDN models
env.allowRemoteModels = true
env.allowLocalModels = false

export class LocalVectorStore {
  constructor() {
    this.embeddings = []
    this.documents = []
    this.model = null
    this.isInitialized = false
  }

  async initialize() {
    if (this.isInitialized) return

    try {
      console.log('Loading embedding model...')
      
      // Try to load the model with timeout
      const modelPromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        progress_callback: (progress) => {
          console.log('Model loading progress:', progress)
        }
      })
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Model loading timeout')), 30000)
      })
      
      this.model = await Promise.race([modelPromise, timeoutPromise])
      this.isInitialized = true
      console.log('Embedding model loaded successfully')
    } catch (error) {
      console.error('Failed to load embedding model:', error)
      
      // Log detailed error information
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      
      // Try fallback initialization without model
      console.log('Attempting fallback initialization...')
      this.initializeFallback()
    }
  }
  
  initializeFallback() {
    console.log('Using fallback mode - simple text matching')
    this.model = null
    this.isInitialized = true
    this.fallbackMode = true
  }

  async addDocument(document, chunks) {
    if (!this.isInitialized) {
      await this.initialize()
    }

    console.log(`Processing ${chunks.length} chunks for ${document.filename}`)
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      try {
        const embedding = this.fallbackMode ? 
          this.generateSimpleEmbedding(chunk) : 
          await this.generateEmbedding(chunk)
        
        this.embeddings.push(embedding)
        this.documents.push({
          id: `${document.filename}_chunk_${i}`,
          filename: document.filename,
          content: chunk,
          chunkIndex: i,
          type: document.type
        })
      } catch (error) {
        console.error(`Error processing chunk ${i} of ${document.filename}:`, error)
      }
    }

    console.log(`Added ${chunks.length} chunks from ${document.filename}. Total documents: ${this.documents.length}`)
  }

  async generateEmbedding(text) {
    if (!this.model && !this.fallbackMode) {
      throw new Error('Model not initialized')
    }
    
    if (this.fallbackMode) {
      return this.generateSimpleEmbedding(text)
    }

    const output = await this.model(text, { pooling: 'mean', normalize: true })
    return Array.from(output.data)
  }
  
  generateSimpleEmbedding(text) {
    // Simple fallback: create embedding based on word frequency and position
    const words = text.toLowerCase().split(/\s+/)
    const embedding = new Array(384).fill(0) // Match MiniLM dimension
    
    words.forEach((word, index) => {
      const hash = this.simpleHash(word)
      const pos = hash % 384
      embedding[pos] += 1 / (index + 1) // Weight by position
    })
    
    // Normalize
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
    return norm > 0 ? embedding.map(val => val / norm) : embedding
  }
  
  simpleHash(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  async search(query, topK = 5) {
    if (!this.isInitialized) {
      await this.initialize()
    }

    if (this.embeddings.length === 0) {
      return []
    }

    const queryEmbedding = this.fallbackMode ? 
      this.generateSimpleEmbedding(query) : 
      await this.generateEmbedding(query)
    const similarities = []

    for (let i = 0; i < this.embeddings.length; i++) {
      const similarity = this.cosineSimilarity(queryEmbedding, this.embeddings[i])
      similarities.push({
        index: i,
        similarity,
        document: this.documents[i]
      })
    }

    // Sort by similarity (descending) and return top K
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .filter(result => result.similarity > (this.fallbackMode ? 0.1 : 0.3))
  }

  cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length')
    }

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i]
      normA += vecA[i] * vecA[i]
      normB += vecB[i] * vecB[i]
    }

    normA = Math.sqrt(normA)
    normB = Math.sqrt(normB)

    if (normA === 0 || normB === 0) {
      return 0
    }

    return dotProduct / (normA * normB)
  }

  getStats() {
    return {
      totalDocuments: this.documents.length,
      totalEmbeddings: this.embeddings.length,
      isInitialized: this.isInitialized,
      uniqueFiles: [...new Set(this.documents.map(doc => doc.filename))].length,
      fallbackMode: this.fallbackMode || false
    }
  }

  clear() {
    this.embeddings = []
    this.documents = []
    this.fallbackMode = false
  }
}