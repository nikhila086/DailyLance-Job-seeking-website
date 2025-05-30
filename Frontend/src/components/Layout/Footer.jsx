import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";



const Footer = () => {
  const { isAuthorized } = useContext(Context);

  const styles = {
    footer: {
      display: isAuthorized ? "flex" : "none",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "linear-gradient(90deg, #CEE5D0, #F3F0D7)",
      fontFamily: "'Playfair Display', serif",
      fontSize: "1rem",
      fontWeight: "500",
      color: "#5E454B",
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
      flexWrap: "wrap",
      gap: "1rem",
      zIndex: 999,
    },
    icons: {
      display: "flex",
      gap: "1rem",
    },
    iconLink: {
      color: "#5E454B",
      fontSize: "1.4rem",
      transition: "transform 0.3s ease, color 0.3s ease",
    },
    iconHover: {
      color: "#D8B384",
      transform: "scale(1.2)",
    },
  };

  return (
    <footer style={styles.footer}>
      <div>&copy; All Rights Reserved By Nikhila Pediredla.</div>
      <div style={styles.icons}>
        <HoverIcon href="https://www.linkedin.com/in/nikhila-pediredla-14387926b" icon={<FaLinkedin />} styles={styles} />
        <HoverIcon href="https://github.com/nikhila086" icon={<FaGithub />} styles={styles} />
      </div>
    </footer>
  );
};

// Component to add hover effect
const HoverIcon = ({ href, icon, styles }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to={href}
      target="_blank"
      style={{
        ...styles.iconLink,
        ...(hovered ? styles.iconHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
    </Link>
  );
};

export default Footer;
