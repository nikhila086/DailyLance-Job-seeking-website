import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "4rem 1rem",
    background: "#E9E5CD",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#5E454B",
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    background: "linear-gradient(135deg, #fff, #f0e7d3)",
    borderRadius: "2rem",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(222, 161, 131, 0.15), 0 4px 8px rgba(50, 45, 42, 0.05)",
    border: "1.5px solid transparent",
  },
  headingWrapper: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#5E454B",
    letterSpacing: "0.03em",
    textShadow: "0 1px 1px rgba(255 255 255 / 0.6)",
  },
  underline: {
    width: "100px",
    height: "3px",
    backgroundColor: "#D8B384",
    margin: "0 auto",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  input: {
    padding: "0.8rem 1rem",
    borderRadius: "1rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
  },
  textarea: {
    padding: "0.8rem 1rem",
    borderRadius: "1rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    height: "140px",
    resize: "vertical",
    width: "100%",
  },
  fileLabel: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.3rem",
    display: "block",
  },
  fileInput: {
    padding: "0.6rem",
    borderRadius: "1rem",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    background: "linear-gradient(135deg, #D8B384, #E3A587)",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    borderRadius: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 10px rgba(227, 165, 135, 0.5)",
    marginTop: "1rem",
  },
};

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://joblance-m1us.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCoverLetter("");
      setResume(null);

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Submission failed");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headingWrapper}>
          <h3 style={styles.heading}>Application Form</h3>
          <div style={styles.underline}></div>
        </div>

        <form style={styles.form} onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            style={styles.textarea}
            required
          />
          <div>
            <label style={styles.fileLabel}>Upload Resume (.pdf, .jpg, .png)</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={styles.fileInput}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
