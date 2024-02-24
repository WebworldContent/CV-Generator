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
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import useLocalStorage from "../helpers/customeHook";

const skills = [
  "ReactJs",
  "NodeJs",
  "Blockchain",
  "FullStack",
  "Frontend",
  "Backend",
  "Cloud master",
  "AWS",
  "AR VR",
  "blogger",
  "Writter",
  "marketing",
];

export const Skills = () => {
  const [skillInfo, setSkillInfo] = useState({});
  const [skill, setSkill] = useState([]);
  const { setCVInfo } = useContext(CVContext);
  const { setItem } = useLocalStorage("skill");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSkillInfo((preSkill) => ({ ...preSkill, [name]: value }));
  };

  const onSkillSelect = (e) => {
    const { value } = e.target;
    setSkill(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSkillInfo((prevSkill) => ({ ...prevSkill, skills: skill }));
    setCVInfo((cvInfo) => ({ ...cvInfo, skill: skillInfo }));
    setItem(skillInfo);
    navigate("/preview");
  };
  return (
    <div className="main-content">
      <Card style={{ height: "100%" }}>
        <CardContent>
          <h1>Skills Information</h1>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 4, width: "55ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Soft Skills"
              variant="outlined"
              name="softSkill"
              value={skillInfo.softSkill || ""}
              onChange={onChange}
              placeholder="speaking/writing/reading"
            />
            <TextField
              label="Languages"
              name="language"
              value={skillInfo.language || ""}
              onChange={onChange}
              variant="outlined"
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
              <InputLabel id="Skills">Skills</InputLabel>
              <Select
                labelId="skills"
                multiple
                id="skills"
                value={skill}
                name="skills"
                label="Skills"
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                onChange={onSkillSelect}
                maxRows={4}
              >
                {skills.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons onSubmit={onSubmit} isLastPage />
        </CardActions>
      </Card>
    </div>
  );
};
