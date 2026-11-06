"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin-shell";
import { formatMoney, transactions } from "@/lib/transactions";
import styles from "./transaction-details.module.css";

function LaptopIcon() {
    return (
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="8" y="5.5" width="24" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M5 30h30l-3 4H8l-3-4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M15 31.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 10h16M12 14h16M12 18h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    );
}

function PrinterIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 14h10v7H7zM17 11h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function display(value: unknown, fallback = "—") {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value);
}

function InfoSection({
    title,
    items,
    columns = 4,
}: {
    title: string;
    items: { label: string; value: string }[];
    columns?: 2 | 3 | 4;
}) {
    return (
        <section className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.infoGrid} data-columns={columns}>
                {items.map((item) => (
                    <div className={styles.infoItem} key={item.label}>
                        <span>{item.label}:</span>
                        <strong>{item.value}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function TransactionDetailsPage() {
    const params = useParams<{ id: string }>();
    const transaction = transactions.find((item) => String(item.id) === String(params.id));

    if (!transaction) {
        return (
            <AdminShell className={styles.transactionShell} showFooter={false}>
                <main className={styles.detailsPage}>
                    <div className={styles.pageNavigation}>
                        <Link href="/transactions" className={styles.backLink}>
                            <span aria-hidden="true">←</span> Transactions
                        </Link>
                    </div>
                    <section className={styles.notFound}>
                        <h1>Transaction not found</h1>
                        <p>The transaction may have been removed or the reference is invalid.</p>
                        <Link href="/transactions">Back to Transactions</Link>
                    </section>
                </main>
            </AdminShell>
        );
    }

    const amountNumber = Number(String(transaction.amount).replace(/[^\d.-]/g, "")) || 0;
    const accountNumber = Number(String(transaction.cashAmount).replace(/[^\d.-]/g, "")) || 0;
    const starCoinNumber = Math.max(0, amountNumber - accountNumber);
    const transactionDate = display(transaction.date);

    // Product-level records are not part of the current lib/transactions.ts model.
    // These rows reproduce the product summary shown in the supplied Figma receipt.
    const products = Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        name: "Macbook Air",
        quantity: "2 Pcs",
        price: "282,400.00",
    }));

    const referenceItems = [
        { label: "EI Reference", value: display(transaction.eir) },
        { label: "Starpay Bill Reference", value: display(transaction.bill) },
        { label: "FI Reference", value: display(transaction.fiReference) },
        { label: "CC Reference", value: display(transaction.collectionReference) },
    ];

    const merchantItems = [
        { label: "Merchant ID", value: display(transaction.merchantId) },
        { label: "Merchant Name", value: display(transaction.merchant) },
        { label: "Cashier Name", value: display(transaction.cashier) },
        { label: "Cashier ID", value: display(transaction.cashierId) },
    ];

    const customerItems = [
        { label: "Customer Name", value: display(transaction.customer) },
        { label: "Customer Phone Number", value: display(transaction.phone) },
    ];

    const paymentItems = [
        { label: "Transaction Amount", value: `${formatMoney(transaction.amount)}` },
        { label: "Amount Paid by Star Coin", value: `${formatMoney(starCoinNumber)}` },
        { label: "Amount Paid from Account", value: `${formatMoney(accountNumber)}` },
        { label: "Commission Fee", value: `${formatMoney(transaction.commissionFee)}` },
    ];

    const settlementItems = [
        { label: "Net Amount to Merchant", value: `${formatMoney(transaction.netAmount)}` },
        { label: "Transaction Date & Time", value: transactionDate },
    ];

    function printReceipt() {
        window.print();
    }

    return (
        <AdminShell className={styles.transactionShell} showFooter={false}>
            <main className={styles.detailsPage}>
                <div className={styles.pageNavigation}>
                    <Link href="/transactions" className={styles.backLink}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m14.5 5-7 7 7 7M8 12h12" />
                        </svg>
                        <span>Transaction Details</span>
                    </Link>
                </div>

                <div className={styles.receiptContent}>
                    <section className={styles.referenceBanner}>
                        <div className={styles.mainReference}>
                            <span>EI Reference:</span>
                            <strong>{display(transaction.eir)}</strong>
                        </div>
                        <button type="button" className={styles.printButton} onClick={printReceipt}>
                            <PrinterIcon />
                            Print Receipt
                        </button>
                    </section>

                    <InfoSection title="Reference Info." items={referenceItems} />
                    <InfoSection title="Merchant Info." items={merchantItems} />
                    <InfoSection title="Customer Info." items={customerItems} columns={2} />

                    <section className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>Product Information:</h2>
                        <p className={styles.productCount}>Total No. of Products (8)</p>
                        <div className={styles.productGrid}>
                            {products.map((product) => (
                                <article className={styles.productCard} key={product.id}>
                                    <div className={styles.productDetails}>
                                        <span className={styles.productIcon}><LaptopIcon /></span>
                                        <span className={styles.productCopy}>
                                            <strong>{product.name}</strong>
                                            <small>{product.quantity}</small>
                                        </span>
                                    </div>
                                    <strong className={styles.productPrice}>{product.price} <small>ETB</small></strong>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>Payment Info.</h2>
                        <div className={styles.infoGrid} data-columns={4}>
                            {paymentItems.map((item) => (
                                <div className={styles.infoItem} key={item.label}>
                                    <span>{item.label}:</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                        <div className={styles.settlementGrid}>
                            {settlementItems.map((item) => (
                                <div className={styles.infoItem} key={item.label}>
                                    <span>{item.label}:</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                            <div className={styles.infoItem}>
                                <span>Transaction Status:</span>
                                <strong className={`${styles.statusBadge} ${styles[transaction.status.toLowerCase()] || ""}`}>
                                    {transaction.status}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <footer className={styles.receiptFooter}>
                        <div>
                            <h2>STARPAY PAYMENT GATE WAY</h2>
                            <p>Email: info@starpaycontact.com</p>
                            <p>Phone: +251 11 557 20 80</p>
                        </div>
                        <div className={styles.footerBrand}>
                            <Image
                                src="/logo-color.png"
                                alt="StarPay Logo"
                                width={2086}
                                height={1160}
                                className={styles.footerLogoImage}
                            />
                        </div>
                    </footer>
                </div>
            </main>
        </AdminShell>
    );
}
