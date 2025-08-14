import BubbleChart from "../components/dashboardPage/BubbleChart";
import CategorySalesPieChart from "../components/dashboardPage/CategorySalesPieChart";
import DiscountQuantityScatterPlot from "../components/dashboardPage/DiscountQuantityScatterPlot";
import SalesBarChart from "../components/dashboardPage/SalesBarChart";
import SalesChoropleth from "../components/dashboardPage/SalesChoropleth";
import SalesProfitBarChart from "../components/dashboardPage/SalesProfitBarChart";
import SalesStat from "../components/dashboardPage/SalesStat";
import TopCardSection from "../components/dashboardPage/TopCardSection";
import TopSalesState from "../components/dashboardPage/TopSalesState";
import MainLayout from "../layouts/MainLayout";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <TopCardSection />
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <SalesProfitBarChart />
          </div>
          <div>
            <SalesStat />
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 ">
            <SalesChoropleth />
          </div>
          <div>
            <TopSalesState />
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <SalesBarChart />
          </div>
          <div className="col-span-1">
            <CategorySalesPieChart />
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-12">
          <div className="cols-span-1 md:col-span-8">
            <DiscountQuantityScatterPlot />
          </div>
          <div className="cols-span-1 md:col-span-4">
            <BubbleChart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
