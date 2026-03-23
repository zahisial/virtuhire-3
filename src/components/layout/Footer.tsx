'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t, isRTL } = useLanguage()

  return (
    <footer id="contact" style={{
      background: 'var(--navy)',
      borderTop: '1px solid var(--border-soft)',
      padding: '60px 5% 36px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '60px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--border-soft)',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px',
                border: '1.5px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '18px', fontWeight: 600, color: 'var(--gold)',
              }}>
                V
              </div>
              <span style={{ fontWeight: 500, fontSize: '18px', color: 'var(--white)' }}>
                Virtu<span style={{ color: 'var(--gold)' }}>Hire</span>
              </span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.8, maxWidth: '280px' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 500, marginBottom: '20px' }}>
              {t('footer.platformTitle')}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'footer.hireTalent', href: '/client/register' },
                { key: 'footer.getHired', href: '/candidate/apply' },
                { key: 'footer.pricing', href: '#pricing' },
                { key: 'footer.howItWorks', href: '#how' },
              ].map(item => (
                <li key={item.key}>
                  <a href={item.href} style={{
                    textDecoration: 'none', color: 'var(--white-dim)',
                    fontSize: '13px', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 500, marginBottom: '20px' }}>
              {t('footer.legalTitle')}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'footer.terms', href: '/terms' },
                { key: 'footer.privacy', href: '/privacy' },
                { key: 'footer.vat', href: '/vat-policy' },
                { key: 'footer.refund', href: '/refund-policy' },
              ].map(item => (
                <li key={item.key}>
                  <a href={item.href} style={{
                    textDecoration: 'none', color: 'var(--white-dim)',
                    fontSize: '13px', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 500, marginBottom: '20px' }}>
              {t('footer.contactTitle')}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'footer.email', href: 'mailto:hello@virtuhire.ae' },
                { key: 'footer.whatsapp', href: 'https://wa.me/971XXXXXXXXX' }, // replace with your WhatsApp number
                { key: 'footer.linkedin', href: 'https://linkedin.com/company/virtuhire' },
                { key: 'footer.support', href: '/client/dashboard?tab=support' }, // or your support page
              ].map(item => (
                <li key={item.key}>
                  <a href={item.href} style={{
                    textDecoration: 'none', color: 'var(--white-dim)',
                    fontSize: '13px', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', paddingTop: '28px',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(168,159,146,0.5)' }}>
            {t('footer.copyright')}
          </p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#7DC99C',
            }} />
            <span style={{ fontSize: '12px', color: 'rgba(168,159,146,0.5)' }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
