import type { ReactNode } from "react";

type ToolTipProps = {
  isVisible: boolean;
  xPosition: number;
  yPosition: number;
  children: ReactNode;
};
export default function ToolTip({
  isVisible,
  xPosition,
  yPosition,
  children,
}: ToolTipProps) {
  return (
    <div
      className="fixed max-w-28 p-4 bg-black/50 text-white"
      style={{
        top: xPosition+'px',
        left: yPosition+"px",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
