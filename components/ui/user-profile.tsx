"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  avatarUrl: string
}

// 使用相同的事件名
const USER_UPDATED_EVENT = 'user-data-updated'

export function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/profile/update')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
    
    // 监听用户数据更新事件
    const handleUserUpdate = () => {
      fetchUserData()
    }
    
    window.addEventListener(USER_UPDATED_EVENT, handleUserUpdate)
    
    return () => {
      window.removeEventListener(USER_UPDATED_EVENT, handleUserUpdate)
    }
  }, [])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <Link href="/profile">
      <Card className="w-full border-none shadow-none bg-transparent hover:bg-accent/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4 p-2">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback className="bg-primary/5">{userData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <div className="text-sm text-muted-foreground">
              {userData.email}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
} 
