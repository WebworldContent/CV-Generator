import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export const FormButtons = ({ onSubmit, isLastPage=false }) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" spacing={6}>
        <Button variant="outlined" onClick={() => navigate("/preview")}>
          Preview
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSubmit}>
          {isLastPage ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </>
  );
};
