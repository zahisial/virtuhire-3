'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

type AccountType = 'individual' | 'corporate' | null

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--navy-mid)',
  border: '1px solid var(--border-soft)',
  color: 'var(--white)',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--white-dim)',
  marginBottom: '8px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
}

export default function RegisterPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [authMethod, setAuthMethod] = useState<'email' | 'google'>('email')
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', emiratesId: '',
    companyName: '', tradeLicense: '', vatNumber: '', contactPerson: '',
  })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [focused, setFocused] = useState('')

  const handleInput = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSendOtp = () => setOtpSent(true)

  const handleSubmit = () => router.push('/client/contract')

  const accountCards = [
    {
      type: 'individual' as AccountType,
      titleEn: 'Individual', titleAr: 'حساب فردي',
      descEn: 'Personal hire as a UAE resident', descAr: 'توظيف شخصي كمقيم في الإمارات',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      type: 'corporate' as AccountType,
      titleEn: 'Corporate', titleAr: 'حساب مؤسسي',
      descEn: 'Company account with trade license', descAr: 'حساب شركة مع رخصة تجارية',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="8" width="22" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M9 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M3 16h22" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 16v3M16 16v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{
          fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
          {isRTL ? 'الخطوة ١' : 'Step 1'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'أنشئ حسابك' : 'Create your account'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {isRTL ? 'اختر نوع الحساب وأكمل التسجيل في أقل من دقيقتين.' : 'Choose your account type and complete registration in under 2 minutes.'}
        </p>
      </motion.div>

      {/* Account Type Selection */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {isRTL ? 'نوع الحساب' : 'Account Type'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {accountCards.map(card => (
            <button key={card.type} onClick={() => setAccountType(card.type)} style={{
              padding: '24px 20px',
              background: accountType === card.type ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)',
              border: `1px solid ${accountType === card.type ? 'var(--gold)' : 'var(--border-soft)'}`,
              cursor: 'pointer', textAlign: isRTL ? 'right' : 'left',
              transition: 'all 0.2s', color: 'var(--white)',
            }}>
              <div style={{ color: accountType === card.type ? 'var(--gold)' : 'var(--white-dim)', marginBottom: '12px' }}>
                {card.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
                {isRTL ? card.titleAr : card.titleEn}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.5 }}>
                {isRTL ? card.descAr : card.descEn}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Auth Method */}
      <AnimatePresence>
        {accountType && (
          <motion.div key="auth" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* Auth toggle */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '28px', background: 'var(--navy-card)', padding: '4px', border: '1px solid var(--border-soft)' }}>
              {(['email', 'google'] as const).map(method => (
                <button key={method} onClick={() => setAuthMethod(method)} style={{
                  flex: 1, padding: '10px',
                  background: authMethod === method ? 'var(--navy-light)' : 'transparent',
                  border: authMethod === method ? '1px solid var(--border)' : '1px solid transparent',
                  color: authMethod === method ? 'var(--gold)' : 'var(--white-dim)',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}>
                  {method === 'email'
                    ? (isRTL ? 'بريد إلكتروني + OTP' : 'Email + OTP')
                    : (isRTL ? 'تسجيل بـ Google' : 'Continue with Google')}
                </button>
              ))}
            </div>

            {authMethod === 'google' ? (
              <button style={{
                width: '100%', padding: '14px',
                background: 'white', border: 'none',
                color: '#333', fontSize: '14px', fontWeight: 500,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '10px', fontFamily: 'inherit',
              }}>
                <GoogleIcon />
                {isRTL ? 'المتابعة مع Google' : 'Continue with Google'}
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Individual Fields */}
                {accountType === 'individual' && (
                  <>
                    <Field label={isRTL ? 'الاسم الكامل' : 'Full Name'} value={form.fullName}
                      onChange={v => handleInput('fullName', v)} focused={focused} id="fullName"
                      onFocus={() => setFocused('fullName')} onBlur={() => setFocused('')}
                      placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
                    <Field label={isRTL ? 'البريد الإلكتروني' : 'Email Address'} type="email" value={form.email}
                      onChange={v => handleInput('email', v)} focused={focused} id="email"
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      placeholder="you@company.ae" />
                    <Field label={isRTL ? 'رقم الهاتف' : 'Phone Number'} type="tel" value={form.phone}
                      onChange={v => handleInput('phone', v)} focused={focused} id="phone"
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                      placeholder="+971 50 000 0000" />
                    <div>
                      <label style={labelStyle}>{isRTL ? 'بطاقة الهوية الإماراتية' : 'Emirates ID'}</label>
                      <div style={{
                        border: '1px solid var(--border-soft)', padding: '24px',
                        background: 'var(--navy-mid)', textAlign: 'center', cursor: 'pointer',
                        transition: 'border-color 0.2s',
                      }}>
                        <div style={{ color: 'var(--gold-dim)', marginBottom: '8px' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto', display: 'block' }}>
                            <path d="M12 4v12M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 18h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--white-dim)' }}>
                          {isRTL ? 'ارفع صورة بطاقة الهوية' : 'Upload Emirates ID photo'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(168,159,146,0.5)', marginTop: '4px' }}>
                          JPG, PNG or PDF · Max 5MB
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Corporate Fields */}
                {accountType === 'corporate' && (
                  <>
                    <Field label={isRTL ? 'اسم الشركة' : 'Company Name'} value={form.companyName}
                      onChange={v => handleInput('companyName', v)} focused={focused} id="companyName"
                      onFocus={() => setFocused('companyName')} onBlur={() => setFocused('')}
                      placeholder={isRTL ? 'أدخل اسم شركتك' : 'Enter company name'} />
                    <Field label={isRTL ? 'شخص التواصل' : 'Contact Person'} value={form.contactPerson}
                      onChange={v => handleInput('contactPerson', v)} focused={focused} id="contactPerson"
                      onFocus={() => setFocused('contactPerson')} onBlur={() => setFocused('')}
                      placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} />
                    <Field label={isRTL ? 'البريد الإلكتروني' : 'Email Address'} type="email" value={form.email}
                      onChange={v => handleInput('email', v)} focused={focused} id="email"
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      placeholder="contact@company.ae" />
                    <Field label={isRTL ? 'رقم الهاتف' : 'Phone Number'} type="tel" value={form.phone}
                      onChange={v => handleInput('phone', v)} focused={focused} id="phone"
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                      placeholder="+971 4 000 0000" />
                    <Field label={isRTL ? 'رقم ضريبة القيمة المضافة' : 'VAT Number'} value={form.vatNumber}
                      onChange={v => handleInput('vatNumber', v)} focused={focused} id="vatNumber"
                      onFocus={() => setFocused('vatNumber')} onBlur={() => setFocused('')}
                      placeholder="1000XXXXX00003" />
                    <div>
                      <label style={labelStyle}>{isRTL ? 'الرخصة التجارية' : 'Trade License'}</label>
                      <div style={{
                        border: '1px solid var(--border-soft)', padding: '24px',
                        background: 'var(--navy-mid)', textAlign: 'center', cursor: 'pointer',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 8px', display: 'block', color: 'var(--gold-dim)' }}>
                          <path d="M12 4v12M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 18h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <div style={{ fontSize: '13px', color: 'var(--white-dim)' }}>
                          {isRTL ? 'ارفع الرخصة التجارية' : 'Upload Trade License'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(168,159,146,0.5)', marginTop: '4px' }}>JPG, PNG or PDF · Max 5MB</div>
                      </div>
                    </div>
                  </>
                )}

                {/* OTP Section */}
                {!otpSent ? (
                  <button onClick={handleSendOtp} style={{
                    width: '100%', padding: '14px',
                    background: 'transparent', border: '1px solid rgba(200,169,110,0.4)',
                    color: 'var(--gold)', fontSize: '14px', fontWeight: 500,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,169,110,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {isRTL ? 'إرسال رمز التحقق' : 'Send Verification Code'}
                  </button>
                ) : (
                  <div>
                    <label style={labelStyle}>{isRTL ? 'رمز التحقق OTP' : 'Verification Code (OTP)'}</label>
                    <input
                      value={otp} onChange={e => setOtp(e.target.value)}
                      maxLength={6} placeholder="000000"
                      style={{ ...inputStyle, textAlign: 'center', fontSize: '22px', letterSpacing: '8px' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-soft)')}
                    />
                    <p style={{ fontSize: '12px', color: 'var(--white-dim)', marginTop: '8px' }}>
                      {isRTL ? 'تم إرسال الرمز إلى ' : 'Code sent to '}{form.email || '+971...'}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button onClick={handleSubmit} style={{
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
                  {isRTL ? 'التالي — توقيع العقد' : 'Next — Sign Contract'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d={isRTL ? 'M13 7H1M7 13l-6-6 6-6' : 'M1 7h12M7 1l6 6-6 6'} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </button>

                <p style={{ fontSize: '12px', color: 'var(--white-dim)', textAlign: 'center' }}>
                  {isRTL ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
                  <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                    {isRTL ? 'تسجيل الدخول' : 'Sign in'}
                  </a>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, focused, id, onFocus, onBlur }: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  focused: string
  id: string
  onFocus: () => void
  onBlur: () => void
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} onFocus={onFocus} onBlur={onBlur}
        style={{ ...inputStyle, borderColor: focused === id ? 'var(--gold)' : 'var(--border-soft)' }}
      />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
      <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/>
      <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/>
      <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"/>
    </svg>
  )
}
