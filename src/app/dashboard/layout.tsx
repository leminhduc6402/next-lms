import { AppSidebar } from "@/components/AppSidebar";
import { DarkModeToggle } from "@/components/DarkkModeToggle";
import Footer from "@/components/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "@/components/UserProfile";
import { ShoppingCart } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col h-screen w-full bg-gray-100 dark:bg-slate-800">
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-slate-700">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button>
              <ShoppingCart />
            </button>
            <UserProfile />
          </div>
        </div>
        <div className="w-full h-[100%] p-4 flex flex-col">{children}</div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
