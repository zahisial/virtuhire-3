'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

type Tab = 'overview' | 'employees' | 'billing' | 'requests' | 'support' | 'services' | 'settings' | 'cancel'

const EMPLOYEES = [
  { name: 'Sara Al-Rashidi', nameAr: 'سارة الراشدي', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Home', typeAr: 'منزل', start: 'Jan 1, 2025', startAr: '١ يناير ٢٠٢٥', status: 'Active', statusAr: 'نشط', initials: 'SR', rate: 2150 },
  { name: 'Bilal Chaudhry', nameAr: 'بلال شودهري', role: '2D Design', roleAr: 'تصميم', type: 'Office', typeAr: 'مكتب', start: 'Jan 15, 2025', startAr: '١٥ يناير ٢٠٢٥', status: 'Active', statusAr: 'نشط', initials: 'BC', rate: 3600 },
  { name: 'Nadia Hussain', nameAr: 'نادية حسين', role: 'Admin & Sales', roleAr: 'إداري ومبيعات', type: 'Office', typeAr: 'مكتب', start: 'Feb 1, 2025', startAr: '١ فبراير ٢٠٢٥', status: 'Active', statusAr: 'نشط', initials: 'NH', rate: 2700 },
]

const INVOICES = [
  { id: 'INV-0003', date: 'Mar 1, 2025', dateAr: '١ مارس ٢٠٢٥', amount: 8450, status: 'Paid', statusAr: 'مدفوعة' },
  { id: 'INV-0002', date: 'Feb 1, 2025', dateAr: '١ فبراير ٢٠٢٥', amount: 5750, status: 'Paid', statusAr: 'مدفوعة' },
  { id: 'INV-0001', date: 'Jan 1, 2025', dateAr: '١ يناير ٢٠٢٥', amount: 2150, status: 'Paid', statusAr: 'مدفوعة' },
]

const TICKETS = [
  { id: 'TKT-001', subjectEn: 'Invoice discrepancy for February', subjectAr: 'خلاف في فاتورة فبراير', cat: 'Billing', catAr: 'فوترة', status: 'Open', statusAr: 'مفتوحة', date: '2 days ago', dateAr: 'منذ يومين' },
  { id: 'TKT-002', subjectEn: 'Employee replacement request', subjectAr: 'طلب استبدال موظف', cat: 'HR', catAr: 'موارد بشرية', status: 'Resolved', statusAr: 'محلولة', date: '1 week ago', dateAr: 'منذ أسبوع' },
]

export default function DashboardPage() {
  const { isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'billing', message: '' })

  const totalMonthly = EMPLOYEES.reduce((sum, e) => sum + e.rate, 0)

  const tabs: { id: Tab; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: 'overview',  labelEn: 'Overview',   labelAr: 'نظرة عامة', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/></svg> },
    { id: 'employees', labelEn: 'Employees',  labelAr: 'الموظفون', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 12c0-2.761 1.79-5 4-5s4 2.239 4 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M10 6.5c1.5 0 3 1.5 3 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id: 'billing',   labelEn: 'Billing',    labelAr: 'الفوترة',  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6h12" stroke="currentColor" strokeWidth="1.2"/></svg> },
    { id: 'requests',  labelEn: 'Requests',   labelAr: 'الطلبات',  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v4M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id: 'support',   labelEn: 'Support',    labelAr: 'الدعم',    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a6 6 0 100 12A6 6 0 007 1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5.5a2 2 0 113.5 1.5L7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.5" fill="currentColor"/></svg> },
    { id: 'services',  labelEn: 'Services',   labelAr: 'الخدمات', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v4M10.5 3.5L7.5 6M13 7h-4M10.5 10.5L7.5 8M7 13V9M3.5 10.5L6.5 8M1 7h4M3.5 3.5L6.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    { id: 'settings',  labelEn: 'Settings',   labelAr: 'الإعدادات', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1.1 1.1M10.4 10.4l1.1 1.1M2.5 11.5l1.1-1.1M10.4 3.6l1.1-1.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  ]

  const sInput = {
    width: '100%', padding: '10px 14px',
    background: 'var(--navy-mid)', border: '1px solid var(--border-soft)',
    color: 'var(--white)', fontSize: '13px',
    fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '10px', fontWeight: 500 }}>
            {isRTL ? 'لوحة التحكم' : 'Client Dashboard'}
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2 }}>
            {isRTL ? 'مرحباً بك مجدداً' : 'Welcome back'}
          </h1>
        </div>
        <button onClick={() => window.location.href = '/client/hire'} style={{
          padding: '10px 20px', background: 'var(--gold)', border: 'none',
          color: 'var(--navy)', fontSize: '13px', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          + {isRTL ? 'طلب موظف إضافي' : 'Request Additional Staff'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '32px', overflowX: 'auto', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '10px 16px', fontSize: '13px', fontWeight: 500,
            background: activeTab === tab.id ? 'var(--navy-card)' : 'transparent',
            border: `1px solid ${activeTab === tab.id ? 'var(--gold-dim)' : 'var(--border-soft)'}`,
            color: activeTab === tab.id ? 'var(--gold)' : 'var(--white-dim)',
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap',
          }}>
            <span style={{ color: activeTab === tab.id ? 'var(--gold)' : 'var(--white-dim)' }}>{tab.icon}</span>
            {isRTL ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2px', marginBottom: '32px' }}>
              {[
                { labelEn: 'Active Employees', labelAr: 'الموظفون النشطون', val: '3', gold: true },
                { labelEn: 'Monthly Cost', labelAr: 'التكلفة الشهرية', val: `${totalMonthly.toLocaleString()} ${isRTL ? 'د' : 'AED'}`, gold: true },
                { labelEn: 'Open Tickets', labelAr: 'تذاكر مفتوحة', val: '1', gold: false },
                { labelEn: 'Next Invoice', labelAr: 'الفاتورة القادمة', val: isRTL ? '١ أبريل' : 'Apr 1', gold: false },
              ].map((stat, i) => (
                <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '24px 20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
                    {isRTL ? stat.labelAr : stat.labelEn}
                  </div>
                  <div className={stat.gold ? 'font-display' : ''} style={{ fontSize: stat.gold ? '36px' : '24px', fontWeight: 300, color: stat.gold ? 'var(--gold)' : 'var(--white)', lineHeight: 1 }}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent employees quick view */}
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              {isRTL ? 'الموظفون النشطون' : 'Active Employees'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {EMPLOYEES.map((e, i) => (
                <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--navy-mid)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, color: 'var(--gold)', flexShrink: 0 }}>{e.initials}</div>
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>{isRTL ? e.nameAr : e.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{isRTL ? e.roleAr : e.role} · {isRTL ? e.typeAr : e.type}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'var(--gold)', fontWeight: 300 }}>{e.rate.toLocaleString()} {isRTL ? 'د' : 'AED'}</span>
                    <span style={{ fontSize: '10px', padding: '3px 10px', border: '1px solid rgba(100,200,120,0.3)', color: '#7DC99C', letterSpacing: '1px', textTransform: 'uppercase' }}>{isRTL ? e.statusAr : e.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPLOYEES */}
        {activeTab === 'employees' && (
          <div>
            {EMPLOYEES.map((e, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '28px', marginBottom: '2px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--navy-mid)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 500, color: 'var(--gold)', flexShrink: 0 }}>{e.initials}</div>
                    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                      <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>{isRTL ? e.nameAr : e.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--white-dim)', marginBottom: '8px' }}>{isRTL ? e.roleAr : e.role} · {isRTL ? e.typeAr : e.type}</div>
                      <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>
                        {isRTL ? `بدأ في: ${e.startAr}` : `Started: ${e.start}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 16px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--white-dim)', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                      {isRTL ? 'طلب استبدال' : 'Replace'}
                    </button>
                    <span style={{ fontSize: '10px', padding: '4px 12px', border: '1px solid rgba(100,200,120,0.3)', color: '#7DC99C', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {isRTL ? e.statusAr : e.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BILLING */}
        {activeTab === 'billing' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', marginBottom: '28px' }}>
              {[
                { labelEn: 'Monthly Total', labelAr: 'الإجمالي الشهري', val: `${totalMonthly.toLocaleString()} ${isRTL ? 'درهم' : 'AED'}` },
                { labelEn: 'Next Billing', labelAr: 'الفوترة القادمة', val: isRTL ? '١ أبريل ٢٠٢٥' : 'Apr 1, 2025' },
                { labelEn: 'Saved Card', labelAr: 'البطاقة المحفوظة', val: '•••• 4242' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '20px 24px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{isRTL ? s.labelAr : s.labelEn}</div>
                  <div style={{ fontSize: '18px', fontWeight: 500, color: 'var(--white)' }}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{isRTL ? 'سجل الفواتير' : 'Invoice History'}</div>
            {INVOICES.map((inv, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '16px 20px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)', fontFamily: 'monospace' }}>{inv.id}</span>
                  <span style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{isRTL ? inv.dateAr : inv.date}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span style={{ fontSize: '14px', color: 'var(--white)' }}>{inv.amount.toLocaleString()} {isRTL ? 'درهم' : 'AED'}</span>
                  <span style={{ fontSize: '10px', padding: '3px 10px', border: '1px solid rgba(100,200,120,0.3)', color: '#7DC99C', letterSpacing: '1px', textTransform: 'uppercase' }}>{isRTL ? inv.statusAr : inv.status}</span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isRTL ? 'تحميل' : 'PDF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === 'requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { titleEn: 'Interview Request — Zara Malik', titleAr: 'طلب مقابلة — زارا مالك', statusEn: 'Scheduled', statusAr: 'مجدولة', dateEn: 'Mar 20, 2025 at 2:00 PM', dateAr: '٢٠ مارس ٢٠٢٥ الساعة ٢:٠٠ م', color: 'rgba(100,200,120,0.3)', textColor: '#7DC99C' },
              { titleEn: 'Replace Employee — Bilal Chaudhry', titleAr: 'استبدال موظف — بلال شودهري', statusEn: 'Pending', statusAr: 'قيد الانتظار', dateEn: 'Effective end of March', dateAr: 'يسري في نهاية مارس', color: 'rgba(200,169,110,0.3)', textColor: 'var(--gold)' },
            ].map((req, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--white)' }}>{isRTL ? req.titleAr : req.titleEn}</span>
                  <span style={{ fontSize: '10px', padding: '3px 10px', border: `1px solid ${req.color}`, color: req.textColor, letterSpacing: '1px', textTransform: 'uppercase', flexShrink: 0 }}>{isRTL ? req.statusAr : req.statusEn}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--white-dim)' }}>{isRTL ? req.dateAr : req.dateEn}</div>
              </div>
            ))}
          </div>
        )}

        {/* SUPPORT */}
        {activeTab === 'support' && (
          <div>
            {/* New Ticket Form */}
            <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '28px', marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)', marginBottom: '20px' }}>{isRTL ? 'تذكرة دعم جديدة' : 'New Support Ticket'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{isRTL ? 'الفئة' : 'Category'}</label>
                  <select value={ticketForm.category} onChange={e => setTicketForm(f => ({ ...f, category: e.target.value }))} style={{ ...sInput }}>
                    <option value="billing">{isRTL ? 'فوترة وتمويل' : 'Billing & Finance'}</option>
                    <option value="hr">{isRTL ? 'الموارد البشرية' : 'HR / Employee Issues'}</option>
                    <option value="technical">{isRTL ? 'الدعم الفني' : 'Technical Support'}</option>
                    <option value="sales">{isRTL ? 'المبيعات' : 'Sales'}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{isRTL ? 'الموضوع' : 'Subject'}</label>
                  <input value={ticketForm.subject} onChange={e => setTicketForm(f => ({ ...f, subject: e.target.value }))} style={{ ...sInput }} placeholder={isRTL ? 'وصف موجز للمشكلة' : 'Brief description of issue'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{isRTL ? 'التفاصيل' : 'Details'}</label>
                  <textarea value={ticketForm.message} onChange={e => setTicketForm(f => ({ ...f, message: e.target.value }))} rows={4} style={{ ...sInput, resize: 'vertical' }} placeholder={isRTL ? 'اشرح مشكلتك بالتفصيل...' : 'Describe your issue in detail...'} />
                </div>
                <button style={{ padding: '12px', background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {isRTL ? 'إرسال التذكرة' : 'Submit Ticket'}
                </button>
              </div>
            </div>
            {/* Existing Tickets */}
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{isRTL ? 'التذاكر الحالية' : 'Current Tickets'}</div>
            {TICKETS.map((t, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '20px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>{isRTL ? t.subjectAr : t.subjectEn}</div>
                  <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{t.id} · {isRTL ? t.catAr : t.cat} · {isRTL ? t.dateAr : t.date}</div>
                </div>
                <span style={{ fontSize: '10px', padding: '3px 10px', border: `1px solid ${t.status === 'Open' ? 'rgba(200,169,110,0.3)' : 'rgba(100,200,120,0.3)'}`, color: t.status === 'Open' ? 'var(--gold)' : '#7DC99C', letterSpacing: '1px', textTransform: 'uppercase', height: 'fit-content' }}>
                  {isRTL ? t.statusAr : t.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px' }}>
            {[
              { titleEn: 'Employee Buyout', titleAr: 'استقطاب الموظف', descEn: 'Directly hire an employee for a fixed fee. Employee transitions to your direct payroll.', descAr: 'وظّف موظفاً مباشرة برسوم ثابتة. ينتقل الموظف إلى كشوف رواتبك المباشرة.', priceEn: '5,000 AED fixed fee', priceAr: 'رسوم ثابتة ٥٬٠٠٠ درهم', cta: true },
              { titleEn: 'Supervisor Access', titleAr: 'وصول المشرف', descEn: 'Grant view-only or managed access to a supervisor or team lead to monitor employees.', descAr: 'امنح مشرفاً أو قائد فريق صلاحية عرض فقط أو وصولاً مُدار لمتابعة الموظفين.', priceEn: 'Free add-on', priceAr: 'إضافة مجانية', cta: true },
              { titleEn: 'Account Manager', titleAr: 'مدير الحساب', descEn: 'Get a dedicated account manager for priority support and proactive workforce planning.', descAr: 'احصل على مدير حساب مخصص للدعم ذي الأولوية وتخطيط القوى العاملة.', priceEn: 'Included on request', priceAr: 'مضمّن عند الطلب', cta: false },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)', marginBottom: '12px', textAlign: isRTL ? 'right' : 'left' }}>{isRTL ? s.titleAr : s.titleEn}</div>
                <div style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.7, flex: 1, marginBottom: '20px', textAlign: isRTL ? 'right' : 'left' }}>{isRTL ? s.descAr : s.descEn}</div>
                <div style={{ fontSize: '14px', color: 'var(--gold)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, marginBottom: '16px', textAlign: isRTL ? 'right' : 'left' }}>{isRTL ? s.priceAr : s.priceEn}</div>
                {s.cta && <button style={{ padding: '10px', border: '1px solid var(--gold)', background: 'transparent', color: 'var(--gold)', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>{isRTL ? 'طلب الخدمة' : 'Request Service'}</button>}
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '560px' }}>
            {[
              { labelEn: 'Full Name / Company', labelAr: 'الاسم / الشركة', val: 'Ahmed Al-Mansoori' },
              { labelEn: 'Email Address', labelAr: 'البريد الإلكتروني', val: 'ahmed@company.ae' },
              { labelEn: 'Phone', labelAr: 'الهاتف', val: '+971 50 123 4567' },
              { labelEn: 'VAT Number', labelAr: 'رقم ضريبة القيمة المضافة', val: '1000XXXXX00003' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{isRTL ? f.labelAr : f.labelEn}</label>
                <input defaultValue={f.val} style={{ width: '100%', padding: '12px 16px', background: 'var(--navy-mid)', border: '1px solid var(--border-soft)', color: 'var(--white)', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
              </div>
            ))}
            <button style={{ padding: '12px 28px', background: 'var(--gold)', border: 'none', color: 'var(--navy)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' }}>
              {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
            </button>
            <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--border-soft)' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)', marginBottom: '8px' }}>{isRTL ? 'إلغاء الخدمة' : 'Cancel Service'}</div>
              <p style={{ fontSize: '13px', color: 'var(--white-dim)', lineHeight: 1.6, marginBottom: '16px' }}>
                {isRTL ? 'يتطلب إشعاراً قبل ٣٠ يوماً. تنتهي الخدمة في نهاية دورة الفوترة الحالية.' : 'Requires 30-day notice. Service ends at the current billing cycle end date.'}
              </p>
              <button style={{ padding: '10px 20px', border: '1px solid rgba(226,80,80,0.3)', background: 'transparent', color: 'rgba(226,80,80,0.7)', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                {isRTL ? 'طلب إلغاء الاشتراك' : 'Request Cancellation'}
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  )
}
