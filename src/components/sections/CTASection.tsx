'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function CTASection() {
  const { t, isRTL } = useLanguage()

  return (
    <section style={{ padding: '100px 0', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4px' }}>

          {/* Talent Card — Gold */}
          <motion.div
            id="candidate"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              padding: '60px 52px',
              background: 'var(--gold)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
              color: 'rgba(8,13,26,0.55)', fontWeight: 500, marginBottom: '16px',
            }}>
              {t('cta.talentEyebrow')}
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300,
              color: 'var(--navy)', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {t('cta.talentTitle')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--navy)', opacity: 0.7, lineHeight: 1.8, marginBottom: '36px' }}>
              {t('cta.talentDesc')}
            </p>
            <a href="/candidate/apply" style={{
              padding: '14px 32px',
              border: '1px solid var(--navy)',
              background: 'transparent',
              color: 'var(--navy)',
              fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.5px', cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(8,13,26,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {t('cta.talentCta')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </a>
          </motion.div>

          {/* Client Card — Dark */}
          <motion.div
            id="client"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              padding: '60px 52px',
              background: 'var(--navy-card)',
              border: '1px solid var(--border-soft)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--gold-dim)', fontWeight: 500, marginBottom: '16px',
            }}>
              {t('cta.clientEyebrow')}
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300,
              color: 'var(--white)', lineHeight: 1.2, marginBottom: '16px',
            }}>
              {t('cta.clientTitle')}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.8, marginBottom: '36px' }}>
              {t('cta.clientDesc')}
            </p>
            <a href="/client/register" style={{
              padding: '14px 32px',
              background: 'var(--gold)', border: '1px solid var(--gold)',
              color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.5px', cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
            >
              {t('cta.clientCta')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
