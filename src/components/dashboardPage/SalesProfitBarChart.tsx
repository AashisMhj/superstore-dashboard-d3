import { useEffect, useRef } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";
import data from "../../dataset/sales-with-profit.json";

export default function SalesProfitBarChart() {
  const height = 300;
  const width = 600;
  const marginTop = 10;
  const marginBottom = 20;
  const marginLeft = 40;
  const marginRight = 10;
  const svgRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const legendSvg = d3.select(legendRef.current);
    svg.selectAll("*").remove();
    legendSvg.selectAll("*").remove();

    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    const stackedData = data.map((d) => ({
      date: d.date,
      profit: d.profit,
      cost: d.sales - d.profit,
      sales: d.sales,
    }));

    const keys = ["cost", "profit"];

    const stackGen = d3
      .stack<{ profit: number; sales: number; date: string; cost: number }>()
      .keys(keys);
    const series = stackGen(stackedData);

    // x-scale
    const xScale = d3
      .scaleBand<string>()
      .domain(stackedData.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d.sales)] as [number, number])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal().domain(keys).range(["#34854f", "#ea730c"]);

    // draw bars
    chartArea
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", (d) => color(d.key) as string)
      .selectAll("react")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => xScale(d.data.date) as number)
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    // x-axis
    chartArea
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3.axisBottom(xScale).tickFormat((d) => {
          const splitDate = d.split("-");
          return ` ${splitDate[0]}-${splitDate[1]}`;
        })
      )
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // y-axis
    chartArea.append("g").call(d3.axisLeft(yScale));

    // legend
    const legend = legendSvg.append("g");

    keys.forEach((key, i) => {
      // legend color
      legend
        .append("rect")
        .attr("x", 10 + i * 120)
        .attr("y", 12)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(key) as string);
      //  legend text
      legend
        .append("text")
        .attr("class", "capitalize")
        .attr("x", 30 + i * 120)
        .attr("y", 27)
        .text(key);
    });
  }, []);
  return (
    <Card>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h3 className="text-2xl text-secondary-600 font-bold">
          Sales With Profit
        </h3>
        <div>
          <svg ref={legendRef} className="h-12" />
        </div>
      </div>
      <svg
        ref={svgRef}
        className="w-full aspect-video"
        viewBox={`0 0 ${width + marginRight + marginLeft} ${
          height + marginTop + marginBottom
        }`}
      ></svg>
    </Card>
  );
}
