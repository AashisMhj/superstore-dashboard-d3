import LogoSuperStoreLogo from "../../assets/images/super-store-visualization-dashboard-transparent.png";
import { CircleUserRound, ChevronDown } from "lucide-react";
export default function Headers() {
  return (
    <header className="p-6 h-[80px] flex justify-between w-full">
      <div className="flex gap-2 items-center">
        <img
          src={LogoSuperStoreLogo}
          alt="Super Store Visualization"
          height={50}
          width={50}
        />
        <span className="text-2xl text-primary-600  font-bold hidden md:block">SuperStore Visualization</span>
      </div>
      <div className="flex gap-2 items-center cursor-pointer rounded-xl bg-gray-100 p-2">
        <CircleUserRound />
        <ChevronDown />
      </div>
    </header>
  );
}
