import React, { useState, useEffect } from "react";
import { FormButtons } from "./FormButtons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../helpers/customeHook";

export const Experience = () => {
  const [experience, setExperience] = useState({});
  const [errors, setErrors] = useState({});
  const { state = {} } = useLocation();
  const { getItem, setItem } = useLocalStorage("experience");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = getItem("experience");
    const hasStoredInfo = !!storedData && Object.keys(storedData).length > 0;

    if (hasStoredInfo) {
      setExperience(storedData);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!experience.job) {
      newErrors.job = "Job Title is required";
    }

    if (!experience.employeer) {
      newErrors.employeer = "Employer is required";
    }

    if (!experience.startDate) {
      newErrors.startDate = "Start Date is required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(experience.startDate)) { // Regex to check for date formate
      newErrors.startDate = "Invalid date format (DD/MM/YYYY)";
    }

    if (!experience.presentDate && !experience.endDate) {
      newErrors.endDate = "End Date is required";
    } else if (
      experience.endDate &&
      !/^\d{2}\/\d{2}\/\d{4}$/.test(experience.endDate) // Regex to check for date formate
    ) {
      newErrors.endDate = "Invalid date format (DD/MM/YYYY)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setItem(experience);
      navigate("/admin/skill", {
        state: {
          editMode: state?.editMode || false,
        },
      });
    }
  };

  return (
    <div className="main-content">
      <Card style={{ height: "100%" }}>
        <CardContent>
          <h1>Experience Information</h1>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Job Title"
              name="job"
              value={experience.job || ""}
              onChange={onChange}
              variant="outlined"
              error={!!errors.job}
              helperText={errors.job}
            />
            <TextField
              label="Employer"
              name="employeer"
              value={experience.employeer || ""}
              onChange={onChange}
              variant="outlined"
              error={!!errors.employeer}
              helperText={errors.employeer}
            />
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Start Date"
              variant="outlined"
              name="startDate"
              value={experience.startDate || ""}
              onChange={onChange}
              placeholder="DD/MM/YYYY"
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
            <TextField
              label="End Date"
              variant="outlined"
              name="endDate"
              value={experience.endDate || ""}
              onChange={onChange}
              placeholder="DD/MM/YYYY"
              disabled={experience.presentDate || false}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "75ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Work"
              name="work"
              value={experience.work || ""}
              onChange={onChange}
              placeholder="What work you do here"
              multiline
              maxRows={4}
            />
          </Box>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons
            onSubmit={onSubmit}
            editMode={state?.editMode || false}
          />
        </CardActions>
      </Card>
    </div>
  );
};