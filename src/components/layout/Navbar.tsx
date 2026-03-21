'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/ui/LanguageToggle'

export default function Navbar() {
  const { t, isRTL } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#how' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.categories'), href: '#categories' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <>
      <nav
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: '0 5%',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(8, 13, 26, 0.90)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(200,169,110,0.12)'
            : '1px solid rgba(255,255,255,0.06)',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px',
            border: '1.5px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '18px', fontWeight: 600,
            color: 'var(--gold)',
          }}>
            V
          </div>
          <span style={{ fontWeight: 500, fontSize: '18px', color: 'var(--white)' }}>
            Virtu<span style={{ color: 'var(--gold)' }}>Hire</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '36px',
          listStyle: 'none',
        }}
          className="hidden md:flex"
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} style={{
                textDecoration: 'none',
                color: 'var(--white-dim)',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.3px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden md:flex">
          <LanguageToggle />
          <a href="#candidate" style={{
            padding: '9px 20px',
            border: '1px solid rgba(200,169,110,0.3)',
            background: 'transparent',
            color: 'var(--gold)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {t('nav.getHired')}
          </a>
          <a href="#client" style={{
            padding: '9px 20px',
            background: 'var(--gold)',
            border: '1px solid var(--gold)',
            color: 'var(--navy)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
          >
            {t('nav.hireTalent')}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px',
              background: 'var(--white)', transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'opacity: 0'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '72px', left: 0, right: 0,
          background: 'var(--navy-mid)',
          borderBottom: '1px solid var(--border-soft)',
          padding: '24px 5%',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--white-dim)',
                fontSize: '15px',
                fontWeight: 400,
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
            <LanguageToggle />
          </div>
          <a href="#candidate" onClick={() => setMenuOpen(false)} style={{
            padding: '12px 20px', border: '1px solid rgba(200,169,110,0.3)',
            color: 'var(--gold)', fontSize: '14px', fontWeight: 500,
            textDecoration: 'none', textAlign: 'center',
          }}>
            {t('nav.getHired')}
          </a>
          <a href="#client" onClick={() => setMenuOpen(false)} style={{
            padding: '12px 20px', background: 'var(--gold)',
            color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
            textDecoration: 'none', textAlign: 'center',
          }}>
            {t('nav.hireTalent')}
          </a>
        </div>
      )}
    </>
  )
}
