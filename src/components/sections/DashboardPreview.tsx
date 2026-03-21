'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function DashboardPreview() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const items = [
    { numKey: '01', titleKey: 'dashboard.item1Title', descKey: 'dashboard.item1Desc' },
    { numKey: '02', titleKey: 'dashboard.item2Title', descKey: 'dashboard.item2Desc' },
    { numKey: '03', titleKey: 'dashboard.item3Title', descKey: 'dashboard.item3Desc' },
    { numKey: '04', titleKey: 'dashboard.item4Title', descKey: 'dashboard.item4Desc' },
  ]

  const employees = [
    { nameKey: 'dashboard.emp1Name', roleKey: 'dashboard.emp1Role', status: 'active' },
    { nameKey: 'dashboard.emp2Name', roleKey: 'dashboard.emp2Role', status: 'active' },
    { nameKey: 'dashboard.emp3Name', roleKey: 'dashboard.emp3Role', status: 'pending' },
  ]

  return (
    <section style={{ padding: '100px 0', background: 'var(--navy-mid)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px', alignItems: 'center',
        }}>

          {/* Left - List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
                textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '16px',
              }}>
                <span style={{ width: '20px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
                {t('dashboard.label')}
              </div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300,
                lineHeight: 1.2, color: 'var(--white)', marginBottom: '40px',
              }}>
                {t('dashboard.title1')}<br />{t('dashboard.title2')}
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  style={{
                    display: 'flex', gap: '24px',
                    padding: '28px 0',
                    borderBottom: '1px solid var(--border-soft)',
                    borderTop: i === 0 ? '1px solid var(--border-soft)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    flexShrink: 0, width: '32px', height: '32px',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', color: 'var(--gold-dim)', fontWeight: 500, marginTop: '2px',
                  }}>
                    {item.numKey}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--white)', marginBottom: '6px' }}>
                      {t(item.titleKey)}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.6 }}>
                      {t(item.descKey)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'var(--navy-card)',
              border: '1px solid var(--border-soft)',
              padding: '48px',
              position: 'relative',
              minHeight: '420px',
            }}
          >
            {/* Gold top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, var(--gold-dim), transparent)',
            }} />

            <div style={{
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold-dim)', marginBottom: '28px', fontWeight: 500,
            }}>
              {t('dashboard.previewLabel')}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
              <div style={{ background: 'var(--navy-mid)', padding: '16px 18px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '10px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  {t('dashboard.stat1Label')}
                </div>
                <div className="font-display" style={{ fontSize: '36px', color: 'var(--gold)', fontWeight: 300, lineHeight: 1.1, marginTop: '6px' }}>
                  4
                </div>
              </div>
              <div style={{ background: 'var(--navy-mid)', padding: '16px 18px', border: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '10px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  {t('dashboard.stat2Label')}
                </div>
                <div className="font-display" style={{ fontSize: '22px', color: 'var(--gold)', fontWeight: 300, lineHeight: 1.2, marginTop: '6px' }}>
                  {t('dashboard.stat2Value')}
                </div>
              </div>
            </div>

            {/* Employee rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {employees.map((emp, i) => (
                <div key={i} style={{
                  background: 'var(--navy-mid)',
                  padding: '12px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid var(--border-soft)',
                  opacity: emp.status === 'pending' ? 0.65 : 1,
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)' }}>
                      {t(emp.nameKey)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--white-dim)' }}>
                      {t(emp.roleKey)}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '10px', padding: '3px 10px',
                    border: emp.status === 'active'
                      ? '1px solid rgba(100,200,120,0.3)'
                      : '1px solid rgba(200,169,110,0.3)',
                    color: emp.status === 'active' ? '#7DC99C' : 'var(--gold)',
                    letterSpacing: '1px', textTransform: 'uppercase',
                  }}>
                    {emp.status === 'active' ? t('dashboard.statusActive') : t('dashboard.statusPending')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
