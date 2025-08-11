import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return <div className="rounded p-4 shadow bg-white">{children}</div>;
}
