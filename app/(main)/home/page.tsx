"use client";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { FaSearch, FaRegBell, FaUser, FaUserFriends, FaCog, FaEnvelope, FaSignOutAlt, FaStar, FaRegStar, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { MdChatBubbleOutline } from "react-icons/md";

import "./page.css";

const images = [
  { src: "/Home_Picture_1.svg", alt: "Home Food 1", caption: "Urban Plates", location: "Irvine, CA", link: "https://urbanplates.com/" },
  { src: "/Home_Picture_2.svg", alt: "Home Food 2", caption: "SUP Noodle Bar", location: "Buena Park, CA", link: "https://www.supnoodlebar.com/" },
  { src: "/Home_Picture_3.svg", alt: "Home Food 3", caption: "Menya Hanabi - The Original Nagoya Mazesoba", location: "Los Angeles, CA", link: "https://menyahanabiusa.com/" },
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
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [next, setNext] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  interface HandleCircleClick {
    (idx: number): void;
  }

  const handleCircleClick: HandleCircleClick = (idx) => {
    if (idx === current || animating) {
      return;
    }

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
              (animating && next !== null ? " slide-out" : "")
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
                "header-image-slide next" + (slideIn ? " slide-in" : "")
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
                      <div className="header-search-info">
                        <span className="header-search-restaurant">{item.name}</span>
                        <span className="header-search-location">
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
                  <MdChatBubbleOutline className="for-you-food-comment" />
                  <FaRegThumbsUp className="for-you-food-thumb" />
                  <FaRegThumbsDown className="for-you-food-thumb" />
                </span>
              </div>
            </div>
          </div>

          <div className="for-you-food-card-column">
            {/* Secondary food card */}
            <div className="for-you-food-card for-you-food-card-short">
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
                    <MdChatBubbleOutline className="for-you-food-comment" />
                    <FaRegThumbsUp className="for-you-food-thumb" />
                    <FaRegThumbsDown className="for-you-food-thumb" />
                  </span>
                </div>
              </div>
            </div>

            {/* Tertiary food card */}
            <div className="for-you-food-card for-you-food-card-short">
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
                    <MdChatBubbleOutline className="for-you-food-comment" />
                    <FaRegThumbsUp className="for-you-food-thumb" />
                    <FaRegThumbsDown className="for-you-food-thumb" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};