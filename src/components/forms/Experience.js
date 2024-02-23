import React, { useContext, useState } from "react";
import { FormButtons } from "./FormButtons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CVContext from "../../context/CVContext";
import { useNavigate } from "react-router-dom";

export const Experience = () => {
  const [experience, setExperience] = useState({});
  const { setCVInfo } = useContext(CVContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
  };

  const onChecked = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setExperience((prevExperience) => ({
        ...prevExperience,
        [name]: checked,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCVInfo((cvInfo) => ({ ...cvInfo, experience }));
    navigate("/admin/skill");
  };
  return (
    <div className="main-content">
      <Card style={{ height: "100%" }}>
        <CardContent>
          <h1>Experience Information</h1>
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
                label="Job Title"
                name="job"
                value={experience.job || ""}
                onChange={onChange}
                variant="outlined"
                required
              />
              <TextField
                label="Employeer"
                name="employeer"
                value={experience.employeer || ""}
                onChange={onChange}
                variant="outlined"
                required
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 4, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Start Date"
                variant="outlined"
                name="stateDate"
                value={experience.stateDate || ""}
                onChange={onChange}
                placeholder="DD/MM/YYYY"
                required
              />
              <TextField
                label="End Date"
                variant="outlined"
                name="endDate"
                value={experience.endDate || ""}
                onChange={onChange}
                placeholder="DD/MM/YYYY"
                disabled={experience.presentDate || false}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={experience.presentDate || false}
                    name="presentDate"
                    value={experience.presentDate || ""}
                    onChange={onChecked}
                  />
                }
                label="Present"
                labelPlacement="Present"
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
                label="Work"
                placeholder="What work you do here"
                multiline
                maxRows={4}
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
