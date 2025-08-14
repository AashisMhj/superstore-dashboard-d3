import * as d3 from "d3";

import Card from "../common/Card";
import data from "../../dataset/sales.json";
import { useEffect, useRef, useState } from "react";
import ToolTip from "../common/ToolTip";

export function BarChart({
  data,
  setIsToolTipVisible,
  setToolTipContent,
  setToolTipPosition,
}: {
  data: Array<{ ProductName: string; sold: number }>;
  isToolTipVisible: boolean;
  setIsToolTipVisible: (new_value: boolean) => void;
  toolTipContent: string;
  setToolTipContent: (new_value: string) => void;
  setToolTipPosition: (value: { top: number; left: number }) => void;
}) {
  const height = 500;
  const width = 1400;
  const marginLeft = 40;
  const marginRight = 40;
  const marginBottom = 20;
  const marginTop = 40;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          (d) => -d[0].sold,
          (d) => d.ProductName
        )
      )
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sold) as number])
      .range([height - marginBottom, marginTop]);

    // add x-axis and label
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("transform", "rotate(-65)");

    // y-axis, and remove the domain name
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale).tickFormat((y) => `${(y as number) / 1000}k`))
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Sold Units")
      );

    //   add horizontal lines
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

    // draw bar
    svg
      .append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("class", "fill-blue-600 transition-all hover:fill-blue-700")
      .attr("x", (d) => xScale(d.ProductName) + "")
      .attr("y", (d) => yScale(d.sold))
      .attr("height", (d) => yScale(0) - yScale(d.sold))
      .attr("width", xScale.bandwidth())
      .on(
        "mouseover",
        (evt: MouseEvent, d: { ProductName: string; sold: number }) => {
          setIsToolTipVisible(true);
          setToolTipContent(`
            ${d.ProductName} <br />
            Sold: ${d.sold}`);
          setToolTipPosition({ left: evt.pageX, top: evt.pageY });
        }
      )
      .on("mouseout", function () {
        setIsToolTipVisible(false);
      });
  }, [data, setIsToolTipVisible, setToolTipContent, setToolTipPosition]);
  return (
    <svg
      ref={svgRef} className="w-full h-auto"
      viewBox={`0 0 ${width + marginLeft + marginRight} ${
        height + marginTop + marginBottom
      }`}
    ></svg>
  );
}

export default function SalesBarChart() {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [tooltipContent, setToolTipContent] = useState("");
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  return (
    <Card>
      <ToolTip
        isVisible={isToolTipVisible}
        xPosition={position.left}
        yPosition={position.top}
      >
        <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
      </ToolTip>
      <div className="flex gap-8 flex-col ">
        <h3 className="text-2xl text-secondary-600 font-bold">
          Sales Count of Products
        </h3>
        <BarChart
          data={data}
          isToolTipVisible={isToolTipVisible}
          setIsToolTipVisible={setIsToolTipVisible}
          setToolTipContent={setToolTipContent}
          toolTipContent={tooltipContent}
          setToolTipPosition={setPosition}
        />
      </div>
    </Card>
  );
}
