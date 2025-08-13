import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import data from "../../dataset/states-sales.json";
import us from "../../dataset/counties-albers-10m.json";
const stateSalesData = data.map((el) => ({
  ...el,
  rate: parseFloat(el.rate),
}));

import Card from "../common/Card";

export default function SalesChoropleth() {
  const height = 400;
  const width = 600;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const color = d3.scaleQuantile([1, 20], d3.schemeReds[9]);
    const path = d3.geoPath();
    const format = (d) => `${d}`;
    const valueMap = new Map(stateSalesData.map((d) => [d.id, d.rate]));
    const countries = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    const stateMap = new Map(states.features.map((d) => [d.id, d]));

    const stateMesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", (d) => color(valueMap.get(d.id)))
      .attr("d", path)
      .append("title")
      .text(
        (d) =>
          `${d.properties.name}, ${
            stateMap.get(d.id.slice(0, 2)).properties.name
          } \n${valueMap.get(d.id)}%`
      );

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  }, []);
  return (
    <Card>
      <h3>Sales Choropleth</h3>
      <svg ref={svgRef} height={height} width={width}></svg>
    </Card>
  );
}
