"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/home");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <Image
          src="/Login_Picture.svg"
          alt="Login Illustration"
          className="login-picture"
          width={950}
          height={950}
          priority
        />
      </div>
      <div className="login-right">
        <h1 className="login-title">BiteSnap</h1>
        <h2 className="welcome">Welcome back!</h2>
        <p className="sub-text">Log in to your account to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email input */}
          <input
            type="email"
            className="email-slot"
            placeholder="Enter your email"
            required
          />

          {/* Password input */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="password-slot"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              <span>Show password</span>
            </button>
          </div>

          {/* Remember Me & Forgot Your Password? container */}
          <div className="remember-forgot-container">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="forgot">
              <span>Forgot your password?</span>
            </Link>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="login"
          >
            <Link href="/home" className="login-link">
              Login
            </Link>
          </button>
        </form>

        {/* Register link */}
        <p className="sign-up">
          Don&apos;t have an account yet?{" "}
          <Link href="/register">Sign up here!</Link>
        </p>

        <div className="separator">
          <span className="fw-bold">Or continue with:</span>
        </div>

        {/* Google login button */}
        <button 
          className="google fw-bold"
        >
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