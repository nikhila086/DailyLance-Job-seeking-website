import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

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
    backgroundColor: "#D8B384",
    margin: "0 auto",
    borderRadius: "5px",
  },
  banner: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "3rem", // Increased spacing between cards
  },
  card: {
    background: "linear-gradient(135deg, #fff, #f0e7d3)",
    borderRadius: "1.8rem",
    padding: "1.8rem 2.2rem",
    boxShadow: "0 10px 30px rgba(222, 161, 131, 0.15), 0 4px 8px rgba(50, 45, 42, 0.05)",
    color: "#4B3B33",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    border: "1.5px solid transparent",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 40px rgba(139, 94, 60, 0.25)",
    borderColor: "#8B5E3C",
  },
  detailText: {
    margin: "0.2rem 0",
  },
  span: {
    fontWeight: "600",
    color: "#5E454B",
  },
  resumeImage: {
    width: "160px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "1rem",
    cursor: "pointer",
  },
  button: {
    marginTop: "1rem",
    alignSelf: "flex-start",
    background: "linear-gradient(135deg, #D8B384, #E3A587)",
    color: "#fff",
    padding: "0.6rem 1.2rem",
    borderRadius: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 10px rgba(227, 165, 135, 0.5)",
  },
};

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        const url =
          user?.role === "Employer"
            ? "https://joblance-m1us.onrender.com/api/v1/application/employer/getall"
            : "https://joblance-m1us.onrender.com/api/v1/application/jobseeker/getall";

        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchApplications();
  }, [isAuthorized, navigateTo, user]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `https://joblance-m1us.onrender.com/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headingWrapper}>
          <h1 style={styles.heading}>
            {user?.role === "Employer"
              ? "Applications From Job Seekers"
              : "My Applications"}
          </h1>
          <div style={styles.underline}></div>
        </div>

        <div style={styles.banner}>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                style={styles.card}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div style={{ flex: 1 }}>
                  <p style={styles.detailText}>
                    <span style={styles.span}>Name:</span> {app.name}
                  </p>
                  <p style={styles.detailText}>
                    <span style={styles.span}>Email:</span> {app.email}
                  </p>
                  <p style={styles.detailText}>
                    <span style={styles.span}>Phone:</span> {app.phone}
                  </p>
                  <p style={styles.detailText}>
                    <span style={styles.span}>Address:</span> {app.address}
                  </p>
                  <p style={styles.detailText}>
                    <span style={styles.span}>Cover Letter:</span>{" "}
                    {app.coverLetter}
                  </p>

                  {user?.role === "Job Seeker" && (
                    <button
                      style={styles.button}
                      onClick={() => deleteApplication(app._id)}
                    >
                      Delete Application
                    </button>
                  )}
                </div>

                <div style={{ flexShrink: 0 }}>
                  <img
                    src={app.resume?.url}
                    alt="resume"
                    style={styles.resumeImage}
                    onClick={() => openModal(app.resume.url)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default MyApplications;
