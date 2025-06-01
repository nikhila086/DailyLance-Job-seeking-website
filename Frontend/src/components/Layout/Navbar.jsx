import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";


const fontSpecial = document.createElement("link");
fontSpecial.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
fontSpecial.rel = "stylesheet";
document.head.appendChild(fontSpecial);

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("${import.meta.env.VITE_SERVER}/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const styles = {
    nav: {
      display: isAuthorized ? "block" : "none",
      backgroundColor: "#CEE5D0",
      padding: "1rem 2rem",
      borderRadius: "0 0 1rem 1rem",
      //fontFamily: "'Josefin Sans', sans-serif",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      zIndex: 999,
      position: "relative",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    brand: {
      fontFamily: "'Pacifico', cursive",
      fontSize: "2rem",
      color: "#5E454B",
      background: "linear-gradient(90deg, #D8B384, #5E454B)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    menu: {
      display: show ? "flex" : window.innerWidth > 768 ? "flex" : "none",
      flexDirection: window.innerWidth > 768 ? "row" : "column",
      position: window.innerWidth > 768 ? "static" : "absolute",
      top: window.innerWidth > 768 ? "unset" : "70px",
      right: window.innerWidth > 768 ? "unset" : "20px",
      backgroundColor: window.innerWidth > 768 ? "transparent" : "#F3F0D7",
      padding: window.innerWidth > 768 ? "0" : "1rem",
      borderRadius: window.innerWidth > 768 ? "0" : "1rem",
      boxShadow: window.innerWidth > 768 ? "none" : "0 8px 16px rgba(0,0,0,0.1)",
      listStyle: "none",
      gap: "1.6rem",
      alignItems: "center",
      margin: 0,
      zIndex: 1000,
    },
    link: (hovered) => ({
      textDecoration: "none",
      fontWeight: 500,
      color: hovered ? "#D8B384" : "#5E454B",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
      transform: hovered ? "scale(1.05)" : "scale(1)",
      cursor: "pointer",
    }),
    button: {
      backgroundColor: "#D8B384",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "12px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      backgroundColor: "#5E454B",
      transform: "scale(1.05)",
    },
    hamburger: {
      display: window.innerWidth <= 768 ? "block" : "none",
      fontSize: "1.8rem",
      color: "#5E454B",
      cursor: "pointer",
    },
  };

  const menuItems = [
    { path: "/", label: "HOME" },
    { path: "/job/getall", label: "ALL JOBS" },
    {
      path: "/application/me",
      label: user?.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS",
    },
  ];

  if (user?.role === "Employer") {
    menuItems.push({ path: "/job/post", label: "POST NEW JOB" });
    menuItems.push({ path: "/job/me", label: "VIEW YOUR JOBS" });
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.brand}>JobLance</div>
        <ul style={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setShow(false)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={styles.link(hoverIndex === index)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <button
            onClick={handleLogout}
            style={{
              ...styles.button,
              ...(hoverIndex === "logout" ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoverIndex("logout")}
            onMouseLeave={() => setHoverIndex(null)}
          >
            LOGOUT
          </button>
        </ul>
        <div style={styles.hamburger}>
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
