import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({ currentPageType }) => {
  const isActive = (path) => {
    return currentPageType === path;
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="side-nav-list">
          <Link to="/admin/personal">
            <li
              className={`side-nav-item ${
                isActive("personal") ? "active" : ""
              }`}
            >
              <span
                className={`circle ${
                  isActive("personal") ? "active-circle" : ""
                }`}
              ></span>
              <span>Personal Info</span>
            </li>
          </Link>
          <Link to="/admin/education">
            <li
              className={`side-nav-item ${
                isActive("education") ? "active" : ""
              }`}
            >
              <span
                className={`circle ${
                  isActive("education") ? "active-circle" : ""
                }`}
              ></span>
              <span>Education</span>
            </li>
          </Link>
          <Link to="/admin/experience">
            <li
              className={`side-nav-item ${
                isActive("experience") ? "active" : ""
              }`}
            >
              <span
                className={`circle ${
                  isActive("experience") ? "active-circle" : ""
                }`}
              ></span>
              <span>Experience</span>
            </li>
          </Link>
          <Link to="/admin/skill">
            <li
              className={`side-nav-item ${isActive("skill") ? "active" : ""}`}
            >
              <span
                className={`circle ${isActive("skill") ? "active-circle" : ""}`}
              ></span>
              <span>Skills</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
