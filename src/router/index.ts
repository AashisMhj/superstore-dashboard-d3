import { createBrowserRouter } from "react-router";
//
import Paths from "./paths";
import DashboardPage from "../pages/Dashboard.page";
import RealTimeChart from "../pages/RealTimeChat.page";

const router = createBrowserRouter([
  {
    path: Paths.dashboard,
    Component: DashboardPage,
  },
  {
    path: Paths.readTimeChart,
    Component: RealTimeChart,
  },
]);

export default router;