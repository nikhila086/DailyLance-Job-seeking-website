import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your JobLance account</p>
        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Login As</label>
            <div style={styles.inputWrapper}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser style={styles.icon} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
              <MdOutlineMailOutline style={styles.icon} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
              <RiLock2Fill style={styles.icon} />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>

          <Link to="/register" style={styles.link}>
            Don’t have an account? <b>Register Now</b>
          </Link>
        </form>
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #FFDAB3, #C8AAAA)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: "#FFF7EF",
    padding: "2.5rem 2rem",
    borderRadius: "2rem",
    boxShadow: "0 15px 40px rgba(87, 73, 100, 0.15)",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.2rem",
    color: "#574964",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#9F8383",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#574964",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "0.75rem 2.5rem 0.75rem 1rem",
    borderRadius: "1rem",
    border: "1.5px solid #C8AAAA",
    backgroundColor: "#FFF",
    color: "#574964",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s",
  },
  select: {
    width: "100%",
    padding: "0.75rem 2.5rem 0.75rem 1rem",
    borderRadius: "1rem",
    border: "1.5px solid #C8AAAA",
    backgroundColor: "#FFF",
    color: "#574964",
    fontSize: "1rem",
    outline: "none",
    appearance: "none",
  },
  icon: {
    position: "absolute",
    right: "1rem",
    color: "#9F8383",
    fontSize: "1.2rem",
  },
  button: {
    background: "linear-gradient(135deg, #9F8383, #574964)",
    color: "#FFF",
    padding: "0.85rem",
    border: "none",
    borderRadius: "1.2rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 15px rgba(87, 73, 100, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  link: {
    marginTop: "1.2rem",
    fontSize: "0.95rem",
    color: "#574964",
    display: "block",
  },
};

// Add hover and focus states using global CSS or styled-components
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  input:focus, select:focus {
    border-color: #574964;
    box-shadow: 0 0 0 3px rgba(87, 73, 100, 0.1);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(87, 73, 100, 0.3);
  }
`;
document.head.appendChild(styleSheet);

export default Login;
