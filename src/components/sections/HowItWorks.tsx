'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function HowItWorks() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [
    {
      num: t('how.step1Num'), title: t('how.step1Title'),
      desc: t('how.step1Desc'), tag: t('how.step1Tag'),
      icon: <RegisterIcon />,
    },
    {
      num: t('how.step2Num'), title: t('how.step2Title'),
      desc: t('how.step2Desc'), tag: t('how.step2Tag'),
      icon: <BrowseIcon />,
    },
    {
      num: t('how.step3Num'), title: t('how.step3Title'),
      desc: t('how.step3Desc'), tag: t('how.step3Tag'),
      icon: <ShortlistIcon />,
    },
    {
      num: t('how.step4Num'), title: t('how.step4Title'),
      desc: t('how.step4Desc'), tag: t('how.step4Tag'),
      icon: <HireIcon />,
    },
  ]

  return (
    <section id="how" style={{ padding: '100px 0', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '16px',
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
            {t('how.label')}
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300,
            lineHeight: 1.2, color: 'var(--white)',
          }}>
            {t('how.title1')}<br />{t('how.title2')}
          </h2>
        </motion.div>

        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2px', marginTop: '60px',
          border: '1px solid var(--border-soft)',
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'var(--navy-card)',
                padding: '40px 32px',
                borderLeft: i > 0 ? '1px solid var(--border-soft)' : 'none',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              whileHover={{ backgroundColor: 'var(--navy-light)' } as any}
            >
              <div className="font-display" style={{
                fontSize: '64px', fontWeight: 300,
                color: 'rgba(200,169,110,0.12)', lineHeight: 1, marginBottom: '20px',
              }}>
                {step.num}
              </div>
              <div style={{
                width: '44px', height: '44px',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', marginBottom: '20px',
              }}>
                {step.icon}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)', marginBottom: '10px' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.7 }}>
                {step.desc}
              </div>
              <div style={{
                display: 'inline-block', marginTop: '20px',
                padding: '4px 12px', border: '1px solid var(--border)',
                fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase',
                color: 'var(--gold-dim)', fontWeight: 500,
              }}>
                {step.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RegisterIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M6 9h6M6 6h6M6 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
}
function BrowseIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" /><path d="M2 16c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
}
function ShortlistIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v4M14.12 3.88l-2.83 2.83M16 9h-4M14.12 14.12l-2.83-2.83M9 16v-4M3.88 14.12l2.83-2.83M2 9h4M3.88 3.88l2.83 2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
}
function HireIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
