import * as d3 from "d3";
import Card from "../common/Card";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Store, User2Icon, Warehouse } from "lucide-react";

function TopCardLineChart({ data, increment }: { data: Array<number>, increment: boolean }) {
  const height = 80;
  const width = 324;
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(()=> {
    if (svgRef.current) {
      const svgElement = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      // .attr('style', 'width: 100%; height: 100%;');
      svgElement.selectAll("*").remove();
      const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);
      const yScale = d3.scaleLinear()
        .domain([d3.min(data) || 0, d3.max(data) || 0])
        .range([height, 0]);

        const area = d3.area<number>()
        .x(d => xScale(d))
        .y0(yScale(0))
        .y1((d, index) => yScale(index));

      const line = d3.line<number>()
        .x((d:number, i:number) => xScale(i))
        .y((d:number) => yScale(d));

        svgElement.append("path")
        .attr('fill', 'none')
        .attr("stroke", increment ? "green" : "red")
        .attr("d", line(data))
    }

  }, [])
  return <svg ref={svgRef} height={height} width={width}></svg>;
}

function TopCard({ title, changeValue, data, icon }: { title: string, changeValue: number, data: Array<number>, icon: ReactNode }) {
  return <Card>
    <div className="flex flex-row items-center gap-2 justify-between pb-8">
      <div className="flex gap-2 items-center">
        <span className="rounded-full bg-gray-200/80 p-2">
        {icon}
        </span>
      <div className="text-2xl font-bold">{title}</div>
      </div>
      <div className="flex">
      <div className="">{changeValue}%</div>
      {changeValue > 0 ? <ArrowUpIcon color="green" /> : <ArrowDownIcon color="red" />}
      </div>
    </div>
    <TopCardLineChart data={data} increment={changeValue > 0} />
  </Card>;
}
export default function TopCardSection() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <TopCard icon={<DollarSign size={16} />} title="Profit" changeValue={-10} data={[50, 60, 55, 65, 70, 64, 76, 67, 50, 48]} />
      <TopCard icon={<Store size={16} />} title="Sales" changeValue={30} data={[104, 115, 110, 112, 134, 145, 147, 149, 150, 153]} />
      <TopCard icon={<User2Icon size={16} />} title="Users" changeValue={-20} data={[100, 110, 107, 94, 92, 94, 98, 103, 99, 94]} />
      <TopCard icon={<Warehouse size={16} />} title="Inventory" changeValue={10} data={[110, 115, 116, 118, 117, 117, 119, 121, 123, 126]} />
    </div>
  );
}
