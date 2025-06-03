"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { FaChevronDown, FaFilter, FaDollarSign, FaUtensils } from "react-icons/fa";

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

const center = { 
  lat: 33.6448989, 
  lng: -117.8255179
};

const restaurantRows = [
  {
    id: 1,
    img: "/Food_Card_Picture_1.svg",
    name: "NEP Cafe - Irvine",
    location: "14346 Culver Dr, Irvine, CA",
  },
  {
    id: 2,
    img: "/Food_Card_Picture_2.svg",
    name: "Yup Dduk Irvine",
    location: "4515a Campus Dr, Irvine, CA",
  },
  {
    id: 3,
    img: "/Food_Card_Picture_3.svg",
    name: "Ever After Team Room & Eatery",
    location: "18090 Culver Dr, Irvine, CA",
  },
  {
    id: 4,
    img: "/Food_Card_Picture_4.svg",
    name: "In-N-Out Burger",
    location: "4115 Campus Dr, Irvine, CA",
  },
  {
    id: 5,
    img: "/Food_Card_Picture_5.svg",
    name: "The Chicken Shop",
    location: "1120 Irvine Ave, Newport Beach, CA",
  },
];

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

      {/* Sidebar */}
      <div className="map-sidebar">
        {/* Results text */}
        <div className="map-sidebar-header">5 results near Irvine, CA</div>

        {/* Horizontal line */}
        <div className="map-sidebar-divider" />

        {/* Filter row */}
        <div className="map-sidebar-capsules-row">
          <div className="map-sidebar-capsule">
            <FaFilter className="map-sidebar-capsule-icon" />
            Filters
            <FaChevronDown className="map-sidebar-capsule-chevron" />
          </div>
          <div className="map-sidebar-capsule">
            <FaDollarSign className="map-sidebar-capsule-icon" />
            Price
            <FaChevronDown className="map-sidebar-capsule-chevron" />
          </div>
          <div className="map-sidebar-capsule">
            <FaUtensils className="map-sidebar-capsule-icon" />
            Cuisine
            <FaChevronDown className="map-sidebar-capsule-chevron" />
          </div>
        </div>

        {/* Restaurant rows */}
        <div className="map-sidebar-list">
          {restaurantRows.map((item, idx) => (
            <div key={item.id}>
              <div className="map-sidebar-restaurant-row">
                <img src={item.img} alt={item.name} className="map-sidebar-restaurant-img" />
                <div className="map-sidebar-restaurant-info">
                  <div className="map-sidebar-restaurant-name">{item.name}</div>
                  <div className="map-sidebar-restaurant-location">{item.location}</div>
                </div>
              </div>
              {idx < restaurantRows.length - 1 && (
                <div className="map-sidebar-restaurant-divider" />
              )}
            </div>
          ))}
        </div>
      </div>

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