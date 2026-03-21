'use client'
// src/context/AuthContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI, saveTokens, saveUser, clearTokens, getUser, getAccessToken } from '@/lib/api'

interface AuthContextType {
  user: any
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<any>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const stored = getUser()
    if (stored && getAccessToken()) setUser(stored)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res: any = await authAPI.login(email, password)
    saveTokens(res.tokens.access, res.tokens.refresh)
    saveUser(res.user)
    setUser(res.user)
  }

  const register = async (data: any) => {
    const res: any = await authAPI.register(data)
    saveTokens(res.tokens.access, res.tokens.refresh)
    saveUser(res.user)
    setUser(res.user)
  }

  const logout = () => {
    clearTokens()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}