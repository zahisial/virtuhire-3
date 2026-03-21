'use client'
// src/app/admin/page.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Tab = 'overview' | 'talent' | 'clients' | 'hiring' | 'financial' | 'support'

// ─── Mock data (replace with real API calls) ───────────────────
const STATS = [
  { labelEn: 'Total Candidates', value: '142', change: '+12 this week' },
  { labelEn: 'Active Clients',   value: '38',  change: '+3 this week' },
  { labelEn: 'Active Employees', value: '91',  change: '+8 this month' },
  { labelEn: 'Revenue (AED)',    value: '195,650', change: '+22,400 this month' },
]

const CANDIDATES = [
  { id: 1, name: 'Sara Al-Rashidi',  category: 'Admin & Sales', type: 'Home',   status: 'approved', rating: 4.9, initials: 'SR' },
  { id: 2, name: 'Bilal Chaudhry',   category: '2D Design',     type: 'Office', status: 'approved', rating: 4.8, initials: 'BC' },
  { id: 3, name: 'Nadia Hussain',    category: 'Admin & Sales', type: 'Office', status: 'pending',  rating: 0,   initials: 'NH' },
  { id: 4, name: 'Zara Malik',       category: '2D Design',     type: 'Home',   status: 'pending',  rating: 0,   initials: 'ZM' },
  { id: 5, name: 'Omar Siddiqui',    category: 'Admin & Sales', type: 'Office', status: 'approved', rating: 4.8, initials: 'OS' },
]

const CLIENTS = [
  { id: 1, name: 'Ahmed Al-Mansoori', type: 'individual', company: '—',           employees: 2, monthly: 4300,  status: 'active' },
  { id: 2, name: 'Reem Enterprises',  type: 'corporate',  company: 'Reem LLC',    employees: 4, monthly: 10800, status: 'active' },
  { id: 3, name: 'Gulf Designs FZ',   type: 'corporate',  company: 'Gulf Designs', employees: 1, monthly: 3600, status: 'active' },
]

const HIRING_OPS = [
  { id: 1, client: 'Ahmed Al-Mansoori', category: 'Admin & Sales', type: 'Home',   count: 1, status: 'completed', candidate: 'Sara Al-Rashidi' },
  { id: 2, client: 'Reem Enterprises',  category: '2D Design',     type: 'Office', count: 2, status: 'active',    candidate: 'Bilal Chaudhry' },
  { id: 3, client: 'Gulf Designs FZ',   category: 'Admin & Sales', type: 'Office', count: 1, status: 'pending',   candidate: '—' },
]

const INVOICES = [
  { id: 'INV-0012', client: 'Ahmed Al-Mansoori', amount: 4300,  status: 'paid',    date: 'Mar 1, 2025' },
  { id: 'INV-0011', client: 'Reem Enterprises',  amount: 10800, status: 'paid',    date: 'Mar 1, 2025' },
  { id: 'INV-0010', client: 'Gulf Designs FZ',   amount: 3600,  status: 'pending', date: 'Mar 1, 2025' },
]

const TICKETS = [
  { id: 'TKT-001', client: 'Ahmed Al-Mansoori', subject: 'Invoice discrepancy',      category: 'Billing',    status: 'open',     date: '2 days ago' },
  { id: 'TKT-002', client: 'Reem Enterprises',  subject: 'Employee replacement',     category: 'HR',         status: 'progress', date: '4 days ago' },
  { id: 'TKT-003', client: 'Gulf Designs FZ',   subject: 'Dashboard access issue',   category: 'Technical',  status: 'resolved', date: '1 week ago' },
]

