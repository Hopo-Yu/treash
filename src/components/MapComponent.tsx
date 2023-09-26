import React, { useEffect } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import geojsonData from '../assets/world-110m.geojson';


const MapComponent: React.FC = () => {

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    // Your D3 map initialization logic here
    const width = 960;
    const height = 660;

    const svg = select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2 + 140]);

    const path = geoPath()
      .projection(projection);

      svg.append("path")
        .attr("d", path(geojsonData));
      
  };

  return (
    <div id="map" style={{ width: '100%', height: '100%' }}></div>
  );
};

export default MapComponent;
