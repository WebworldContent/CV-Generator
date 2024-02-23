import React, { useContext, useState } from "react";
import { FormButtons } from "./FormButtons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CVContext from "../../context/CVContext";
import { useNavigate } from "react-router-dom";

export const PersonalInfo = () => {
  const [personal, setPersonal] = useState({});
  const { setCVInfo } = useContext(CVContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const {name, value} = e.target;
    setPersonal((prevPersonal) => ({...prevPersonal, [name]: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCVInfo((cvInfo) => ({...cvInfo, personal}));
    navigate('/admin/education');
  };

  return (
    <div className="main-content">
      <Card style={{ height: "100%" }}>
        <CardContent>
          <h1>Personal Information</h1>
          <form className="info-form" onSubmit={onSubmit}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 4, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="FullName"
                value={personal.fullname || ''}
                name="fullname"
                variant="outlined"
                onChange={onChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Profession"
                name="profession"
                value={personal.profession || ''}
                variant="outlined"
                onChange={onChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Email"
                value={personal.email || ''}
                variant="outlined"
                name="email"
                onChange={onChange}
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                value={personal.phone || ''}
                name="phone"
                onChange={onChange}
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="LinkedIn"
                name="social"
                value={personal.social || ''}
                variant="outlined"
                onChange={onChange}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 4, width: "75ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Address"
                value={personal.address || ''}
                multiline
                maxRows={4}
                name="address"
                onChange={onChange}
              />
            </Box>
          </form>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons />
        </CardActions>
      </Card>
    </div>
  );
};
