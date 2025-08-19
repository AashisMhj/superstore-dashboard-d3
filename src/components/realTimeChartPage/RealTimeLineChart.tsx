import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { AggregateStatesSalesType } from "../../types";

const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 20, left: 50 };
const n = 10;

type RealTimeLineChartProps = {
  data: Array<AggregateStatesSalesType>;
};
const RealTimeLineChart = ({ data }: RealTimeLineChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // const data = d3.range(n).map((_, i) => ({ x: i, y: Math.random() * 100 }));

    const allData = data.reduce((prev, cur) => {
      return prev.concat(cur.data);
    }, [] as Array<number>);
    const xScale = d3
      .scaleLinear()
      .domain([0, n - 1])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allData) || 3000])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveBasis);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // x-axis
    const xAxis = d3.axisBottom(xScale).ticks(10);
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);
    const yAxis = d3.axisLeft(yScale);

    // y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    const defs = svg.append("defs");

    data.forEach((el) => {
      const gradientId = `line-gradient-${el.label}`;
      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "100%")
        .attr("y2", "0%");
      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", el.color)
        .attr("stop-opacity", 0);
      gradient
        .append("stop")
        .attr("offset", "20%")
        .attr("stop-color", el.color)
        .attr("stop-opacity", 0.4);
      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", el.color)
        .attr("stop-opacity", 1);

      svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(el.data)
        .attr("fill", "none")
        .attr("stroke", `url(#${gradientId})`)
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    // function tick() {
    //   const lastX = data[data.length - 1].x;
    //   data.push({ x: lastX + 1, y: Math.random() * 100 });

    //   //   update path without re-scaling x domain
    //   path
    //     .datum(data)
    //     .attr("d", line)
    //     .attr("transform", null)
    //     .transition()
    //     .duration(1000)
    //     .ease(d3.easeLinear)
    //     .attr("transform", `translate(${xScale(-1) - xScale(0)}, 0)`)
    //     .on("end", tick);

    //   // update x axis
    //   xScale.domain([data.slice(50)[0].x, data[data.length - 1].x]);
    //   gX.transition().duration(1000).ease(d3.easeLinear).call(xAxis);
    // }

    // tick();
  }, [data]);

  return (
    <svg
      ref={svgRef}
      className="w-full"
      viewBox={`0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`}
    ></svg>
  );
};

export default RealTimeLineChart;
