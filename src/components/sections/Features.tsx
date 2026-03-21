'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const features = [
  {
    titleKey: 'features.f1Title', descKey: 'features.f1Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a5 5 0 100 10A5 5 0 0010 2zM3 18a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  },
  {
    titleKey: 'features.f2Title', descKey: 'features.f2Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 4V3a1 1 0 011-1h6a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  {
    titleKey: 'features.f3Title', descKey: 'features.f3Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M6 10h8M6 7h5M6 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  },
  {
    titleKey: 'features.f4Title', descKey: 'features.f4Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 6v6c0 4 3.5 7.74 8 8 4.5-.26 8-4 8-8V6l-8-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    titleKey: 'features.f5Title', descKey: 'features.f5Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 14l3-3 3 3 3-4 3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><rect x="2" y="2" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  {
    titleKey: 'features.f6Title', descKey: 'features.f6Desc',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
]

export default function Features() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="categories" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '16px',
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
            {t('features.label')}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300,
            lineHeight: 1.2, color: 'var(--white)',
          }}>
            {t('features.title')}
          </h2>
        </motion.div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2px',
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                background: 'var(--navy-card)',
                padding: '40px 36px',
                border: '1px solid var(--border-soft)',
                transition: 'border-color 0.3s',
              }}
              whileHover={{ borderColor: 'rgba(200,169,110,0.2)' } as any}
            >
              <div style={{
                width: '48px', height: '48px',
                marginBottom: '24px',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)',
              }}>
                {feature.icon}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)', marginBottom: '12px' }}>
                {t(feature.titleKey)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.8 }}>
                {t(feature.descKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
