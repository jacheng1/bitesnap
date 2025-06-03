"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { LuMapPin } from "react-icons/lu";
import { FaRegBell, FaSearch, FaUser, FaUserFriends, FaCog, FaEnvelope, FaSignOutAlt, FaChevronDown, FaRegCopyright } from "react-icons/fa";

import "./layout.css";

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

const locationSuggestions = [
  { id: 1, name: "Current Location" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
    const [locationInput, setLocationInput] = useState("");
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const locationDropdownRef = useRef<HTMLDivElement>(null);
    const profileBtnRef = useRef<HTMLButtonElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Restaurant dropdown click outside
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

    // Location dropdown click outside
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

    // Profile dropdown click outside
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
        <div className="app-root">
            <nav className="main-navbar">
                <div className="main-navbar-content">
                    {/* Navbar title button */}
                    <button 
                      className="main-navbar-title-btn"
                      onClick={() => router.push("/home")}
                    >
                      BiteSnap
                    </button>

                    <div className="main-navbar-searchbars">
                        {/* Restaurant name searchbar */}
                        <div style={{ position: "relative", flex: 1 }}>
                          <input
                            type="text"
                            className="main-navbar-search"
                            placeholder="Things to eat, bars to visit..."
                            onFocus={() => setDropdownOpen(true)}
                            ref={searchRef}
                            autoComplete="off"
                          />
                          {dropdownOpen && (
                            <div className="main-navbar-search-dropdown" ref={dropdownRef}>
                              {dropdownSuggestions.map((item) => (
                                <div className="main-navbar-search-row" key={item.id}>
                                  <Image
                                    src={item.img}
                                    alt={item.name}
                                    className="main-navbar-search-food-img"
                                    height={24}
                                    width={24}
                                  />
                                  <div className="main-navbar-search-info">
                                    <span className="main-navbar-search-restaurant">{item.name}</span>
                                    <span className="main-navbar-search-restaurant-location">
                                      {item.location}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Divider */}
                        <div className="main-navbar-search-divider"></div>

                        {/* Location searchbar */}
                        <div style={{ position: "relative", flex: 1 }}>
                          <input
                            type="text"
                            className="main-navbar-location-search"
                            placeholder="City, State"
                            value={locationInput}
                            onFocus={() => setLocationDropdownOpen(true)}
                            onChange={e => setLocationInput(e.target.value)}
                            ref={locationRef}
                            autoComplete="off"
                          />
                          {locationDropdownOpen && (
                            <div className="main-navbar-location-search-dropdown" ref={locationDropdownRef}>
                              {locationSuggestions
                                .filter(loc =>
                                  loc.name.toLowerCase().includes(locationInput.toLowerCase())
                                )
                                .map(loc => (
                                  <div
                                    className="main-navbar-search-row"
                                    key={loc.id}
                                    onClick={() => {
                                      setLocationInput(loc.name);
                                      setLocationDropdownOpen(false);
                                    }}
                                  >
                                    <div className="main-navbar-search-info">
                                      <span className="main-navbar-search-location">
                                        <LuMapPin style={{ marginRight: "0.5rem", color: "#00BAC4" }} size={18} />
                                        {loc.name}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>

                        {/* Divider */}
                        <div className="main-navbar-search-divider"></div>

                        {/* Search icon */}
                        <span className="main-navbar-search-icon">
                          <FaSearch />
                        </span>
                    </div>

                    <div className="main-navbar-actions">
                        {/* Find a Restaurant button */}
                        <button 
                          className="main-navbar-action-btn"
                          onClick={() => router.push("/map")}
                        >
                          Find a Restaurant
                        </button>

                        {/* Write a Review button */}
                        <button 
                          className="main-navbar-action-btn"
                          onClick={() => router.push("/review")}
                        >
                          Write a Review
                        </button>

                        {/* Notifications button */}
                        <button className="main-navbar-action-btn bell-btn" aria-label="Notifications">
                            <FaRegBell size={25} />
                        </button>

                        {/* Profile button */}
                        <button 
                            className="main-navbar-profile-btn" 
                            ref={profileBtnRef}
                            onClick={() => setProfileDropdownOpen((open) => !open)}
                            aria-label="Profile"
                            type="button"
                        >
                            <Image src="/Profile_Picture.svg" alt="Profile" height={40} width={40} />
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
            </nav>

            {/* Page content */}
            <div className="main-content">{children}</div>

            {/* Footer */}
            <footer className="footer">
              <div className="footer-col">
                <div className="footer-title">About BiteSnap</div>
                <div className="footer-link">About Us</div>
                <div className="footer-link">Press</div>
                <div className="footer-link">Careers</div>
                <div className="footer-link">Resources and Policies</div>
                <div className="footer-link">Content Guidelines</div>
                <div className="footer-link">Contact Us</div>
                <div className="footer-link">Accessibility Statement</div>
                <div className="footer-link">Terms of Service</div>
                <div className="footer-link">Privacy Policy</div>
              </div>
              <div className="footer-col">
                <div className="footer-title">Explore</div>
                <div className="footer-link">Write a Review</div>
                <div className="footer-link">Add a Restaurant</div>
                <div className="footer-link">Join</div>
                <div className="footer-link">Help Center</div>
                <div className="footer-link">Support</div>
              </div>
              <div className="footer-col">
                <div className="footer-title">Languages</div>
                <div className="footer-link">
                  English
                  <FaChevronDown style={{ marginLeft: "0.5rem", fontSize: "0.6em", verticalAlign: "middle" }} />
                </div>
              </div>
      
              {/* Horizontal line */}
              <hr className="footer-hr" />
      
              <div className="footer-copyright">
                <span>Copyright</span>
                <FaRegCopyright className="footer-copyright-icon" />
                <span>2025 BiteSnap LLC</span>
              </div>
            </footer>
        </div>
    );
};