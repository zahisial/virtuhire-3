'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const PRICING: Record<string, Record<string, number>> = {
  'admin-sales': { home: 2150, office: 2700 },
  '2d-design':   { home: 3200, office: 3600 },
}

export default function HirePage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [category, setCategory] = useState<'admin-sales' | '2d-design' | ''>('')
  const [workType, setWorkType] = useState<'home' | 'office' | ''>('')
  const [count, setCount] = useState(1)

  const monthlyRate = category && workType ? PRICING[category][workType] : 0
  const hiringFee = 300 * count
  const firstMonthTotal = monthlyRate * count
  const dueNow = hiringFee

  const categories = [
    {
      id: 'admin-sales', labelEn: 'Admin & Sales', labelAr: 'إداري ومبيعات',
      descEn: 'Coordination, customer service, sales support', descAr: 'تنسيق، خدمة عملاء، دعم مبيعات',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    },
    {
      id: '2d-design', labelEn: '2D Design', labelAr: 'تصميم ثنائي الأبعاد',
      descEn: 'Graphic design, social media, branding', descAr: 'جرافيك، سوشيال ميديا، هوية بصرية',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    },
  ]

  const workTypes = [
    { id: 'home', labelEn: 'Home-Based', labelAr: 'عمل من المنزل', descEn: 'Remote, working from home in Pakistan', descAr: 'عن بُعد من المنزل في باكستان' },
    { id: 'office', labelEn: 'Office-Based', labelAr: 'عمل من المكتب', descEn: 'Supervised office in Pakistan', descAr: 'مكتب خاضع للإشراف في باكستان' },
  ]

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{
          fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold-dim)', marginBottom: '12px', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--gold-dim)', display: 'block' }} />
          {isRTL ? 'الخطوة ٤' : 'Step 4'}
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px' }}>
          {isRTL ? 'تفاصيل طلب التوظيف' : 'Hiring Request'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '40px' }}>
          {isRTL ? 'حدد التخصص ونوع العمل وعدد الموظفين المطلوبين.' : 'Select the category, work type, and number of employees needed.'}
        </p>

        {/* Category */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {isRTL ? 'التخصص' : 'Category'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setCategory(cat.id as any)} style={{
                padding: '24px 20px', textAlign: isRTL ? 'right' : 'left',
                background: category === cat.id ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)',
                border: `1px solid ${category === cat.id ? 'var(--gold)' : 'var(--border-soft)'}`,
                cursor: 'pointer', color: 'var(--white)', transition: 'all 0.2s', fontFamily: 'inherit',
              }}>
                <div style={{ color: category === cat.id ? 'var(--gold)' : 'var(--white-dim)', marginBottom: '12px' }}>{cat.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>{isRTL ? cat.labelAr : cat.labelEn}</div>
                <div style={{ fontSize: '12px', color: 'var(--white-dim)', lineHeight: 1.4 }}>{isRTL ? cat.descAr : cat.descEn}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Work Type */}
        {category && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {isRTL ? 'نوع العمل' : 'Work Type'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {workTypes.map(wt => (
                <button key={wt.id} onClick={() => setWorkType(wt.id as any)} style={{
                  padding: '20px', textAlign: isRTL ? 'right' : 'left',
                  background: workType === wt.id ? 'rgba(200,169,110,0.08)' : 'var(--navy-card)',
                  border: `1px solid ${workType === wt.id ? 'var(--gold)' : 'var(--border-soft)'}`,
                  cursor: 'pointer', color: 'var(--white)', transition: 'all 0.2s', fontFamily: 'inherit',
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{isRTL ? wt.labelAr : wt.labelEn}</div>
                  <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{isRTL ? wt.descAr : wt.descEn}</div>
                  {category && workType === wt.id && (
                    <div style={{ fontSize: '18px', color: 'var(--gold)', marginTop: '12px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                      {PRICING[category][wt.id].toLocaleString()} {isRTL ? 'درهم/شهر' : 'AED/mo'}
                    </div>
                  )}
                  {category && workType !== wt.id && (
                    <div style={{ fontSize: '14px', color: 'var(--gold-dim)', marginTop: '12px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                      {PRICING[category][wt.id].toLocaleString()} {isRTL ? 'درهم/شهر' : 'AED/mo'}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Count */}
        {workType && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {isRTL ? 'عدد الموظفين' : 'Number of Employees'}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              background: 'var(--navy-card)', border: '1px solid var(--border-soft)',
              padding: '20px 24px', width: 'fit-content',
            }}>
              <button onClick={() => setCount(Math.max(1, count - 1))} style={{
                width: '36px', height: '36px', border: '1px solid var(--border-soft)',
                background: 'transparent', color: 'var(--white)',
                fontSize: '18px', cursor: 'pointer', transition: 'border-color 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</button>
              <span style={{ fontSize: '28px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'var(--gold)', minWidth: '32px', textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(Math.min(10, count + 1))} style={{
                width: '36px', height: '36px', border: '1px solid var(--border-soft)',
                background: 'transparent', color: 'var(--white)',
                fontSize: '18px', cursor: 'pointer', transition: 'border-color 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</button>
              <span style={{ fontSize: '13px', color: 'var(--white-dim)' }}>
                {isRTL ? 'موظف' : count === 1 ? 'employee' : 'employees'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Price Summary */}
        {category && workType && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'var(--navy-card)', border: '1px solid var(--border-soft)',
              padding: '28px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
              <div style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '20px', fontWeight: 500 }}>
                {isRTL ? 'ملخص التكلفة' : 'Cost Summary'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Row label={isRTL ? 'رسوم التوظيف (تُدفع الآن)' : 'Hiring Fee (due now)'} value={`${hiringFee.toLocaleString()} ${isRTL ? 'درهم' : 'AED'}`} isRTL={isRTL} />
                <Row label={isRTL ? 'التكلفة الشهرية' : 'Monthly cost'} value={`${firstMonthTotal.toLocaleString()} ${isRTL ? 'درهم' : 'AED'}`} isRTL={isRTL} />
                <div style={{ height: '1px', background: 'var(--border-soft)', margin: '4px 0' }} />
                <Row label={isRTL ? 'المبلغ المستحق الآن' : 'Due now'} value={`${dueNow.toLocaleString()} ${isRTL ? 'درهم' : 'AED'}`} isRTL={isRTL} highlight />
              </div>
              <p style={{ fontSize: '12px', color: 'var(--white-dim)', marginTop: '16px', lineHeight: 1.6 }}>
                {isRTL
                  ? '* رسوم التوظيف تُحتسب من فاتورة الشهر الأول. الرسوم الشهرية تُخصم عند تفعيل الموظف.'
                  : '* Hiring fee is credited toward the first month invoice. Monthly fee is charged upon employee activation.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <button
          onClick={() => router.push('/client/talent')}
          disabled={!category || !workType}
          style={{
            width: '100%', padding: '16px',
            background: category && workType ? 'var(--gold)' : 'rgba(200,169,110,0.2)',
            border: `1px solid ${category && workType ? 'var(--gold)' : 'var(--border-soft)'}`,
            color: category && workType ? 'var(--navy)' : 'var(--white-dim)',
            fontSize: '14px', fontWeight: 600,
            cursor: category && workType ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
          }}
        >
          {isRTL ? `ادفع ${dueNow.toLocaleString()} درهم وتصفّح المرشحين` : `Pay ${dueNow.toLocaleString()} AED & Browse Talent`}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      </motion.div>
    </div>
  )
}

function Row({ label, value, isRTL, highlight }: { label: string; value: string; isRTL: boolean; highlight?: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
    }}>
      <span style={{ fontSize: '13px', color: highlight ? 'var(--white)' : 'var(--white-dim)', fontWeight: highlight ? 500 : 400 }}>{label}</span>
      <span style={{ fontSize: highlight ? '18px' : '14px', color: highlight ? 'var(--gold)' : 'var(--white)', fontFamily: highlight ? 'Cormorant Garamond, serif' : 'inherit', fontWeight: highlight ? 300 : 400 }}>{value}</span>
    </div>
  )
}