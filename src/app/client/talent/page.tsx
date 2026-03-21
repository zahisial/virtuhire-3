'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const CANDIDATES = [
  { id: 1, name: 'Sara Al-Rashidi', nameAr: 'سارة الراشدي', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Home', typeAr: 'منزل', exp: '4 years', expAr: '٤ سنوات', skills: ['Customer Service', 'CRM', 'Excel', 'Arabic'], skillsAr: ['خدمة عملاء', 'CRM', 'Excel', 'عربي'], rating: 4.9, initials: 'SR' },
  { id: 2, name: 'Bilal Chaudhry', nameAr: 'بلال شودهري', role: '2D Design', roleAr: 'تصميم', type: 'Office', typeAr: 'مكتب', exp: '6 years', expAr: '٦ سنوات', skills: ['Illustrator', 'Photoshop', 'Figma', 'Branding'], skillsAr: ['إليستريتور', 'فوتوشوب', 'فيجما', 'هوية بصرية'], rating: 4.8, initials: 'BC' },
  { id: 3, name: 'Nadia Hussain', nameAr: 'نادية حسين', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Office', typeAr: 'مكتب', exp: '3 years', expAr: '٣ سنوات', skills: ['Sales', 'Data Entry', 'MS Office', 'Communication'], skillsAr: ['مبيعات', 'إدخال بيانات', 'MS Office', 'تواصل'], rating: 4.7, initials: 'NH' },
  { id: 4, name: 'Ahmed Farooq', nameAr: 'أحمد فاروق', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Home', typeAr: 'منزل', exp: '5 years', expAr: '٥ سنوات', skills: ['Lead Generation', 'CRM', 'English', 'Arabic'], skillsAr: ['توليد عملاء', 'CRM', 'إنجليزي', 'عربي'], rating: 4.6, initials: 'AF' },
  { id: 5, name: 'Zara Malik', nameAr: 'زارا مالك', role: '2D Design', roleAr: 'تصميم', type: 'Home', typeAr: 'منزل', exp: '4 years', expAr: '٤ سنوات', skills: ['Social Media', 'Canva', 'Photoshop', 'Video'], skillsAr: ['سوشيال ميديا', 'كانفا', 'فوتوشوب', 'فيديو'], rating: 4.9, initials: 'ZM' },
  { id: 6, name: 'Omar Siddiqui', nameAr: 'عمر صديقي', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Office', typeAr: 'مكتب', exp: '7 years', expAr: '٧ سنوات', skills: ['B2B Sales', 'Negotiation', 'CRM', 'English'], skillsAr: ['مبيعات B2B', 'تفاوض', 'CRM', 'إنجليزي'], rating: 4.8, initials: 'OS' },
]

export default function TalentPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [shortlisted, setShortlisted] = useState<number[]>([])
  const [playing, setPlaying] = useState<number | null>(null)
  const [interviewRequested, setInterviewRequested] = useState<number[]>([])
  const [filter, setFilter] = useState<'all' | 'shortlisted'>('all')

  const toggleShortlist = (id: number) => {
    if (shortlisted.includes(id)) {
      setShortlisted(s => s.filter(x => x !== id))
    } else if (shortlisted.length < 3) {
      setShortlisted(s => [...s, id])
    }
  }

  const requestInterview = (id: number) => {
    setInterviewRequested(s => [...s, id])
  }

  const displayed = filter === 'shortlisted' ? CANDIDATES.filter(c => shortlisted.includes(c.id)) : CANDIDATES

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
              {isRTL ? 'الخطوة ٥' : 'Step 5'}
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2 }}>
              {isRTL ? 'تصفّح المرشحين' : 'Browse Talent'}
            </h1>
          </div>

          {/* Shortlist counter */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '16px 24px', textAlign: isRTL ? 'right' : 'left' }}>
            <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
              {isRTL ? 'قائمتي المختصرة' : 'My Shortlist'}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{shortlisted.length}</span>
              <span style={{ fontSize: '13px', color: 'var(--white-dim)' }}>/ 3</span>
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.15)', padding: '14px 20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ fontSize: '13px', color: 'var(--gold)' }}>
            {isRTL ? '٢٠ مرشحاً متاحاً · جولتان مجاناً · ٢٠٠ درهم لكل جولة إضافية' : '20 candidates unlocked · 2 free rounds · 200 AED per extra round'}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['all', 'shortlisted'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 16px', fontSize: '12px', fontWeight: 500,
                background: filter === f ? 'var(--gold)' : 'transparent',
                border: `1px solid ${filter === f ? 'var(--gold)' : 'var(--border-soft)'}`,
                color: filter === f ? 'var(--navy)' : 'var(--white-dim)',
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              }}>
                {f === 'all' ? (isRTL ? 'الكل' : 'All') : (isRTL ? 'المختارون' : 'Shortlisted')}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2px', marginBottom: '40px' }}>
          <AnimatePresence>
            {displayed.map((c, i) => {
              const isShortlisted = shortlisted.includes(c.id)
              const isPlaying = playing === c.id
              const interviewDone = interviewRequested.includes(c.id)
              const canShortlist = shortlisted.length < 3 || isShortlisted
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{
                    background: isShortlisted ? 'rgba(200,169,110,0.06)' : 'var(--navy-card)',
                    border: `1px solid ${isShortlisted ? 'var(--gold-dim)' : 'var(--border-soft)'}`,
                    padding: '28px', transition: 'all 0.2s',
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      {/* Avatar */}
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'var(--navy-mid)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 500, color: 'var(--gold)', flexShrink: 0,
                      }}>
                        {c.initials}
                      </div>
                      <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--white)' }}>{isRTL ? c.nameAr : c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{isRTL ? c.roleAr : c.role} · {isRTL ? c.typeAr : c.type}</div>
                      </div>
                    </div>
                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--gold)"><path d="M6 1l1.5 3H11L8.5 6.5 9.5 10 6 8l-3.5 2 1-3.5L1 4h3.5L6 1z"/></svg>
                      <span style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 500 }}>{c.rating}</span>
                    </div>
                  </div>

                  {/* Experience */}
                  <div style={{ fontSize: '12px', color: 'var(--white-dim)', marginBottom: '14px' }}>
                    {isRTL ? `خبرة: ${c.expAr}` : `Experience: ${c.exp}`}
                  </div>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {(isRTL ? c.skillsAr : c.skills).map(skill => (
                      <span key={skill} style={{
                        fontSize: '11px', padding: '3px 10px',
                        border: '1px solid var(--border-soft)',
                        color: 'var(--white-dim)', letterSpacing: '0.3px',
                      }}>{skill}</span>
                    ))}
                  </div>

                  {/* Voice Intro */}
                  <button onClick={() => setPlaying(isPlaying ? null : c.id)} style={{
                    width: '100%', padding: '10px 14px', marginBottom: '12px',
                    background: isPlaying ? 'rgba(200,169,110,0.1)' : 'var(--navy-mid)',
                    border: `1px solid ${isPlaying ? 'var(--gold)' : 'var(--border-soft)'}`,
                    color: isPlaying ? 'var(--gold)' : 'var(--white-dim)',
                    fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s',
                  }}>
                    {isPlaying ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="3" height="8" rx="0.5"/><rect x="7" y="2" width="3" height="8" rx="0.5"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 2l7 4-7 4V2z"/></svg>
                    )}
                    {isPlaying ? (isRTL ? 'إيقاف المقطع الصوتي' : 'Pause Voice Intro') : (isRTL ? 'استمع للمقطع الصوتي' : 'Play Voice Intro')}
                    {isPlaying && (
                      <span style={{ fontSize: '10px', opacity: 0.7 }}>1:00</span>
                    )}
                  </button>

                  {/* Waveform (fake, decorative) */}
                  {isPlaying && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '24px', marginBottom: '12px', justifyContent: 'center' }}>
                      {Array.from({ length: 30 }).map((_, j) => (
                        <div key={j} style={{
                          width: '2px', background: 'var(--gold)',
                          height: `${8 + Math.sin(j * 0.8) * 8}px`,
                          opacity: 0.6, borderRadius: '1px',
                          animation: `wave ${0.5 + (j % 3) * 0.2}s ease-in-out infinite alternate`,
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button onClick={() => toggleShortlist(c.id)} disabled={!canShortlist} style={{
                      padding: '10px', fontSize: '12px', fontWeight: 500,
                      background: isShortlisted ? 'rgba(200,169,110,0.12)' : 'transparent',
                      border: `1px solid ${isShortlisted ? 'var(--gold)' : canShortlist ? 'var(--border-soft)' : 'rgba(255,255,255,0.04)'}`,
                      color: isShortlisted ? 'var(--gold)' : canShortlist ? 'var(--white-dim)' : 'rgba(168,159,146,0.3)',
                      cursor: canShortlist ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill={isShortlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.2">
                        <path d="M6 1l1.5 3H11L8.5 6.5 9.5 10 6 8l-3.5 2 1-3.5L1 4h3.5L6 1z"/>
                      </svg>
                      {isShortlisted ? (isRTL ? 'مُدرج' : 'Shortlisted') : (isRTL ? 'أدرج' : 'Shortlist')}
                    </button>
                    <button onClick={() => requestInterview(c.id)} disabled={interviewDone} style={{
                      padding: '10px', fontSize: '12px', fontWeight: 500,
                      background: interviewDone ? 'rgba(100,200,120,0.08)' : 'var(--navy-mid)',
                      border: `1px solid ${interviewDone ? 'rgba(100,200,120,0.3)' : 'var(--border-soft)'}`,
                      color: interviewDone ? '#7DC99C' : 'var(--white-dim)',
                      cursor: interviewDone ? 'default' : 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.2s',
                    }}>
                      {interviewDone ? (isRTL ? '✓ طُلبت المقابلة' : '✓ Requested') : (isRTL ? 'طلب مقابلة' : 'Interview')}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button style={{
            padding: '12px 32px', background: 'transparent',
            border: '1px solid var(--border-soft)', color: 'var(--white-dim)',
            fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-soft)')}
          >
            {isRTL ? 'تحميل ٢٠ مرشحاً إضافياً · ٢٠٠ درهم' : 'Load 20 More Candidates · 200 AED'}
          </button>
        </div>

        {/* Proceed CTA */}
        {shortlisted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'sticky', bottom: '24px',
              background: 'var(--navy-mid)', border: '1px solid var(--gold-dim)',
              padding: '20px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexDirection: isRTL ? 'row-reverse' : 'row', gap: '16px', flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>
                {isRTL ? `${shortlisted.length} مرشح مُدرج` : `${shortlisted.length} candidate${shortlisted.length > 1 ? 's' : ''} shortlisted`}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--white-dim)', marginTop: '2px' }}>
                {isRTL ? 'انتقل إلى تأكيد التوظيف' : 'Proceed to hiring confirmation'}
              </div>
            </div>
            <button onClick={() => router.push('/client/confirm')} style={{
              padding: '12px 28px', background: 'var(--gold)', border: '1px solid var(--gold)',
              color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
            >
              {isRTL ? 'التالي — تأكيد التوظيف' : 'Next — Confirm Hire'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(1); }
          to { transform: scaleY(1.8); }
        }
      `}</style>
    </div>
  )
}