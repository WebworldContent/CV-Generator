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
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../helpers/customeHook";

const skillsList = [
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
  "Writer",
  "marketing",
];

export const Skills = () => {
  const [skillInfo, setSkillInfo] = useState({});
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const { getItem, setItem } = useLocalStorage("skill");
  const navigate = useNavigate();

  const isAllSectionsDone = () => {
    const sections = [getItem('personal'), getItem('education'), getItem('experience')];
    return sections.every((section) => !!section);
  };

  useEffect(() => {
    const storedData = getItem("skill");
    const hasStoredInfo = !!storedData && Object.keys(storedData).length > 0;

    if (hasStoredInfo) {
      setSkillInfo(storedData);
      setSkills(storedData.skills || []);
    }
  }, [getItem]);

  const validateForm = () => {
    const newErrors = {};

    if (skillInfo.softSkill && skillInfo.softSkill.length > 255) {
      newErrors.softSkill = "Soft Skills should be 255 characters or less";
    }

    if (skillInfo.language && skillInfo.language.length > 255) {
      newErrors.language = "Languages should be 255 characters or less";
    }

    if (!skills || skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSkillInfo((prevSkill) => ({ ...prevSkill, [name]: value }));
  };

  const onSkillSelect = (selectedSkills) => {
    setSkills(selectedSkills);
    setSkillInfo((prevSkill) => ({ ...prevSkill, skills: selectedSkills }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setItem(skillInfo);
      navigate("/preview");
    }
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
              placeholder="speaking,writing,reading"
              error={!!errors.softSkill}
              helperText={errors.softSkill}
            />
            <TextField
              label="Languages"
              name="language"
              value={skillInfo.language || ""}
              onChange={onChange}
              variant="outlined"
              placeholder="hindi,english,spanish"
              error={!!errors.language}
              helperText={errors.language}
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
              <InputLabel id="skills">Skills</InputLabel>
              <Select
                labelId="skills"
                multiple
                id="skills"
                value={skills}
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
                onChange={(e) => onSkillSelect(e.target.value)}
                maxRows={4}
                error={!!errors.skills}
                helperText={errors.skills}
              >
                {skillsList.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions className="buttons">
          <FormButtons onSubmit={onSubmit} isLastPage disablebtn={!isAllSectionsDone()}/>
        </CardActions>
      </Card>
    </div>
  );
};