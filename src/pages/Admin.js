import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const matchPath = useMatch("/admin/:pageType");
  const {
    params: { pageType = "" } = {},
  } = matchPath || {};

  useEffect(() => {
    navigate("personal");
  }, []);

  return (
    <>
      <Header />
      <div className="admin-container">
        <div className="main">
          <Sidebar currentPageType={pageType} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
