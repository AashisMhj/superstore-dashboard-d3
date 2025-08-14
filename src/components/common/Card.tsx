import clsx from "clsx";
import type { ReactNode } from "react";

export default function Card({
  children,
  extraClassNames="",
}: {
  children: ReactNode;
  extraClassNames?: string;
}) {
  return (
    <div className={clsx("rounded p-4 shadow bg-white flex flex-col gap-4", extraClassNames)}>
      {children}
    </div>
  );
}
