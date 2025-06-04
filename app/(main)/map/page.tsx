"use client";

import { useState, useRef } from "react";

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

import { IoPeopleSharp } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaChevronDown, FaFilter, FaDollarSign, FaClock, FaStar, FaRegStar, FaCircle } from "react-icons/fa";

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
    name: "Ever After Tea Room & Eatery",
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
    name: "1. NEP Cafe - Irvine",
    location: "14346 Culver Dr, Irvine, CA",
    rating: 4,
    recommendedBy: 3,
    cost: 3,
    capsules: ["Vietnamese", "Cafe"],
  },
  {
    id: 2,
    img: "/Food_Card_Picture_2.svg",
    name: "2. Yup Dduk Irvine",
    location: "4515a Campus Dr, Irvine, CA",
    rating: 4,
    recommendedBy: 2,
    cost: 1,
    capsules: ["Korean", "Chicken"],
  },
  {
    id: 3,
    img: "/Food_Card_Picture_3.svg",
    name: "3. Ever After Tea Room & Eatery",
    location: "18090 Culver Dr, Irvine, CA",
    rating: 4,
    recommendedBy: 2,
    cost: 2,
    capsules: ["Taiwanese", "Dessert", "Cafe"],
  },
  {
    id: 4,
    img: "/Food_Card_Picture_4.svg",
    name: "4. In-N-Out Burger",
    location: "4115 Campus Dr, Irvine, CA",
    rating: 5,
    recommendedBy: 4,
    cost: 1,
    capsules: ["Burger"],
  },
  {
    id: 5,
    img: "/Food_Card_Picture_5.svg",
    name: "5. The Chicken Shop",
    location: "1120 Irvine Ave, Newport Beach, CA",
    rating: 4,
    recommendedBy: 1,
    cost: 2,
    capsules: ["Lebanese", "Australian", "Chicken"],
  },
];

const friendProfileImgs = [
  "/Profile_Picture_2.svg",
  "/Profile_Picture_3.svg",
  "/Profile_Picture_4.svg",
  "/Profile_Picture_5.svg",
  "/Profile_Picture_6.svg",
];

export default function Map() {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Add a ref to the map instance
  const mapRef = useRef<google.maps.Map | null>(null);

  // Handler to store map instance
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    );
  }

  // Helper to get marker position by restaurant index
  const getMarkerPosition = (idx: number) => markerData[idx].position;

  return (
    <div className="map-page-container">

      {/* Sidebar */}
      <div className="map-sidebar">
        {/* Results text */}
        <div className="map-sidebar-header">5 results near Irvine, CA</div>

        {/* Horizontal line */}
        <div className="map-sidebar-divider"></div>

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
            <IoPeopleSharp className="map-sidebar-capsule-icon" />
            Friends
            <FaChevronDown className="map-sidebar-capsule-chevron" />
          </div>
        </div>

        {/* Restaurant rows */}
        <div className="map-sidebar-list">
          {restaurantRows.map((item, idx) => (
            <div key={item.id}>
              <div 
                className="map-sidebar-restaurant-row"
                onClick={() => {
                  const pos = getMarkerPosition(idx);
                  if (mapRef.current && pos) {
                    mapRef.current.panTo(pos);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={item.img} alt={item.name} className="map-sidebar-restaurant-img" />
                <div className="map-sidebar-restaurant-info">
                  <div className="map-sidebar-restaurant-name">{item.name}</div>
                  <div className="map-sidebar-restaurant-location">
                    <LuMapPin className="map-sidebar-location-icon" />
                    {item.location}
                  </div>
                  <div className="map-sidebar-restaurant-hours-row">
                  <FaClock className="map-sidebar-hours-icon" />
                  <span className="map-sidebar-hours-text">11:00 AM - 9:00 PM</span>
                </div>
                  <div className="map-sidebar-restaurant-stars-row">
                    {[...Array(5)].map((_, i) =>
                      i < item.rating ? (
                        <FaStar key={i} className="map-sidebar-star filled" />
                      ) : (
                        <FaRegStar key={i} className="map-sidebar-star" />
                      )
                    )}
                    <span className="map-sidebar-recommended-text">
                      Reviewed by
                    </span>
                    <span className="map-sidebar-friends-row">
                      {[...Array(Math.min(item.recommendedBy, friendProfileImgs.length))].map((_, i) => (
                        <img
                          key={i}
                          src={friendProfileImgs[i]}
                          alt="Friend"
                          className="map-sidebar-friend-img"
                        />
                      ))}
                    </span>
                  </div>
                  <div className="map-sidebar-restaurant-cost-row">
                    {[...Array(3)].map((_, i) =>
                      i < item.cost ? (
                        <FaDollarSign key={i} className="map-sidebar-dollar filled" />
                      ) : (
                        <FaDollarSign key={i} className="map-sidebar-dollar" />
                      )
                    )}
                    <FaCircle className="map-sidebar-cost-period" />
                    <span className="map-sidebar-cost-text">
                      {item.cost === 1 && "$1-10"}
                      {item.cost === 2 && "$10-50"}
                      {item.cost === 3 && "$50-100"}
                    </span>
                  </div>
                  <div className="map-sidebar-restaurant-capsules-row">
                    {item.capsules.map((text, i) => (
                      <span key={i} className="map-sidebar-restaurant-capsule">
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {idx < restaurantRows.length - 1 && (
                <div className="map-sidebar-restaurant-divider" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ streetViewControl: false, mapTypeControl: false }}
        onLoad={onLoad}
      >
        {markerData.map((marker, idx) => {
          const restaurant = restaurantRows[idx];
          return (
            <Marker
              key={marker.name}
              position={marker.position}
              title={marker.name}
              onMouseOver={() => setHoveredMarker(idx)}
              onMouseOut={() => setHoveredMarker(null)}
            >
              {hoveredMarker === idx && (
                <InfoWindow
                  position={marker.position}
                  onCloseClick={() => setHoveredMarker(null)}
                  options={{ pixelOffset: new window.google.maps.Size(0, -5) }}
                >
                  <div 
                    style={{ minWidth: 220, maxWidth: 260 }}>
                    <img
                      src={restaurant.img}
                      alt={restaurant.name}
                      style={{
                        width: "100%",
                        height: 95,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 12,
                        background: "#232832"
                      }}
                    />
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 2, color: "#222831" }}>
                      {restaurant.name}
                    </div>
                    <div style={{ color: "#393e46", fontSize: "0.8rem", marginBottom: 12, display: "flex", alignItems: "center" }}>
                      <LuMapPin style={{ marginRight: 4 }} />
                      {restaurant.location}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {[...Array(5)].map((_, i) =>
                        i < restaurant.rating ? (
                          <FaStar key={i} style={{ color: "#00ADB5", fontSize: "1.1rem" }} />
                        ) : (
                          <FaRegStar key={i} style={{ color: "#00ADB5", fontSize: "1.1rem" }} />
                        )
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  );
};