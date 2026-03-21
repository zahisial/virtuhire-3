'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const SELECTED = { name: 'Sara Al-Rashidi', nameAr: 'سارة الراشدي', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Home-Based', typeAr: 'عمل من المنزل', initials: 'SR', rate: 2150 }

export default function ConfirmPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [confirmed, setConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)

  const hiringFee = 300
  const firstMonthRate = SELECTED.rate
  const balance = firstMonthRate - hiringFee
  const total = balance

  const handleConfirm = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setConfirmed(true)
    }, 2000)
  }

  if (confirmed) {
    return (
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '2px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px', color: 'var(--gold)',
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '16px' }}>
            {isRTL ? 'تم التوظيف بنجاح!' : 'Hire Confirmed!'}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
            {isRTL
              ? `تهانينا! تم تفعيل ${SELECTED.nameAr} في لوحة التحكم. ستتلقى تأكيداً عبر البريد الإلكتروني خلال دقائق.`
              : `Congratulations! ${SELECTED.name} is now Active in your dashboard. You'll receive a confirmation email within minutes.`}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px', textAlign: isRTL ? 'right' : 'left' }}>
            {[
              { labelEn: 'Employee', labelAr: 'الموظف', valueEn: SELECTED.name, valueAr: SELECTED.nameAr },
              { labelEn: 'Role', labelAr: 'الدور', valueEn: SELECTED.role, valueAr: SELECTED.roleAr },
              { labelEn: 'Work Type', labelAr: 'نوع العمل', valueEn: SELECTED.type, valueAr: SELECTED.typeAr },
              { labelEn: 'Monthly Cost', labelAr: 'التكلفة الشهرية', valueEn: `${SELECTED.rate.toLocaleString()} AED`, valueAr: `${SELECTED.rate.toLocaleString()} درهم` },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '16px 20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  {isRTL ? item.labelAr : item.labelEn}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>
                  {isRTL ? item.valueAr : item.valueEn}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/client/dashboard')} style={{
            width: '100%', padding: '16px',
            background: 'var(--gold)', border: '1px solid var(--gold)',
            color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
          >
            {isRTL ? 'الانتقال إلى لوحة التحكم' : 'Go to Dashboard'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
          {isRTL ? 'الخطوة ٦' : 'Step 6'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'تأكيد التوظيف' : 'Confirm Hire'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {isRTL ? 'راجع تفاصيل توظيفك وادفع الرصيد المتبقي للشهر الأول.' : 'Review your hire details and pay the remaining first month balance.'}
        </p>

        {/* Selected Candidate Card */}
        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--gold-dim)', padding: '28px', marginBottom: '28px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
          <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '16px', fontWeight: 500 }}>
            {isRTL ? 'المرشح المختار' : 'Selected Candidate'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'var(--navy-mid)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 500, color: 'var(--gold)', flexShrink: 0,
            }}>
              {SELECTED.initials}
            </div>
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>
                {isRTL ? SELECTED.nameAr : SELECTED.name}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--white-dim)' }}>
                {isRTL ? SELECTED.roleAr : SELECTED.role} · {isRTL ? SELECTED.typeAr : SELECTED.type}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: isRTL ? 'left' : 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                {isRTL ? 'شهرياً' : 'Monthly'}
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: 'var(--gold)', fontWeight: 300 }}>
                {SELECTED.rate.toLocaleString()} {isRTL ? 'د' : 'AED'}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '28px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '20px', fontWeight: 500 }}>
            {isRTL ? 'تفاصيل الدفع' : 'Payment Breakdown'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { labelEn: 'First month rate', labelAr: 'أجر الشهر الأول', val: firstMonthRate, muted: false },
              { labelEn: 'Hiring fee paid (credited)', labelAr: 'رسوم التوظيف المدفوعة (محتسبة)', val: -hiringFee, muted: true },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ fontSize: '13px', color: row.muted ? 'var(--white-dim)' : 'var(--white)' }}>
                  {isRTL ? row.labelAr : row.labelEn}
                </span>
                <span style={{ fontSize: '14px', color: row.val < 0 ? '#7DC99C' : 'var(--white)' }}>
                  {row.val < 0 ? '−' : ''}{Math.abs(row.val).toLocaleString()} {isRTL ? 'درهم' : 'AED'}
                </span>
              </div>
            ))}
            <div style={{ height: '1px', background: 'var(--border-soft)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--white)' }}>
                {isRTL ? 'المبلغ المستحق الآن' : 'Due now'}
              </span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: 'var(--gold)', fontWeight: 300 }}>
                {total.toLocaleString()} {isRTL ? 'درهم' : 'AED'}
              </span>
            </div>
          </div>
        </div>

        {/* Saved card indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', padding: '16px 20px', background: 'var(--navy-mid)', border: '1px solid var(--border-soft)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect x="0.5" y="0.5" width="19" height="13" rx="1.5" stroke="var(--gold-dim)"/>
            <path d="M0 4h20" stroke="var(--gold-dim)" strokeWidth="2"/>
          </svg>
          <span style={{ fontSize: '13px', color: 'var(--white-dim)' }}>
            {isRTL ? 'يُدفع من البطاقة المحفوظة •••• 4242' : 'Charged to saved card ending •••• 4242'}
          </span>
          <a href="/client/payment" style={{ color: 'var(--gold)', fontSize: '12px', textDecoration: 'none', marginLeft: isRTL ? 0 : 'auto', marginRight: isRTL ? 'auto' : 0 }}>
            {isRTL ? 'تغيير' : 'Change'}
          </a>
        </div>

        {/* Confirm Button */}
        <button onClick={handleConfirm} disabled={processing} style={{
          width: '100%', padding: '16px',
          background: processing ? 'rgba(200,169,110,0.4)' : 'var(--gold)',
          border: '1px solid var(--gold)',
          color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
          cursor: processing ? 'wait' : 'pointer',
          fontFamily: 'inherit', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          {processing ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="8" cy="8" r="6" stroke="var(--navy)" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" strokeLinecap="round"/>
              </svg>
              {isRTL ? 'جارٍ المعالجة...' : 'Processing...'}
            </>
          ) : (
            <>
              {isRTL ? `ادفع ${total.toLocaleString()} درهم وأكّد التوظيف` : `Pay ${total.toLocaleString()} AED & Confirm Hire`}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </>
          )}
        </button>
      </motion.div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
