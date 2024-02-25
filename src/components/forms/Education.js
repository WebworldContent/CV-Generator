import React, { useState, useEffect } from "react";
import { FormButtons } from "./FormButtons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../helpers/customeHook";

export const Education = () => {
  const [education, setEducation] = useState({});
  const [errors, setErrors] = useState({});
  const { state = {} } = useLocation();
  const { getItem, setItem } = useLocalStorage("education");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = getItem("education");
    const hasStoredInfo = !!storedData && Object.keys(storedData).length > 0;

    if (hasStoredInfo) {
      setEducation(storedData);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!education.college) {
      newErrors.college = "College Name is required";
    }

    if (!education.studyField) {
      newErrors.studyField = "Field of study is required";
    }

    if (!education.gradYear) {
      newErrors.gradYear = "Graduation Year is required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(education.gradYear)) { //Regex to check for required Date formate
      newErrors.gradYear = "Invalid date format (DD/MM/YYYY)";
    }

    if (!education.degree) {
      newErrors.degree = "Degree is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({ ...prevEducation, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setItem(education);
      navigate("/admin/experience", {
        state: {
          editMode: state?.editMode || false, //sending data with nagivation object
        },
      });
    }
  };

  return (
    <div className="main-content">
      <Card style={{ height: "100%" }}>
        <CardContent>
          <h1>Education Information</h1>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="College Name"
              name="college"
              value={education.college || ""}
              onChange={onChange}
              variant="outlined"
              error={!!errors.college}
              helperText={errors.college}
            />
            <TextField
              label="Field of study"
              name="studyField"
              value={education.studyField || ""}
              onChange={onChange}
              variant="outlined"
              error={!!errors.studyField}
              helperText={errors.studyField}
            />
            <TextField
              label="Graduation Year"
              variant="outlined"
              name="gradYear"
              value={education.gradYear}
              onChange={onChange}
              placeholder="DD/MM/YYYY"
              error={!!errors.gradYear}
              helperText={errors.gradYear}
            />
          </Box>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "75ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl style={{ width: 300, marginLeft: 30 }}>
              <InputLabel id="degree">Degree</InputLabel>
              <Select
                labelId="degree"
                id="degree"
                value={education.degree || ""}
                name="degree"
                onChange={onChange}
                label="Degree"
                maxRows={4}
                error={!!errors.degree}
              >
                <MenuItem value="Bachelor of Art">Bachelor of Art</MenuItem>
                <MenuItem value="Bachelor of Science">
                  Bachelor of Science
                </MenuItem>
                <MenuItem value="BBA">BBA</MenuItem>
                <MenuItem value="Ph.D">Ph.D</MenuItem>
                <MenuItem value="No Degree">No Degree</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons onSubmit={onSubmit} editMode={state?.editMode || false} />
        </CardActions>
      </Card>
    </div>
  );
};