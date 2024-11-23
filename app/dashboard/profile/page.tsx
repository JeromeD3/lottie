"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, User, Upload } from "lucide-react"

interface UserData {
  name: string
  email: string
  avatarUrl: string
}

const USER_UPDATED_EVENT = 'user-data-updated'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/profile/update')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
        setFormData({
          name: data.name,
          email: data.email
        })
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('用户名不能为空')
      return
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('请输入有效的邮箱地址')
      return
    }
    
    setIsLoading(true)

    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('更新失败')
      }

      await fetchUserData()
      window.dispatchEvent(new Event(USER_UPDATED_EVENT))
      toast.success('更新成功')
    } catch (error) {
      toast.error('更新失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 顶部信息卡片 */}
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                <AvatarFallback className="text-4xl">{userData.name[0]}</AvatarFallback>
              </Avatar>
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="h-4 w-4 mr-1" />
                更换头像
              </Button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground mt-2">{userData.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 基本信息编辑 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <p className="text-sm text-muted-foreground">
            更新您的个人信息
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                用户名
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="输入新的用户名"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                邮箱
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="输入新的邮箱地址"
                required
              />
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "更新中..." : "保存更改"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
