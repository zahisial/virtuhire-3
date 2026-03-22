'use client'
// src/app/client/register/page.tsx - WIRED TO DJANGO API

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'

type AccountType = 'individual' | 'corporate' | null

const labelStyle = {
  display: 'block', fontSize: '12px', fontWeight: 500 as const,
  color: 'var(--white-dim)', marginBottom: '8px',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const,
}

export default function RegisterPage() {
  const { isRTL } = useLanguage()
  const { register } = useAuth()
  const router = useRouter()

  const [accountType, setAccountType] = useState<AccountType>(null)
  const [focused, setFocused]         = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '',
    companyName: '', vatNumber: '', contactPerson: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (!accountType) return isRTL ? 'اختر نوع الحساب' : 'Please select an account type'
    if (!form.email) return isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required'
    if (!form.phone) return isRTL ? 'رقم الهاتف مطلوب' : 'Phone is required'
    if (!form.password) return isRTL ? 'كلمة المرور مطلوبة' : 'Password is required'
    if (form.password.length < 8) return isRTL ? 'كلمة المرور 8 أحرف على الأقل' : 'Password must be at least 8 characters'
    if (accountType === 'individual' && !form.fullName) return isRTL ? 'الاسم الكامل مطلوب' : 'Full name is required'
    if (accountType === 'corporate' && !form.companyName) return isRTL ? 'اسم الشركة مطلوب' : 'Company name is required'
    return null
  }

  const handleSubmit = async () => {
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true)
    setError('')
    try {
      await register({
        email: form.email, phone: form.phone, password: form.password,
        account_type: accountType, full_name: form.fullName,
        company_name: form.companyName, vat_number: form.vatNumber,
        contact_person: form.contactPerson,
      })
      router.push('/client/contract')
    } catch (e: any) {
      setError(e?.email?.[0] || e?.password?.[0] || e?.detail || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const inp = (id: string) => ({
    width: '100%', padding: '12px 16px', background: 'var(--navy-mid)',
    border: `1px solid ${focused === id ? 'var(--gold)' : 'var(--border-soft)'}`,
    color: 'var(--white)', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
  })

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>
          {isRTL ? 'الخطوة ١' : 'Step 1'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px,4vw,44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'أنشئ حسابك' : 'Create your account'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {isRTL ? 'اختر نوع الحساب وأكمل التسجيل في أقل من دقيقتين.' : 'Choose your account type and complete registration in under 2 minutes.'}
        </p>

        {/* Account Type */}
        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {isRTL ? 'نوع الحساب' : 'Account Type'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {[
            { type: 'individual' as AccountType, en: 'Individual', ar: 'حساب فردي', descEn: 'Personal hire as a UAE resident', descAr: 'توظيف شخصي كمقيم في الإمارات' },
            { type: 'corporate'  as AccountType, en: 'Corporate',  ar: 'حساب مؤسسي', descEn: 'Company account with trade license', descAr: 'حساب شركة مع رخصة تجارية' },
          ].map(card => (
            <button key={String(card.type)} onClick={() => setAccountType(card.type)} style={{
              padding: '24px 20px', background: accountType === card.type ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)',
              border: `1px solid ${accountType === card.type ? 'var(--gold)' : 'var(--border-soft)'}`,
              cursor: 'pointer', textAlign: isRTL ? 'right' : 'left', color: 'var(--white)', transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px', color: accountType === card.type ? 'var(--gold)' : 'var(--white)' }}>{isRTL ? card.ar : card.en}</div>
              <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{isRTL ? card.descAr : card.descEn}</div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {accountType && (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {accountType === 'individual' && (
                  <div>
                    <label style={labelStyle}>{isRTL ? 'الاسم الكامل *' : 'Full Name *'}</label>
                    <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'} style={inp('fullName')} onFocus={() => setFocused('fullName')} onBlur={() => setFocused('')} />
                  </div>
                )}

                {accountType === 'corporate' && (
                  <>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'اسم الشركة *' : 'Company Name *'}</label>
                      <input value={form.companyName} onChange={e => set('companyName', e.target.value)} placeholder={isRTL ? 'اسم شركتك' : 'Your company name'} style={inp('companyName')} onFocus={() => setFocused('companyName')} onBlur={() => setFocused('')} />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'شخص التواصل *' : 'Contact Person *'}</label>
                      <input value={form.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} style={inp('contactPerson')} onFocus={() => setFocused('contactPerson')} onBlur={() => setFocused('')} />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'رقم ضريبة القيمة المضافة' : 'VAT Number (Optional)'}</label>
                      <input value={form.vatNumber} onChange={e => set('vatNumber', e.target.value)} placeholder="1000XXXXX00003" style={inp('vatNumber')} onFocus={() => setFocused('vatNumber')} onBlur={() => setFocused('')} />
                    </div>
                  </>
                )}

                <div>
                  <label style={labelStyle}>{isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.ae" style={inp('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                </div>
                <div>
                  <label style={labelStyle}>{isRTL ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+971 50 000 0000" style={inp('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} />
                </div>
                <div>
                  <label style={labelStyle}>{isRTL ? 'كلمة المرور *' : 'Password *'}</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder={isRTL ? '٨ أحرف على الأقل' : 'Min 8 characters'} style={inp('password')} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} />
                </div>

                {error && (
                  <div style={{ padding: '12px 16px', background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050', fontSize: '13px' }}>
                    {error}
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading} style={{
                  width: '100%', padding: '16px',
                  background: loading ? 'rgba(200,169,110,0.4)' : 'var(--gold)',
                  border: '1px solid var(--gold)', color: 'var(--navy)',
                  fontSize: '14px', fontWeight: 600,
                  cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  {loading ? (isRTL ? 'جارٍ إنشاء الحساب...' : 'Creating account...') : (isRTL ? 'التالي — توقيع العقد' : 'Next — Sign Contract')}
                </button>

                <p style={{ fontSize: '12px', color: 'var(--white-dim)', textAlign: 'center' }}>
                  {isRTL ? 'لديك حساب؟ ' : 'Already have an account? '}
                  <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>{isRTL ? 'تسجيل الدخول' : 'Sign in'}</a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}