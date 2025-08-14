import type { ReactNode } from "react";
//
import Headers from "../components/shared/Header";
import SideBar from "../components/shared/SideBar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow">
        <Headers />
      </div>
      <div className="fixed top-[60px] left-0">
        <SideBar />
      </div>
      <div className="mt-[80px] ml-[60px] bg-stone-100 min-h-[calc(100vh-80px)] w-[calc(100%-60px)] mb-10">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
