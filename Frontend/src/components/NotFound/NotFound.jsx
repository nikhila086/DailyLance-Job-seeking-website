import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #e0e7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Playfair Display', serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "3rem 2rem",
          borderRadius: "1.5rem",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#4f46e5",
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>
        <div
          style={{
            height: "3px",
            width: "80px",
            backgroundColor: "#4f46e5",
            margin: "0 auto 1.5rem auto",
            borderRadius: "4px",
          }}
        />
        <p
          style={{
            fontSize: "1.2rem",
            color: "#6b7280",
            marginBottom: "2rem",
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "1rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "background-color 0.3s ease",
            display: "inline-block",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4338ca";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#4f46e5";
          }}
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
