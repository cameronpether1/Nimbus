"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FtZXJvbnBldGhlciIsImEiOiJjbTFoenR1aDcwNjV1MnJxdTllaWhmbzc1In0.RmymcWzQ-VEtxb6cVLCX5Q";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-1.331406, 52.828802],
      zoom: 11,
      interactive: false,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      style={{ height: "150px", width: "100%", marginTop: "1.5rem" }}
      className="rounded-md"
    ></div>
  );
};

export default MapboxExample;
