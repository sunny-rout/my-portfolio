import * as pdfjsLib from 'pdfjs-dist/webpack'
import mammoth from 'mammoth'
import Papa from 'papaparse'
import { marked } from 'marked'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

export class DocumentProcessor {
  constructor() {
    this.supportedTypes = {
      'application/pdf': this.processPDF,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': this.processDOCX,
      'application/msword': this.processDOC,
      'text/plain': this.processTXT,
      'text/markdown': this.processMarkdown,
      'text/csv': this.processCSV,
      'application/vnd.ms-excel': this.processCSV,
      'text/x-markdown': this.processMarkdown
    }
  }

  async processFile(file) {
    const processor = this.supportedTypes[file.type]
    if (!processor) {
      throw new Error(`Unsupported file type: ${file.type}`)
    }

    try {
      const text = await processor.call(this, file)
      return {
        filename: file.name,
        content: text,
        type: file.type,
        size: file.size
      }
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error)
      throw new Error(`Failed to process ${file.name}: ${error.message}`)
    }
  }

  async processPDF(file) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + '\n'
    }

    return fullText.trim()
  }

  async processDOCX(file) {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  }

  async processDOC(file) {
    // For older DOC files, we'll try the same approach as DOCX
    // Note: This might not work perfectly for all DOC files
    return this.processDOCX(file)
  }

  async processTXT(file) {
    return await file.text()
  }

  async processMarkdown(file) {
    const text = await file.text()
    // Convert markdown to plain text by removing markdown syntax
    const html = marked(text)
    // Simple HTML to text conversion
    return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
  }

  async processCSV(file) {
    const text = await file.text()
    const parsed = Papa.parse(text, { header: true })
    
    // Convert CSV rows to readable text
    return parsed.data.map(row => {
      return Object.entries(row)
        .filter(([key, value]) => value && value.trim())
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    }).join('\n')
  }

  // Split text into chunks for better semantic search
  splitIntoChunks(text, maxChunkSize = 800, overlap = 100) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const chunks = []
    let currentChunk = ''

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim()
      if (!trimmedSentence) continue

      const potentialChunk = currentChunk + (currentChunk ? '. ' : '') + trimmedSentence

      if (potentialChunk.length <= maxChunkSize) {
        currentChunk = potentialChunk
      } else {
        if (currentChunk) {
          chunks.push(currentChunk + '.')
          // Add overlap
          const words = currentChunk.split(' ')
          const overlapWords = words.slice(-Math.floor(overlap / 6)) // Approximate word count for overlap
          currentChunk = overlapWords.join(' ') + '. ' + trimmedSentence
        } else {
          // Single sentence is too long, split by words
          const words = trimmedSentence.split(' ')
          for (let i = 0; i < words.length; i += Math.floor(maxChunkSize / 6)) {
            const wordChunk = words.slice(i, i + Math.floor(maxChunkSize / 6)).join(' ')
            chunks.push(wordChunk)
          }
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk + '.')
    }

    return chunks.filter(chunk => chunk.trim().length > 20) // Filter out very short chunks
  }
}