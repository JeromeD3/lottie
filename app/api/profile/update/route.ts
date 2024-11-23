import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function PUT(request: Request) {
  try {
    const { name, email } = await request.json()

    // 读取用户数据
    const filePath = path.join(process.cwd(), 'data', 'users.json')
    const fileData = await fs.readFile(filePath, 'utf8')
    const userData = JSON.parse(fileData)

    // 更新用户信息
    userData.currentUser.name = name
    userData.currentUser.email = email

    // 写回文件
    await fs.writeFile(filePath, JSON.stringify(userData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update failed:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

// 获取当前用户信息
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json')
    const fileData = await fs.readFile(filePath, 'utf8')
    const userData = JSON.parse(fileData)

    return NextResponse.json(userData.currentUser)
  } catch (error) {
    console.error('Failed to get profile:', error)
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    )
  }
} 
