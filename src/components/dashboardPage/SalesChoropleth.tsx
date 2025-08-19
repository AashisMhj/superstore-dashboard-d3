import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as topojson from "topojson-client";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
//
import data from "../../dataset/states-sales.json";
import us from "../../dataset/counties-albers-10m.json";

const stateSalesData = data.map((el) => ({
  ...el,
  rate: parseFloat(el.rate),
}));

import Card from "../common/Card";

export default function SalesChoropleth() {
  const height = 610;
  const width = 975;
  const legendWidth = 300;
  const legendHeight = 10;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const color = d3.scaleQuantile([1, 20], d3.schemeGreens[9]);
    const path = d3.geoPath();
    const valueMap = new Map(stateSalesData.map((d) => [d.id, d.rate]));
    const states = topojson.feature(
      us as any,
      (us as any).objects.states
    ) as unknown as GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      { name: string }
    >;
    const stateMap = new Map(states.features.map((d) => [d.id, d]));

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, 975 + 80, 610 + 80])
      .attr("style", "max-width: 100%; height: auto;");

    // legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - legendWidth}, 0)`);

    const thresholds = color.quantiles();
    const domain = color.domain();
    const range = color.range();

    const xLegend = d3.scaleLinear().domain(domain).range([0, legendWidth]);

    legend
      .selectAll("rect")
      .data(range)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * (legendWidth / range.length))
      .attr("y", 0)
      .attr("width", legendWidth / range.length)
      .attr("height", legendHeight)
      .attr("fill", (d) => d);

    legend
      .append("g")
      .attr("transform", `translate(0, ${legendHeight})`)
      .call(
        d3
          .axisBottom(xLegend)
          .tickSize(6)
          .tickValues([domain[0], ...thresholds, domain[1]])
      );

    svg
      .append("g")
      .selectAll("path")
      .data(
        (
          topojson.feature(
            us as any,
            (us as any).objects.counties
          ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>
        ).features
      )
      .join("path")
      .attr("fill", (d: any) => color(valueMap.get(d.id) || 0))
      .attr("d", path as any)
      .append("title")
      .text((d: any) => {
        const state = stateMap.get((d.id as string).slice(0, 2));
        return `${d.properties.name}, ${
          state?.properties?.name ?? ""
        } \n${valueMap.get(d.id)}%`;
      });

    svg
      .append("path")
      .datum(
        topojson.mesh(us as any, (us as any).objects.states, (a, b) => a !== b)
      )
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  }, []);
  return (
    <Card>
      <div>
        <h3 className="text-2xl text-secondary-600 font-bold">
          Sales Across States
        </h3>
      </div>
      <svg
        ref={svgRef}
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
      ></svg>
    </Card>
  );
}
