import React from "react";
import { Link } from "react-router-dom";

const nav = ['personal', 'education', 'experience', 'skill'];

export const Sidebar = ({ currentPageType, editMode = false }) => {
  const isActive = (path) => {
    return currentPageType === path;
  };

  const listElement = (elem, indx) => (<li key={indx}
    className={`side-nav-item ${
      isActive(elem) ? "active" : ""
    }`}
  >
    <span
      className={`circle ${
        isActive(elem) ? "active-circle" : ""
      }`}
    ></span>
    <span>{elem.toUpperCase()}</span>
  </li>);

  const listWrapper = (element, indx) => {
    if (!editMode) {
      return <Link to={`/admin/${element}`} key={indx}>{listElement(element, indx)}</Link>
    }
    return listElement(element, indx);
  } 

  return (
    <div className="sidebar">
      <nav>
        <ul className="side-nav-list">
          {nav.map((list, indx) => listWrapper(list, indx))}
        </ul>
      </nav>
    </div>
  );
};
