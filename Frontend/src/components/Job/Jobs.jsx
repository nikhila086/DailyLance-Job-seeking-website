import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "4rem 1rem 6rem",
    background: "#E9E5CD",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#5E454B",
  },
  container: {
    maxWidth: "900px",
    width: "100%",
  },
  headingWrapper: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#5E454B",
    display: "inline-block",
    position: "relative",
    letterSpacing: "0.05em",
    textShadow: "0 1px 1px rgba(255 255 255 / 0.6)",
  },
  underline: {
    width: "120px",
    height: "3px",
    backgroundColor: "#D8B384", // solid brown underline, no glow
    margin: "0 auto",
    borderRadius: "5px",
  },
  banner: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2.8rem 2rem",
  },
  card: {
    background: "linear-gradient(135deg, #fff, #f0e7d3)", // tinted mint
    borderRadius: "1.8rem",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    padding: "1.8rem 2.2rem",
    boxShadow: "0 10px 30px rgba(222, 161, 131, 0.15), 0 4px 8px rgba(50, 45, 42, 0.05)",
    color: "#4B3B33",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
    cursor: "pointer",
    border: "1.5px solid transparent",
  },
  cardHover: {
    transform: "translateY(-8px) scale(1.04)",
    boxShadow: "0 12px 40px rgba(139, 94, 60, 0.25), 0 15px 40px rgba(50, 45, 42, 0.15)",
    borderColor: "#8B5E3C",
    background: "rgba(139, 94, 60, 0.1)", // subtle brown tint on hover
  },
  jobTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.6rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#5E454B",
  },
  jobCategory: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.8rem",
    color: "#8B5E3C", // same brown color for both category & country
  },
  jobCountry: {
    fontSize: "1.05rem",
    fontWeight: "500",
    marginBottom: "1.8rem",
    color: "#8B5E3C",
  },
  link: {
    alignSelf: "flex-start",
    textDecoration: "none",
    background: "linear-gradient(135deg, #7BAF9E, #CEE5D0)",
    color: "#3A3A3A",
    padding: "0.65rem 1.4rem",
    borderRadius: "1rem",
    fontWeight: "700",
    boxShadow: "0 5px 10px rgba(123, 175, 158, 0.6)",
    transition: "all 0.35s ease",
    userSelect: "none",
  },
  linkHover: {
    background: "linear-gradient(135deg, #D8B384, #E3A587)",
    color: "#F3F0D7",
    boxShadow: "0 8px 15px rgba(227, 165, 135, 0.8)",
    transform: "scale(1.1)",
  },
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredLinkId, setHoveredLinkId] = useState(null);

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headingWrapper}>
          <h1 style={styles.heading}>All Available Jobs</h1>
          <div style={styles.underline}></div>
        </div>

        <div style={styles.banner}>
          {jobs.jobs &&
            jobs.jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  ...styles.card,
                  ...(hoveredCardId === job._id ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCardId(job._id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <p style={styles.jobTitle}>{job.title}</p>
                <p style={styles.jobCategory}>{job.category}</p>
                <p style={styles.jobCountry}>{job.country}</p>

                <Link
                  to={`/job/${job._id}`}
                  style={{
                    ...styles.link,
                    ...(hoveredLinkId === job._id ? styles.linkHover : {}),
                  }}
                  onMouseEnter={() => setHoveredLinkId(job._id)}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
