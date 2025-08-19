import { useEffect, useState } from "react";
//
import RealTimeLineChart from "../components/realTimeChartPage/RealTimeLineChart";
import StatesList from "../components/realTimeChartPage/StatesList";
import MainLayout from "../layouts/MainLayout";
import data from "../dataset/top-states-sales.json";
import type { AggregateStatesSalesType } from "../types";
import Card from "../components/common/Card";

const aggregatedData: Array<AggregateStatesSalesType> = Object.values(data).map(
  (el, index) => {
    return {
      id: index,
      label: el.label,
      dataSum: el.data.reduce((prev, current) => prev + current, 0),
      data: el.data,
      color: el.color,
      previousIndex: index,
      highlight: false,
      flag_url: el.flag_url,
    };
  }
);

export default function RealTimeChart() {
  const [items, setItems] =
    useState<Array<AggregateStatesSalesType>>(aggregatedData);
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const prevItems = [...prev];
        const newItems = prevItems.map((el) => {
          const randomNum = Math.floor(Math.random() * 1000);
          const newValue = el.dataSum + randomNum;
          const tempData = [...el.data];
          tempData.push(randomNum);

          return {
            ...el,
            dataSum: newValue,
            data: tempData,
          };
        });
        let sorted = newItems.map((el, index) => ({
          ...el,
          previousIndex: index,
        }));
        sorted = sorted.sort((a, b) => b.dataSum - a.dataSum);

        return sorted;
      });
    }, 2000);
    return () => clearInterval(interval);
  });
  console.log(items);
  return (
    <MainLayout>
      <div className="text-2xl mb-8 text-secondary-600 font-bold">States Sales RealTime Dashboard</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <RealTimeLineChart data={items} />
        </Card>
        <StatesList data={items} setData={setItems} />
      </div>
    </MainLayout>
  );
}
