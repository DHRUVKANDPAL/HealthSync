
import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {/* <Header></Header> */}
      {children}
      <Toaster richColors></Toaster>
    </div>
  );
}
