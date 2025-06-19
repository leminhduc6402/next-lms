import { auth } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Navbar isDashboard isEnabledSidebarTrigger session={session} />
          <main className="flex-1 p-4 bg-gray-100 dark:bg-slate-800 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}
