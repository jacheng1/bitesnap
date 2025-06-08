"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { IoPeopleSharp } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import {
  FaChevronDown,
  FaFilter,
  FaDollarSign,
  FaClock,
  FaStar,
  FaRegStar,
  FaCircle,
} from "react-icons/fa";

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
  lng: -117.8255179,
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
    link: "/restaurant",
    reviewedBy: [1, 2, 3],
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
    link: "/restaurant",
    reviewedBy: [1, 2],
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
    link: "/restaurant",
    reviewedBy: [1, 2],
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
    link: "/restaurant",
    reviewedBy: [1, 2, 3, 4],
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
    link: "/restaurant-2",
    reviewedBy: [1],
  },
];

const friendProfileImgs = [
  "/Profile_Picture_2.svg",
  "/Profile_Picture_3.svg",
  "/Profile_Picture_4.svg",
  "/Profile_Picture_5.svg",
  "/Profile_Picture_6.svg",
];

const friendList = [
  { id: 1, name: "Gus G.", img: "/Profile_Picture_2.svg" },
  { id: 2, name: "Bob R.", img: "/Profile_Picture_3.svg" },
  { id: 3, name: "Alice T.", img: "/Profile_Picture_4.svg" },
  { id: 4, name: "Sandy L.", img: "/Profile_Picture_5.svg" },
  { id: 5, name: "Mike D.", img: "/Profile_Picture_6.svg" },
];

