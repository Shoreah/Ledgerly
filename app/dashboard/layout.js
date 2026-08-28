import Sidebar from "../components/dashboard/Sidebar";
import { DashboardDataProvider } from "../components/dashboard/DashboardDataContext";
import NewInvoiceModal from "../components/dashboard/NewInvoiceModal";

export default function DashboardLayout({ children }) {
  return (
    <DashboardDataProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="dashboard-rule relative flex-1">
          <div className="relative z-10 max-w-[1180px] px-9 pb-[60px] pl-[76px] pt-[30px] max-[860px]:px-5 max-[860px]:pb-11 max-[860px]:pl-[34px] max-[860px]:pt-[22px]">
            {children}
          </div>
        </main>
      </div>
      <NewInvoiceModal />
    </DashboardDataProvider>
  );
}
