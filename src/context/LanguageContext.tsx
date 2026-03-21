'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

type Locale = 'en' | 'ar'

const translations = { en, ar }

interface LanguageContextType {
  locale: Locale
  t: (key: string) => string
  toggleLanguage: () => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  const toggleLanguage = () => {
    setLocale(prev => prev === 'en' ? 'ar' : 'en')
  }

  const isRTL = locale === 'ar'

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, isRTL])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
