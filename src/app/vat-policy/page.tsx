import LegalPage from '@/components/LegalPage'

export default function VatPolicyPage() {
  return (
    <LegalPage title="VAT Policy">
      <p>Last updated: March 23, 2025</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>1. VAT Registration</h2>
      <p>VirtuHire is registered for Value Added Tax (VAT) in the United Arab Emirates under TRN: 1234567890 (placeholder).</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>2. VAT on Services</h2>
      <p>All fees displayed on the platform are exclusive of VAT. VAT will be added at the current rate (5%) on all invoices issued to clients based in the UAE. Clients outside the UAE may be subject to reverse charge.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>3. Invoicing</h2>
      <p>Monthly invoices will clearly show the VAT amount and the total due. Invoices are generated automatically and are available for download in the client dashboard.</p>

      <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--gold)', margin: '24px 0 12px' }}>4. VAT Invoices for Business Clients</h2>
      <p>If you require a tax invoice with your company details, please ensure your VAT number and company name are correctly entered in your account settings.</p>
    </LegalPage>
  )
}