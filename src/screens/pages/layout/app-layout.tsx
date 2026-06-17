import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/shadui//components/ui/sidebar";
import { AppSidebar } from "@/screens/components/AppSidebar";
import AppMobileHeader from "./app-mobile-header";

export default function AppLayout({ isAuthenticated }: { isAuthenticated: boolean | null }) {
  
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-white">
        <Outlet />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#f8f9fa] text-slate-900">
        <AppSidebar isAuthenticated={isAuthenticated}/>
        <main className="flex-1 relative overflow-x-hidden">
          <AppMobileHeader />
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}