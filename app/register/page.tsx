"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "./page.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <Image
          src="/Register_Picture.svg"
          alt="Register Illustration"
          className="register-picture"
          width={950}
          height={950}
          priority
        />
      </div>
      <div className="register-right">
        <h1 className="title">BiteSnap</h1>
        <div className="welcome">Create a new account</div>
        <div className="sub-text">Create your account to continue</div>

        <form className="register-form" onSubmit={handleRegister}>
          {/* First Name Input */}
          <div className="input-container">
            <input 
              type="text" 
              className="input-slot" 
              placeholder="First Name"
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="input-container">
            <input 
              type="text" 
              className="input-slot" 
              placeholder="Last Name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-container">
            <input 
              type="email" 
              className="input-slot" 
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              className="input-slot"
              placeholder="Password"
              required
            />
            <div
              className="password-visible"
              onClick={() => setShowPassword(!showPassword)} 
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              <span>Show password</span>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input-slot"
              placeholder="Confirm Password"
              required
            />
            <div
              className="password-visible"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            >
              {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              <span>Show password</span>
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" className="register">
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="log-in">
          Already have an account?{" "}
          <Link href="/">Log in here!</Link>
        </p>

        {/* Or Register with Google */}
        <div className="separator-container">
          <div className="separator-line"></div>
          <div className="separator-text">
            <span className="fw-bold">Or register with:</span>
          </div>
          <div className="separator-line"></div>
        </div>

        {/* Google Sign-In Button */}
        <button className="google fw-bold">
          <FcGoogle size={48} /> Google
        </button>

        {/* Facebook login button */}
        <button 
          className="facebook fw-bold"
        >
          <FaFacebook size={48} color="#1877F3" /> Facebook
        </button>
      </div>
    </div>
  );
};