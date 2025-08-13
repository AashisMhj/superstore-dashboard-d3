import { useEffect, useRef } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";

const data = [
  {
    group: "A",
    item: "Item AA",
    sold: 999,
  },
  {
    group: "A",
    item: "Item AB",
    sold: 111,
  },
  {
    group: "A",
    item: "Item Ac",
    sold: 888,
  },
  {
    group: "A",
    item: "Item AD",
    sold: 1000,
  },
  {
    group: "B",
    item: "Item BA",
    sold: 676,
  },
  {
    group: "B",
    item: "Item BB",
    sold: 455,
  },
  {
    group: "B",
    item: "Item BC",
    sold: 221,
  },
  {
    group: "B",
    item: "Item BD",
    sold: 976,
  },

];

export default function BubbleChart() {
  const height = 600;
  const width = 600;
  const svgRef = useRef<SVGSVGElement>(null);
  const margin = 1;
  useEffect(() => {
    const format = d3.format(",d");

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

    const root = pack(d3.hierarchy({children: data}).sum(d => d.value))

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .attr("text-anchor", "middle");

    const node = svg.append("g").selectAll().data();
  });

  return (
    <Card>
      <h3>Top Selling Products</h3>
      <svg></svg>
    </Card>
  );
}
