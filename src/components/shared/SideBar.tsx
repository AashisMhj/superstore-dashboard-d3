import { ChartColumnDecreasing, ChartNoAxesCombinedIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { clsx } from "clsx";
//
import Paths from "../../router/paths";

const SideBarItems = [
  {
    label: "Dashboard",
    icon: <ChartColumnDecreasing />,
    link: Paths.dashboard,
  },
  {
    label: "RealTime Chart",
    icon: <ChartNoAxesCombinedIcon />,
    link: Paths.readTimeChart,
  },
];
export default function SideBar() {
  const location = useLocation();
  return (
    <aside className="px-4 py-8 h-[calc(100vh-60px)]">
      <div className="display flex flex-col gap-6">
        {SideBarItems.map((el) => (
          <Link
            to={el.link}
            key={el.label}
            className={clsx("rounded p-1", {
              "bg-primary-600 text-white hover:text-gray-300 hover:bg-primary-700":
                location.pathname === el.link,
              "text-primary-600 hover:bg-primary-300-900 ": location.pathname !== el.link,
            })}
          >
            {el.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
}
