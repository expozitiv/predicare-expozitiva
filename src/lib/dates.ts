const MONTHS = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

/** "4–6 martie 2026" sau "28 februarie – 2 martie 2026" când intervalul trece luna. */
export function formatDateRange(dateStr: string, dateEndStr: string): string {
  const d = new Date(dateStr);
  const dEnd = new Date(dateEndStr);
  const sameMonth = d.getMonth() === dEnd.getMonth() && d.getFullYear() === dEnd.getFullYear();
  if (sameMonth) {
    return `${d.getDate()}–${dEnd.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${d.getDate()} ${MONTHS[d.getMonth()]} – ${dEnd.getDate()} ${MONTHS[dEnd.getMonth()]} ${dEnd.getFullYear()}`;
}

/** Zilele, fără an: "4–6 martie". */
export function formatDays(dateStr: string, dateEndStr: string): string {
  return formatDateRange(dateStr, dateEndStr).replace(/\s\d{4}$/, "");
}

/** "martie 2025" */
export function formatMonthYear(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function isUpcoming(dateEndStr: string, today = new Date()): boolean {
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return new Date(dateEndStr) >= t;
}
