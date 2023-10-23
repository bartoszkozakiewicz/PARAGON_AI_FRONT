import type { Metadata } from "next";
import Navbar from "../../components/navbar";
import SidebaR from "../../components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-row w-[100%] min-h-screen">
      <SidebaR />
      <div className="flex flex-col w-full min-h-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
