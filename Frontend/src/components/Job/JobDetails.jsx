import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "3rem 1rem 6rem",
    background: "linear-gradient(to bottom, #F3F0D7, #D8B384)", // lighter to a slightly darker warm orange
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'Playfair Display', serif",
  },
  container: {
    maxWidth: "700px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.25)", // subtle translucent white overlay
    borderRadius: "1.25rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    padding: "2.5rem 3rem",
    color: "#8B5E3C", // brown labels text
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  headingWrapper: {
    textAlign: "center",
    marginBottom: "1rem",
    position: "relative",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.75rem",
    fontWeight: "700",
    color: "#5E454B",
    margin: "0 auto 0.5rem",
    display: "inline-block",
    position: "relative",
  },
  underline: {
    width: "100px",
    height: "4px",
    backgroundColor: "#CEE5D0",
    margin: "0 auto",
    borderRadius: "4px",
    boxShadow: "0 0 10px #CEE5D0",
  },
  banner: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
  },
  label: {
    fontWeight: "600",
    color: "#8B5E3C", // brown color for label text
  },
  value: {
    color: "#5E454B",
    fontWeight: "400",
    marginLeft: "0.5rem",
  },
  applyLink: {
    display: "inline-block",
    marginTop: "2rem",
    padding: "0.75rem 1.8rem",
    backgroundColor: "#CEE5D0",
    color: "#5E454B",
    textDecoration: "none",
    borderRadius: "0.75rem",
    fontWeight: "600",
    fontSize: "1.1rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  applyLinkHover: {
    backgroundColor: "#8B5E3C",
    color: "#F3F0D7",
  },
};

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  // For hover effect on apply link
  const [hover, setHover] = useState(false);

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headingWrapper}>
          <h3 style={styles.heading}>Job Details</h3>
          <div style={styles.underline}></div>
        </div>

        <div style={styles.banner}>
          <p>
            <span style={styles.label}>Title:</span>
            <span style={styles.value}> {job.title}</span>
          </p>
          <p>
            <span style={styles.label}>Category:</span>
            <span style={styles.value}>{job.category}</span>
          </p>
          <p>
            <span style={styles.label}>Country:</span>
            <span style={styles.value}>{job.country}</span>
          </p>
          <p>
            <span style={styles.label}>City:</span>
            <span style={styles.value}>{job.city}</span>
          </p>
          <p>
            <span style={styles.label}>Location:</span>
            <span style={styles.value}>{job.location}</span>
          </p>
          <p>
            <span style={styles.label}>Description:</span>
            <span style={styles.value}>{job.description}</span>
          </p>
          <p>
            <span style={styles.label}>Job Posted On:</span>
            <span style={styles.value}>{job.jobPostedOn}</span>
          </p>
          <p>
            <span style={styles.label}>Salary:</span>{" "}
            {job.fixedSalary ? (
              <span style={styles.value}>{job.fixedSalary}</span>
            ) : (
              <span style={styles.value}>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? null : (
            <Link
              to={`/application/${job._id}`}
              style={{
                ...styles.applyLink,
                ...(hover ? styles.applyLinkHover : {}),
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
