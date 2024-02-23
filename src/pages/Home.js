import React from "react";
import { Header } from "../components/Header";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="main-container">
        <h1>Generate Your CV</h1>
        <Button variant="contained" color="success" size="large" onClick={() => navigate('/admin')}>
          Build CV
        </Button>
      </div>
    </>
  );
}
