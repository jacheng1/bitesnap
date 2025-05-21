"use client";

import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import { FaSearch, FaRegBell } from "react-icons/fa";

import "./page.css";

const images = [
  { src: "/Home_Food_1.svg", alt: "Home Food 1" },
  { src: "/Home_Food_2.svg", alt: "Home Food 2" },
  { src: "/Home_Food_3.svg", alt: "Home Food 3" },
];

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

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [next, setNext] = useState(null);

  const handleCircleClick = (idx) => {
    if (idx === current || animating) return;
    setNext(idx);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
      setNext(null);
    }, 700);
  };

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
        <div className="header-image-slider-container">
          {/* Current image */}
          <Image
            className={
              "header-image-slide prev" +
              (animating && next !== null ? " slide-out" : " slide-in")
            }
            src={images[current].src}
            alt={images[current].alt}
            style={{ zIndex: 1 }}
            width={100} 
            height={100}
          />
          {/* Next image (only during animation) */}
          {animating && next !== null && (
            <Image
              className="header-image-slide next slide-in"
              src={images[next].src}
              alt={images[next].alt}
              style={{ zIndex: 2 }}
              width={100} 
              height={100}
            />
          )}

          {/* Circle buttons */}
          <div className="header-image-circles">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={
                  "header-image-circle-btn" + (current === idx ? " active" : "")
                }
                onClick={() => handleCircleClick(idx)}
                aria-label={`Show ${img.alt}`}
                type="button"
              />
            ))}
          </div>
        </div>
        <div className="header-top-shade"></div>
        <div className="header-overlay">
          <span className="header-title">BiteSnap</span>

          <div className="header-search-container">
            {/* Restaurant name searchbar */}
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

            {/* Searchbar divider */}
            <div className="header-search-divider"></div>

            {/* Location searchbar */}
            <input
              type="text"
              className="header-location-search"
              placeholder="City, State"
            />

            {/* Search icon */}
            <span className="header-search-icon">
              <FaSearch />
            </span>
          </div>
          {/* Find a Restaurant button */}
          <button className="header-action-btn find-restaurant-btn">
            Find a Restaurant
          </button>

          {/* Write a Review button */}
          <button className="header-action-btn write-review-btn">
            Write a Review
          </button>

          {/* Notifications button */}
          <button className="header-action-btn bell-btn" aria-label="Notifications">
            <FaRegBell size={25} />
          </button>

          {/* Profile button */}
          <button className="profile-btn">
            <Image src="Profile_Picture.svg" alt="Profile" height={50} width={50} />
          </button>
        </div>
      </div>
    </div>
  );
};