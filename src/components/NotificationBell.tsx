// // // src/components/NotificationBell.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { api } from '@/lib/api'

type Notification = {
  id: number
  title: string
  message: string
  read: boolean
  created_at: string
}

export default function NotificationBell() {
  const { isRTL } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [open, setOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const data = await api.get<Notification[]>('/notifications/')
      setNotifications(data)
      setUnreadCount(data.filter(n => !n.read).length)
    } catch (err) {
      console.error('Failed to fetch notifications')
    }
  }

  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/notifications/${id}/`, { read: true })
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      )
      setUnreadCount(prev => prev - 1)
    } catch (err) {
      console.error('Failed to mark as read')
    }
  }

  const markAllAsRead = async () => {
    try {
      await api.post('/notifications/mark-all-read/', {})
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark all as read')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          color: 'var(--white-dim)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2a5 5 0 0 1 5 5c0 2.5 1 4 2 5h-4a3 3 0 0 1-6 0H3c1-1 2-2.5 2-5a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <circle cx="10" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: '2px', right: '2px',
            background: 'var(--gold)', color: 'var(--navy)',
            fontSize: '10px', fontWeight: 'bold',
            borderRadius: '10px', padding: '0 4px', minWidth: '16px',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: '320px', maxHeight: '400px', overflowY: 'auto',
              background: 'var(--navy-card)', border: '1px solid var(--border-soft)',
              borderRadius: '4px', zIndex: 1000,
            }}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>
                {isRTL ? 'الإشعارات' : 'Notifications'}
              </span>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} style={{ fontSize: '11px', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {isRTL ? 'تحديد الكل كمقروء' : 'Mark all as read'}
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--white-dim)', fontSize: '13px' }}>
                {isRTL ? 'لا توجد إشعارات' : 'No notifications'}
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-soft)',
                    background: n.read ? 'transparent' : 'rgba(200,169,110,0.08)',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: n.read ? 400 : 500, color: 'var(--white)' }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--white-dim)', marginTop: '4px' }}>
                    {n.message}
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(168,159,146,0.6)', marginTop: '8px' }}>
                    {new Date(n.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}