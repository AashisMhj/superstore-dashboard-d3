import { ChartColumnDecreasing, ChartNoAxesCombinedIcon } from "lucide-react";
import Paths from "../../router/paths";
import { Link } from "react-router";

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
  return <aside className="p-4 w-[40px] h-[calc(100vh-60px)]">
    <div className="display flex flex-col gap-6">
    {
        SideBarItems.map((el) => <Link to={el.link} key={el.label} className="hover:text-blue-600">
            {el.icon}
        </Link>)
    }
    </div>
  </aside>;
}
