import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const matchPath = useMatch("/admin/:pageType");
  const { state = {} } = useLocation();
  const { params: { pageType = "" } = {} } = matchPath || {};

  useEffect(() => {
    navigate("personal", {
      state: {
        editMode: state?.editMode || false,
      },
    });
    // Below comment is to silent unwanted dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="admin-container">
        <div className="main">
          <Sidebar
            currentPageType={pageType}
            editMode={state?.editMode || false}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}
