import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#E9E5CD",
    padding: "4rem 1rem 6rem",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
    color: "#5E454B",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    background: "linear-gradient(135deg, #fff, #f0e7d3)",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 25px rgba(222, 161, 131, 0.15)",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.4rem",
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#5E454B",
  },
  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    background: "#fff",
  },
  select: {
    padding: "0.8rem",
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    background: "#fff",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "0.8rem",
    border: "1px solid #ccc",
    fontSize: "1rem",
    background: "#fff",
    resize: "vertical",
  },
  button: {
    padding: "0.9rem 1.5rem",
    borderRadius: "2rem",
    backgroundColor: "#7BAF9E",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1rem",
    border: "none",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    alignSelf: "center",
    transition: "all 0.3s ease-in-out",
  },
};

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [isHovered, setIsHovered] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const response = await axios.post(
        "${import.meta.env.VITE_SERVER}/api/v1/job/post",
        fixedSalary.length >= 4
          ? { title, description, category, country, city, location, fixedSalary }
          : { title, description, category, country, city, location, salaryFrom, salaryTo },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h3 style={styles.heading}>Post New Job</h3>
        <div style={styles.underline}></div>
        <form style={styles.form} onSubmit={handleJobPost}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            style={styles.input}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Category</option>
            <option>Graphics & Design</option>
            <option>Mobile App Development</option>
            <option>Frontend Web Development</option>
            <option>MERN Stack Development</option>
            <option>Account & Finance</option>
            <option>Artificial Intelligence</option>
            <option>Video Animation</option>
            <option>MEAN Stack Development</option>
            <option>MEVN Stack Development</option>
            <option>Data Entry Operator</option>
          </select>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            style={styles.input}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            style={styles.input}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            style={styles.input}
          />
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            style={styles.select}
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>
          {salaryType === "Fixed Salary" ? (
            <input
              type="number"
              placeholder="Enter Fixed Salary"
              value={fixedSalary}
              onChange={(e) => setFixedSalary(e.target.value)}
              style={styles.input}
            />
          ) : salaryType === "Ranged Salary" ? (
            <>
              <input
                type="number"
                placeholder="Salary From"
                value={salaryFrom}
                onChange={(e) => setSalaryFrom(e.target.value)}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Salary To"
                value={salaryTo}
                onChange={(e) => setSalaryTo(e.target.value)}
                style={styles.input}
              />
            </>
          ) : (
            <p>Please provide Salary Type *</p>
          )}
          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            style={styles.textarea}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              backgroundColor: isHovered ? "#689F8D" : "#7BAF9E",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Create Job
          </button>

        </form>
      </div>
    </section>
  );
};

export default PostJob;
