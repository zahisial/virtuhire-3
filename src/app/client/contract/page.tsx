'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function ContractPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [signed, setSigned] = useState(false)
  const [lang, setLang] = useState<'en' | 'ar'>(isRTL ? 'ar' : 'en')

  // Signature canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#C8A96E'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const getPos = (e: any, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: any) => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const pos = getPos(e, canvas)
    ctx.beginPath(); ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
  }

  const draw = (e: any) => {
    if (!isDrawing) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const pos = getPos(e, canvas)
    ctx.lineTo(pos.x, pos.y); ctx.stroke()
    setSigned(true)
  }

  const stopDraw = () => setIsDrawing(false)

  const clearSignature = () => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSigned(false)
  }

  const handleSubmit = () => {
    if (!agreed || !signed) return
    router.push('/client/payment')
  }

  const contractEN = `SERVICE AGREEMENT — VIRTUHIRE PLATFORM

This agreement is entered into between VirtuHire ("Platform") and the Client ("you") for offshore staffing services.

1. SERVICES
VirtuHire will provide access to pre-vetted offshore candidates from Pakistan for Admin, Sales, and 2D Design roles, both Home-Based and Office-Based.

2. FEES & BILLING
Monthly service fees are charged per employee as per the current pricing schedule. A one-time hiring fee of AED 300 per employee is charged upon initiating a hiring request, which is credited toward the first month's invoice.

3. PAYMENT TERMS
Invoices are generated monthly and charged automatically to the saved payment method. A 30-day cancellation notice is required.

4. EMPLOYEE REPLACEMENT
Clients may request an employee replacement at any time. The replacement takes effect at the end of the current billing cycle.

5. EMPLOYEE BUYOUT
Clients may directly hire an employee for a fixed buyout fee of AED 5,000.

6. CONFIDENTIALITY
All candidate information accessed through the platform is confidential and may not be shared with third parties.

7. GOVERNING LAW
This agreement is governed by the laws of the United Arab Emirates.`

  const contractAR = `اتفاقية الخدمة — منصة VirtuHire

تُبرم هذه الاتفاقية بين VirtuHire ("المنصة") والعميل ("أنت") لخدمات التوظيف الخارجي.

١. الخدمات
توفر VirtuHire إمكانية الوصول إلى مرشحين خارجيين معتمدين من باكستان لوظائف الإدارة والمبيعات والتصميم ثنائي الأبعاد، سواء من المنزل أو المكتب.

٢. الرسوم والفوترة
تُفرض رسوم خدمة شهرية لكل موظف وفقاً لجدول الأسعار الحالي. تُفرض رسوم توظيف لمرة واحدة بقيمة ٣٠٠ درهم لكل موظف عند بدء طلب التوظيف، وتُحتسب من فاتورة الشهر الأول.

٣. شروط الدفع
تُصدر الفواتير شهرياً وتُخصم تلقائياً من طريقة الدفع المحفوظة. يلزم إشعار إلغاء قبل ٣٠ يوماً.

٤. استبدال الموظف
يجوز للعملاء طلب استبدال موظف في أي وقت. يسري الاستبدال في نهاية دورة الفوترة الحالية.

٥. استقطاب الموظف
يجوز للعملاء توظيف موظف مباشرة مقابل رسوم استقطاب ثابتة بقيمة ٥٠٠٠ درهم.

٦. السرية
جميع معلومات المرشحين التي يتم الوصول إليها عبر المنصة سرية ولا يجوز مشاركتها مع أطراف ثالثة.

٧. القانون الحاكم
تخضع هذه الاتفاقية لقوانين دولة الإمارات العربية المتحدة.`

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{
          fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
          {isRTL ? 'الخطوة ٢' : 'Step 2'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'اتفاقية الخدمة' : 'Service Agreement'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '32px' }}>
          {isRTL ? 'يُرجى مراجعة الاتفاقية وتوقيعها رقمياً. ستُحفظ نسخة PDF في لوحة التحكم.' : 'Please review and sign the agreement digitally. A PDF copy will be stored in your dashboard.'}
        </p>

        {/* Language Toggle for Contract */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '20px', width: 'fit-content', background: 'var(--navy-card)', padding: '4px', border: '1px solid var(--border-soft)' }}>
          {(['en', 'ar'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '8px 20px',
              background: lang === l ? 'var(--navy-light)' : 'transparent',
              border: lang === l ? '1px solid var(--border)' : '1px solid transparent',
              color: lang === l ? 'var(--gold)' : 'var(--white-dim)',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
              fontFamily: l === 'ar' ? 'Tajawal, sans-serif' : 'inherit',
            }}>
              {l === 'en' ? 'English' : 'عربي'}
            </button>
          ))}
        </div>

        {/* Contract Text */}
        <div style={{
          background: 'var(--navy-card)', border: '1px solid var(--border-soft)',
          padding: '32px', maxHeight: '320px', overflowY: 'auto',
          marginBottom: '24px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, var(--gold-dim), transparent)',
          }} />
          <pre style={{
            fontFamily: lang === 'ar' ? 'Tajawal, sans-serif' : 'inherit',
            fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.9,
            whiteSpace: 'pre-wrap', direction: lang === 'ar' ? 'rtl' : 'ltr',
            textAlign: lang === 'ar' ? 'right' : 'left',
          }}>
            {lang === 'en' ? contractEN : contractAR}
          </pre>
        </div>

        {/* Agree Checkbox */}
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: '12px',
          cursor: 'pointer', marginBottom: '32px',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}>
          <div onClick={() => setAgreed(!agreed)} style={{
            width: '20px', height: '20px', border: `1px solid ${agreed ? 'var(--gold)' : 'var(--border-soft)'}`,
            background: agreed ? 'var(--gold)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: '2px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.6 }}>
            {isRTL
              ? 'أقر بأنني قرأت اتفاقية الخدمة وأوافق على بنودها وشروطها.'
              : 'I confirm that I have read and agree to the Service Agreement terms and conditions.'}
          </span>
        </label>

        {/* Signature Canvas */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{
              fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)',
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>
              {isRTL ? 'التوقيع الإلكتروني' : 'E-Signature'}
            </label>
            <button onClick={clearSignature} style={{
              background: 'none', border: 'none', color: 'var(--gold-dim)',
              fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {isRTL ? 'مسح' : 'Clear'}
            </button>
          </div>
          <div style={{
            background: 'var(--navy-mid)', border: `1px solid ${signed ? 'rgba(200,169,110,0.3)' : 'var(--border-soft)'}`,
            position: 'relative', transition: 'border-color 0.2s',
          }}>
            <canvas
              ref={canvasRef} width={620} height={140}
              style={{ display: 'block', width: '100%', height: '140px', cursor: 'crosshair', touchAction: 'none' }}
              onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
              onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
            />
            {!signed && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <span style={{ fontSize: '13px', color: 'rgba(168,159,146,0.4)' }}>
                  {isRTL ? 'وقّع هنا' : 'Sign here'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!agreed || !signed} style={{
          width: '100%', padding: '16px',
          background: agreed && signed ? 'var(--gold)' : 'rgba(200,169,110,0.2)',
          border: `1px solid ${agreed && signed ? 'var(--gold)' : 'var(--border-soft)'}`,
          color: agreed && signed ? 'var(--navy)' : 'var(--white-dim)',
          fontSize: '14px', fontWeight: 600,
          cursor: agreed && signed ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
        }}>
          {isRTL ? 'التالي — إعداد الدفع' : 'Next — Payment Setup'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      </motion.div>
    </div>
  )
}