import BubbleChart from "../components/dashboardPage/BubbleChart";
import CategorySalesPieChart from "../components/dashboardPage/CategorySalesPieChart";
import DiscountQuantityScatterPlot from "../components/dashboardPage/DiscountQuantityScatterPlot";
import SalesBarChart from "../components/dashboardPage/SalesBarChart";
import SalesChoropleth from "../components/dashboardPage/SalesChoropleth";
import SalesProfitBarChart from "../components/dashboardPage/SalesProfitBarChart";
import TopCardSection from "../components/dashboardPage/TopCardSection";
import TopSalesState from "../components/dashboardPage/TopSalesState";
import MainLayout from "../layouts/MainLayout";

export default function DashboardPage(){
    return <MainLayout>
        <div className="flex flex-col gap-10">
            <TopCardSection />
            <SalesBarChart />
            <div className="grid gap-8 grid-cols-3">
                <div className="col-span-2">
                    <TopSalesState />
                </div>
                <div>
                    <CategorySalesPieChart />
                </div>
            </div>
            <div className="grid gap-8 grid-cols-12">
                <div className="col-span-4">
                    <SalesProfitBarChart />
                </div>
                <div className="col-span-8">
                    <SalesChoropleth />
                </div>
            </div>
            <div className="grid gap-8 grid-cols-3">
                <div className="col-span-2">
                    <BubbleChart />
                </div>
                <div>
                    <DiscountQuantityScatterPlot />
                </div>
            </div>
        </div>
    </MainLayout>
}