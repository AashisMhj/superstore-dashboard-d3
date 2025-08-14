import { useEffect, useRef } from "react";
import * as d3 from "d3";
//
import Card from "../common/Card";


const data = [
  {
    item: "Item AA",
    sold: 999,
  },
  {
    item: "Item AB",
    sold: 111,
  },
  {
    item: "Item Ac",
    sold: 888,
  },
  {
    item: "Item AD",
    sold: 1000,
  },
  {
    item: "Item BA",
    sold: 676,
  },
  {
    item: "Item BB",
    sold: 455,
  },
  {
    item: "Item BC",
    sold: 221,
  },
  {
    item: "Item BD",
    sold: 976,
  },
];

export default function BubbleChart() {
  const height = 200;
  const width = 200;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(()=>{
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const root = d3.hierarchy({children: data}).sum(d => d.sold);

    const pack = d3.pack().size([width, height]).padding(5);

    const nodes = pack(root).leaves();

    const color = d3.scaleOrdinal().domain(data.map((_, i) => i.toString())).range(d3.schemeCategory10);

    const nodeGroup = svg.selectAll('g')
    .data(nodes)
    .join('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // circles
    nodeGroup.append('circle')
    .attr('r', d => d.r)
    .attr('fill', (_, i) => color(i.toString()) as string)
    .attr('opacity', 0.8);


    // item labels
    nodeGroup.append('text')
    .text(d => d.data.item)
    .attr('text-anchor', 'middle')
    .attr('dy', "0.3em")
    .style('fill', 'white')
    .style('font-size', d => `${Math.min(12, d.r/3)}px`);

    // sold values
    nodeGroup.append('text')
    .text(d => d.data.sold)
    .attr('text-anchor', 'middle')
    .attr('dy', '1.4em')
    .style('fill', 'white')
    .style('font-size', d => `${Math.min(10, d.r / 4)}px`)

  })
 

  return (
    <Card>
      <h3 className="text-2xl text-secondary-600 font-bold">Top Selling Products</h3>
      <svg ref={svgRef} className="aspect-square" viewBox={`0 0 ${width} ${height}`}></svg>
    </Card>
  );
}
