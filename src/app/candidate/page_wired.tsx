'use client'
// src/app/candidate/apply/page.tsx
// Wired to real Django API — submits FormData with CV + voice intro to /api/candidates/apply/

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { candidatesAPI, authAPI, saveTokens, saveUser } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const STEPS = ['account', 'details', 'preferences', 'voice', 'review'] as const
type Step = typeof STEPS[number]

export default function CandidateApplyPage() {
  const { isRTL } = useLanguage()
  const { register } = useAuth()
  const [step, setStep]         = useState<Step>('account')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [focused, setFocused]   = useState('')
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded]   = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const timerRef  = useRef<any>(null)
  const mediaRef  = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [account, setAccount] = useState({ email: '', password: '', phone: '' })
  const [form, setForm] = useState({
    fullName: '', location: '', category: '', workPreference: '', experience: '',
    cv: null as File | null,
  })

  const currentIdx  = STEPS.indexOf(step)
  const progress    = (currentIdx / (STEPS.length - 1)) * 100

  const next = () => { const n = STEPS[currentIdx + 1]; if (n) setStep(n) }
  const prev = () => { const p = STEPS[currentIdx - 1]; if (p) setStep(p) }

  const startRecording = async () => {
    try {
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRef.current = mr
      mr.ondataavailable = e => chunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(t => t.stop())
      }
      mr.start()
      setRecording(true)
      setRecordingTime(0)
      timerRef.current = setInterval(() => {
        setRecordingTime(t => {
          if (t >= 60) { stopRecording(); return 60 }
          return t + 1
        })
      }, 1000)
    } catch {
      alert(isRTL ? 'يرجى السماح بالوصول إلى الميكروفون' : 'Please allow microphone access')
    }
  }

  const stopRecording = () => {
    mediaRef.current?.stop()
    clearInterval(timerRef.current)
    setRecording(false)
    setRecorded(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      // Step 1: Register candidate account
      const regRes: any = await authAPI.register({
        email: account.email,
        phone: account.phone,
        password: account.password,
        role: 'candidate',
        account_type: 'individual',
        full_name: form.fullName,
      })
      saveTokens(regRes.tokens.access, regRes.tokens.refresh)
      saveUser(regRes.user)

      // Step 2: Submit application with files
      const fd = new FormData()
      fd.append('full_name',        form.fullName)
      fd.append('phone',            account.phone)
      fd.append('location',         form.location)
      fd.append('category',         form.category)
      fd.append('work_preference',  form.workPreference)
      fd.append('experience',       form.experience)
      if (form.cv)    fd.append('cv',          form.cv)
      if (audioBlob)  fd.append('voice_intro', new File([audioBlob], 'voice_intro.webm', { type: 'audio/webm' }))

      await candidatesAPI.apply(fd)
      setSubmitted(true)
    } catch (err: any) {
      setError(err?.email?.[0] || err?.detail || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (id: string) => ({
    width: '100%', padding: '12px 16px',
    background: 'var(--navy-mid)',
    border: `1px solid ${focused === id ? 'var(--gold)' : 'var(--border-soft)'}`,
    color: 'var(--white)', fontSize: '14px',
    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
  })

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 500 as const, color: 'var(--white-dim)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' as const }

  if (submitted) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'grid', placeItems: 'center', padding: '120px 5%' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: 'var(--gold)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 className="font-display" style={{ fontSize: '42px', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '16px' }}>
              {isRTL ? 'تم إرسال طلبك!' : 'Application Submitted!'}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '24px' }}>
              {isRTL ? 'طلبك قيد المراجعة. ستتلقى إشعاراً عبر البريد الإلكتروني.' : 'Your application is under review. You\'ll receive an email notification once approved.'}
            </p>
            <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '20px 24px', textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>{isRTL ? 'الحالة' : 'Status'}</div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--gold)' }}>{isRTL ? 'قيد المراجعة' : 'Under Review'}</div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    )
  }

  const categories  = [{ id: 'admin-sales', en: 'Admin & Sales', ar: 'إداري ومبيعات' }, { id: '2d-design', en: '2D Design', ar: 'تصميم ثنائي الأبعاد' }]
  const workPrefs   = [
    { id: 'home',   en: 'Home-Based',   ar: 'عمل من المنزل', rateEn: '2,150 – 3,200 AED/mo', rateAr: '٢٬١٥٠ – ٣٬٢٠٠ درهم/شهر' },
    { id: 'office', en: 'Office-Based', ar: 'عمل من المكتب', rateEn: '2,700 – 3,600 AED/mo', rateAr: '٢٬٧٠٠ – ٣٬٦٠٠ درهم/شهر' },
  ]

  const stepLabels = [
    { id: 'account',     en: 'Account',     ar: 'الحساب' },
    { id: 'details',     en: 'Details',     ar: 'البيانات' },
    { id: 'preferences', en: 'Preferences', ar: 'التفضيلات' },
    { id: 'voice',       en: 'Voice Intro', ar: 'المقطع الصوتي' },
    { id: 'review',      en: 'Review',      ar: 'مراجعة' },
  ]

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: 'var(--navy)', paddingTop: '72px' }}>
        {/* Progress */}
        <div style={{ background: 'var(--navy-mid)', borderBottom: '1px solid var(--border-soft)', padding: '0 5%' }}>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--gold)', width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '12px 0' }} dir={isRTL ? 'rtl' : 'ltr'}>
            {stepLabels.map((s, i) => {
              const isDone = i < currentIdx; const isActive = s.id === step
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: isActive ? 1 : isDone ? 0.7 : 0.35 }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `1px solid ${isActive ? 'var(--gold)' : isDone ? 'var(--gold-dim)' : 'var(--border-soft)'}`, background: isDone ? 'var(--gold-dim)' : isActive ? 'rgba(200,169,110,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600, color: isActive ? 'var(--gold)' : isDone ? 'var(--navy)' : 'var(--white-dim)', flexShrink: 0 }}>
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--gold)' : 'var(--white-dim)' }}>{isRTL ? s.ar : s.en}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '60px 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
          <AnimatePresence mode="wait">

            {/* STEP 0 — Account */}
            {step === 'account' && (
              <motion.div key="account" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>{isRTL ? 'الخطوة ١ من ٥' : 'Step 1 of 5'}</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>{isRTL ? 'أنشئ حسابك' : 'Create your account'}</h1>
                <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '36px' }}>{isRTL ? 'ستستخدم هذا للوصول إلى حالة طلبك لاحقاً.' : 'You\'ll use this to check your application status later.'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { key: 'email', label: isRTL ? 'البريد الإلكتروني' : 'Email', type: 'email', ph: 'you@email.com' },
                    { key: 'phone', label: isRTL ? 'رقم الهاتف' : 'Phone', type: 'tel', ph: '+92 300 000 0000' },
                    { key: 'password', label: isRTL ? 'كلمة المرور' : 'Password', type: 'password', ph: 'Min 8 characters' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input type={f.type} value={(account as any)[f.key]} onChange={e => setAccount(a => ({ ...a, [f.key]: e.target.value }))} placeholder={f.ph} style={inputStyle(f.key)} onFocus={() => setFocused(f.key)} onBlur={() => setFocused('')} />
                    </div>
                  ))}
                  <button onClick={next} style={{ width: '100%', padding: '16px', background: 'var(--gold)', border: '1px solid var(--gold)', color: 'var(--navy)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isRTL ? 'التالي →' : 'Next →'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1 — Personal Details */}
            {step === 'details' && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>{isRTL ? 'الخطوة ٢ من ٥' : 'Step 2 of 5'}</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '36px' }}>{isRTL ? 'بياناتك الشخصية' : 'Personal Details'}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { key: 'fullName', label: isRTL ? 'الاسم الكامل' : 'Full Name', ph: isRTL ? 'اسمك الكامل' : 'Your full name' },
                    { key: 'location', label: isRTL ? 'الموقع الحالي' : 'Location', ph: isRTL ? 'لاهور، باكستان' : 'Lahore, Pakistan' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input value={(form as any)[f.key]} onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))} placeholder={f.ph} style={inputStyle(f.key)} onFocus={() => setFocused(f.key)} onBlur={() => setFocused('')} />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>{isRTL ? 'السيرة الذاتية (اختياري)' : 'CV Upload (Optional)'}</label>
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px', border: '1px dashed var(--border-soft)', background: 'var(--navy-mid)', cursor: 'pointer', gap: '8px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--gold-dim)' }}><path d="M12 4v12M8 8l4-4 4 4M4 18h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: '13px', color: form.cv ? 'var(--gold)' : 'var(--white-dim)' }}>{form.cv ? form.cv.name : (isRTL ? 'ارفع سيرتك الذاتية' : 'Upload your CV')}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(168,159,146,0.5)' }}>PDF or DOCX · Max 5MB</span>
                      <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setForm(fm => ({ ...fm, cv: e.target.files?.[0] || null }))} />
                    </label>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button onClick={prev} style={{ padding: '14px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--white-dim)', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? '← رجوع' : '← Back'}</button>
                    <button onClick={next} style={{ padding: '14px', background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? 'التالي →' : 'Next →'}</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Preferences */}
            {step === 'preferences' && (
              <motion.div key="preferences" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>{isRTL ? 'الخطوة ٣ من ٥' : 'Step 3 of 5'}</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '36px' }}>{isRTL ? 'تفضيلات العمل' : 'Work Preferences'}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>{isRTL ? 'التخصص' : 'Category'}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {categories.map(c => (
                        <button key={c.id} onClick={() => setForm(fm => ({ ...fm, category: c.id }))} style={{ padding: '20px', textAlign: isRTL ? 'right' : 'left', background: form.category === c.id ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)', border: `1px solid ${form.category === c.id ? 'var(--gold)' : 'var(--border-soft)'}`, color: form.category === c.id ? 'var(--gold)' : 'var(--white)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s' }}>
                          {isRTL ? c.ar : c.en}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{isRTL ? 'نوع العمل' : 'Work Preference'}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {workPrefs.map(w => (
                        <button key={w.id} onClick={() => setForm(fm => ({ ...fm, workPreference: w.id }))} style={{ padding: '20px', textAlign: isRTL ? 'right' : 'left', background: form.workPreference === w.id ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)', border: `1px solid ${form.workPreference === w.id ? 'var(--gold)' : 'var(--border-soft)'}`, color: 'var(--white)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: form.workPreference === w.id ? 'var(--gold)' : 'var(--white)', marginBottom: '6px' }}>{isRTL ? w.ar : w.en}</div>
                          <div style={{ fontSize: '12px', color: 'var(--gold-dim)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>{isRTL ? w.rateAr : w.rateEn}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>{isRTL ? 'ملخص الخبرة' : 'Experience Summary'}</label>
                    <textarea value={form.experience} onChange={e => setForm(fm => ({ ...fm, experience: e.target.value }))} rows={4} placeholder={isRTL ? 'اشرح خبرتك...' : 'Describe your experience...'} style={{ ...inputStyle('experience'), resize: 'vertical' as const }} onFocus={() => setFocused('experience')} onBlur={() => setFocused('')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button onClick={prev} style={{ padding: '14px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--white-dim)', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? '← رجوع' : '← Back'}</button>
                    <button onClick={next} style={{ padding: '14px', background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? 'التالي →' : 'Next →'}</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Voice */}
            {step === 'voice' && (
              <motion.div key="voice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>{isRTL ? 'الخطوة ٤ من ٥' : 'Step 4 of 5'}</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>{isRTL ? 'المقطع التعريفي الصوتي' : 'Voice Introduction'}</h1>
                <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '36px' }}>{isRTL ? 'سجّل مقطعاً صوتياً لمدة دقيقة.' : 'Record a 1-minute voice intro. Talk about your experience.'}</p>
                <div style={{ background: 'var(--navy-card)', border: `1px solid ${recording ? 'var(--gold)' : recorded ? 'rgba(100,200,120,0.3)' : 'var(--border-soft)'}`, padding: '48px', textAlign: 'center', marginBottom: '28px', transition: 'border-color 0.3s' }}>
                  <button onClick={recording ? stopRecording : startRecording} style={{ width: '80px', height: '80px', borderRadius: '50%', border: `2px solid ${recording ? 'var(--gold)' : recorded ? 'rgba(100,200,120,0.5)' : 'var(--border-soft)'}`, background: recording ? 'rgba(200,169,110,0.1)' : 'transparent', color: recording ? 'var(--gold)' : recorded ? '#7DC99C' : 'var(--white-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', transition: 'all 0.3s' }}>
                    {recorded && !recording ? <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l6 6 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="10" y="4" width="8" height="14" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M6 14a8 8 0 0016 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 22v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                  </button>
                  <div style={{ fontSize: '14px', color: recording ? 'var(--gold)' : recorded ? '#7DC99C' : 'var(--white-dim)', fontWeight: 500, marginBottom: '8px' }}>
                    {recording ? `${isRTL ? 'جارٍ التسجيل' : 'Recording'} — ${60 - recordingTime}s` : recorded ? (isRTL ? 'تم التسجيل ✓' : 'Recording complete ✓') : (isRTL ? 'اضغط للتسجيل' : 'Click to start recording')}
                  </div>
                  {recorded && <button onClick={() => { setRecorded(false); setAudioBlob(null); setRecordingTime(0) }} style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--gold-dim)', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? 'إعادة التسجيل' : 'Re-record'}</button>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={prev} style={{ padding: '14px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--white-dim)', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? '← رجوع' : '← Back'}</button>
                  <button onClick={next} disabled={!recorded} style={{ padding: '14px', background: recorded ? 'var(--gold)' : 'rgba(200,169,110,0.2)', border: 'none', color: recorded ? 'var(--navy)' : 'var(--white-dim)', fontSize: '14px', fontWeight: 600, cursor: recorded ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>{isRTL ? 'التالي →' : 'Next →'}</button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 — Review */}
            {step === 'review' && (
              <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500 }}>{isRTL ? 'الخطوة ٥ من ٥' : 'Step 5 of 5'}</div>
                <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '32px' }}>{isRTL ? 'مراجعة وإرسال' : 'Review & Submit'}</h1>
                <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '28px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { en: 'Email',       ar: 'البريد',        val: account.email },
                      { en: 'Full Name',   ar: 'الاسم',         val: form.fullName },
                      { en: 'Location',    ar: 'الموقع',        val: form.location },
                      { en: 'Category',    ar: 'التخصص',       val: form.category },
                      { en: 'Work Type',   ar: 'نوع العمل',    val: form.workPreference },
                      { en: 'CV',          ar: 'السيرة',        val: form.cv?.name || '—' },
                      { en: 'Voice Intro', ar: 'المقطع الصوتي', val: recorded ? '✓ Recorded' : '—' },
                    ].map((r, i, arr) => (
                      <div key={r.en} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-soft)' : 'none', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span style={{ fontSize: '12px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{isRTL ? r.ar : r.en}</span>
                        <span style={{ fontSize: '14px', color: 'var(--white)' }}>{r.val || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {error && <div style={{ padding: '12px 16px', background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={prev} style={{ padding: '14px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--white-dim)', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? '← رجوع' : '← Back'}</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ padding: '14px', background: loading ? 'rgba(200,169,110,0.4)' : 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: '14px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit' }}>
                    {loading ? (isRTL ? 'جارٍ الإرسال...' : 'Submitting...') : (isRTL ? 'إرسال الطلب ✓' : 'Submit Application ✓')}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  )
}