'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const inputStyle = (focused: boolean) => ({
  width: '100%', padding: '12px 16px',
  background: 'var(--navy-mid)',
  border: `1px solid ${focused ? 'var(--gold)' : 'var(--border-soft)'}`,
  color: 'var(--white)', fontSize: '14px',
  fontFamily: 'inherit', outline: 'none',
  transition: 'border-color 0.2s',
})

const labelStyle = {
  display: 'block', fontSize: '12px', fontWeight: 500,
  color: 'var(--white-dim)', marginBottom: '8px',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const,
}

export default function PaymentPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [focused, setFocused] = useState('')
  const [autoBilling, setAutoBilling] = useState(true)
  const [form, setForm] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: '',
    billingAddress: '', vatNumber: '',
  })

  const handleInput = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const formatCard = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4)
    return v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2) : v
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        <div style={{
          fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
          {isRTL ? 'الخطوة ٣' : 'Step 3'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'إعداد الدفع' : 'Payment Setup'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '32px' }}>
          {isRTL ? 'أضف بطاقتك وفعّل الفوترة الشهرية التلقائية.' : 'Add your card and enable automatic monthly billing.'}
        </p>

        {/* Card Visual */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-light) 0%, var(--navy-card) 100%)',
          border: '1px solid var(--border)',
          padding: '28px', marginBottom: '32px',
          position: 'relative', overflow: 'hidden',
          height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(200,169,110,0.08)' }} />
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(200,169,110,0.05)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.5px' }}>VirtuHire</span>
            <div style={{ display: 'flex', gap: '-8px' }}>
              <div style={{ width: '32px', height: '20px', borderRadius: '50%', background: 'rgba(200,169,110,0.5)' }} />
              <div style={{ width: '32px', height: '20px', borderRadius: '50%', background: 'rgba(200,169,110,0.3)', marginLeft: '-10px' }} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '18px', color: 'var(--white)', letterSpacing: '3px', marginBottom: '12px' }}>
              {form.cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>{isRTL ? 'اسم الحامل' : 'Card Holder'}</div>
                <div style={{ fontSize: '13px', color: 'var(--white)', marginTop: '2px' }}>{form.cardName || (isRTL ? 'اسمك' : 'Your Name')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>{isRTL ? 'تاريخ الانتهاء' : 'Expires'}</div>
                <div style={{ fontSize: '13px', color: 'var(--white)', marginTop: '2px' }}>{form.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={labelStyle}>{isRTL ? 'رقم البطاقة' : 'Card Number'}</label>
            <input
              value={form.cardNumber}
              onChange={e => handleInput('cardNumber', formatCard(e.target.value))}
              placeholder="1234 5678 9012 3456"
              style={inputStyle(focused === 'cardNumber')}
              onFocus={() => setFocused('cardNumber')} onBlur={() => setFocused('')}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{isRTL ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
              <input
                value={form.expiry}
                onChange={e => handleInput('expiry', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                style={inputStyle(focused === 'expiry')}
                onFocus={() => setFocused('expiry')} onBlur={() => setFocused('')}
              />
            </div>
            <div>
              <label style={labelStyle}>CVV</label>
              <input
                value={form.cvv} maxLength={4}
                onChange={e => handleInput('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                type="password"
                style={inputStyle(focused === 'cvv')}
                onFocus={() => setFocused('cvv')} onBlur={() => setFocused('')}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{isRTL ? 'اسم صاحب البطاقة' : 'Cardholder Name'}</label>
            <input
              value={form.cardName}
              onChange={e => handleInput('cardName', e.target.value)}
              placeholder={isRTL ? 'كما يظهر على البطاقة' : 'As shown on card'}
              style={inputStyle(focused === 'cardName')}
              onFocus={() => setFocused('cardName')} onBlur={() => setFocused('')}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-soft)', margin: '8px 0' }} />

          <div>
            <label style={labelStyle}>{isRTL ? 'عنوان الفوترة' : 'Billing Address'}</label>
            <input
              value={form.billingAddress}
              onChange={e => handleInput('billingAddress', e.target.value)}
              placeholder={isRTL ? 'دبي، الإمارات' : 'Dubai, UAE'}
              style={inputStyle(focused === 'billingAddress')}
              onFocus={() => setFocused('billingAddress')} onBlur={() => setFocused('')}
            />
          </div>

          <div>
            <label style={labelStyle}>{isRTL ? 'رقم ضريبة القيمة المضافة (اختياري)' : 'VAT Number (Optional)'}</label>
            <input
              value={form.vatNumber}
              onChange={e => handleInput('vatNumber', e.target.value)}
              placeholder="1000XXXXX00003"
              style={inputStyle(focused === 'vatNumber')}
              onFocus={() => setFocused('vatNumber')} onBlur={() => setFocused('')}
            />
          </div>

          {/* Auto Billing Toggle */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px', background: 'var(--navy-card)', border: '1px solid var(--border-soft)',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>
                {isRTL ? 'الفوترة الشهرية التلقائية' : 'Automatic Monthly Billing'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>
                {isRTL ? 'يتم الخصم تلقائياً في نفس اليوم كل شهر' : 'Charged automatically on the same day each month'}
              </div>
            </div>
            <button onClick={() => setAutoBilling(!autoBilling)} style={{
              width: '48px', height: '26px', borderRadius: '13px',
              background: autoBilling ? 'var(--gold)' : 'var(--border-soft)',
              border: 'none', cursor: 'pointer',
              position: 'relative', transition: 'background 0.3s', flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute', top: '3px',
                left: autoBilling ? '25px' : '3px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: autoBilling ? 'var(--navy)' : 'var(--white-dim)',
                transition: 'left 0.3s',
              }} />
            </button>
          </div>

          {/* Secure badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L1.5 3.5v4c0 3 2.5 5.5 5.5 6 3-0.5 5.5-3 5.5-6v-4L7 1z" stroke="var(--gold-dim)" strokeWidth="1.1"/>
              <path d="M4.5 7l2 2 3-3" stroke="var(--gold-dim)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: '12px', color: 'var(--white-dim)' }}>
              {isRTL ? 'مدفوعات آمنة ومشفرة بواسطة Stripe' : 'Secured and encrypted payments via Stripe'}
            </span>
          </div>

          {/* Submit */}
          <button onClick={() => router.push('/client/hire')} style={{
            width: '100%', padding: '16px',
            background: 'var(--gold)', border: '1px solid var(--gold)',
            color: 'var(--navy)', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
          >
            {isRTL ? 'التالي — طلب التوظيف' : 'Next — Hiring Request'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
