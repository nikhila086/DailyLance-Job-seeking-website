import React, { useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const styles = {
  section: {
    padding: '4rem 2rem',
    background: 'white',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    color: '#5E454B',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  divider: {
    width: '100px',
    height: '4px',
    backgroundColor: '#D8B384',
    margin: '1rem auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '1.5rem',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#5E454B',
  },
  categoryTitle: {
    fontSize: '1.25rem',
    color: '#5E454B',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#5E454B',
    opacity: 0.7,
    fontSize: '0.875rem',
  }
};

const PopularCategories = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
      color: "#CEE5D0"
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
      color: "#F3F0D7"
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
      color: "#D8B384"
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
      color: "#CEE5D0"
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
      color: "#F3F0D7"
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
      color: "#D8B384"
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
      color: "#CEE5D0"
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
      color: "#F3F0D7"
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Popular Categories</h2>
          <div style={styles.divider}></div>
        </div>

        <div style={styles.grid}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                ...styles.card,
                backgroundColor: hoveredId === category.id ? category.color : 'white',
                boxShadow: hoveredId === category.id ? '0 10px 15px rgba(0, 0, 0, 0.1)' : 'none',
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{
                ...styles.iconWrapper,
                backgroundColor: hoveredId === category.id ? 'white' : category.color,
              }}>
                {category.icon}
              </div>
              <h3 style={styles.categoryTitle}>{category.title}</h3>
              <p style={styles.subtitle}>{category.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;