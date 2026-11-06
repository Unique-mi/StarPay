"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin-shell";

type Metric = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  icon: "wallet" | "receipt" | "store" | "users";
};

const metrics: Metric[] = [
  { label: "Total Transaction Volume", value: "20,000,000.00", unit: "ETB", delta: "10% from last week", icon: "wallet" },
  { label: "Total Transaction Volume", value: "20,000.00", unit: "USD", delta: "10% from last week", icon: "wallet" },
  { label: "Total Transaction Count", value: "32,000", unit: "Transactions", delta: "10% from last week", icon: "receipt" },
  { label: "Total Merchants", value: "12,000", unit: "Merchants", delta: "10% from last week", icon: "store" },
  { label: "Total Customers", value: "8,202", unit: "Customers", delta: "10% from last week", icon: "users" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const merchants = [
  { name: "Shoa Supermarket", id: "MC000101", amount: "220,000.00 Birr", transactions: "300 Transactions", mark: "SHOA", tone: "orange" },
  { name: "Ethiopian Airlines", id: "MC000102", amount: "200,000.00 Birr", transactions: "240 Transactions", mark: "ET", tone: "green" },
  { name: "Queen’s Supermarket", id: "MC000103", amount: "190,000.00 Birr", transactions: "200 Transactions", mark: "Q", tone: "red" },
  { name: "Shoa Supermarket", id: "MC000104", amount: "170,000.00 Birr", transactions: "150 Transactions", mark: "S", tone: "blue" },
  { name: "Shoa Supermarket", id: "MC000105", amount: "140,000.00 Birr", transactions: "100 Transactions", mark: "S", tone: "purple" },
];

const paymentChannels = [
  { name: "OTP Payment", percent: "38%", tone: "otp", size: "large" },
  { name: "Local Card payment", percent: "18%", tone: "local", size: "medium" },
  { name: "Int. Card payment", percent: "18%", tone: "international", size: "medium" },
  { name: "Reference payment", percent: "12%", tone: "reference", size: "small" },
  { name: "USSD Payment", percent: "24%", tone: "ussd", size: "large" },
  { name: "QR Payment", percent: "8%", tone: "qr", size: "small" },
];

function Glyph({ name }: { name: Metric["icon"] | "bank" | "money" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "wallet") {
    return <svg {...common}><path d="M4 7.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h12" /><path d="M3 8h14.5a2 2 0 0 1 2 2v1.5h-4a2 2 0 0 0 0 4h4" /><path d="M16 13.5h.01" /></svg>;
  }
  if (name === "receipt") {
    return <svg {...common}><path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8z" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>;
  }
  if (name === "store") {
    return <svg {...common}><path d="M4 10v9.5h16V10M3 10l2-6h14l2 6" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 19.5v-5h6v5" /></svg>;
  }
  if (name === "users") {
    return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a2.8 2.8 0 0 1 0 5.5M17 14a4.5 4.5 0 0 1 3.5 4.5" /></svg>;
  }
  if (name === "bank") {
    return <svg {...common}><path d="m3 8 9-5 9 5v2H3zM5 11v7m4-7v7m6-7v7m4-7v7M3 20h18" /><path d="M2.5 22h19" /></svg>;
  }
  return <svg {...common}><path d="M5 8.5 12 4l7 4.5v11H5z" /><path d="M8 11h8M8 14h8M8 17h4" /><path d="m9 4 3-2 3 2" /></svg>;
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span className="metric-icon"><Glyph name={metric.icon} /></span>
        <span className="metric-delta"><span aria-hidden="true">↗</span> {metric.delta}</span>
      </div>
      <p>{metric.label}</p>
      <div className="metric-value">{metric.value} <span>{metric.unit}</span></div>
    </article>
  );
}

function TransactionChart({ period }: { period: string }) {
  const etbY = [123, 91, 130, 126, 109, 116, 98, 128, 103, 119, 101, 96];
  const usdY = [170, 145, 176, 181, 159, 169, 151, 176, 157, 169, 155, 150];
  const etbPoints = etbY.map((y, index) => [34 + index * (592 / 11), y]);
  const usdPoints = usdY.map((y, index) => [34 + index * (592 / 11), y]);
  const smoothPath = (points: number[][]) => points.map(([x, y], index) => {
    if (index === 0) return `M ${x} ${y}`;
    const [previousX, previousY] = points[index - 1];
    const midX = (previousX + x) / 2;
    return `C ${midX} ${previousY}, ${midX} ${y}, ${x} ${y}`;
  }).join(" ");
  const etbLine = smoothPath(etbPoints);
  const usdLine = smoothPath(usdPoints);
  const etbArea = `${etbLine} L 626 222 L 34 222 Z`;
  const usdArea = `${usdLine} L 626 222 L 34 222 Z`;

  return (
    <div className="chart-wrap">
      <div className="chart-summary-row">
        <div className="chart-value-chip etb-chip"><span>ETB Transactions</span><strong>20,000,000.00 ETB</strong></div>
        <div className="chart-value-chip usd-chip"><span>USD Transactions</span><strong>$ 4,000.00</strong></div>
        <div className="chart-legend">
          <span><i className="legend-dot etb-dot" /> ETB Transaction</span>
          <span><i className="legend-dot usd-dot" /> USD Transaction</span>
        </div>
      </div>
      <div className="chart-svg-wrap">
        <svg className="transaction-chart" viewBox="0 0 650 258" role="img" aria-label={`Monthly ETB and USD transaction trends for ${period}`}>
          <defs>
            <linearGradient id="etbAreaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#078d68" stopOpacity=".72" /><stop offset="100%" stopColor="#078d68" stopOpacity=".04" /></linearGradient>
            <linearGradient id="usdAreaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b7cf78" stopOpacity=".78" /><stop offset="100%" stopColor="#b7cf78" stopOpacity=".08" /></linearGradient>
          </defs>
          {[38, 78, 118, 158, 198].map((y) => <line key={y} x1="34" x2="626" y1={y} y2={y} stroke="#e7ebea" strokeDasharray="3 5" />)}
          {months.map((month, index) => <line key={`guide-${month}`} x1={34 + index * (592 / 11)} x2={34 + index * (592 / 11)} y1="22" y2="222" stroke="#cfd5d4" strokeDasharray="3 5" />)}
          <path d={usdArea} fill="url(#usdAreaFill)" />
          <path d={etbArea} fill="url(#etbAreaFill)" />
          <path d={usdLine} fill="none" stroke="#b2ca70" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d={etbLine} fill="none" stroke="#078d68" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {usdPoints.map(([x, y], index) => <circle key={`usd-${index}`} cx={x} cy={y} r="4" fill="#b7cf78" stroke="#fff" strokeWidth="1.5"><title>{months[index]} USD transactions</title></circle>)}
          {etbPoints.map(([x, y], index) => <circle key={`etb-${index}`} cx={x} cy={y} r="4.3" fill="#078d68" stroke="#fff" strokeWidth="1.5"><title>{months[index]} ETB transactions</title></circle>)}
          {months.map((month, index) => <text key={month} x={34 + index * (592 / 11)} y="246" textAnchor="middle" fill="#7d8789" fontSize="11">{month}</text>)}
          <text x="0" y="41" fill="#899293" fontSize="10">500 k</text>
          <text x="0" y="82" fill="#899293" fontSize="10">100 k</text>
          <text x="0" y="122" fill="#899293" fontSize="10">60 k</text>
          <text x="0" y="162" fill="#899293" fontSize="10">45 k</text>
          <text x="0" y="202" fill="#899293" fontSize="10">25 k</text>
          <text x="0" y="226" fill="#899293" fontSize="10">12 k</text>
        </svg>
      </div>
    </div>
  );
}

function MerchantList() {
  return (
    <div className="best-merchants-columns">
      {["left", "right"].map((column) => (
        <div className="best-merchants-list" key={column}>
          {merchants.map((merchant) => (
            <article className="best-merchant" key={`${column}-${merchant.id}`}>
              <span className={`merchant-mark ${merchant.tone}`}>{merchant.mark}</span>
              <div className="best-merchant-name"><strong>{merchant.name}</strong><small>ID: {merchant.id}</small></div>
              <div className="best-merchant-value"><strong>{merchant.amount}</strong><small>{merchant.transactions}</small></div>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [range, setRange] = useState("Daily");
  const [period, setPeriod] = useState("Weekly");
  const [currency, setCurrency] = useState("USD");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  return (
    <AdminShell className="dashboard-frame" showFooter={false}>
      <div className="dashboard-topbar">
        <Link href="/portal" className="dashboard-back-link" aria-label="Back to portal">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7M8 12h12" /></svg>
          <span>Dashboard</span>
        </Link>
        <div className="dashboard-range" role="group" aria-label="Dashboard date range">
          {["Daily", "Weekly", "1M", "3M", "6M", "1Y"].map((item) => (
            <button key={item} type="button" className={range === item ? "selected" : ""} aria-pressed={range === item} onClick={() => setRange(item)}>{item}</button>
          ))}
        </div>
      </div>

      <section className="dashboard-overview" aria-labelledby="general-statistics-title">
        <div className="dashboard-intro">
          <h1 id="general-statistics-title">General Statistics</h1>
          <p>This overview displays your total transactions, key system and merchant metrics, and all billing information.</p>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => <MetricCard key={`${metric.label}-${metric.unit}`} metric={metric} />)}
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid-top" aria-label="Transaction and e-money analytics">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div><h2>Graphical informations</h2><p>Transaction performance overview</p></div>
            <label className="select-wrap"><span className="sr-only">Chart period</span><select className="small-select" value={period} onChange={(event) => setPeriod(event.target.value)}><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Yearly</option></select></label>
          </div>
          <TransactionChart period={period} />
        </article>

        <article className="panel emoney-panel">
          <div className="panel-heading">
            <div><h2>E-Money Informations</h2><p>View active e-money with total issued and redeemed stats.</p></div>
            <label className="select-wrap"><span className="sr-only">E-money currency</span><select className="currency-pill" value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="USD">USD</option><option value="ETB">ETB</option></select></label>
          </div>
          <div className="emoney-total">
            <span className="money-icon"><Glyph name="money" /></span>
            <strong>32,984.50 <small>Birr</small></strong>
            <span>Total Active Money</span>
          </div>
          <div className="emoney-summary">
            <div><span className="money-icon"><Glyph name="money" /></span><span className="summary-label">E-Money Issued</span><strong>1,332,984.50 <small>Birr</small></strong><span className="summary-caption">Total E-Money Issued</span></div>
            <div><span className="money-icon"><Glyph name="money" /></span><span className="summary-label">E-Money Redeemed</span><strong>32,984.50 <small>Birr</small></strong><span className="summary-caption">Total E-Money Redeemed</span></div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid-middle" aria-label="Bill and payment channel statistics">
        <article className="panel bill-panel">
          <div className="panel-heading"><div><h2>Bill Informations</h2><p>See the total number of bills, categorised by their current status.</p></div></div>
          <div className="bill-row"><div><strong>Paid Bills</strong><b>90,200 <small>Bills</small></b></div><span className="bill-track"><i style={{ width: "74%" }} /></span></div>
          <div className="bill-row"><div><strong>Expired Bills</strong><b>5,700 <small>Bills</small></b></div><span className="bill-track expired"><i style={{ width: "29%" }} /></span></div>
          <div className="bill-row"><div><strong>Void Bills</strong><b>15,700 <small>Bills</small></b></div><span className="bill-track void"><i style={{ width: "42%" }} /></span></div>
        </article>

        <article className="panel channels-panel">
          <div className="panel-heading"><div><h2>Transactions By Payment Channels</h2><p>Customer transactions across different payment channels.</p></div></div>
          <div className="channel-bubble-map" aria-label="Payment channel proportions">
            {paymentChannels.map((channel) => (
              <button
                type="button"
                key={channel.name}
                className={`channel-bubble ${channel.tone} ${channel.size} ${activeChannel === channel.name ? "active" : ""}`}
                aria-pressed={activeChannel === channel.name}
                onClick={() => setActiveChannel(activeChannel === channel.name ? null : channel.name)}
                title={`Select ${channel.name}`}
              >
                <strong>{channel.percent}</strong><span>{channel.name}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid-bottom" aria-label="Payment performance and institution statistics">
        <article className="panel payment-options-panel">
          <div className="panel-heading"><div><h2>Best Performing Payment Options</h2><p>Top 5 best-performing payment options used by your customers.</p></div></div>
          <div className="payment-options-visual">
            <div className="payment-options-ring" role="img" aria-label="Payment option performance distribution shown as six colored segments">
              <svg
                className="payment-options-ring-svg"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                {/* 1. Green */}
                <path
                  d="M 18 100 A 82 82 0 0 1 52.97 32.83"
                  fill="none"
                  stroke="#07966d"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* 2. Orange */}
                <path
                  d="M 78.78 20.79 A 82 82 0 0 1 132.04 24.52"
                  fill="none"
                  stroke="#e88437"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* 3. Red */}
                <path
                  d="M 155.92 40.03 A 82 82 0 0 1 171.72 60.25"
                  fill="none"
                  stroke="#e4493b"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* 4. Gray */}
                <path
                  d="M 180.99 87.17 A 82 82 0 0 1 161.89 153.80"
                  fill="none"
                  stroke="#adadad"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* 5. Purple */}
                <path
                  d="M 139.75 171.72 A 82 82 0 0 1 67.96 175.48"
                  fill="none"
                  stroke="#984bca"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* 6. Navy Blue */}
                <path
                  d="M 44.08 159.97 A 82 82 0 0 1 22.95 128.05"
                  fill="none"
                  stroke="#18236e"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
              </svg>
              <div className="payment-options-center"><Glyph name="bank" /></div>
            </div>
          </div>
          <div className="payment-options-legend">
            {["TeleBirr", "CBE Bank", "Dashen", "Zemen", "Awash", "Other Options"].map((name, index) => <span key={name}><i className={`option-dot option-${index}`} />{name}</span>)}
          </div>
        </article>

        <article className="panel institution-panel">
          <div className="panel-heading"><div><h2>Transactions Stat By Financial Institution Type</h2><p>Transaction summaries grouped by the type of financial institution.</p></div></div>
          <div className="institution-visual">
            <div className="institution-ring" role="img" aria-label="Financial institution transactions: Banks 67.8 percent, Wallets 32.2 percent">
              <svg className="institution-ring-svg" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="76" fill="none" stroke="#17236c" strokeWidth="36" />
                <circle cx="100" cy="100" r="76" fill="none" stroke="#00966b" strokeWidth="36" strokeDasharray="323.9 153.4" transform="rotate(180 100 100)" />
              </svg>
              <span className="institution-percent banks-percent">67.8%</span>
              <span className="institution-percent wallets-percent">32.2%</span>
              <div className="institution-center"><span>Total Revenue</span><strong>20,000,000.00</strong><b>ETB</b></div>
            </div>
          </div>
          <div className="institution-legend"><span><i className="bank-dot" />Banks</span><span><i className="wallet-dot" />Wallets</span></div>
        </article>
      </section>

      <section className="panel best-merchants-panel">
        <div className="panel-heading"><div><h2>Best Performing Merchants</h2><p>List of best-performing merchants in the system based on their transactions.</p></div></div>
        <MerchantList />
      </section>
    </AdminShell>
  );
}