// ─── Status badge ─────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string }> = {
    approved:  { color: '#7DC99C', bg: 'rgba(100,200,120,0.1)' },
    active:    { color: '#7DC99C', bg: 'rgba(100,200,120,0.1)' },
    paid:      { color: '#7DC99C', bg: 'rgba(100,200,120,0.1)' },
    resolved:  { color: '#7DC99C', bg: 'rgba(100,200,120,0.1)' },
    completed: { color: '#7DC99C', bg: 'rgba(100,200,120,0.1)' },
    pending:   { color: 'var(--gold)', bg: 'rgba(200,169,110,0.1)' },
    progress:  { color: '#7BB8E8', bg: 'rgba(80,150,220,0.1)' },
    open:      { color: '#E08050', bg: 'rgba(220,120,80,0.1)' },
    rejected:  { color: '#E05050', bg: 'rgba(220,80,80,0.1)' },
  }
  const style = map[status] || map.pending
  return (
    <span style={{
      fontSize: '10px', padding: '3px 10px', letterSpacing: '1px',
      textTransform: 'uppercase', fontWeight: 500,
      color: style.color, background: style.bg,
      border: `1px solid ${style.color}40`,
    }}>
      {status}
    </span>
  )
}

// ─── Shared table wrapper ──────────────────────────────────────
function Table({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        {children}
      </table>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>
      {children}
    </th>
  )
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: '14px 16px', color: 'var(--white)', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>
      {children}
    </td>
  )
}


