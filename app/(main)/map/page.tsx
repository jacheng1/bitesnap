"use client";

import { useEffect, useRef } from "react";
import "./page.css";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      if (!window.google) {
        const script = document.createElement("script");

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          new window.google.maps.Map(mapRef.current, {
            center: { lat: 33.6846, lng: -117.8265 },
            zoom: 12,
          });
        };
        document.body.appendChild(script);
      } else {
        // @ts-ignore
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 33.6846, lng: -117.8265 },
          zoom: 12,
        });
      }
    }
  }, []);

  return (
    <div className="map-page-container">
      <div
        ref={mapRef}
        className="google-map-full"
      />
    </div>
  );
}