import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
export async function GET() {
  function getDirectories(dir: string, dirlist: string[] = []): string[] {
    const files = fs.readdirSync(dir)
    const whitelist = ['api', 'ui', 'dashboard']
    files.forEach((file) => {
      if (whitelist.includes(file)) return
      const fullPath = path.join(dir, file)
      if (fs.statSync(fullPath).isDirectory()) {
        dirlist.push(file)
        dirlist = getDirectories(fullPath, dirlist)
      }
    })
    return dirlist
  }

  const directories: string[] = getDirectories(path.join(process.cwd(), 'app/dashboard'))

  return NextResponse.json({ directories })
}
