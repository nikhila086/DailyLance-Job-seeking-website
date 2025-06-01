import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://joblance-m1us.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleEnableEdit = (jobId) => setEditingMode(jobId);
  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `https://joblance-m1us.onrender.com/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `https://joblance-m1us.onrender.com/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "4rem 1rem 6rem",
        background: "linear-gradient(to bottom, #E9E5CD, #d7d2bb)",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        color: "#5E454B",
      }}
    >
      <div style={{ maxWidth: "1100px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.8rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: "#5E454B",
              position: "relative",
              letterSpacing: "0.05em",
              textShadow: "0 1px 1px rgba(255 255 255 / 0.6)",
            }}
          >
            Your Posted Jobs
          </h1>
          <div
            style={{
              width: "120px",
              height: "2px",
              backgroundColor: "#D8B384",
              margin: "0 auto",
              borderRadius: "5px",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {myJobs.length > 0 ? (
            myJobs.map((element) => (
              <div
                key={element._id}
                style={{
                  background: "linear-gradient(145deg, #fff, #f1ead4)",
                  borderRadius: "1.5rem",
                  padding: "1.8rem 2.2rem",
                  boxShadow:
                    "0 10px 30px rgba(222, 161, 131, 0.15), 0 4px 8px rgba(50, 45, 42, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <input
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.title}
                    onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                    placeholder="Title"
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  />
                  <input
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.country}
                    onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                    placeholder="Country"
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  />
                  <input
                    type="text"
                    disabled={editingMode !== element._id}
                    value={element.city}
                    onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                    placeholder="City"
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  />

                  <select
                    value={element.category}
                    onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                    disabled={editingMode !== element._id}
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  >
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="MEVN Stack Development">MEVN Stack Development</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>

                  <textarea
                    disabled={editingMode !== element._id}
                    value={element.description}
                    onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                    rows={3}
                    placeholder="Description"
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  />

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {element.fixedSalary ? (
                      <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.fixedSalary}
                        onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                        placeholder="Salary"
                        style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                      />
                    ) : (
                      <>
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryFrom}
                          onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                          placeholder="Salary From"
                          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.salaryTo}
                          onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                          placeholder="Salary To"
                          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                      </>
                    )}
                  </div>

                  <select
                    value={element.expired}
                    onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                    disabled={editingMode !== element._id}
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  >
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                  </select>

                  <textarea
                    disabled={editingMode !== element._id}
                    value={element.location}
                    onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                    rows={2}
                    placeholder="Location"
                    style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          style={{ background: "#7BAF9E", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", color: "white" }}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleDisableEdit}
                          style={{ background: "#E57474", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", color: "white" }}
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        style={{ background: "#D8B384", padding: "0.5rem 1.2rem", borderRadius: "8px", border: "none", color: "white" }}
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      style={{ background: "#8B5E3C", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", color: "white" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You haven't posted any jobs yet!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyJobs;
