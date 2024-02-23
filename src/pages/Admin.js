import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <Header />
      <div className="admin-container">
        <div className="main">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