// ─── Action button ─────────────────────────────────────────────
function ActionBtn({ label, onClick, variant = 'ghost' }: { label: string; onClick?: () => void; variant?: 'ghost' | 'gold' | 'danger' }) {
  const styles = {
    ghost:  { background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--white-dim)' },
    gold:   { background: 'var(--gold)',  border: '1px solid var(--gold)',        color: 'var(--navy)' },
    danger: { background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', color: '#E05050' },
  }
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', fontSize: '11px', fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
      ...styles[variant],
    }}>
      {label}
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [candidateFilter, setCandidateFilter] = useState<'all' | 'pending' | 'approved'>('all')

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview',   label: 'Overview' },
    { id: 'talent',     label: 'Talent',     count: CANDIDATES.filter(c => c.status === 'pending').length },
    { id: 'clients',    label: 'Clients',    count: CLIENTS.length },
    { id: 'hiring',     label: 'Hiring Ops', count: HIRING_OPS.filter(h => h.status === 'pending').length },
    { id: 'financial',  label: 'Financial' },
    { id: 'support',    label: 'Support',    count: TICKETS.filter(t => t.status === 'open').length },
  ]

  const filteredCandidates = candidateFilter === 'all'
    ? CANDIDATES
    : CANDIDATES.filter(c => c.status === candidateFilter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: 'var(--navy-mid)', borderRight: '1px solid var(--border-soft)',
        padding: '28px 0', position: 'fixed', top: 0, left: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid var(--border-soft)', marginBottom: '20px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', border: '1.5px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontWeight: 600, color: 'var(--gold)' }}>V</div>
            <span style={{ fontWeight: 500, fontSize: '15px', color: 'var(--white)' }}>Virtu<span style={{ color: 'var(--gold)' }}>Hire</span></span>
          </Link>
          <div style={{ fontSize: '10px', color: 'var(--gold-dim)', marginTop: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', background: activeTab === tab.id ? 'rgba(200,169,110,0.08)' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? 'rgba(200,169,110,0.2)' : 'transparent'}`,
              color: activeTab === tab.id ? 'var(--gold)' : 'var(--white-dim)',
              fontSize: '13px', fontWeight: activeTab === tab.id ? 500 : 400,
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              transition: 'all 0.2s',
            }}>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{ fontSize: '10px', padding: '1px 7px', background: 'rgba(200,169,110,0.15)', color: 'var(--gold)', borderRadius: '10px' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7DC99C' }} />
            <span style={{ fontSize: '11px', color: 'var(--white-dim)' }}>API running on :8000</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: '220px', padding: '40px 5%', maxWidth: 'calc(100% - 220px)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '8px', fontWeight: 500 }}>
              VirtuHire
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2 }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--white-dim)' }}>
            {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2px', marginBottom: '32px' }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '24px 20px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>{s.labelEn}</div>
                    <div className="font-display" style={{ fontSize: '36px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: '#7DC99C' }}>{s.change}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px', marginBottom: '32px' }}>
                {[
                  { label: 'Pending Approvals', value: '4 candidates', action: 'Review', tab: 'talent' as Tab },
                  { label: 'Open Tickets',       value: '1 ticket',     action: 'View',   tab: 'support' as Tab },
                  { label: 'Pending Invoices',   value: '1 invoice',    action: 'Manage', tab: 'financial' as Tab },
                  { label: 'Active Hiring Ops',  value: '1 request',    action: 'Track',  tab: 'hiring' as Tab },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{item.label}</div>
                      <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)' }}>{item.value}</div>
                    </div>
                    <ActionBtn label={item.action} onClick={() => setActiveTab(item.tab)} />
                  </div>
                ))}
              </div>

              {/* Recent candidates pending */}
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                Pending Candidate Approvals
              </div>
              <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
                <Table>
                  <thead><tr><Th>Candidate</Th><Th>Category</Th><Th>Type</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                  <tbody>
                    {CANDIDATES.filter(c => c.status === 'pending').map(c => (
                      <tr key={c.id}>
                        <Td><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--navy-mid)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--gold)', flexShrink: 0 }}>{c.initials}</div>{c.name}</div></Td>
                        <Td>{c.category}</Td>
                        <Td>{c.type}</Td>
                        <Td><Badge status={c.status} /></Td>
                        <Td><div style={{ display: 'flex', gap: '6px' }}><ActionBtn label="Approve" variant="gold" /><ActionBtn label="Reject" variant="danger" /></div></Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* ── TALENT MANAGEMENT ── */}
          {activeTab === 'talent' && (
            <div>
              {/* Filter */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {(['all', 'pending', 'approved'] as const).map(f => (
                  <button key={f} onClick={() => setCandidateFilter(f)} style={{
                    padding: '7px 18px', fontSize: '12px', fontWeight: 500,
                    background: candidateFilter === f ? 'var(--gold)' : 'transparent',
                    border: `1px solid ${candidateFilter === f ? 'var(--gold)' : 'var(--border-soft)'}`,
                    color: candidateFilter === f ? 'var(--navy)' : 'var(--white-dim)',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                    textTransform: 'capitalize',
                  }}>{f}</button>
                ))}
                <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--white-dim)', alignSelf: 'center' }}>
                  {filteredCandidates.length} candidates
                </div>
              </div>

              <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
                <Table>
                  <thead><tr><Th>Candidate</Th><Th>Category</Th><Th>Work Type</Th><Th>Rating</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                  <tbody>
                    {filteredCandidates.map(c => (
                      <tr key={c.id}>
                        <Td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--navy-mid)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--gold)', flexShrink: 0 }}>{c.initials}</div>
                            {c.name}
                          </div>
                        </Td>
                        <Td>{c.category}</Td>
                        <Td>{c.type}</Td>
                        <Td>{c.rating > 0 ? <span style={{ color: 'var(--gold)' }}>★ {c.rating}</span> : <span style={{ color: 'var(--white-dim)' }}>—</span>}</Td>
                        <Td><Badge status={c.status} /></Td>
                        <Td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {c.status === 'pending' && <><ActionBtn label="Approve" variant="gold" /><ActionBtn label="Reject" variant="danger" /></>}
                            {c.status === 'approved' && <><ActionBtn label="Edit" /><ActionBtn label="Feature" /></>}
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* ── CLIENTS ── */}
          {activeTab === 'clients' && (
            <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
              <Table>
                <thead><tr><Th>Client</Th><Th>Type</Th><Th>Company</Th><Th>Employees</Th><Th>Monthly (AED)</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                <tbody>
                  {CLIENTS.map(c => (
                    <tr key={c.id}>
                      <Td>{c.name}</Td>
                      <Td><span style={{ textTransform: 'capitalize', fontSize: '12px', color: 'var(--white-dim)' }}>{c.type}</span></Td>
                      <Td>{c.company}</Td>
                      <Td><span className="font-display" style={{ fontSize: '20px', fontWeight: 300, color: 'var(--gold)' }}>{c.employees}</span></Td>
                      <Td><span className="font-display" style={{ fontSize: '18px', fontWeight: 300, color: 'var(--white)' }}>{c.monthly.toLocaleString()}</span></Td>
                      <Td><Badge status={c.status} /></Td>
                      <Td><div style={{ display: 'flex', gap: '6px' }}><ActionBtn label="View" /><ActionBtn label="Invoices" /></div></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* ── HIRING OPS ── */}
          {activeTab === 'hiring' && (
            <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
              <Table>
                <thead><tr><Th>Client</Th><Th>Category</Th><Th>Type</Th><Th>Count</Th><Th>Candidate</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                <tbody>
                  {HIRING_OPS.map(h => (
                    <tr key={h.id}>
                      <Td>{h.client}</Td>
                      <Td>{h.category}</Td>
                      <Td>{h.type}</Td>
                      <Td>{h.count}</Td>
                      <Td style={{ color: h.candidate === '—' ? 'var(--white-dim)' : 'var(--white)' }}>{h.candidate}</Td>
                      <Td><Badge status={h.status} /></Td>
                      <Td><div style={{ display: 'flex', gap: '6px' }}>
                        {h.status === 'pending' && <ActionBtn label="Assign" variant="gold" />}
                        {h.status === 'active'  && <ActionBtn label="Update" />}
                        <ActionBtn label="View" />
                      </div></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {/* ── FINANCIAL ── */}
          {activeTab === 'financial' && (
            <div>
              {/* Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', marginBottom: '28px' }}>
                {[
                  { label: 'Total Revenue',  value: '195,650 AED' },
                  { label: 'Pending',        value: '3,600 AED' },
                  { label: 'This Month',     value: '18,700 AED' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)', padding: '20px 24px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{s.label}</div>
                    <div className="font-display" style={{ fontSize: '28px', fontWeight: 300, color: 'var(--gold)' }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                Invoices
              </div>
              <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
                <Table>
                  <thead><tr><Th>Invoice</Th><Th>Client</Th><Th>Amount (AED)</Th><Th>Date</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                  <tbody>
                    {INVOICES.map(inv => (
                      <tr key={inv.id}>
                        <Td><span style={{ fontFamily: 'monospace', color: 'var(--gold)' }}>{inv.id}</span></Td>
                        <Td>{inv.client}</Td>
                        <Td><span className="font-display" style={{ fontSize: '18px', fontWeight: 300 }}>{inv.amount.toLocaleString()}</span></Td>
                        <Td>{inv.date}</Td>
                        <Td><Badge status={inv.status} /></Td>
                        <Td><div style={{ display: 'flex', gap: '6px' }}>
                          <ActionBtn label="PDF" />
                          {inv.status === 'pending' && <ActionBtn label="Override" variant="gold" />}
                        </div></Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}

          {/* ── SUPPORT ── */}
          {activeTab === 'support' && (
            <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border-soft)' }}>
              <Table>
                <thead><tr><Th>Ticket</Th><Th>Client</Th><Th>Subject</Th><Th>Category</Th><Th>Status</Th><Th>Date</Th><Th>Actions</Th></tr></thead>
                <tbody>
                  {TICKETS.map(t => (
                    <tr key={t.id}>
                      <Td><span style={{ fontFamily: 'monospace', color: 'var(--gold-dim)', fontSize: '12px' }}>{t.id}</span></Td>
                      <Td>{t.client}</Td>
                      <Td>{t.subject}</Td>
                      <Td><span style={{ fontSize: '12px', color: 'var(--white-dim)' }}>{t.category}</span></Td>
                      <Td><Badge status={t.status} /></Td>
                      <Td style={{ color: 'var(--white-dim)', fontSize: '12px' }}>{t.date}</Td>
                      <Td><div style={{ display: 'flex', gap: '6px' }}>
                        <ActionBtn label="View" />
                        {t.status === 'open' && <ActionBtn label="Assign" variant="gold" />}
                        {t.status !== 'resolved' && <ActionBtn label="Resolve" />}
                      </div></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )
}
