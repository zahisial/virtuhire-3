'use client'

import { ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

interface LegalPageProps {
  title: string
  children: ReactNode
}

export default function LegalPage({ title, children }: LegalPageProps) {
  const { isRTL } = useLanguage()

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        background: 'var(--navy)',
        paddingTop: '120px',
        paddingBottom: '100px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="font-display" style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 300,
            color: 'var(--white)',
            marginBottom: '32px',
            borderBottom: '1px solid var(--border-soft)',
            paddingBottom: '16px',
          }}>
            {title}
          </h1>
          <div style={{
            fontSize: '15px',
            color: 'var(--white-dim)',
            lineHeight: 1.8,
          }}>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}