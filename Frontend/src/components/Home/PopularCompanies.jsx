import React from "react";
import { FaMicrosoft, FaGoogle } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { IoLocationSharp } from "react-icons/io5";
import { BsBriefcase } from "react-icons/bs";

const styles = {
  section: {
    padding: '4rem 2rem 8rem',
    background: 'linear-gradient(to bottom, #e1c49a, #D6A36F)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    overflow: 'visible',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    color: '#5E454B',
    fontSize: '2.75rem',
    marginBottom: '1rem',
  },
  divider: {
    width: '100px',
    height: '4px',
    backgroundColor: '#CEE5D0',
    margin: '1rem auto',
    borderRadius: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '5rem 3rem',
    overflow: 'visible',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '1.75rem',
    overflow: 'visible',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    height: '380px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxShadow: '0 2px 4px rgba(94, 69, 75, 0.05)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease, filter 0.3s ease',
    position: 'relative',
  },
  cardHover: {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 0 35px rgba(206, 229, 208, 0.4)',
    filter: 'brightness(1.1)',
  },
  cardHeader: {
    height: '250px',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: '1.75rem',
    borderTopRightRadius: '1.75rem',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
    borderTopLeftRadius: '1.75rem',
    borderTopRightRadius: '1.75rem',
  },
  companyLogo: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    width: '48px',
    height: '48px',
    background: 'white',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: '#ff8c42',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
  },
  companyName: {
    fontFamily: "'Playfair Display', serif",
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    color: 'white',
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '1.5rem 2rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#5E454B',
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#5E454B',
    fontWeight: 500,
  },
  button: {
    padding: '0.6rem 1.0rem',
    borderRadius: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: '#F3F0D7',
    color: '#5E454B',
    border: 'none',
    transition: 'all 0.3s ease',
  }
};

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Hyderabad, Telangana",
      openPositions: 10,
      logo: "https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg",
      icon: <FaMicrosoft />
    },
    {
      id: 2,
      title: "Tesla",
      location: "Chennai, Tamil Nadu",
      openPositions: 5,
      logo: "https://images.pexels.com/photos/13861/IMG_3496bfree.jpg",
      icon: <SiTesla />
    },
    {
      id: 3,
      title: "Google",
      location: "Bangalore, Karnataka",
      openPositions: 15,
      logo: "https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg",
      icon: <FaGoogle />
    }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Top Companies</h2>
          <div style={styles.divider}></div>
        </div>

        <div style={styles.grid}>
          {companies.map((company) => (
            <div
              key={company.id}
              style={styles.card}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, styles.cardHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: 'none',
                  boxShadow: styles.card.boxShadow,
                  filter: 'none',
                })
              }
            >
              <div
                style={{
                  ...styles.cardHeader,
                  backgroundImage: `url(${company.logo})`,
                }}
              >
                <div style={styles.overlay}></div>
                <div style={styles.companyLogo}>{company.icon}</div>
                <h3 style={styles.companyName}>{company.title}</h3>
              </div>

              <div style={styles.cardContent}>
                <div style={styles.location}>
                  <IoLocationSharp />
                  <span>{company.location}</span>
                </div>

                <div style={styles.footer}>
                  <div style={styles.positions}>
                    <BsBriefcase />
                    <span>{company.openPositions} Open Positions</span>
                  </div>
                  <button
                    style={styles.button}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#5E454B';
                      e.currentTarget.style.color = '#F3F0D7';
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(94, 69, 75, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F3F0D7';
                      e.currentTarget.style.color = '#5E454B';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
