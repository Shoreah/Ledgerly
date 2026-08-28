import InvoiceTable from "../../components/dashboard/InvoiceTable";
import NewInvoiceButton from "../../components/dashboard/NewInvoiceButton";

export default function InvoicesPage() {
  return (
    <>
      <div className="mb-[30px] flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-margin">
            Ledger entry — full record
          </span>
          <h1 className="mt-1.5 font-serif text-[27px] font-medium text-ink">
            Invoices
          </h1>
        </div>
        <NewInvoiceButton />
      </div>

      <InvoiceTable />
    </>
  );
}
