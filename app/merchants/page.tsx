"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import AdminShell, { DownloadIcon, FilterIcon, SearchIcon } from "@/components/admin-shell";

type Merchant = { name: string; category: string; phone: string; email: string; license: string; tin: string; region: string; city: string; zone: string; created: string; status: "Active" | "Pending" | "Suspended" };

const initialMerchants: Merchant[] = [
  { name: "Shoa Super Market", category: "Grocery", phone: "+251 9 0011 0011", email: "Shoa12@example.com", license: "MER-002345", tin: "37263272362", region: "Addis Ababa", city: "Addis Ababa", zone: "Arada", created: "2025-02-20", status: "Active" },
  { name: "Ethiopian Airlines", category: "Travel & Transport", phone: "+251 11 665 22 22", email: "sales@ethiopian.com", license: "MER-002346", tin: "00192837462", region: "Addis Ababa", city: "Addis Ababa", zone: "Bole", created: "2025-02-19", status: "Active" },
  { name: "Queen’s Supermarket", category: "Grocery", phone: "+251 9 8877 6655", email: "queens@example.com", license: "MER-002347", tin: "38273645120", region: "Oromia", city: "Adama", zone: "Center", created: "2025-02-18", status: "Pending" },
  { name: "Ethio Telecom", category: "Telecommunication", phone: "+251 11 551 00 00", email: "support@ethiotelecom.et", license: "MER-002348", tin: "28273645129", region: "Addis Ababa", city: "Addis Ababa", zone: "Kirkos", created: "2025-02-15", status: "Active" },
  { name: "Bunna International Bank", category: "Financial Services", phone: "+251 11 126 45 00", email: "info@bunnabanksc.com", license: "MER-002349", tin: "19283746501", region: "Addis Ababa", city: "Addis Ababa", zone: "Lideta", created: "2025-02-12", status: "Suspended" },
  { name: "Dashen Brewery", category: "Manufacturing", phone: "+251 11 667 11 22", email: "contact@dashenbrewery.com", license: "MER-002350", tin: "91283746502", region: "Amhara", city: "Gondar", zone: "Central", created: "2025-02-10", status: "Active" },
  { name: "Shoa Super Market - Bole", category: "Grocery", phone: "+251 9 0099 0088", email: "bole@shoa.example", license: "MER-002351", tin: "47263272362", region: "Addis Ababa", city: "Addis Ababa", zone: "Bole", created: "2025-02-08", status: "Active" },
];

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState(initialMerchants);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Listed Merchants");
  const [status, setStatus] = useState("All statuses");
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Grocery");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => merchants.filter((merchant) => {
    const matchesQuery = `${merchant.name} ${merchant.category} ${merchant.phone} ${merchant.email} ${merchant.tin}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "All statuses" || merchant.status === status);
  }), [merchants, query, status]);

  function addMerchant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newEmail.trim()) {
      setFormError("Enter a merchant name, phone number, and email address.");
      return;
    }
    setMerchants((current) => [{
      name: newName.trim(), category: newCategory, phone: newPhone.trim(), email: newEmail.trim(),
      license: `MER-${String(2345 + current.length + 1).padStart(6, "0")}`, tin: "Not provided",
      region: "Addis Ababa", city: "Addis Ababa", zone: "—", created: new Date().toISOString().slice(0, 10), status: "Pending",
    }, ...current]);
    setNewName(""); setNewPhone(""); setNewEmail(""); setFormError(""); setShowModal(false);
  }

  function exportCsv() {
    const headers = ["Merchant Name", "Business Category", "Phone Number", "Email", "Business License", "TIN Number", "Region", "City", "Zone", "Created at", "Status"];
    const body = filtered.map((merchant) => [merchant.name, merchant.category, merchant.phone, merchant.email, merchant.license, merchant.tin, merchant.region, merchant.city, merchant.zone, merchant.created, merchant.status]);
    const csv = [headers, ...body].map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "starpay-merchants.csv"; anchor.click(); URL.revokeObjectURL(url);
  }

  return (
    <AdminShell className="table-page-frame merchants-page-frame">
      <div className="page-title-row merchants-title-row">
        <Link href="/portal" className="merchant-back-link" aria-label="Back to portal">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7M8 12h12" /></svg>
          <span>Merchant</span>
        </Link><button className="primary-small-button" type="button" onClick={() => setShowModal(true)}>＋ Add Merchant</button>
      </div>
      <section className="merchant-stats-grid">
        <button type="button" className={`merchant-stat-card ${tab === "Listed Merchants" ? "active" : ""}`} onClick={() => setTab("Listed Merchants")}><span className="merchant-stat-icon green">LM</span><span><small>Listed Merchants</small><strong>24,200</strong></span><em>+10%</em></button>
        <button type="button" className={`merchant-stat-card ${tab === "Agency Merchants" ? "active" : ""}`} onClick={() => setTab("Agency Merchants")}><span className="merchant-stat-icon blue">AM</span><span><small>Agency Merchants</small><strong>30 <i>Waiting</i></strong></span><em>+4%</em></button>
        <button type="button" className={`merchant-stat-card ${tab === "Self Onboarded Merchants" ? "active" : ""}`} onClick={() => setTab("Self Onboarded Merchants")}><span className="merchant-stat-icon purple">SO</span><span><small>Self Onboarded Merchants</small><strong>1,200 <i>Waiting</i></strong></span><em>+8%</em></button>
      </section>

      <section className="panel table-panel merchant-table-panel">
        <div className="table-panel-heading"><div><h2>Merchant List</h2><p>Search, review, and manage merchants registered on StarPay.</p></div><span className="record-count">{filtered.length} merchants</span></div>
        <div className="table-toolbar">
          <label className="search-control"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by merchant name, phone, email..." /></label>
          <div className="toolbar-actions"><label className="status-select"><FilterIcon /><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Active</option><option>Pending</option><option>Suspended</option></select></label><button className="outline-button" type="button" onClick={exportCsv}><DownloadIcon />Export</button></div>
        </div>
        <p className="table-scroll-hint">On smaller screens, scroll the table horizontally to see every column.</p>
        <div className="data-table-scroll" role="region" aria-label="Merchant records" tabIndex={0}><table className="data-table merchants-table"><thead><tr><th>Merchant Name</th><th>Business Category</th><th>Phone Number</th><th>Email</th><th>Business License</th><th>TIN Number</th><th>Region</th><th>City</th><th>Zone</th><th>Created at</th><th>Status</th><th>Details</th></tr></thead><tbody>{filtered.map((merchant) => <tr key={merchant.license}><td><strong className="merchant-name-cell">{merchant.name}</strong></td><td>{merchant.category}</td><td>{merchant.phone}</td><td>{merchant.email}</td><td>{merchant.license}</td><td>{merchant.tin}</td><td>{merchant.region}</td><td>{merchant.city}</td><td>{merchant.zone}</td><td>{merchant.created}</td><td><span className={`status-badge ${merchant.status.toLowerCase()}`}>{merchant.status}</span></td><td><button className="table-more-button" type="button" aria-label={`More details for ${merchant.name}`}>•••</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No merchants match your search.</div>}</div>
        <div className="table-pagination"><span>Showing {filtered.length} of {merchants.length} merchants</span><div><button type="button" disabled>‹</button><button type="button" className="current-page">1</button><button type="button" disabled>›</button></div></div>
      </section>

      {showModal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowModal(false); }}><section className="merchant-modal" role="dialog" aria-modal="true" aria-labelledby="add-merchant-title"><div className="modal-heading"><div><h2 id="add-merchant-title">Add Merchant</h2><p>Enter the basic details to register a new merchant.</p></div><button type="button" onClick={() => setShowModal(false)} aria-label="Close">×</button></div><form onSubmit={addMerchant}><label>Merchant Name<input value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Enter business name" /></label><label>Business Category<select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}><option>Grocery</option><option>Travel &amp; Transport</option><option>Telecommunication</option><option>Financial Services</option><option>Manufacturing</option><option>Other</option></select></label><label>Phone Number<input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} placeholder="+251 9 ..." /></label><label>Email Address<input type="email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} placeholder="name@example.com" /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="modal-actions"><button type="button" className="outline-button" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="primary-small-button">Save Merchant</button></div></form></section></div>}
    </AdminShell>
  );
}
