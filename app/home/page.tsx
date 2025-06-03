"use client";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { LuMapPin } from "react-icons/lu";
import { FaSearch, FaRegBell, FaUser, FaUserFriends, FaCog, FaEnvelope, FaSignOutAlt, FaStar, FaRegStar, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { MdChatBubbleOutline } from "react-icons/md";

import "./page.css";

const images = [
  { 
    src: "/Home_Picture_1.svg", 
    alt: "Home Food 1", 
    caption: "Urban Plates", 
    location: "Irvine, CA", 
    link: "https://urbanplates.com/" 
  },
  { 
    src: "/Home_Picture_2.svg", 
    alt: "Home Food 2", 
    caption: "SUP Noodle Bar", 
    location: "Buena Park, CA", 
    link: "https://www.supnoodlebar.com/" 
  },
  { 
    src: "/Home_Picture_3.svg", 
    alt: "Home Food 3", 
    caption: "Menya Hanabi - The Original Nagoya Mazesoba", 
    location: "Los Angeles, CA", 
    link: "https://menyahanabiusa.com/" 
  },
];

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
    name: "Ever After Team Room & Eatery",
    location: "18090 Culver Dr, Irvine, CA",
  },
  {
    id: 4,
    img: "/Food_Card_Picture_4.svg",
    name: "In-N-Out",
    location: "4115 Campus Dr, Irvine, CA",
  },
  {
    id: 5,
    img: "/Food_Card_Picture_5.svg",
    name: "The Chicken Shop",
    location: "1120 Irvine Ave, Newport Beach, CA",
  },
];

const locationSuggestions = [
  { 
    id: 1, 
    name: "Current Location" 
  }
];

function FoodRatingWithThumbs(){
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  return (
    <>
      <span className="for-you-food-thumbs">
        {thumbUp ? (
          <FaThumbsUp
            className="for-you-food-thumb"
            style={{ cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); e.preventDefault(); setThumbUp(false); }}
          />
        ) : (
          <FaRegThumbsUp
            className="for-you-food-thumb"
            style={{ cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); setThumbUp(true); }}
          />
        )}
        <span style={{ display: "inline-block", width: "1.2rem" }}></span>
        {thumbDown ? (
          <FaThumbsDown
            className="for-you-food-thumb"
            style={{ cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); setThumbDown(false); }}
          />
        ) : (
          <FaRegThumbsDown
            className="for-you-food-thumb"
            style={{ cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); setThumbDown(true); }}
          />
        )}
      </span>
    </>
  );
};

