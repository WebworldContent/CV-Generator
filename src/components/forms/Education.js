import React, { useContext, useState } from "react";
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
import CVContext from "../../context/CVContext";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../helpers/customeHook";

export const Education = () => {
  const [education, setEducation] = useState({});
  const { setCVInfo } = useContext(CVContext);
  const { setItem } = useLocalStorage("education");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({ ...prevEducation, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCVInfo((cvInfo) => ({ ...cvInfo, education }));
    setItem(education);
    navigate("/admin/experience");
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
              required
            />
            <TextField
              label="Field of study"
              name="studyField"
              value={education.studyField || ""}
              onChange={onChange}
              variant="outlined"
            />
            <TextField
              label="Graduation Year"
              variant="outlined"
              name="gradYear"
              value={education.gradYear}
              onChange={onChange}
              placeholder="DD/MM/YYYY"
              required
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
          <FormButtons onSubmit={onSubmit} />
        </CardActions>
      </Card>
    </div>
  );
};
