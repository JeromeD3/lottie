import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

// 数据文件路径
const dataFilePath = path.join(process.cwd(), 'data/users.json')

// 读取用户数据
async function getUsersData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // 如果文件不存在，返回空数组
    return []
  }
}

// 写入用户数据
async function writeUsersData(data: any) {
  try {
    // 确保目录存在
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing users data:', error)
    throw error
  }
}

// GET 获取所有用户
export async function GET() {
  const data = await getUsersData()
  return NextResponse.json(data)
}

// POST 创建新用户
export async function POST(request: Request) {
  try {
    const users = await getUsersData()
    const newUser = await request.json()
    
    // 生成新的ID
    const maxId = users.reduce((max: number, user: any) => Math.max(max, user.id || 0), 0)
    newUser.id = maxId + 1
    
    users.push(newUser)
    await writeUsersData(users)
    
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// PUT 更新用户
export async function PUT(request: Request) {
  try {
    const users = await getUsersData()
    const updatedUser = await request.json()
    
    const index = users.findIndex((user: any) => user.id === updatedUser.id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    users[index] = updatedUser
    await writeUsersData(users)
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE 删除用户
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id'))
    
    const users = await getUsersData()
    const filteredUsers = users.filter((user: any) => user.id !== id)
    
    if (users.length === filteredUsers.length) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    await writeUsersData(filteredUsers)
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
} 
