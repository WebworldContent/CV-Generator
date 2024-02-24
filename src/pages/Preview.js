import React, { useContext, useEffect, useState } from "react";
import "../assets/css/cvStyle.css";
import { Header } from "../components/Header";
import { PreviewButtons } from "../components/PreviewButtons";
import useLocalStorage from "../components/helpers/customeHook";
import CVContext from "../context/CVContext";
import { useNavigate } from "react-router-dom";

export default function Preview() {
  const [data, setData] = useState({});
  const { getItem } = useLocalStorage();
  const { cvInfo, setCVInfo } = useContext(CVContext);
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    const fetchCVData = () => {
      const cvData = {};
      const collection = ["personal", "education", "experience", "skill"];
      collection.forEach((key) => {
        cvData[key] = getItem(key);
      });

      return cvData;
    };

    const isCVEmpty = Object.keys(cvInfo).length;
    const isFetchDataEmpty = Object.values(fetchCVData).every(
      (item) => Object.keys(item).length === 0
    );

    if (isCVEmpty && isFetchDataEmpty) {
      navigate("/");
    }

    if (isCVEmpty) {
      setData(cvInfo);
    } else {
      setData(fetchCVData());
      setCVInfo(fetchCVData());
    }
  }, []);

  const { personal, education, experience, skill } = data;

  return (
    <>
      <Header />
      <PreviewButtons />
      <div className="container">
        <div className="head">
          <h1>Cadidate Name</h1>
        </div>
        <div className="wrapper">
          <div className="main">
            <div className="contact-info">
              <h2 className="section-title">Contact Information</h2>
              <ul>
                <li>Email: your.email@example.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>LinkedIn: linkedin.com/in/yourname</li>
                <li>GitHub: github.com/yourusername</li>
              </ul>
            </div>

            <div className="education">
              <h2 className="section-title">Education</h2>
              <div className="section-content">
                <h3>University Name</h3>
                <p>Degree in Computer Science</p>
                <p>Graduation Year: 2022</p>
              </div>
            </div>

            <div className="experience">
              <h2 className="section-title">Work Experience</h2>
              <div className="section-content">
                <h3>Company Name</h3>
                <p>Position: Web Developer</p>
                <p>Duration: June 2021 - Present</p>
                <p>Description of responsibilities and achievements.</p>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="skills">
              <h2 className="section-title">Skills</h2>
              <div className="section-content">
                <ul>
                  <li>HTML5, CSS3</li>
                  <li>JavaScript, jQuery</li>
                  <li>React.js, Node.js</li>
                  <li>Git, GitHub</li>
                  <li>Responsive Web Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
