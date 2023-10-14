import type { Metadata } from "next";
import Navbar from "../../components/navbar";
import SidebaR from "../../components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-[100%]">
      <SidebaR />
      <div className="flex flex-col w-[100%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
