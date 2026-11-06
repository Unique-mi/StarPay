import Link from "next/link";
import AdminShell from "@/components/admin-shell";
import PrintButton from "@/components/print-button";
import { formatMoney, type Transaction } from "@/lib/transactions";

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProductIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V4h10v4M7 16H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <rect x="7" y="14" width="10" height="6" rx="1" />
    </svg>
  );
}

export default function TransactionDetailsView({ transaction }: { transaction: Transaction }) {
  const statusClass = transaction.status.toLowerCase();
  const accountPaid = Math.max(transaction.amount - transaction.cashAmount, 0);

  return (
    <AdminShell className="detail-page-frame">
      <div className="detail-heading-row">
        <div>
          <Link href="/transactions" className="context-back-link">← Back to transactions</Link>
          <p className="eyebrow">PAYMENT OPERATIONS</p>
          <h1>Transaction Details</h1>
          <p>Manage all payments, settlements, merchants, and financial institutions from a single, centralized platform.</p>
        </div>
        <div className="detail-actions">
          <span className="reference-pill">EI Reference: {transaction.eir}</span>
          <PrintButton className="primary-small-button">
            <PrintIcon /> Print Receipt
          </PrintButton>
        </div>
      </div>

      <div className="detail-content-grid">
        <div className="detail-main-column">
          <section className="panel detail-section">
            <div className="detail-section-heading">
              <h2>Reference Info.</h2>
              <span>Transaction Date &amp; Time: <strong>{transaction.date}</strong></span>
            </div>
            <div className="detail-fields-grid four-cols">
              <DetailField label="EI Reference" value={transaction.eir} />
              <DetailField label="Starpay Bill Reference" value={transaction.bill} />
              <DetailField label="FI Reference" value={transaction.fiReference} />
              <DetailField label="CC Reference" value={transaction.ccReference} />
            </div>
          </section>

          <section className="panel detail-section">
            <div className="detail-section-heading">
              <h2>Merchant Info.</h2>
              <span>Transaction Date &amp; Time: <strong>{transaction.date}</strong></span>
            </div>
            <div className="detail-fields-grid four-cols">
              <DetailField label="Merchant ID" value={transaction.merchantId} />
              <DetailField label="Merchant Name" value={transaction.merchant} />
              <DetailField label="Cashier Name" value={transaction.cashier} />
              <DetailField label="Cashier ID" value={transaction.cashierId} />
            </div>
          </section>

          <section className="panel detail-section">
            <div className="detail-section-heading">
              <h2>Customer Info.</h2>
              <span>Transaction Date &amp; Time: <strong>{transaction.date}</strong></span>
            </div>
            <div className="detail-fields-grid two-cols">
              <DetailField label="Customer Name" value={transaction.customer} />
              <DetailField label="Customer Phone Number" value={transaction.phone} />
            </div>
          </section>

          <section className="panel detail-section products-section">
            <div className="detail-section-heading">
              <div>
                <h2>Product Information</h2>
                <p>Total No. of Products (3)</p>
              </div>
            </div>
            <div className="product-list">
              {[1, 2, 3].map((item) => (
                <div className="product-line" key={item}>
                  <div className="product-thumb"><ProductIcon /></div>
                  <div className="product-name">
                    <strong>Macbook Air</strong>
                    <span>Product item #{item.toString().padStart(2, "0")}</span>
                  </div>
                  <strong>2 Pcs</strong>
                  <strong>282,400.00 ETB</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="panel detail-section payment-info-section">
            <div className="detail-section-heading">
              <h2>Payment Info.</h2>
              <span>Transaction Date &amp; Time: <strong>{transaction.date}</strong></span>
            </div>
            <div className="detail-fields-grid four-cols">
              <DetailField label="Transaction Amount" value={formatMoney(transaction.amount)} />
              <DetailField label="Amount Paid by Star Coin" value={`${transaction.cashAmount.toFixed(0)} Star (${formatMoney(transaction.cashAmount)})`} />
              <DetailField label="Amount Paid from Account" value={formatMoney(accountPaid)} />
              <DetailField label="Commission Fee" value={formatMoney(transaction.commissionFee)} />
            </div>
            <div className="payment-result-row">
              <div>
                <span>Net Amount to Merchant</span>
                <strong>{formatMoney(transaction.netAmount)}</strong>
              </div>
              <div>
                <span>Transaction Status</span>
                <strong className={`status-badge ${statusClass}`}>{transaction.status}</strong>
              </div>
              <div>
                <span>Transaction Date &amp; Time</span>
                <strong>{transaction.date}</strong>
              </div>
            </div>
          </section>
        </div>

        <aside className="detail-aside">
          <div className="panel transaction-summary-card">
            <div className="summary-card-top">
              <span className="summary-check">✓</span>
              <span className={`status-badge ${statusClass}`}>{transaction.status}</span>
            </div>
            <span className="summary-caption">Transaction Amount</span>
            <strong className="summary-amount">{transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} <small>ETB</small></strong>
            <div className="summary-divider" />
            <div className="summary-pair"><span>Merchant</span><strong>{transaction.merchant}</strong></div>
            <div className="summary-pair"><span>Customer</span><strong>{transaction.customer}</strong></div>
            <div className="summary-pair"><span>Payment Channel</span><strong>{transaction.channel}</strong></div>
            <div className="summary-pair"><span>Financial Institution</span><strong>{transaction.institution}</strong></div>
          </div>
          <div className="panel receipt-note">
            <h3>Receipt information</h3>
            <p>This transaction receipt contains the reference numbers, payment information, and merchant/customer details associated with the payment.</p>
            <PrintButton className="outline-button full-width">Print transaction receipt</PrintButton>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