export default function Map() {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Add a ref to the map instance
  const mapRef = useRef<google.maps.Map | null>(null);

  // Helper to close dropdown when clicking outside
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const priceCapsuleRef = useRef<HTMLDivElement>(null);
  const friendsDropdownRef = useRef<HTMLDivElement>(null);
  const friendsCapsuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node) &&
        priceCapsuleRef.current &&
        !priceCapsuleRef.current.contains(event.target as Node)
      ) {
        setShowPriceDropdown(false);
      }

      if (
        friendsDropdownRef.current &&
        !friendsDropdownRef.current.contains(event.target as Node) &&
        friendsCapsuleRef.current &&
        !friendsCapsuleRef.current.contains(event.target as Node)
      ) {
        setShowFriendsDropdown(false);
      }
    }
    if (showPriceDropdown || showFriendsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPriceDropdown, showFriendsDropdown]);

  const filteredRestaurants =
    selectedFriends.length === 0
      ? restaurantRows
      : restaurantRows.filter((r) =>
          r.reviewedBy.some((fid) => selectedFriends.includes(fid)),
        );

  // Map markerData to filtered restaurants
  const filteredMarkerData = filteredRestaurants.map((r) => {
    // Find marker by restaurant name (assuming order matches)
    return markerData.find((m) => m.name === r.name.replace(/^\d+\.\s/, ""));
  });

  // Handler to store map instance
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
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
          <div
            className="map-sidebar-capsule"
            ref={priceCapsuleRef}
            onClick={() => setShowPriceDropdown((prev) => !prev)}
            style={{ position: "relative" }}
          >
            <FaDollarSign className="map-sidebar-capsule-icon" />
            Price
            <FaChevronDown className="map-sidebar-capsule-chevron" />
            {showPriceDropdown && (
              <div className="map-price-dropdown" ref={priceDropdownRef}>
                <div className="map-price-dropdown-row">
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <span className="map-price-dropdown-label">$1-10</span>
                </div>
                <div className="map-price-dropdown-row">
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <span className="map-price-dropdown-label">$10-50</span>
                </div>
                <div className="map-price-dropdown-row">
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <FaDollarSign className="map-price-dropdown-dollar" />
                  <span className="map-price-dropdown-label">$50-100</span>
                </div>
              </div>
            )}
          </div>
          <div
            className="map-sidebar-capsule"
            ref={friendsCapsuleRef}
            onClick={() => setShowFriendsDropdown((prev) => !prev)}
            style={{ position: "relative" }}
          >
            <IoPeopleSharp className="map-sidebar-capsule-icon" />
            Friends
            <FaChevronDown className="map-sidebar-capsule-chevron" />
            {showFriendsDropdown && (
              <div className="map-friends-dropdown" ref={friendsDropdownRef}>
                {friendList.map((friend) => (
                  <label className="map-friends-dropdown-row" key={friend.id}>
                    <input
                      type="checkbox"
                      checked={selectedFriends.includes(friend.id)}
                      onChange={() => {
                        setSelectedFriends((prev) =>
                          prev.includes(friend.id)
                            ? prev.filter((id) => id !== friend.id)
                            : [...prev, friend.id],
                        );
                      }}
                      style={{ marginRight: 8 }}
                    />
                    <Image
                      src={friend.img}
                      alt={friend.name}
                      className="map-friends-dropdown-img"
                      width={25}
                      height={25}
                    />
                    <span className="map-friends-dropdown-name">
                      {friend.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Restaurant rows */}
        <div className="map-sidebar-list">
          {filteredRestaurants.map((item, idx) => (
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
                <Image
                  src={item.img}
                  alt={item.name}
                  className="map-sidebar-restaurant-img"
                  width={25}
                  height={25}
                />
                <div className="map-sidebar-restaurant-info">
                  <div className="map-sidebar-restaurant-name">
                    <Link
                      href={item.link}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="map-sidebar-restaurant-location">
                    <LuMapPin className="map-sidebar-location-icon" />
                    {item.location}
                  </div>
                  <div className="map-sidebar-restaurant-hours-row">
                    <FaClock className="map-sidebar-hours-icon" />
                    <span className="map-sidebar-hours-text">
                      11:00 AM - 9:00 PM
                    </span>
                  </div>
                  <div className="map-sidebar-restaurant-stars-row">
                    {[...Array(5)].map((_, i) =>
                      i < item.rating ? (
                        <FaStar key={i} className="map-sidebar-star filled" />
                      ) : (
                        <FaRegStar key={i} className="map-sidebar-star" />
                      ),
                    )}
                    <span className="map-sidebar-recommended-text">
                      Reviewed by
                    </span>
                    <span className="map-sidebar-friends-row">
                      {[
                        ...Array(
                          Math.min(
                            item.recommendedBy,
                            friendProfileImgs.length,
                          ),
                        ),
                      ].map((_, i) => (
                        <Image
                          key={i}
                          src={friendProfileImgs[i]}
                          alt="Friend"
                          className="map-sidebar-friend-img"
                          width={25}
                          height={25}
                        />
                      ))}
                    </span>
                  </div>
                  <div className="map-sidebar-restaurant-cost-row">
                    {[...Array(3)].map((_, i) =>
                      i < item.cost ? (
                        <FaDollarSign
                          key={i}
                          className="map-sidebar-dollar filled"
                        />
                      ) : (
                        <FaDollarSign key={i} className="map-sidebar-dollar" />
                      ),
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
        {filteredMarkerData.map(
          (marker, idx) =>
            marker &&
            (() => {
              const restaurant = restaurantRows[idx];
              const markerNumber = idx + 1;
              const svg = `
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <filter id="shadow" x="0" y="0" width="50" height="50">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25" />
              </filter>
              <circle cx="20" cy="20" r="18" fill="#00adb5" stroke="#FFFFFF" stroke-width="3" />
              <text x="20" y="26" text-anchor="middle" font-size="18" font-family="Arial" font-weight="bold" fill="#fff">${markerNumber}</text>
            </svg>
          `;
              return (
                <Marker
                  key={marker.name}
                  position={marker.position}
                  title={marker.name}
                  onMouseOver={() => setHoveredMarker(idx)}
                  onMouseOut={() => setHoveredMarker(null)}
                  icon={{
                    url: "data:image/svg+xml;utf-8," + encodeURIComponent(svg),
                    scaledSize: new window.google.maps.Size(30, 30),
                    labelOrigin: new window.google.maps.Point(20, 20),
                  }}
                >
                  {hoveredMarker === idx && (
                    <InfoWindow
                      position={marker.position}
                      onCloseClick={() => setHoveredMarker(null)}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -5),
                      }}
                    >
                      <div style={{ minWidth: 220, maxWidth: 260 }}>
                        <Image
                          src={restaurant.img}
                          alt={restaurant.name}
                          width={25}
                          height={25}
                          style={{
                            width: "100%",
                            height: 95,
                            objectFit: "cover",
                            borderRadius: 8,
                            marginBottom: 12,
                            background: "#232832",
                          }}
                        />
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            marginBottom: 2,
                            color: "#222831",
                          }}
                        >
                          {restaurant.name}
                        </div>
                        <div
                          style={{
                            color: "#393e46",
                            fontSize: "0.8rem",
                            marginBottom: 12,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LuMapPin style={{ marginRight: 4 }} />
                          {restaurant.location}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {[...Array(5)].map((_, i) =>
                            i < restaurant.rating ? (
                              <FaStar
                                key={i}
                                style={{ color: "#00ADB5", fontSize: "1.1rem" }}
                              />
                            ) : (
                              <FaRegStar
                                key={i}
                                style={{ color: "#00ADB5", fontSize: "1.1rem" }}
                              />
                            ),
                          )}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })(),
        )}
      </GoogleMap>
    </div>
  );
}
