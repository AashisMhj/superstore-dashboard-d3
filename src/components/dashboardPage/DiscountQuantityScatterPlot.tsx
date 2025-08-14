import { useEffect, useRef } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";

const sampleData = [
  { sales: 200, discount: 5 },
  { sales: 400, discount: 10 },
  { sales: 350, discount: 8 },
  { sales: 100, discount: 2 },
  { sales: 600, discount: 15 },
  { sales: 150, discount: 4 },
];

export default function DiscountQuantityScatterPlot() {
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampleData, (d) => d.sales) ?? 0])
      .nice()
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampleData, (d) => d.discount) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // points
    svg
      .append("g")
      .selectAll("circle")
      .data(sampleData)
      .join("circle")
      .attr("cx", (d) => xScale(d.sales))
      .attr("cy", (d) => yScale(d.discount))
      .attr("r", 5)
      .attr("fill", "#1f77b4")
      .attr("opacity", 0.7);

    //   axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Sales");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Discount");
  }, [margin.bottom, margin.top, margin.right, margin.left]);
  return (
    <Card>
      <h3 className="text-secondary-600 font-bold  text-xl md:text-2xl">
        Sales vs Discount
      </h3>
      <svg
        ref={svgRef}
        className="h-auto w-full"
        viewBox={`0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`}
      />
    </Card>
  );
}
