import React, { useState } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaSearch, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

// Add Google Fonts
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const HeroSection = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [hoveredStat, setHoveredStat] = useState(null);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const stats = [
    { id: 1, title: "120,000+", label: "Live Jobs", icon: <FaSuitcase /> },
    { id: 2, title: "90,000+", label: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "250,000+", label: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "100,000+", label: "Employers", icon: <FaUserPlus /> },
  ];

  const styles = {
    section: {
      fontFamily: "'Poppins', sans-serif",
      color: "#F3F0D7",
      height: "100vh",
      position: "relative",
      backgroundImage: "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      display: "flex",
      alignItems: "center",
      padding: "4rem 2rem",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(94, 69, 75, 0.75)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1000px",
      margin: "0 auto",
      width: "100%",
    },
    titleWrapper: {
      textAlign: "center",
      maxWidth: "700px",
      margin: "0 auto 3rem",
    },
    title: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
      fontWeight: 800,
      marginBottom: "1rem",
      lineHeight: 1.1,
      color: "#F3F0D7",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    subtitle: {
      fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
      maxWidth: "600px",
      margin: "0 auto 1.5rem",
      lineHeight: 1.6,
      color: "#F3F0D7",
      opacity: 0.9,
      fontWeight: 300,
    },
    searchContainer: {
      background: "rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      padding: "0.25rem",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: "500px",
      margin: "0 auto 3rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s ease",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      padding: "0.25rem 0.5rem",
      flex: "1 1 180px",
      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
    },
    inputIcon: {
      fontSize: "0.9rem",
      marginRight: "0.4rem",
      color: "#CEE5D0",
    },
    input: {
      width: "100%",
      padding: "0.25rem",
      border: "none",
      background: "transparent",
      fontSize: "0.8rem",
      color: "#F3F0D7",
      outline: "none",
    },
    searchButton: {
      background: isButtonHovered ? "#D8B384" : "#CEE5D0",
      color: "#5E454B",
      padding: "0.5rem 1rem",
      borderRadius: "12px",
      border: "none",
      fontWeight: 600,
      fontSize: "0.8rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0.25rem",
      transition: "all 0.3s ease",
      flex: "0 0 auto",
      transform: isButtonHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
      boxShadow: isButtonHovered ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "1rem",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
      marginTop: "0.5cm",
    },
    statCard: (id) => ({
      background: "rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(8px)",
      borderRadius: "16px",
      padding: "1.75rem 1.5rem",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      transition: "all 0.3s ease",
      transform: hoveredStat === id ? "translateY(-5px) scale(1.03)" : "translateY(0) scale(1)",
      boxShadow: hoveredStat === id ? "0 8px 20px rgba(0, 0, 0, 0.15)" : "none",
    }),
    statIcon: (id) => ({
      fontSize: "1.75rem",
      marginBottom: "1rem",
      display: "inline-block",
      padding: "0.75rem",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.12)",
      color: "#CEE5D0",
      transition: "all 0.3s ease",
      transform: hoveredStat === id ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)",
    }),
    statNumber: {
      fontSize: "1.75rem",
      fontWeight: 700,
      marginBottom: "0.4rem",
      color: "#F3F0D7",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
    },
    statLabel: {
      fontSize: "0.9rem",
      fontWeight: 500,
      color: "#F3F0D7",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      opacity: 0.9,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.titleWrapper}>
          <h1 style={styles.title}>Find Your Dream Career Path Today</h1>
          <p style={styles.subtitle}>
            Join thousands of professionals who have found their perfect role through JobLance. 
            Connect with top companies and unlock your career potential.
          </p>
        </div>

        <div
          style={{
            ...styles.searchContainer,
            ...(isSearchHovered && {
              transform: "scale(1.02)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            })
          }}
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          <div style={styles.inputWrapper}>
            <FaSearch style={styles.inputIcon} />
            <input
              style={styles.input}
              type="text"
              placeholder="Job title or keywords"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div style={styles.inputWrapper}>
            <FaMapMarkerAlt style={styles.inputIcon} />
            <input
              style={styles.input}
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            style={styles.searchButton}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            Find Jobs
            <FaArrowRight style={{
              marginLeft: "0.5rem",
              fontSize: "0.8rem",
              transform: isButtonHovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.3s ease"
            }} />
          </button>
        </div>

        <div style={styles.statsContainer}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              style={styles.statCard(stat.id)}
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div style={styles.statIcon(stat.id)}>{stat.icon}</div>
              <div style={styles.statNumber}>{stat.title}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
