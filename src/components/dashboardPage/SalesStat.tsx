import Card from "../common/Card";
import data from "../../dataset/sales-with-profit.json";
type ReducedObjType = {
  [key: string]: {
    sales: number;
    profit: number;
    fromMonth: number;
    toMonth: number;
    date: string;
  };
};
function predictCallback(
  prev: ReducedObjType,
  current: { date: string; profit: number; sales: number }
) {
  const date = new Date(current.date);
  const key = `${date.getFullYear()}`;
  const month = date.getMonth();
  if (prev[key]) {
    prev[key] = {
      sales: prev[key].sales + current.sales,
      profit: prev[key].profit + current.profit,
      fromMonth: prev[key]?.fromMonth < month ? prev[key].fromMonth : month,
      toMonth: prev[key]?.toMonth > month ? prev[key].toMonth : month,
      date: key,
    };
  } else {
    prev[key] = {
      sales: current.sales,
      profit: current.profit,
      fromMonth: month,
      toMonth: month,
      date: key,
    };
  }
  return prev;
}

const PredictData = data
  .filter((el) => el.type === "Predict")
  .reduce(predictCallback, {} as ReducedObjType);
const reducedData = data
  .filter((el) => el.type !== "Predict")
  .reduce(predictCallback, {} as ReducedObjType);

export default function SalesStat() {
  return (
    <Card>
      <h3 className="text-secondary-600 text-xl md:text-2xl font-bold">
        Sales & Profit Overview
      </h3>
      <div className="flex flex-col gap-4">
        {Object.values(PredictData)
          .reverse()
          .map((value) => {
            return (
              <div
                key={value.date}
                className="border border-primary-600 p-2 rounded bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg flex gap-2 items-center">
                    {value.date}
                    <span className="text-sm font-normal">Prediction</span>
                  </div>
                  <span className="flex gap-2 items-center">
                    {new Date(`2025-${value.fromMonth + 1}-01`).toLocaleString(
                      "default",
                      { month: "short" }
                    )}{" "}
                    -
                    {new Date(`2025-${value.toMonth + 1}-01`).toLocaleString(
                      "default",
                      { month: "short" }
                    )}
                  </span>
                </div>
                <hr className="my-2 border-gray-600/25" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <span className="">Net Profit:</span>
                    <span className="font-bold">${value.profit} M</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Total Sales:</span>
                    <span className="font-bold">${value.sales} M</span>
                  </div>
                </div>
              </div>
            );
          })}
        {Object.values(reducedData)
          .reverse()
          .map((value) => {
            return (
              <div
                key={value.date}
                className="border border-primary-600 p-2 rounded"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{value.date}</span>
                  <span className="flex gap-2 items-center">
                    {new Date(`2025-${value.fromMonth + 1}-01`).toLocaleString(
                      "default",
                      { month: "short" }
                    )}{" "}
                    -
                    {new Date(`2025-${value.toMonth + 1}-01`).toLocaleString(
                      "default",
                      { month: "short" }
                    )}
                  </span>
                </div>
                <hr className="my-2 border-gray-600/25" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <span className="">Net Profit:</span>
                    <span className="font-bold">${value.profit} M</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span>Total Sales:</span>
                    <span className="font-bold">${value.sales} M</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
}
