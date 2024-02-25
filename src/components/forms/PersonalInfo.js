import React, { useEffect, useState } from "react";
import { FormButtons } from "./FormButtons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../helpers/customeHook";

export const PersonalInfo = () => {
  const [personal, setPersonal] = useState({});
  const [errors, setErrors] = useState({});
  const { state = {} } = useLocation();
  const { getItem, setItem } = useLocalStorage("personal");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = getItem("personal");
    const hasStoredPersonalInfo =
      !!storedData && Object.keys(storedData).length > 0;

    if (hasStoredPersonalInfo) {
      setPersonal(storedData);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!personal.fullname) {
      newErrors.fullname = "Full Name is required";
    }

    if (!personal.profession) {
      newErrors.profession = "Profession is required";
    }

    if (!personal.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(personal.email)) { // Regex for email type checking
      newErrors.email = "Invalid email address";
    }

    if (!personal.phone) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prevPersonal) => ({ ...prevPersonal, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      setItem(personal);
      navigate("/admin/education", {
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
          <h1>Personal Information</h1>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="FullName"
              value={personal.fullname || ""}
              name="fullname"
              variant="outlined"
              onChange={onChange}
              required
              error={!!errors.fullname}
              helperText={errors.fullname}
            />
            <TextField
              id="outlined-basic"
              label="Profession"
              name="profession"
              value={personal.profession || ""}
              variant="outlined"
              onChange={onChange}
              required
              error={!!errors.profession}
              helperText={errors.profession}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              value={personal.email || ""}
              variant="outlined"
              name="email"
              onChange={onChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              value={personal.phone || ""}
              name="phone"
              onChange={onChange}
              variant="outlined"
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              id="outlined-basic"
              label="LinkedIn"
              name="social"
              value={personal.social || ""}
              variant="outlined"
              onChange={onChange}
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
              label="Address"
              value={personal.address || ""}
              multiline
              maxRows={4}
              name="address"
              onChange={onChange}
            />
          </Box>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons onSubmit={onSubmit} editMode={state?.editMode || false}/>
        </CardActions>
      </Card>
    </div>
  );
};
