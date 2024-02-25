import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export const FormButtons = ({
  onSubmit,
  isLastPage = false,
  editMode = false,
  disablebtn = false,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" spacing={6}>
        {editMode && 
          <Button variant="outlined" onClick={(e) => {
            onSubmit(e);
            navigate("/preview");
          }}>
            Preview
          </Button>
        }
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmit} disabled={disablebtn}>
          {isLastPage ? "Finish" : "Next"}
        </Button>
        {disablebtn && <p style={{color: 'red'}}>Please Cover All Sections</p>}
      </Stack>
    </>
  );
};
