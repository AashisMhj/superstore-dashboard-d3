import { useEffect, useRef } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";
import data from "../../dataset/sales-with-profit.json";

export default function SalesProfitBarChart() {
  const height = 400;
  const width = 400;
  const marginTop = 10;
  const marginBottom = 20;
  const marginLeft = 40;
  const marginRight = 10;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chartArea = svg
      .attr(
        "viewBox",
        `0 0 ${width + marginLeft + marginRight} ${
          height + marginTop + marginBottom
        }`
      )
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
    console.log(series);

    // x-scale
    const xScale = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d.sales)] as [number, number])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal().domain(keys).range(["#1f77b4", "#ff7f0e"]);

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
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // y-axis
    chartArea.append("g").call(d3.axisLeft(yScale));

    // legend
    const legend = chartArea
      .append("g")
      .attr("transform", `translate(${width - 100}, 0)`);

    keys.forEach((key, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(key) as string);

      legend
        .append("text")
        .attr("x", 20)
        .attr("y", i * 20 + 12)
        .text(key);
    });
  }, []);
  return (
    <Card>
      <h3>Sales With Profit</h3>
      <svg ref={svgRef} height={height} width={width}></svg>
    </Card>
  );
}
