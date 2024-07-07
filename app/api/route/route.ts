import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
export async function GET() {
  function getDirectories(dir: string, dirlist: string[] = []): string[] {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
      if (file === 'api') return
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        dirlist.push(file)
        dirlist = getDirectories(fullPath, dirlist)
      }
    })
    return dirlist
  }

  const directories: string[] = getDirectories(path.join(process.cwd(), 'app'))

  return NextResponse.json({ directories })
}
