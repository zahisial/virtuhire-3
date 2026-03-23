import LegalPage from '@/components/LegalPage'

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>Last updated: March 23, 2025</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>1. Services</h2>
      <p>VirtuHire provides a platform connecting GCC clients with pre‑vetted offshore talent from Pakistan for Admin & Sales and 2D Design roles, both home‑based and office‑based. Our service includes candidate discovery, hiring workflow management, and ongoing employee administration.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>2. Fees & Billing</h2>
      <p>Monthly service fees are charged per employee according to the pricing schedule published on the platform. A one‑time hiring fee of AED 300 per employee is due when initiating a hire and is credited toward the first month's invoice. All fees are in UAE Dirhams and are subject to applicable VAT.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>3. Payment Terms</h2>
      <p>Invoices are generated monthly and charged automatically to the payment method on file. Clients are required to maintain a valid payment method. A 30‑day cancellation notice is required to terminate services for an employee.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>4. Employee Replacement</h2>
      <p>Clients may request a replacement for an existing employee at any time. The replacement will take effect at the end of the current billing cycle. The hiring fee is not charged again for a replacement.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>5. Employee Buyout</h2>
      <p>Clients may directly hire an employee for a fixed buyout fee of AED 5,000. Upon payment, the employment relationship transfers directly to the client, and recurring platform fees cease.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>6. Confidentiality</h2>
      <p>All candidate information accessed through the platform is confidential. You may not share candidate profiles or data with third parties without explicit permission.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>7. Governing Law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai.</p>
    </LegalPage>
  )
}