import React, { useEffect, useState } from "react";
import "../assets/css/cvStyle.css";
import { Header } from "../components/Header";
import { PreviewButtons } from "../components/PreviewButtons";
import useLocalStorage from "../components/helpers/customeHook";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Preview() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hideForPrint, setHideForPrint] = useState(false);
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVData = () => {
      try {
        setLoading(true);
        const cvData = {};
        const collection = ["personal", "education", "experience", "skill"];
        collection.forEach((key) => {
          cvData[key] = getItem(key);
        });

        return cvData;
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const isFetchDataEmpty = Object.values(fetchCVData()).every(
      (item) => item === undefined
    );

    if (isFetchDataEmpty) {
      navigate("/");
      return;
    }

    setData(fetchCVData());
  }, []);

  const handlePrint = () => {
    setHideForPrint(true);
    setTimeout(() => window.print());
  };

  const isDataEmpty = Object.values(data).every(
    (item) => item === undefined || Object.keys(item).length === 0
  );

  const { personal, education, experience, skill } = data;

  if (error) {
    return <h1>Something Went Wrong, please try again!</h1>;
  }

  return (
    <>
      {!hideForPrint && <Header />}
      {!hideForPrint && <PreviewButtons onPrint={handlePrint} />}
      {loading && <CircularProgress />}
      {!isDataEmpty && (
        <div className="container">
          <div className="head">
            <h1>
              {Object.keys(personal).length > 0 &&
                personal.fullname.toUpperCase()}
            </h1>
          </div>
          <div className="wrapper">
            <div className="main">
              {Object.keys(personal).length > 0 ? (
                <div className="contact-info">
                  <h2 className="section-title">Contact Information</h2>
                  <ul>
                    <li>Profession: {personal.profession}</li>
                    <li>Email: {personal.email}</li>
                    <li>Phone: {personal.phone}</li>
                    <li>LinkedIn: {personal.social}</li>
                    <li>Location: {personal.address}</li>
                  </ul>
                </div>
              ) : (
                ""
              )}

              {Object.keys(education).length > 0 ? (
                <div className="education">
                  <h2 className="section-title">Education</h2>
                  <div className="section-content">
                    <h3>{education.college.toUpperCase()}</h3>
                    <p>{education.studyField}</p>
                    <p>{education.degree}</p>
                    <p>Graduation Year: {education.gradYear}</p>
                  </div>
                </div>
              ) : (
                ""
              )}

              {Object.keys(experience).length > 0 ? (
                <div className="experience">
                  <h2 className="section-title">Work Experience</h2>
                  <div className="section-content">
                    <h3>{experience.job}</h3>
                    <p>Employeer: {experience.employeer}</p>
                    <p>
                      Duration: {experience.startDate} - {experience.endDate}
                    </p>
                    <p>{experience.work}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="sidebar">
              {Object.keys(skill).length > 0 ? (
                <div className="skills">
                  <h2 className="section-title">Skills</h2>
                  <div className="section-content">
                    <ul>
                      {skill.skills.map((data, indx) => (
                        <li key={indx}>{data}</li>
                      ))}
                      <h2 className="section-title">Languages</h2>
                      <p>{skill.language.trim()}</p>
                      <h2 className="section-title">Soft Skills</h2>
                      <p>{skill.softSkill.trim()}</p>
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
