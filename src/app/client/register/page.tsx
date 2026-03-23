// src/app/client/register/page.tsx - WIRED TO DJANGO API
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { authAPI } from '@/lib/api'

type AccountType = 'individual' | 'corporate' | null

const labelStyle = {
  display: 'block', fontSize: '12px', fontWeight: 500 as const,
  color: 'var(--white-dim)', marginBottom: '8px',
  letterSpacing: '0.5px', textTransform: 'uppercase' as const,
}

export default function RegisterPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()

  const [step, setStep] = useState<'type' | 'form' | 'otp'>('type')
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [focused, setFocused] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otpCode, setOtpCode] = useState('')

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '',
    companyName: '', vatNumber: '', contactPerson: '',
    emiratesIdExpiry: '', tradeLicenseExpiry: '',
  })

  const [files, setFiles] = useState({
    emiratesId: null as File | null,
    tradeLicense: null as File | null,
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const setFile = (key: 'emiratesId' | 'tradeLicense', file: File | null) => setFiles(f => ({ ...f, [key]: file }))

  // Validate form
  const validate = () => {
    if (!accountType) return isRTL ? 'اختر نوع الحساب' : 'Please select an account type'
    if (!form.email) return isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required'
    if (!form.phone) return isRTL ? 'رقم الهاتف مطلوب' : 'Phone is required'
    if (!form.password) return isRTL ? 'كلمة المرور مطلوبة' : 'Password is required'
    if (form.password.length < 8) return isRTL ? 'كلمة المرور 8 أحرف على الأقل' : 'Password must be at least 8 characters'
    if (accountType === 'individual') {
      if (!form.fullName) return isRTL ? 'الاسم الكامل مطلوب' : 'Full name is required'
      if (!form.emiratesIdExpiry) return isRTL ? 'تاريخ انتهاء الهوية مطلوب' : 'Emirates ID expiry date is required'
      if (!files.emiratesId) return isRTL ? 'صورة الهوية مطلوبة' : 'Emirates ID image is required'
    }
    if (accountType === 'corporate') {
      if (!form.companyName) return isRTL ? 'اسم الشركة مطلوب' : 'Company name is required'
      if (!form.contactPerson) return isRTL ? 'شخص التواصل مطلوب' : 'Contact person is required'
      if (!form.tradeLicenseExpiry) return isRTL ? 'تاريخ انتهاء الرخصة مطلوب' : 'Trade license expiry date is required'
      if (!files.tradeLicense) return isRTL ? 'صورة الرخصة التجارية مطلوبة' : 'Trade license image is required'
    }
    return null
  }

  // Step 1: After account type selected, go to form
  const handleTypeSelect = (type: AccountType) => {
    setAccountType(type)
    setStep('form')
  }

  // Step 2: Submit form and request OTP
  const handleFormSubmit = async () => {
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setLoading(true)
    setError('')
    try {
      // Request OTP – backend will send to email (and optionally phone)
      await authAPI.requestOTP(form.email)
      setStep('otp')
    } catch (e: any) {
      setError(e?.detail || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Verify OTP and complete registration
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      setError(isRTL ? 'أدخل رمز التحقق' : 'Enter verification code')
      return
    }
    setLoading(true)
    setError('')
    try {
      // Verify OTP
      await authAPI.verifyOTP(form.email, otpCode)

      // Now submit full registration with files
      const formData = new FormData()
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('password', form.password)
      formData.append('account_type', accountType!)

      if (accountType === 'individual') {
        formData.append('full_name', form.fullName)
        formData.append('emirates_id_expiry', form.emiratesIdExpiry)
        if (files.emiratesId) formData.append('emirates_id', files.emiratesId)
      } else {
        formData.append('company_name', form.companyName)
        formData.append('vat_number', form.vatNumber)
        formData.append('contact_person', form.contactPerson)
        formData.append('trade_license_expiry', form.tradeLicenseExpiry)
        if (files.tradeLicense) formData.append('trade_license', files.tradeLicense)
      }

      // Register endpoint must accept multipart/form-data
      const response = await authAPI.register(formData)
      // On success, go to contract page
      router.push('/client/contract')
    } catch (e: any) {
      setError(e?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inp = (id: string) => ({
    width: '100%', padding: '12px 16px', background: 'var(--navy-mid)',
    border: `1px solid ${focused === id ? 'var(--gold)' : 'var(--border-soft)'}`,
    color: 'var(--white)', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
  })

  const fileInput = (id: string) => ({
    width: '100%', padding: '8px', background: 'var(--navy-mid)',
    border: `1px solid ${focused === id ? 'var(--gold)' : 'var(--border-soft)'}`,
    color: 'var(--white)', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
  })

  // Helper for expiry date input (format YYYY-MM-DD)
  const formatExpiryDate = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8)
    if (digits.length <= 4) return digits
    return digits.slice(0, 4) + '-' + digits.slice(4, 6) + (digits.length > 6 ? '-' + digits.slice(6, 8) : '')
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>
          {step === 'type' ? (isRTL ? 'الخطوة ١' : 'Step 1') : step === 'form' ? (isRTL ? 'الخطوة ٢' : 'Step 2') : (isRTL ? 'الخطوة ٣' : 'Step 3')}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px,4vw,44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {step === 'type' && (isRTL ? 'أنشئ حسابك' : 'Create your account')}
          {step === 'form' && (isRTL ? 'أكمل بياناتك' : 'Complete your details')}
          {step === 'otp' && (isRTL ? 'تحقق من هويتك' : 'Verify your identity')}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {step === 'type' && (isRTL ? 'اختر نوع الحساب' : 'Choose account type')}
          {step === 'form' && (isRTL ? 'أدخل بياناتك وسيتم إرسال رمز تحقق' : 'Enter your details, we’ll send a verification code')}
          {step === 'otp' && (isRTL ? `أدخل الرمز المرسل إلى ${form.email}` : `Enter the code sent to ${form.email}`)}
        </p>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Type */}
          {step === 'type' && (
            <motion.div key="type" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {isRTL ? 'نوع الحساب' : 'Account Type'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {[
                  { type: 'individual' as AccountType, en: 'Individual', ar: 'حساب فردي', descEn: 'Personal hire as a UAE resident', descAr: 'توظيف شخصي كمقيم في الإمارات' },
                  { type: 'corporate' as AccountType, en: 'Corporate', ar: 'حساب مؤسسي', descEn: 'Company account with trade license', descAr: 'حساب شركة مع رخصة تجارية' },
                ].map(card => (
                  <button
                    key={String(card.type)}
                    onClick={() => handleTypeSelect(card.type)}
                    style={{
                      padding: '24px 20px', background: accountType === card.type ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)',
                      border: `1px solid ${accountType === card.type ? 'var(--gold)' : 'var(--border-soft)'}`,
                      cursor: 'pointer', textAlign: isRTL ? 'right' : 'left', color: 'var(--white)', transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px', color: accountType === card.type ? 'var(--gold)' : 'var(--white)' }}>
                      {isRTL ? card.ar : card.en}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>
                      {isRTL ? card.descAr : card.descEn}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Form with all fields */}
          {step === 'form' && accountType && (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Individual-specific fields */}
                {accountType === 'individual' && (
                  <>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'الاسم الكامل *' : 'Full Name *'}</label>
                      <input
                        value={form.fullName}
                        onChange={e => set('fullName', e.target.value)}
                        placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        style={inp('fullName')}
                        onFocus={() => setFocused('fullName')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'تاريخ انتهاء الهوية *' : 'Emirates ID Expiry *'}</label>
                      <input
                        value={form.emiratesIdExpiry}
                        onChange={e => set('emiratesIdExpiry', formatExpiryDate(e.target.value))}
                        placeholder="YYYY-MM-DD"
                        style={inp('emiratesIdExpiry')}
                        onFocus={() => setFocused('emiratesIdExpiry')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'صورة الهوية *' : 'Emirates ID Image *'}</label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => setFile('emiratesId', e.target.files?.[0] || null)}
                        style={fileInput('emiratesId')}
                        onFocus={() => setFocused('emiratesId')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                  </>
                )}

                {/* Corporate-specific fields */}
                {accountType === 'corporate' && (
                  <>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'اسم الشركة *' : 'Company Name *'}</label>
                      <input
                        value={form.companyName}
                        onChange={e => set('companyName', e.target.value)}
                        placeholder={isRTL ? 'اسم شركتك' : 'Your company name'}
                        style={inp('companyName')}
                        onFocus={() => setFocused('companyName')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'شخص التواصل *' : 'Contact Person *'}</label>
                      <input
                        value={form.contactPerson}
                        onChange={e => set('contactPerson', e.target.value)}
                        placeholder={isRTL ? 'الاسم الكامل' : 'Full name'}
                        style={inp('contactPerson')}
                        onFocus={() => setFocused('contactPerson')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'رقم ضريبة القيمة المضافة' : 'VAT Number (Optional)'}</label>
                      <input
                        value={form.vatNumber}
                        onChange={e => set('vatNumber', e.target.value)}
                        placeholder="1000XXXXX00003"
                        style={inp('vatNumber')}
                        onFocus={() => setFocused('vatNumber')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'تاريخ انتهاء الرخصة *' : 'Trade License Expiry *'}</label>
                      <input
                        value={form.tradeLicenseExpiry}
                        onChange={e => set('tradeLicenseExpiry', formatExpiryDate(e.target.value))}
                        placeholder="YYYY-MM-DD"
                        style={inp('tradeLicenseExpiry')}
                        onFocus={() => setFocused('tradeLicenseExpiry')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>{isRTL ? 'صورة الرخصة *' : 'Trade License Image *'}</label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => setFile('tradeLicense', e.target.files?.[0] || null)}
                        style={fileInput('tradeLicense')}
                        onFocus={() => setFocused('tradeLicense')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                  </>
                )}

                {/* Common fields */}
                <div>
                  <label style={labelStyle}>{isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@company.ae"
                    style={inp('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{isRTL ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+971 50 000 0000"
                    style={inp('phone')}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{isRTL ? 'كلمة المرور *' : 'Password *'}</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    placeholder={isRTL ? '٨ أحرف على الأقل' : 'Min 8 characters'}
                    style={inp('password')}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                  />
                </div>

                {error && (
                  <div style={{ padding: '12px 16px', background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050', fontSize: '13px' }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleFormSubmit}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: loading ? 'rgba(200,169,110,0.4)' : 'var(--gold)',
                    border: '1px solid var(--gold)', color: 'var(--navy)',
                    fontSize: '14px', fontWeight: 600,
                    cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {loading ? (isRTL ? 'جارٍ إنشاء الحساب...' : 'Creating account...') : (isRTL ? 'التالي — تحقق' : 'Next — Verify')}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 'otp' && (
            <motion.div key="otp" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>{isRTL ? 'رمز التحقق' : 'Verification Code'}</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="000000"
                    style={inp('otp')}
                    onFocus={() => setFocused('otp')}
                    onBlur={() => setFocused('')}
                  />
                </div>
                {error && (
                  <div style={{ padding: '12px 16px', background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050', fontSize: '13px' }}>
                    {error}
                  </div>
                )}
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: loading ? 'rgba(200,169,110,0.4)' : 'var(--gold)',
                    border: '1px solid var(--gold)', color: 'var(--navy)',
                    fontSize: '14px', fontWeight: 600,
                    cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {loading ? (isRTL ? 'جارٍ التحقق...' : 'Verifying...') : (isRTL ? 'تأكيد التسجيل' : 'Complete Registration')}
                </button>
                <button
                  onClick={() => setStep('form')}
                  style={{
                    background: 'transparent', border: '1px solid var(--border-soft)',
                    color: 'var(--white-dim)', fontSize: '13px', padding: '12px',
                    cursor: 'pointer', width: '100%',
                  }}
                >
                  {isRTL ? 'العودة إلى النموذج' : 'Back to form'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ fontSize: '12px', color: 'var(--white-dim)', textAlign: 'center', marginTop: '24px' }}>
          {isRTL ? 'لديك حساب؟ ' : 'Already have an account? '}
          <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            {isRTL ? 'تسجيل الدخول' : 'Sign in'}
          </a>
        </p>
      </motion.div>
    </div>
  )
}