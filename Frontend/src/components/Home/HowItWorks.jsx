import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const styles = {
  section: {
    padding: '4rem 2rem',
    backgroundColor: '#E9E5CD', // ~3% darker than #F3F0D7
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
  subtitle: {
    color: '#5E454B',
    opacity: 0.8,
    maxWidth: '600px',
    margin: '0 auto',
  },
  divider: {
    width: '100px',
    height: '4px',
    backgroundColor: '#D8B384',
    margin: '1rem auto',
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
    padding: '2rem',
    borderRadius: '1.5rem',
    background: 'linear-gradient(135deg, #fff, #f0e7d3)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  },
  stepContainerReverse: {
    flexDirection: 'row-reverse',
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #CEE5D0, #D8B384)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.8rem',
    color: '#5E454B',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    padding: '0 1rem',
  },
  stepTitle: {
    fontSize: '1.7rem',
    fontWeight: '600',
    color: '#5E454B',
    marginBottom: '1rem',
    fontFamily: "'Playfair Display', serif",
  },
  stepDescription: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: '#5E454B',
    opacity: 0.85,
    maxWidth: '520px',
  },
};

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create a Charming Profile",
      description:
        "Sign up and personalize your profile. Add your skills, experience, and a spark of personality to stand out to employers or freelancers!",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Explore Cool Opportunities",
      description:
        "Browse jobs or post your needs. Our smart filters help you find the perfect match effortlessly — work should feel magical!",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply or Recruit with Confidence",
      description:
        "Connect instantly. One click and you’re on your way to landing a job or hiring someone great. Smooth, fast, and fun!",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>How JobLance Works</h2>
          <div style={styles.divider}></div>
        </div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              ...styles.stepContainer,
              ...(index % 2 !== 0 ? styles.stepContainerReverse : {}),
            }}
          >
            <div style={styles.iconCircle}>{step.icon}</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
