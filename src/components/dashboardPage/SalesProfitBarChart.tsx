import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";
import data from "../../dataset/sales-with-profit.json";
import ToolTip from "../common/ToolTip";

const predictionLineIndex = data.findIndex((el) => el.type === "Predict");

export default function SalesProfitBarChart() {
  const height = 300;
  const width = 600;
  const marginTop = 10;
  const marginBottom = 20;
  const marginLeft = 40;
  const marginRight = 10;
  const svgRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [tooltipContent, setToolTipContent] = useState("");
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const legendSvg = d3.select(legendRef.current);

    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    const stackedData = data.map((d, index) => ({
      id: index,
      date: d.date,
      profit: d.profit,
      cost: d.sales - d.profit,
      sales: d.sales,
      type: d.type,
    }));

    const keys = ["cost", "profit"];

    const stackGen = d3
      .stack<{
        profit: number;
        sales: number;
        date: string;
        cost: number;
        type?: string;
      }>()
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
    // dotted vertical line to separate prediction
    chartArea
      .append("line")
      .attr("x1", (xScale(data[predictionLineIndex].date) as number) - 1)
      .attr("x2", (xScale(data[predictionLineIndex].date) as number) - 1)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "4.4")
      .attr("stroke-width", 2);

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
      .attr("y", yScale(0)) // start from 0
      .attr("height", 0) // start with height 0
      .attr("width", xScale.bandwidth())
      .attr("opacity", (d) => (d.data.type === "Predict" ? 0.7 : 1))
      .on("mousemove", (evt, d) => {
        const data = d.data;
        setIsToolTipVisible(true);
        setPosition({
          left: evt.clientX - 60,
          top: evt.clientY - 120,
        });
        setToolTipContent(`
          <div>Sales: $${data.sales} M </div>
          <hr style="background-color: white;" />
          <div>Profit: $${data.cost}M</div>
          <div>Cost: $${data.profit}M</div>
          `);
      })
      .on("mouseleave", () => {
        setIsToolTipVisible(false);
        setToolTipContent("");
      })
      // Animation transition
      .transition()
      .duration(600) // animation duration in ms
      .delay((_, i) => i * 100) // optional: stagger bars
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]));

    // line generator
    // const line = d3
    //   .line<{ profit: number; sales: number; date: string; cost: number }>()
    //   .x((d) => {
    //     const a = xScale(d.date) || 0;
    //     return a;
    //   })
    //   .y((d) => yScale(d.sales));

    // draw line with animation
    // const chart = svg.append("g").attr("transform", `translate(0,0)`);
    // const grp = chart.append("g").attr("transform", `translate(-0,-0)`);

    // const path = grp
    //   .append("path")
    //   .attr("transform", `translate(0,0)`)
    //   .attr("fill", "none")
    //   .datum(stackedData)
    //   .attr("class", "stroke-blue-600")
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", line);

    // const pathLength = path.node()?.getTotalLength() || 0;
    // const transitionPath = d3.transition().ease(d3.easeSin).duration(2500);

    // path
    //   .attr("stroke-dashoffset", pathLength)
    //   .attr("stroke-dasharray", pathLength)
    //   .transition(transitionPath)
    //   .attr("stroke-dashoffset", 0);

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

    return () => {
      svg.selectAll("*").remove();
      legendSvg.selectAll("*").remove();
    };
  }, []);
  return (
    <>
      <Card>
        <div className="flex justify-between items-center flex-col md:flex-row">
          <h3 className="text-2xl text-secondary-600 font-bold">
            Sales & Profit Bar Chart
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
      <ToolTip
        isVisible={isToolTipVisible}
        xPosition={position.left}
        yPosition={position.top}
      >
        <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
      </ToolTip>
    </>
  );
}
