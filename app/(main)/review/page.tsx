"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";

import { FaSearch, FaStar, FaRegStar } from "react-icons/fa";

import "./page.css";

const dropdownSuggestions = [
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
    name: "Ever After Tea Room & Eatery",
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

export default function Review() {
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const restaurantRef = useRef<HTMLInputElement>(null);
  const restaurantDropdownRef = useRef<HTMLDivElement>(null);

  // Close restaurant dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        restaurantRef.current &&
        !restaurantRef.current.contains(event.target as Node) &&
        restaurantDropdownRef.current &&
        !restaurantDropdownRef.current.contains(event.target as Node)
      ) {
        setRestaurantDropdownOpen(false);
      }
    }
    if (restaurantDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [restaurantDropdownOpen]);

  return (
    <div className="review-dropdown-container">
      <label className="review-dropdown-label" htmlFor="restaurant-search">
        Where did you eat?
      </label>
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <input
          id="restaurant-search"
          type="text"
          className="review-searchbar"
          placeholder="Burger, wine bar, dessert cafe"
          value={restaurantInput}
          onFocus={() => setRestaurantDropdownOpen(true)}
          onChange={e => {
            setRestaurantInput(e.target.value);
            setRestaurantDropdownOpen(true);
          }}
          ref={restaurantRef}
          autoComplete="off"
        />
        <span className="review-searchbar-icon">
          <FaSearch />
        </span>
        {restaurantDropdownOpen && (
          <div className="review-search-dropdown" ref={restaurantDropdownRef}>
            {dropdownSuggestions
              .filter(item =>
                item.name.toLowerCase().includes(restaurantInput.toLowerCase())
              )
              .map(item => (
                <div
                  className="review-search-row"
                  key={item.id}
                  onClick={() => {
                    setRestaurantInput(item.name);
                    setSelectedRestaurant(item.id);
                    setRestaurantDropdownOpen(false);
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="review-search-food-img"
                    height={24}
                    width={24}
                  />
                  <div className="review-search-info">
                    <span className="review-search-restaurant">{item.name}</span>
                    <span className="review-search-restaurant-location">
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {selectedRestaurant && (
        <div className="review-dropdown-selected">
          <div>
            <div className="review-dropdown-selected-name">
              {dropdownSuggestions[selectedRestaurant - 1].name}
            </div>
            <div className="review-dropdown-stars">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= selectedRating ? (
                  <FaStar
                    key={star}
                    className="review-dropdown-star"
                    onClick={() => setSelectedRating(star)}
                    tabIndex={0}
                    aria-label={`Set rating to ${star}`}
                  />
                ) : (
                  <FaRegStar
                    key={star}
                    className="review-dropdown-star"
                    onClick={() => setSelectedRating(star)}
                    tabIndex={0}
                    aria-label={`Set rating to ${star}`}
                  />
                )
              )}
                <div className="review-dropdown-text">
                    {selectedRating === 0 && "Select your rating"}
                    {selectedRating === 1 && "Not great"}
                    {selectedRating === 2 && "Could've been better"}
                    {selectedRating === 3 && "Average"}
                    {selectedRating === 4 && "Great!"}
                    {selectedRating === 5 && "Must-try!"}
                </div>
                <div className="review-guidelines-text">
                    Read our review guidelines
                </div>
            </div>
            <textarea
                className="review-dropdown-commentbox"
                placeholder="Write your review..."
                rows={4}
            />
          </div>
        </div>
      )}
    </div>
  );
};