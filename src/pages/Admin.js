import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";

export default function Admin() {
  const [openSideNav, setOpenSideNav] = useState(false);
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
      <Header setOpenSideNav={setOpenSideNav}/>
      <div className="admin-container">
        <div className="main">
          <Sidebar
            currentPageType={pageType}
            editMode={state?.editMode || false}
            openSideNav={openSideNav}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}
