import { pipeline, env } from '@xenova/transformers'

// Configure transformers to use local models
env.allowRemoteModels = false
env.allowLocalModels = true
env.localModelPath = '/models/'

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
      this.model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
      this.isInitialized = true
      console.log('Embedding model loaded successfully')
    } catch (error) {
      console.error('Failed to load embedding model:', error)
      
      // Add detailed error logging
      if (error.response) {
        try {
          const text = await error.response.text()
          console.error('Server returned:', text)
        } catch (textError) {
          console.error('Could not read error response:', textError)
        }
      }
      
      throw new Error('Failed to initialize vector store')
    }
  }

  async addDocument(document, chunks) {
    if (!this.isInitialized) {
      await this.initialize()
    }

    console.log(`Processing ${chunks.length} chunks for ${document.filename}`)
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      try {
        const embedding = await this.generateEmbedding(chunk)
        
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
    if (!this.model) {
      throw new Error('Model not initialized')
    }

    const output = await this.model(text, { pooling: 'mean', normalize: true })
    return Array.from(output.data)
  }

  async search(query, topK = 5) {
    if (!this.isInitialized) {
      await this.initialize()
    }

    if (this.embeddings.length === 0) {
      return []
    }

    const queryEmbedding = await this.generateEmbedding(query)
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
      .filter(result => result.similarity > 0.3) // Filter out very low similarity results
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
      uniqueFiles: [...new Set(this.documents.map(doc => doc.filename))].length
    }
  }

  clear() {
    this.embeddings = []
    this.documents = []
  }
}