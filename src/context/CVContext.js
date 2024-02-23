import { createContext } from "react";

const CVContext = createContext({
    personal: {},
    education: {},
    experience: {},
    skill: {}
});

export default CVContext;