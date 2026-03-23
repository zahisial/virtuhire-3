import LegalPage from '@/components/LegalPage'

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>Last updated: March 23, 2025</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>1. Monthly Fees</h2>
      <p>Monthly service fees are non‑refundable after the billing period has started. If you cancel with at least 30 days' notice, no further charges will be incurred beyond the current billing cycle.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>2. Hiring Fee</h2>
      <p>The one‑time hiring fee (AED 300) is credited toward the first month's invoice and is non‑refundable if a hire is confirmed. If you decide not to proceed with any hire after paying the hiring fee, we will refund it within 14 days, provided no candidate shortlisting has occurred.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>3. Extra Candidate Batches</h2>
      <p>Fees paid for extra candidate batches (AED 200 per 20 profiles) are non‑refundable once the batch is unlocked, as the profiles are immediately accessible.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>4. How to Request a Refund</h2>
      <p>To request a refund, contact us at hello@virtuhire.ae with your account details and reason. Refunds will be processed within 14 business days.</p>
    </LegalPage>
  )
}