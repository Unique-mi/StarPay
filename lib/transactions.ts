export type Transaction = {
  id: string;
  eir: string;
  bill: string;
  fiReference: string;
  merchantReference: string;
  merchantId: string;
  merchant: string;
  merchantPhone: string;
  cashier: string;
  cashierId: string;
  customer: string;
  phone: string;
  institution: string;
  channel: string;
  amount: number;
  cashAmount: number;
  netAmount: number;
  transactionFee: number;
  commissionFee: number;
  collectionReference: string;
  ccReference: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

export const transactions: Transaction[] = [
  { id: "TX-24024242", eir: "EI-24024242", bill: "SBR-394573534", fiReference: "FI-9783535", merchantReference: "MR-98234924", merchantId: "MR-98234924", merchant: "Shoa Supermarket", merchantPhone: "+251 9 0011 0011", cashier: "Hana Hagoes", cashierId: "CS-937453434", customer: "Filimon Mehari", phone: "+251 9 9833 8321", institution: "Commercial Bank of Ethiopia", channel: "TeleBirr", amount: 5000, cashAmount: 20, netAmount: 4990, transactionFee: 0, commissionFee: 10, collectionReference: "COL-24024242", ccReference: "CC-029783535", status: "Completed", date: "2025-02-20 10:45 AM" },
  { id: "TX-24024243", eir: "EI-24024243", bill: "SBR-394573535", fiReference: "FI-9783536", merchantReference: "MR-98234925", merchantId: "MR-98234925", merchant: "Ethiopian Airlines", merchantPhone: "+251 11 665 22 22", cashier: "Marta Bekele", cashierId: "CS-937453435", customer: "Mekdes Tadesse", phone: "+251 9 1122 3344", institution: "Awash Bank", channel: "Local Card", amount: 12400, cashAmount: 0, netAmount: 12375, transactionFee: 0, commissionFee: 25, collectionReference: "COL-24024243", ccReference: "CC-029783536", status: "Completed", date: "2025-02-20 10:32 AM" },
  { id: "TX-24024244", eir: "EI-24024244", bill: "SBR-394573536", fiReference: "FI-9783537", merchantReference: "MR-98234926", merchantId: "MR-98234926", merchant: "Queen’s Supermarket", merchantPhone: "+251 9 8877 6655", cashier: "Abel Girma", cashierId: "CS-937453436", customer: "Abel Girma", phone: "+251 9 4433 2211", institution: "Dashen Bank", channel: "OTP Payment", amount: 2750, cashAmount: 0, netAmount: 2744.5, transactionFee: 0, commissionFee: 5.5, collectionReference: "COL-24024244", ccReference: "CC-029783537", status: "Pending", date: "2025-02-20 10:18 AM" },
  { id: "TX-24024245", eir: "EI-24024245", bill: "SBR-394573537", fiReference: "FI-9783538", merchantReference: "MR-98234924", merchantId: "MR-98234924", merchant: "Shoa Supermarket", merchantPhone: "+251 9 0011 0011", cashier: "Hana Hagoes", cashierId: "CS-937453434", customer: "Hana Hagos", phone: "+251 9 6677 8899", institution: "Commercial Bank of Ethiopia", channel: "USSD", amount: 8500, cashAmount: 0, netAmount: 8483, transactionFee: 0, commissionFee: 17, collectionReference: "COL-24024245", ccReference: "CC-029783538", status: "Completed", date: "2025-02-20 09:56 AM" },
  { id: "TX-24024246", eir: "EI-24024246", bill: "SBR-394573538", fiReference: "FI-9783539", merchantReference: "MR-98234927", merchantId: "MR-98234927", merchant: "Ethio Telecom", merchantPhone: "+251 11 551 00 00", cashier: "Dawit Bekele", cashierId: "CS-937453437", customer: "Dawit Bekele", phone: "+251 9 2211 4455", institution: "Zemen Bank", channel: "Reference", amount: 1200, cashAmount: 0, netAmount: 1197.6, transactionFee: 0, commissionFee: 2.4, collectionReference: "COL-24024246", ccReference: "CC-029783539", status: "Failed", date: "2025-02-20 09:41 AM" },
  { id: "TX-24024247", eir: "EI-24024247", bill: "SBR-394573539", fiReference: "FI-9783540", merchantReference: "MR-98234925", merchantId: "MR-98234925", merchant: "Ethiopian Airlines", merchantPhone: "+251 11 665 22 22", cashier: "Marta Bekele", cashierId: "CS-937453435", customer: "Selamawit Alemu", phone: "+251 9 7788 9900", institution: "TeleBirr", channel: "TeleBirr", amount: 18200, cashAmount: 0, netAmount: 18163.6, transactionFee: 0, commissionFee: 36.4, collectionReference: "COL-24024247", ccReference: "CC-029783540", status: "Completed", date: "2025-02-20 09:28 AM" },
];

export function getTransaction(id?: string | null) {
  if (!id) return transactions[0];
  return transactions.find((row) => row.id === id || row.eir === id) ?? transactions[0];
}

export function formatMoney(value: number) {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 2 })} ETB`;
}
