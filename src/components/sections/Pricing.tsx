'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function Pricing() {
  const { t, isRTL } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      categoryKey: 'pricing.card1Category', typeKey: 'pricing.card1Type',
      badgeKey: 'pricing.card1Badge', priceKey: 'pricing.card1Price',
      unitKey: 'pricing.card1Unit', featured: false,
      features: ['pricing.feature1', 'pricing.feature2', 'pricing.feature3', 'pricing.feature4'],
    },
    {
      categoryKey: 'pricing.card2Category', typeKey: 'pricing.card2Type',
      badgeKey: 'pricing.card2Badge', priceKey: 'pricing.card2Price',
      unitKey: 'pricing.card2Unit', featured: true,
      features: ['pricing.feature5', 'pricing.feature2', 'pricing.feature3', 'pricing.feature4'],
    },
    {
      categoryKey: 'pricing.card3Category', typeKey: 'pricing.card3Type',
      badgeKey: 'pricing.card3Badge', priceKey: 'pricing.card3Price',
      unitKey: 'pricing.card3Unit', featured: false,
      features: ['pricing.feature1', 'pricing.feature6', 'pricing.feature3', 'pricing.feature4'],
    },
    {
      categoryKey: 'pricing.card4Category', typeKey: 'pricing.card4Type',
      badgeKey: 'pricing.card4Badge', priceKey: 'pricing.card4Price',
      unitKey: 'pricing.card4Unit', featured: false,
      features: ['pricing.feature5', 'pricing.feature7', 'pricing.feature3', 'pricing.feature4'],
    },
  ]

  const fees = [
    { valueKey: 'pricing.fee1Value', labelKey: 'pricing.fee1Label', descKey: 'pricing.fee1Desc' },
    { valueKey: 'pricing.fee2Value', labelKey: 'pricing.fee2Label', descKey: 'pricing.fee2Desc' },
    { valueKey: 'pricing.fee3Value', labelKey: 'pricing.fee3Label', descKey: 'pricing.fee3Desc' },
  ]

  return (
    <section id="pricing" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', gap: '40px', flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
              textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '16px',
            }}>
              <span style={{ width: '20px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
              {t('pricing.label')}
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300, lineHeight: 1.2, color: 'var(--white)' }}>
              {t('pricing.title1')}<br />{t('pricing.title2')}
            </h2>
          </motion.div>
          <p style={{ fontSize: '15px', color: 'var(--white-dim)', maxWidth: '380px', lineHeight: 1.8 }}>
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2px',
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: card.featured ? 'var(--navy-light)' : 'var(--navy-card)',
                border: card.featured ? '1px solid var(--gold-dim)' : '1px solid var(--border-soft)',
                padding: '40px 32px',
                position: 'relative',
                transition: 'all 0.3s',
              }}
              whileHover={!card.featured ? { y: -4, borderColor: 'rgba(200,169,110,0.25)' } as any : {}}
            >
              {card.featured && (
                <div style={{
                  position: 'absolute', top: '-1px', right: '24px',
                  background: 'var(--gold)', color: 'var(--navy)',
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  padding: '4px 14px',
                }}>
                  {t('pricing.popular')}
                </div>
              )}
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 500, marginBottom: '10px' }}>
                {t(card.categoryKey)}
              </div>
              <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--white)', marginBottom: '12px' }}>
                {t(card.typeKey)}
              </div>
              <div style={{
                display: 'inline-block', padding: '3px 10px',
                border: '1px solid var(--border-soft)',
                fontSize: '11px', color: 'var(--white-dim)',
                letterSpacing: '0.5px', marginBottom: '28px',
              }}>
                {t(card.badgeKey)}
              </div>
              <div className="font-display" style={{ fontSize: '52px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '6px' }}>
                {t(card.priceKey)}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--white-dim)', marginBottom: '28px' }}>
                {t(card.unitKey)}
              </div>
              <ul style={{
                listStyle: 'none', display: 'flex', flexDirection: 'column',
                gap: '10px', paddingTop: '24px', borderTop: '1px solid var(--border-soft)',
              }}>
                {card.features.map((f, j) => (
                  <li key={j} style={{
                    fontSize: '13px', color: 'var(--white-dim)',
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                  }}>
                    <span style={{
                      width: '4px', height: '4px', background: 'var(--gold-dim)',
                      borderRadius: '50%', marginTop: '7px', flexShrink: 0,
                    }} />
                    {t(f)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Fee Rows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2px', marginTop: '2px',
        }}>
          {fees.map((fee, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              style={{
                background: 'var(--navy-card)',
                border: '1px solid var(--border-soft)',
                padding: '24px 28px',
                display: 'flex', alignItems: 'center', gap: '20px',
              }}
            >
              <div className="font-display" style={{ fontSize: '32px', color: 'var(--gold)', fontWeight: 300, lineHeight: 1, whiteSpace: 'nowrap' }}>
                {t(fee.valueKey)} <span style={{ fontSize: '14px' }}>{t('pricing.aed')}</span>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)' }}>{t(fee.labelKey)}</div>
                <div style={{ fontSize: '12px', color: 'var(--white-dim)', marginTop: '3px' }}>{t(fee.descKey)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
