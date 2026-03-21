'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }
  }),
}

export default function Hero() {
  const { t, isRTL } = useLanguage()

  const miniCards = [
    { titleKey: 'hero.card1Title', descKey: 'hero.card1Desc', icon: <ContractIcon /> },
    { titleKey: 'hero.card2Title', descKey: 'hero.card2Desc', icon: <VoiceIcon /> },
    { titleKey: 'hero.card3Title', descKey: 'hero.card3Desc', icon: <CandidateIcon /> },
    { titleKey: 'hero.card4Title', descKey: 'hero.card4Desc', icon: <BillingIcon /> },
  ]

  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
      padding: '120px 5% 80px',
      overflow: 'hidden',
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(200,169,110,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1100px', width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '80px',
        alignItems: 'center',
      }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Left — Text */}
        <div>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
              textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '24px',
            }}
          >
            <span style={{ width: '28px', height: '1px', background: 'var(--gold)', display: 'block' }} />
            {t('hero.eyebrow')}
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            className="font-display"
            style={{
              fontSize: 'clamp(42px, 5vw, 68px)',
              fontWeight: 300, lineHeight: 1.1,
              color: 'var(--white)', marginBottom: '24px',
            }}
          >
            {t('hero.title1')}<br />
            {t('hero.title2')}<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
              {t('hero.title3')}
            </em>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            style={{
              fontSize: '15px', fontWeight: 300,
              color: 'var(--white-dim)', lineHeight: 1.8,
              marginBottom: '40px', maxWidth: '440px',
            }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <a href="#client" style={{
              padding: '16px 36px',
              background: 'var(--gold)', border: '1px solid var(--gold)',
              color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.5px', cursor: 'pointer',
              textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: '10px', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <ArrowIcon />
              {t('hero.cta1')}
            </a>
            <a href="#candidate" style={{
              padding: '16px 36px',
              background: 'transparent', border: '1px solid rgba(200,169,110,0.35)',
              color: 'var(--white)', fontSize: '14px', fontWeight: 400,
              letterSpacing: '0.5px', cursor: 'pointer',
              textDecoration: 'none', display: 'inline-flex',
              alignItems: 'center', gap: '10px', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)'; e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {t('hero.cta2')}
              <ArrowIcon />
            </a>
          </motion.div>
        </div>

        {/* Right — Stats */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          className="hidden lg:flex"
        >
          {/* Big stat */}
          <div style={{
            background: 'var(--navy-card)',
            border: '1px solid var(--border-soft)',
            padding: '28px 32px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '3px', height: '100%', background: 'var(--gold)',
            }} />
            <div className="font-display" style={{ fontSize: '48px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>
              {t('hero.stat1Value')}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--white-dim)', marginTop: '6px' }}>
              {t('hero.stat1Label')}
            </div>
          </div>

          {/* Mini cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {miniCards.map((card, i) => (
              <div key={i} style={{
                background: 'var(--navy-card)',
                border: '1px solid var(--border-soft)',
                padding: '20px 22px',
              }}>
                <div style={{
                  width: '32px', height: '32px',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px', color: 'var(--gold)',
                }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>
                  {t(card.titleKey)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.5 }}>
                  {t(card.descKey)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ContractIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 7h6M4 4.5h6M4 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function VoiceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 13c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CandidateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function BillingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 11l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
