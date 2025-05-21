"use client";

import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import { FaSearch } from "react-icons/fa";

import "./page.css";

const dropdownSuggestions = [
  {
    id: 1,
    img: "/food1.jpg",
    name: "Sushi Place"
  },
  {
    id: 2,
    img: "/food2.jpg",
    name: "Burger Joint"
  },
  {
    id: 3,
    img: "/food3.jpg",
    name: "Pasta House"
  }
];

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="page-container">
      <div className="header-container">
        <Image
          src="/Home_Food_1.svg"
          alt="Home Food"
          fill
          className="header-image"
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="header-top-shade"></div>
        <div className="header-overlay">
          <span className="header-title">BiteSnap</span>
          <div className="header-search-container">
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                className="header-search"
                placeholder="Things to eat, bars to visit..."
                onFocus={() => setDropdownOpen(true)}
                ref={searchRef}
                autoComplete="off"
              />
              {dropdownOpen && (
                <div className="header-search-dropdown" ref={dropdownRef}>
                  {dropdownSuggestions.map((item) => (
                    <div className="header-search-row" key={item.id}>
                      <Image
                        src={item.img}
                        alt={item.name}
                        className="header-search-food-img"
                        height={10}
                        width={10}
                      />
                      <span className="header-search-restaurant">{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="header-search-divider"></div>
            <input
              type="text"
              className="header-location-search"
              placeholder="City, State"
            />
            <span className="header-search-icon">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};