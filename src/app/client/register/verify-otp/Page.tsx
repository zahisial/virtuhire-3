// // src/app/client/register/verify-otp/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { authAPI } from '@/lib/api'

export default function VerifyOtpPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length < 4) {
      setError(isRTL ? 'أدخل رمز التحقق' : 'Enter verification code')
      return
    }
    setLoading(true)
    setError('')
    try {
      await authAPI.verifyOTP(email, otp)
      setSuccess(true)
      // Optionally redirect after success
      setTimeout(() => router.push('/client/contract'), 2000)
    } catch (err: any) {
      setError(err?.detail || 'Invalid or expired code')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
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
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', textAlign: 'center' }}>
            {isRTL ? 'تم التحقق!' : 'Verified!'}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--white-dim)', textAlign: 'center', marginTop: '16px' }}>
            {isRTL ? 'سيتم تحويلك قريباً...' : 'You will be redirected shortly...'}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>
          {isRTL ? 'التحقق' : 'Verification'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px,4vw,44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'أدخل رمز التحقق' : 'Enter verification code'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {isRTL ? `أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى ${email}` : `Enter the 6‑digit code sent to ${email}`}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              style={{
                width: '100%', padding: '12px 16px', textAlign: 'center', letterSpacing: '4px',
                background: 'var(--navy-mid)', border: '1px solid var(--border-soft)',
                color: 'var(--white)', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
              }}
            />
          </div>

          {error && (
            <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? 'rgba(200,169,110,0.4)' : 'var(--gold)',
              border: '1px solid var(--gold)', color: 'var(--navy)',
              fontSize: '14px', fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
            }}
          >
            {loading ? (isRTL ? 'جارٍ التحقق...' : 'Verifying...') : (isRTL ? 'تحقق' : 'Verify')}
          </button>
        </form>
      </motion.div>
    </div>
  )
}