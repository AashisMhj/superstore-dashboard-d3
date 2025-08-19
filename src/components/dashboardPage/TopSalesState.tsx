import * as d3 from "d3";
import { useEffect, useRef } from "react";
//
import Card from "../common/Card";
import data from "../../dataset/top-states-sales.json";

export default function TopSalesState() {
  const width = 975;
  const height = 610;
  const marginTop = 40;
  const marginRight = 40;
  const marginBottom = 40;
  const marginLeft = 40;
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const dates = new Array(12).fill(0).map((_, i) => {
      return new Date(`2024-${i + 1}-01`);
    });
    const alabamaData = data.Alabama.data;
    const arizonaData = data.Arizona.data;
    const californiaData = data.California.data;
    const newYorkData = data.NewYork.data;
    const texasData = data.Texas.data;
    const allData = [
      ...alabamaData,
      ...arizonaData,
      ...californiaData,
      ...newYorkData,
      ...texasData,
    ];
    const xScale = d3.scaleUtc(d3.extent(dates, (d) => d) as [Date, Date], [
      marginLeft,
      width - marginRight,
    ]);
    const yScale = d3.scaleLinear(
      [(d3.min(allData) || 0) - 10, d3.max(allData)] as [number, number],
      [height - marginBottom, marginTop]
    );

    // horizontal lines
    svg
      .append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(yScale.ticks())
          .join("line")
          .attr("y1", (d) => 0.5 + yScale(d))
          .attr("y2", (d) => 0.5 + yScale(d))
          .attr("x1", marginLeft)
          .attr("x2", width - marginRight)
      );

    const line = d3
      .line<number>()
      .x((_, i) => xScale(dates[i]))
      .y((d) => yScale(d));

    // x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale));

    // y-axis
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale));

    const states = [
      "Alabama",
      "Arizona",
      "California",
      "NewYork",
      "Texas",
    ] as Array<keyof typeof data>;
    const color = d3
      .scaleOrdinal()
      .domain(states)
      .range(["red", "blue", "green", "purple", "orange"]);

    states.forEach((el) => {
      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", color(el) as string)
        .attr("stroke-width", 1.5)
        .attr("d", line(data[el].data));

      svg
        .selectAll(`.circle-${el}`)
        .data(data[el].data)
        .join("circle")
        .attr("cx", (_, i) => xScale(dates[i]))
        .attr("cy", (d) => yScale(d))
        .attr("r", 4)
        .attr("fill", color(el) as string)
        .attr("stroke", "green")
        .attr("stroke-width", 1);

      const lastIndex = data[el].data.length - 1;
      const lastPoint = data[el].data[lastIndex];
      svg
        .append("text")
        .attr("x", xScale(dates[lastIndex]) + 5) // slightly to the right
        .attr("y", yScale(lastPoint))
        .text(el)
        .attr("fill", color(el) as string)
        .attr("font-size", 16)
        .attr("alignment-baseline", "middle");
    });
  }, []);
  return (
    <Card>
      <div className="text-2xl text-secondary-600 font-bold">
        States with Top Sales
      </div>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${width + marginLeft + marginRight} ${
          height + marginTop + marginBottom
        }`}
      ></svg>
    </Card>
  );
}
