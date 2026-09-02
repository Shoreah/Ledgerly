import Sidebar from "../components/dashboard/Sidebar";
import { DashboardDataProvider } from "../components/dashboard/DashboardDataContext";
import NewInvoiceModal from "../components/dashboard/NewInvoiceModal";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DashboardDataProvider>
      <div className="flex min-h-screen max-[860px]:flex-col">
        <Sidebar user={user} />
        <main className="dashboard-rule relative flex-1">
          <div className="relative z-10 max-w-[1180px] px-9 pb-[60px] pl-[76px] pt-[30px] max-[860px]:px-5 max-[860px]:pb-11 max-[860px]:pl-5 max-[860px]:pt-6">
            {children}
          </div>
        </main>
      </div>
      <NewInvoiceModal />
    </DashboardDataProvider>
  );
}
