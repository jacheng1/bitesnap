"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import "./page.css";

const markerData = [
  {
    name: "NEP Cafe - Irvine",
    position: { lat: 33.706209, lng: -117.7856135 },
  },
  {
    name: "Yup Dduk Irvine",
    position: { lat: 33.6492967, lng: -117.8322873 },
  },
  {
    name: "Ever After Team Room & Eatery",
    position: { lat: 33.6637378, lng: -117.8259535 },
  },
  {
    name: "In-N-Out Burger",
    position: { lat: 33.650139, lng: -117.840615 },
  },
  {
    name: "The Chicken Shop",
    position: { lat: 33.63130187988281, lng: -117.90563201904297 },
  },
];

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = { lat: 33.6846, lng: -117.8265 };

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="map-page-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {markerData.map((marker, idx) => (
          <Marker
            key={marker.name}
            position={marker.position}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
}