function CardUserBox({ img, name, text }: { img: string; name: string; text: string }) {
  return (
    <div className="for-you-user-box">
      <Image
        src={img}
        alt={name}
        width={38}
        height={38}
        className="for-you-user-img"
      />
      <div className="for-you-user-info">
        <div className="for-you-user-name">{name}</div>
        <div className="for-you-user-text">{text}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [next, setNext] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  interface HandleCircleClick {
    (idx: number): void;
  }

  const handleCircleClick: HandleCircleClick = (idx) => {
    if (idx === current || animating) {
      return;
    }

    setSlideDirection(idx > current ? "right" : "left");
    setNext(idx);
    setAnimating(true);
    setSlideIn(false);

    setTimeout(() => {
      setSlideIn(true);
    }, 20);

    setTimeout(() => {
      setCurrent(idx);
      setNext(null);
      setSlideIn(false);
      setAnimating(false);
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        const nextIdx = (current + 1) % images.length;

        handleCircleClick(nextIdx);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [current, animating]);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
      }
    }
    if (locationDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locationDropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target as Node) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  return (
    <div className="page-container">
      <div className="header-container">
        <div className="header-image-slider-container">
          {/* Current image */}
          <Image
            className={
              "header-image-slide prev" +
              (animating && next !== null
                ? slideDirection === "right"
                  ? " slide-out-left"
                  : " slide-out-right"
                : "")
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
              key={next}
              className={
                "header-image-slide next" +
                (slideIn
                  ? slideDirection === "right"
                    ? " slide-in-right"
                    : " slide-in-left"
                  : "")
              }
              src={images[next].src}
              alt={images[next].alt}
              style={{ zIndex: 2 }}
              width={100} 
              height={100}
            />
          )}

          {/* Caption overlay */}
          <div className="header-image-caption">
            {images[animating && next !== null ? next : current].caption}
            <div className="header-image-location">
              {images[animating && next !== null ? next : current].location}
            </div>
            <Link
              href={images[animating && next !== null ? next : current].link}
              target="_blank"
              rel="noopener noreferrer"
              className="header-order-btn"
            >
              Order Now
            </Link>
          </div>

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
          {/* Navbar title button */}
          <button 
            className="header-title-btn"
            onClick={() => router.push("/home")}
          >
            BiteSnap
          </button>

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
                      <div className="header-search-info">
                        <span className="header-search-restaurant">{item.name}</span>
                        <span className="header-search-restaurant-location">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Searchbar divider */}
            <div className="header-search-divider"></div>

            {/* Location searchbar */}
            <div className="header-search-divider"></div>

            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                className="header-location-search"
                placeholder="City, State"
                value={locationInput}
                onFocus={() => setLocationDropdownOpen(true)}
                onChange={e => setLocationInput(e.target.value)}
                ref={locationRef}
                autoComplete="off"
              />
              {locationDropdownOpen && (
              <div className="header-search-location-dropdown" ref={locationDropdownRef}>
                {locationSuggestions
                  .filter(loc =>
                    loc.name.toLowerCase().includes(locationInput.toLowerCase())
                  )
                  .map(loc => (
                    <div
                      className="header-search-row"
                      key={loc.id}
                      onClick={() => {
                        setLocationInput(loc.name);
                        setLocationDropdownOpen(false);
                      }}
                    >
                      <div className="header-search-info">
                        <span className="header-search-location">
                          <LuMapPin style={{ marginRight: "1rem", color: "#00BAC4" }} size={20} />
                          {loc.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search icon */}
            <span className="header-search-icon">
              <FaSearch />
            </span>
          </div>
          {/* Find a Restaurant button */}
          <button 
            className="header-action-btn find-restaurant-btn"
            onClick={() => router.push("/map")}
          >
            Find a Restaurant
          </button>

          {/* Write a Review button */}
          <button 
            className="header-action-btn write-review-btn"
            onClick={() => router.push("/review")}
          >
            Write a Review
          </button>

          {/* Notifications button */}
          <button className="header-action-btn bell-btn" aria-label="Notifications">
            <FaRegBell size={25} />
          </button>

          {/* Profile button */}
          <button 
            className="profile-btn"
            ref={profileBtnRef}
            onClick={() => setProfileDropdownOpen((open) => !open)}
            aria-label="Profile"
            type="button"
          >
            <Image src="Profile_Picture.svg" alt="Profile" height={50} width={50} />
          </button>
          {profileDropdownOpen && (
            <div className="profile-dropdown" ref={profileDropdownRef}>
              <button className="profile-dropdown-btn">
                <FaUser className="profile-dropdown-icon" />
                My Profile
              </button>
              <button className="profile-dropdown-btn">
                <FaUserFriends className="profile-dropdown-icon" />
                Friends
              </button>
              <button className="profile-dropdown-btn">
                <FaCog className="profile-dropdown-icon" />
                Settings
              </button>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-btn">
                <FaEnvelope className="profile-dropdown-icon" />
                Messages
              </button>
              <div className="profile-dropdown-divider" />
              <button 
                className="profile-dropdown-btn"
                onClick={() => router.push("/")}
              >
                <FaSignOutAlt className="profile-dropdown-icon" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="for-you-container">
        <span className="for-you-title">Your Next Food Adventure Awaits</span>
        <div className="for-you-food-cards-row">
          {/* Tall food card */}
          <div className="for-you-food-card">
            <CardUserBox
              img="/Profile_Picture_2.svg"
              name="Gus G."
              text="Just now"
            />
            <Image
              src="/Food_Card_Picture_1.svg"
              alt="NEP CAFE - Irvine Beef Tongue Fried Rice"
              width={340}
              height={200}
              className="for-you-food-img"
              style={{ objectFit: "cover", borderRadius: "16px" }}
            />
            <div className="for-you-food-caption">
              <div className="for-you-food-restaurant">NEP CAFE - Irvine</div>
              <div className="for-you-food-dish">Beef Tongue Fried Rice</div>
              <div className="for-you-food-rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                <span className="for-you-food-rating-actions">
                  <FoodRatingWithThumbs />
                  <MdChatBubbleOutline 
                    className="for-you-food-comment" 
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="for-you-food-card-column">
            {/* Secondary food card */}
            <div className="for-you-food-card for-you-food-card-short">
              <CardUserBox
                img="/Profile_Picture_3.svg"
                name="Bob R."
                text="5 minutes ago"
              />
              <Image
                src="/Food_Card_Picture_2.svg"
                alt="Yup Dduk - Yup O"
                width={340}
                height={100}
                className="for-you-food-img"
                style={{ objectFit: "cover", borderRadius: "16px" }}
              />
              <div className="for-you-food-caption">
                <div className="for-you-food-restaurant">Yup Dduk Irvine</div>
                <div className="for-you-food-dish">Yup O</div>
                <div className="for-you-food-rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <span className="for-you-food-rating-actions">
                    <FoodRatingWithThumbs />
                    <MdChatBubbleOutline className="for-you-food-comment" />
                  </span>
                </div>
              </div>
            </div>

            {/* Tertiary food card */}
            <div className="for-you-food-card for-you-food-card-short">
              <CardUserBox
                img="/Profile_Picture_4.svg"
                name="Alice T."
                text="26 minutes ago"
              />
              <Image
                src="/Food_Card_Picture_3.svg"
                alt="Ever After Tea Room & Eatery"
                width={340}
                height={100}
                className="for-you-food-img"
                style={{ objectFit: "cover", borderRadius: "16px" }}
              />
              <div className="for-you-food-caption">
                <div className="for-you-food-restaurant">Ever After Tea Room & Eatery</div>
                <div className="for-you-food-dish">Asian Truffle Fried Rice</div>
                <div className="for-you-food-rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                  <span className="for-you-food-rating-actions">
                    <FoodRatingWithThumbs />
                    <MdChatBubbleOutline className="for-you-food-comment" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row of two food cards */}
        <div className="for-you-food-cards-row" style={{ marginTop: "0.5rem" }}>
          <Link  href="/restaurant" className="for-you-food-card for-you-food-card-mid" style={{ textDecoration: "none", color: "inherit" }}>
            <CardUserBox
              img="/Profile_Picture_5.svg"
              name="Sandy L."
              text="2 hours ago"
            />
            <Image
              src="/Food_Card_Picture_4.svg"
              alt="In-N-Out Burger"
              width={340}
              height={100}
              className="for-you-food-img"
              style={{ objectFit: "cover", borderRadius: "16px" }}
            />
            <div className="for-you-food-caption">
              <div className="for-you-food-restaurant">In-N-Out Burger</div>
              <div className="for-you-food-dish">Double-Double</div>
              <div className="for-you-food-rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="for-you-food-rating-actions">
                  <FoodRatingWithThumbs />
                  <MdChatBubbleOutline 
                    className="for-you-food-comment" 
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  />
                </span>
              </div>
            </div>
          </Link>
          <div className="for-you-food-card for-you-food-card-mid">
            <CardUserBox
              img="/Profile_Picture_6.svg"
              name="Mike D."
              text="7 hours ago"
            />
            <Image
              src="/Food_Card_Picture_5.svg"
              alt="The Chicken Shop"
              width={340}
              height={100}
              className="for-you-food-img"
              style={{ objectFit: "cover", borderRadius: "16px" }}
            />
            <div className="for-you-food-caption">
              <div className="for-you-food-restaurant">The Chicken Shop</div>
              <div className="for-you-food-dish">OG Wrap</div>
              <div className="for-you-food-rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                <span className="for-you-food-rating-actions">
                  <FoodRatingWithThumbs />
                  <MdChatBubbleOutline className="for-you-food-comment" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};