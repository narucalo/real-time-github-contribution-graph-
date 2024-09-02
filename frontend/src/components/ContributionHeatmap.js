import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getColorForType } from '../utils/colorMapping';

const ContributionHeatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 50 };

    // Remove any previous SVG
    d3.select(svgRef.current).selectAll('*').remove();

    // Create an SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the data
    const parseDate = d3.timeParse('%Y-%m-%d');
    const formattedData = data.map(d => ({
      ...d,
      date: parseDate(d.date),
      total: d.commits + d.pullRequests + d.issues + d.codeReviews,
    }));

    // Set up scales
    const x = d3.scaleTime()
      .domain(d3.extent(formattedData, d => d.date))
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(['commits', 'pullRequests', 'issues', 'codeReviews'])
      .range([height, 0])
      .padding(0.1);

    // Draw the heatmap rectangles
    svg.selectAll('.rect')
      .data(formattedData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.date))
      .attr('y', d => y('commits')) // You can modify this to y(d.type) if 'type' is part of the data
      .attr('width', width / formattedData.length - 1)
      .attr('height', y.bandwidth())
      .attr('fill', d => getColorForType('commits')); // Use getColorForType here

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef} />
  );
};

export default ContributionHeatmap;
