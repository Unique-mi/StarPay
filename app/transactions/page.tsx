"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AdminShell, { DownloadIcon, FilterIcon, SearchIcon } from "@/components/admin-shell";
import { formatMoney, transactions as rows } from "@/lib/transactions";

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [page, setPage] = useState(1);
  const filteredRows = useMemo(() => rows.filter((row) => {
    const matchesQuery = `${row.eir} ${row.bill} ${row.fiReference} ${row.merchant} ${row.customer} ${row.phone} ${row.channel}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "All statuses" || row.status === status);
  }), [query, status]);

  function exportCsv() {
    const headers = ["Transaction reference", "Bill reference", "FI reference", "Merchant reference", "Merchant ID", "Merchant", "Merchant phone", "Cashier", "Cashier ID", "Customer", "Customer phone", "Institution", "Channel", "Amount", "Cash amount", "Net amount", "Transaction fee", "Commission fee", "Collection reference", "Status", "Date"];
    const body = filteredRows.map((row) => [row.eir, row.bill, row.fiReference, row.merchantReference, row.merchantId, row.merchant, row.merchantPhone, row.cashier, row.cashierId, row.customer, row.phone, row.institution, row.channel, row.amount, row.cashAmount, row.netAmount, row.transactionFee, row.commissionFee, row.collectionReference, row.status, row.date]);
    const csv = [headers, ...body].map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "starpay-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminShell className="table-page-frame">
      <div className="page-title-row transactions-title-row">
        <Link href="/portal" className="transaction-back-link" aria-label="Back to portal">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7M8 12h12" /></svg>
          <span>Transaction</span>
        </Link>
      </div>
      <section className="panel table-panel">
        <div className="table-panel-heading"><div><h2>Transaction List</h2><p>Search and review payment activity across all registered merchants.</p></div><span className="record-count">{filteredRows.length} records</span></div>
        <div className="table-toolbar">
          <label className="search-control"><SearchIcon /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search by reference, merchant name, customer name..." /></label>
          <div className="toolbar-actions">
            <label className="status-select"><FilterIcon /><select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option>All statuses</option><option>Completed</option><option>Pending</option><option>Failed</option></select></label>
            <button className="outline-button" type="button" onClick={exportCsv}><DownloadIcon />Export</button>
          </div>
        </div>
        <p className="table-scroll-hint">On smaller screens, scroll the table horizontally to see every column. Select a transaction reference to open its details.</p>
        <div className="data-table-scroll" role="region" aria-label="Transaction records" tabIndex={0}>
          <table className="data-table transactions-table">
            <thead><tr><th>Transaction Reference (EIR)</th><th>Starpay Bill Reference</th><th>FI Reference</th><th>Merchant Reference</th><th>Merchant ID</th><th>Merchant Name</th><th>Merchant Phone</th><th>Cashier Name</th><th>Cashier ID</th><th>Customer Name</th><th>Customer Phone</th><th>Financial Institution</th><th>Payment Channel</th><th>Amount</th><th>Cash Amount</th><th>Net Amount to Merchant</th><th>Transaction Fee</th><th>Commission Fee</th><th>Collection Reference</th><th>Status</th><th>Transaction Date &amp; Time</th></tr></thead>
            <tbody>{filteredRows.map((row) => <tr
              key={row.id}
              className="transaction-clickable-row"
              onClick={() => {
                window.location.href = `/transactions/${row.id}`;
              }}
            ><td><Link
              className="table-reference table-reference-link"
              href={`/transactions/${row.id}`}
              onClick={(event) => event.stopPropagation()}
              aria-label={`View details for ${row.eir}`}
            >
              {row.eir}
            </Link><small>{row.id}</small></td><td>{row.bill}</td><td>{row.fiReference}</td><td>{row.merchantReference}</td><td>{row.merchantId}</td><td>{row.merchant}</td><td>{row.merchantPhone}</td><td>{row.cashier}</td><td>{row.cashierId}</td><td>{row.customer}</td><td>{row.phone}</td><td>{row.institution}</td><td><span className="channel-tag">{row.channel}</span></td><td className="amount-cell">{formatMoney(row.amount)}</td><td>{formatMoney(row.cashAmount)}</td><td className="amount-cell">{formatMoney(row.netAmount)}</td><td>{formatMoney(row.transactionFee)}</td><td>{formatMoney(row.commissionFee)}</td><td>{row.collectionReference}</td><td><span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span></td><td>{row.date}</td></tr>)}</tbody>
          </table>
          {filteredRows.length === 0 && <div className="empty-state">No transactions match your search.</div>}
        </div>
        <div className="table-pagination"><span>Showing {filteredRows.length ? (page - 1) * 10 + 1 : 0}–{Math.min(page * 10, filteredRows.length)} of {filteredRows.length} transactions</span><div><button type="button" onClick={() => setPage(1)} disabled={page === 1}>‹</button><button type="button" className="current-page">{page}</button><button type="button" onClick={() => setPage((value) => value + 1)} disabled>›</button></div></div>
      </section>
    </AdminShell>
  );
}
