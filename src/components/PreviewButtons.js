import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export const PreviewButtons = ({ onPrint }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={6}
      useFlexGap
      justifyContent={"center"}
      marginTop={5}
    >
      <Button
        variant="contained"
        onClick={() =>
          navigate("/admin", {
            state: {
              editMode: true,
            },
          })
        }
      >
        Edit
      </Button>
      <Button variant="contained" onClick={onPrint}>
        Download
      </Button>
    </Stack>
  );
};
