'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 border border-gold/30 text-sm font-medium transition-all hover:border-gold"
      style={{ color: 'var(--gold)', borderColor: 'rgba(200,169,110,0.3)' }}
    >
      <span style={{ opacity: locale === 'en' ? 1 : 0.4 }}>EN</span>
      <span style={{ color: 'rgba(200,169,110,0.3)' }}>|</span>
      <span style={{ opacity: locale === 'ar' ? 1 : 0.4 }}>عربي</span>
    </button>
  )
}