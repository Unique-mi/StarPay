import Link from "next/link";
import AdminShell, { ArrowUpRightIcon, DocumentIcon, StatsGridIcon, StoreIcon } from "@/components/admin-shell";

const portalCards = [
  {
    title: "Statistical Info.",
    description: "View key stats and insights on system transactions and actions.",
    tone: "blue",
    href: "/dashboard",
    icon: <StatsGridIcon />,
  },
  {
    title: "Transactions",
    description: "Track and manage all transactions made by customers to registered merchants.",
    tone: "sky",
    href: "/transactions",
    icon: <DocumentIcon />,
  },
];

export default function PortalHomePage() {
  return (
    <AdminShell
      appearance="portal"
      className="welcome-frame"
      banner={(
        <section className="welcome-hero">
          <div className="welcome-copy">
            <h1>
              <span aria-hidden="true">👋 </span>
              Welcome to Starpay Payment Gate Way ELST Super Admin Portal
            </h1>
            <p>Track and manage all transactions and activities across the portal.</p>
          </div>
        </section>
      )}
    >
      <section className="portal-card-grid" aria-label="Portal overview">
        {portalCards.map((card) => (
          <Link
            className="portal-action-card"
            href={card.href}
            key={card.title}
            aria-label={`Open ${card.title}`}
          >
            <div className="portal-card-top">
              <div className={`portal-card-icon ${card.tone}`} aria-hidden="true">{card.icon}</div>
              <span className="card-corner-icon" aria-hidden="true"><ArrowUpRightIcon /></span>
            </div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </Link>
        ))}
      </section>

      <section className="portal-menu-section">
        <div className="section-heading">
          <h2>Menus</h2>
          <p>Choose from the available menus to manage items or take actions as needed.</p>
        </div>
        <Link className="portal-merchant-tile" href="/merchants" aria-label="Open merchant management">
          <div className="merchant-tile-icon" aria-hidden="true"><StoreIcon /></div>
          <h3>Merchants</h3>
          <p>Create and manage all merchants, view their information and transaction details.</p>
        </Link>
      </section>
    </AdminShell>
  );
}
