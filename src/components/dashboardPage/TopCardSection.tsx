import * as d3 from "d3";
import { useEffect, useRef, type ReactNode } from "react";
import {
  DollarSign,
  Store,
  User2Icon,
  Warehouse,
} from "lucide-react";
import clsx from "clsx";
//
import Card from "../common/Card";

const iconSize = 14;

function TopCardLineChart({
  data,
  increment,
}: {
  data: Array<number>;
  increment: boolean;
}) {
  const height = 80;
  const width = 324;
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove();
    // x scale
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    // y-scale
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data) || 0, d3.max(data) || 0])
      .nice()
      .range([height, 0]);

    // area generator
    const area = d3
      .area<number>()
      .x((_, i) => xScale(i))
      .y0(yScale(0))
      .y1((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    // line generator
    const line = d3
      .line<number>()
      .x((_: number, i: number) => xScale(i))
      .y((d: number) => yScale(d))
      .curve(d3.curveMonotoneX);

    // draw area
    svgElement
      .append("path")
      .datum(data)
      .attr('class', increment ? "fill-green-600/30" : "fill-red-600/30")
      .attr("d", area);
    // draw path
    svgElement
      .append("path")
      .attr('class', `fill-none ${increment ? "stroke-green-600" : "stroke-red-600"}`)
      .attr("d", line(data));

  }, [data, increment]);
  return (
    <svg
      ref={svgRef}
      className="w-full"
      viewBox={`0 0 ${width} ${height}`}
    ></svg>
  );
}

function TopCard({
  title,
  changeValue,
  data,
  icon,
}: {
  title: string;
  changeValue: number;
  data: Array<number>;
  icon: ReactNode;
}) {
  return (
    <Card
      extraClassNames={
        changeValue > 0 ? "border border-green-600" : "border border-red-600"
      }
    >
      <div className="flex flex-row items-center gap-2 justify-between pb-8 ">
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-gray-200/80 p-2">{icon}</span>
          <div className="text-lg md:text-xl font-bold">{title}</div>
        </div>
        <div className="flex">
          <div
            className={clsx("text-xl", {
              "text-green-600": changeValue > 0,
              "text-red-600": !(changeValue > 0),
            })}
          >
            {changeValue}%
          </div>
        </div>
      </div>
      <TopCardLineChart data={data} increment={changeValue > 0} />
    </Card>
  );
}
export default function TopCardSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <TopCard
        icon={<DollarSign size={iconSize} />}
        title="Profit"
        changeValue={-10}
        data={[50, 60, 55, 65, 70, 64, 76, 67, 50, 48]}
      />
      <TopCard
        icon={<Store size={iconSize} />}
        title="Sales"
        changeValue={30}
        data={[104, 115, 110, 112, 134, 145, 147, 149, 150, 153]}
      />
      <TopCard
        icon={<User2Icon size={iconSize} />}
        title="Users"
        changeValue={-20}
        data={[100, 110, 107, 94, 92, 94, 98, 103, 99, 94]}
      />
      <TopCard
        icon={<Warehouse size={iconSize} />}
        title="Inventory"
        changeValue={10}
        data={[110, 115, 116, 118, 117, 117, 119, 121, 123, 126]}
      />
    </div>
  );
}
