"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";
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

const friendSuggestions = [
  { id: 1, name: "Gus G.", img: "/Profile_Picture_2.svg", online: true },
  { id: 2, name: "Bob R.", img: "/Profile_Picture_3.svg", online: false },
  { id: 3, name: "Alice T.", img: "/Profile_Picture_4.svg", online: true },
  { id: 4, name: "Sandy L.", img: "/Profile_Picture_5.svg", online: false },
  { id: 5, name: "Mike D.", img: "/Profile_Picture_6.svg", online: true },
];

export default function Review() {
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [uploadedImgs, setUploadedImgs] = useState<string[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
          setUploadedImgs(prev => [...prev, ev.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });

      
      e.target.value = "";
    }
  }

  function handleFriendToggle(id: number) {
    setSelectedFriends(prev =>
      prev.includes(id)
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  }

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
                    BiteSnap&apos;s review guidelines
                </div>
            </div>
            <textarea
                className="review-dropdown-commentbox"
                placeholder="Write your review..."
                rows={4}
            />
            <div className="review-add-pics-label">Add photos</div>
            <div className="review-add-pics-box">
              <label className="review-add-pics-upload">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <span className="review-add-pics-btn">Upload Photo</span>
              </label>
              {uploadedImgs.length > 0 && (
                <div className="review-add-pics-preview" style={{ display: "flex", gap: "1rem" }}>
                  {uploadedImgs.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`Uploaded ${idx + 1}`}
                      width={120}
                      height={120}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="review-tag-friends-label">Tag your friends</div>
            <div className="review-tag-friends-box">
              {friendSuggestions.map(friend => (
                <label key={friend.id} className="review-tag-friend-row">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendToggle(friend.id)}
                  />
                  <Image
                    src={friend.img}
                    alt={friend.name}
                    width={36}
                    height={36}
                    className="review-tag-friend-img"
                  />
                  <div className="review-tag-friend-status-col">
                    <div className="review-tag-friend-status-row">
                    <span
                        className={`review-tag-friend-status-circle ${
                        friend.online ? "online" : "offline"
                        }`}
                    />
                    <span className="review-tag-friend-status-text">
                        {friend.online ? "Online" : "Offline"}
                    </span>
                    </div>
                    <span className="review-tag-friend-name">{friend.name}</span>
                </div>
                </label>
              ))}
            </div>
            
            {/* Add Post Review button here */}
            <Link href="/home">
                <button className="review-post-btn">Post Review</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};