import type { ReactNode } from "react";

type ArrowPositionType = "top" | "bottom" | "left" | "right";

type ToolTipProps = {
  isVisible: boolean;
  xPosition: number;
  yPosition: number;
  children: ReactNode;
  arrowPosition?: ArrowPositionType;
};

function getArrow(position: ArrowPositionType) {
  if (position === "bottom")
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black/80"></div>
    );
  else if (position === "top")
    return (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black/80"></div>
    );
  else if (position === "left")
    return (
      <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-8 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-black/80"></div>
    );
  else if (position === "right")
    return (
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-b-8 border-t-8 border-t-transparent border-b-transparent border-l-black/80"></div>
    );
}
export default function ToolTip({
  isVisible,
  xPosition,
  yPosition,
  children,
  arrowPosition = "bottom",
}: ToolTipProps) {
  return (
    <div
      className="fixed max-w-40 p-4 bg-black/80 text-white transition-[visibility] ease-in"
      style={{
        left: xPosition + "px",
        top: yPosition + "px",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {children}
      {getArrow(arrowPosition)}
    </div>
  );
}
