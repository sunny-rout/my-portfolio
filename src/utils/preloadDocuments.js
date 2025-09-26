import { DocumentProcessor } from './documentProcessor'
import { LocalVectorStore } from './vectorStore'

export class DocumentPreloader {
  constructor() {
    this.documentProcessor = new DocumentProcessor()
    this.vectorStore = new LocalVectorStore()
  }

  async preloadPublicDocuments() {
    const publicDocuments = [
      '/doc/resume/Sunny_Rout.pdf',
      '/doc/cover-letter/Sunny_Vijay_Rout_Cover_Letter.docx',
      '/doc/certificates/Gen-AI-Foundation.pdf',
      '/doc/certificates/AI-Engineer-Mastermind.pdf',
      '/doc/certificates/Generative-AI-Mastermind.pdf',
      '/doc/certificates/Devops-Engineering-AWS.pdf',
      '/doc/certificates/Architect-On-AWS.pdf',
      '/doc/certificates/AWS-Technical-Essentials.pdf'
    ]

    await this.vectorStore.initialize()

    for (const docPath of publicDocuments) {
      try {
        const response = await fetch(docPath)
        if (!response.ok) continue

        const blob = await response.blob()
        const fileName = docPath.split('/').pop()
        const fileType = fileName.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf'
        const file = new File([blob], fileName, { type: fileType })
        
        const document = await this.documentProcessor.processFile(file)
        const chunks = this.documentProcessor.splitIntoChunks(document.content)
        
        await this.vectorStore.addDocument(document, chunks)
        console.log(`Preloaded: ${docPath}`)
      } catch (error) {
        console.warn(`Failed to preload ${docPath}:`, error)
      }
    }

    return this.vectorStore
  }
}