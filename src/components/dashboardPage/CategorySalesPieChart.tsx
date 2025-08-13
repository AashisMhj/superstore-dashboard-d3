import { useEffect, useRef } from "react";
import * as d3 from "d3";

import Card from "../common/Card";

const dataset1 = [
  {
    label: "Kentucky",
    value: 20,
  },
  { label: "Texas", value: 11 },
  { label: "New York", value: 28 },
  { label: "Alabama", value: 23 },
  { label: "California", value: 24 },
  { label: "Other", value: 14 },
];
const dataset2 = [
  [
    { label: "Henderson", value: 6 },
    { label: "Richmond", value: 10 },
    { label: "Louisville", value: 4 },
  ],
  [
    { label: "Arlington", value: 13 },
    { label: "Dallas", value: 12 },
    { label: "Tyler", value: 35 },
    { label: "Austin", value: 55 },
  ],
  [
    { label: "New York City", value: 55 },
    { label: "Mount Vernon", value: 45 },
    { label: "Oceanside", value: 20 },
  ],
  [
    { label: "Florence", value: 45 },
    { label: "Mobile", value: 35 },
    { label: "Montgomery", value: 10 },
  ],
  [
    { label: "Log Angeles", value: 60 },
    { label: "San Francisco", value: 30 },
    { label: "Lancaster", value: 10 },
    { label: "Lake Elsinore", value: 10 },
  ],
  [{ label: "Other", value: 80 }],
];

export default function CategorySalesPieChart() {
  const height = 390;
  const width = 399;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const radius = Math.min(width, height) / 2;
    const innerArc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.67);
    const pie = d3
      .pie<{ label: string; value: number }>()
      .padAngle(3 / radius)
      .sort(null)
      .value((d) => d.value);

    const innerColor = d3
      .scaleOrdinal()
      .domain(dataset1.map((el) => el.label))
      .range(
        d3
          .quantize(
            (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
            dataset1.length
          )
          .reverse()
      );

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-width / 1, -height / 2, width, height])
      .attr("style", "max-width:100%; height: auto;");

    // inner chart
    svg
      .append("g")
      .selectAll()
      .data(pie(dataset1))
      .join("path")
      .attr("fill", (d) => innerColor(d.data.label) as string)
      .attr("d", innerArc)
      .append("title")
      .text((d, index) => {
        // TODO: separate this to another function
        // for outer donut
        // outer pie
        const outerPie = d3
          .pie<{ value: number; label: string }>()
          .padAngle(3 / radius)
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)
          .sort(null)
          .value((d) => d.value);

        // outer arc
        const outerArc = d3
          .arc<d3.PieArcDatum<{ value: number; label: string }>>()
          .innerRadius(radius * 0.7)
          .outerRadius(radius - 1);

        const baseColor = innerColor(d.data.label) as string;

        // generate N variants by interpolating towards black or a darker version of vase
        const numVariants = dataset2[index].length;
        const colorVariants = d3.quantize(
          (t) =>
            d3.interpolateRgb(
              baseColor,
              d3.color(baseColor)?.brighter(0.6) || "rgb(0,0,0)"
            )(t),
          numVariants
        );

        const outerColor = d3
          .scaleOrdinal()
          .domain(dataset2[index].map((d) => d.label))
          .range(colorVariants);

        svg
          .append("g")
          .selectAll()
          .data(outerPie(dataset2[index]))
          .join("path")
          .attr("fill", (d) => outerColor(d.data.label) as string)
          .attr("d", outerArc)
          .append("title")
          .text((d) => `d${d.data.label}:${d.data.value}%`);

        svg
          .append("g")
          .attr("text-anchor", "middle")
          .selectAll()
          .data(outerPie(dataset2[index]))
          .join("text")
          .attr("transform", (d) => `translate(${outerArc.centroid(d)})`)
          .call((text) =>
            text
              .append("tspan")
              .attr("t", "-0.4em")
              .text((d) => d.data.label)
          );

        return `${d.data.label}:${d.data.value}%`;
      });
    // inner chart text
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(dataset1))
      .join("text")
      .attr("transform", (d) => `translate(${innerArc.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .text((d) => d.data.label)
      );
  }, []);

  return (
    <Card>
      <h3>Top Sales</h3>
      <svg ref={svgRef} height={height} width={width}></svg>
    </Card>
  );
}
