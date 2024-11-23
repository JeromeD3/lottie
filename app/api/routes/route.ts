import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const appDirectory = path.join(process.cwd(), 'app')
    const entries = fs.readdirSync(appDirectory, { withFileTypes: true })
    
    const directories = entries
      .filter(entry => entry.isDirectory())
      .map(dir => dir.name)
      .filter(name => !name.startsWith('_') && !name.startsWith('.') && !name.startsWith('api'))

    return NextResponse.json({ directories })
  } catch (error) {
    console.error('Error reading directories:', error)
    return NextResponse.json({ directories: [] }, { status: 500 })
  }
} 
