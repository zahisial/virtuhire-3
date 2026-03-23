'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'
import { AuthContext } from '@/context/AuthContext'   // <-- import context, not hook

type Notification = {
  id: number
  title: string
  message: string
  read: boolean
  created_at: string
}

interface NotificationContextType {
  unreadCount: number
  refreshNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext)   // <-- use context directly
  const user = auth?.user
  const isLoading = auth?.isLoading ?? true

  const [unreadCount, setUnreadCount] = useState(0)

  const refreshNotifications = async () => {
    if (!user || isLoading) return

    try {
      const data = await api.get<Notification[]>('/notifications/')
      const count = data.filter(n => !n.read).length
      setUnreadCount(count)
    } catch (err) {
      console.error('Failed to fetch notifications')
    }
  }

  useEffect(() => {
    if (user && !isLoading) {
      refreshNotifications()
      const interval = setInterval(refreshNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [user, isLoading])

  return (
    <NotificationContext.Provider value={{ unreadCount, refreshNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}