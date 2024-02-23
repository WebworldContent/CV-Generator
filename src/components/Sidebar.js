import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const isActive = (path) => {
    return "education" === path;
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="side-nav-list">
          <Link to='/admin/personal'>
            <li className={`side-nav-item ${isActive("/") ? "active" : ""}`}>
              <span
                className={`circle ${isActive("/") ? "active-circle" : ""}`}
              ></span>
              <span to="/">Personal Info</span>
            </li>
          </Link>
          <Link to='/admin/education'>
            <li
              className={`side-nav-item ${
                isActive("/education") ? "active" : ""
              }`}
            >
              <span
                className={`circle ${
                  isActive("/education") ? "active-circle" : ""
                }`}
              ></span>
              <span to="/education">Education</span>
            </li>
          </Link>
          <Link to='/admin/experience'>
            <li
              className={`side-nav-item ${
                isActive("/experience") ? "active" : ""
              }`}
            >
              <span
                className={`circle ${
                  isActive("/experience") ? "active-circle" : ""
                }`}
              ></span>
              <span to="/experience">Experience</span>
            </li>
          </Link>
          <Link to='/admin/skill'>
            <li
              className={`side-nav-item ${isActive("/skills") ? "active" : ""}`}
            >
              <span
                className={`circle ${
                  isActive("/skills") ? "active-circle" : ""
                }`}
              ></span>
              <span to="/skills">Skills</span>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
