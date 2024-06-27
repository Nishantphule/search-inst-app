import React, { createContext, useEffect, useState } from "react";

export const ParamsContext = createContext();

export const ParamsProvider = ({ children }) => {
  const [selectedInstCode, setSelectedInstCode] = useState(
    localStorage.getItem("selectedInstCode") || ""
  );
  const [selectedInstId, setSelectedInstId] = useState(
    localStorage.getItem("selectedInstId") || ""
  );
  const [selectedInstName, setSelectedInstName] = useState(
    localStorage.getItem("selectedInstName") || ""
  );
  const [selectedInstDiscipline, setSelectedInstDiscipline] = useState(
    localStorage.getItem("selectedInstDiscipline") || ""
  );

  const [globalRegion, setGlobalRegion] = useState(
    localStorage.getItem("globalRegion") || ""
  );
  const [globalDistrict, setGlobalDistrict] = useState(
    localStorage.getItem("globalDistrict") || ""
  );
  const [globalInstType, setGlobalInstType] = useState(
    localStorage.getItem("globalInstType") || ""
  );
  const [globalStatus, setGlobalStatus] = useState(
    localStorage.getItem("globalStatus") || ""
  );
  const [globalCoursePattern, setGlobalCoursePattern] = useState(
    localStorage.getItem("globalCoursePattern") || ""
  );
  const [globalCourseGroup, setGlobalCourseGroup] = useState(
    localStorage.getItem("globalCourseGroup") || ""
  );
  const [globalCourse, setGlobalCourse] = useState(
    localStorage.getItem("globalCourse") || ""
  );
  const [globalCourseType, setGlobalCourseType] = useState(
    localStorage.getItem("globalCourseType") || ""
  );

  useEffect(() => {
    localStorage.setItem("selectedInstCode", selectedInstCode);
    localStorage.setItem("selectedInstId", selectedInstId);
    localStorage.setItem("selectedInstName", selectedInstName);
    localStorage.setItem("selectedInstDiscipline", selectedInstDiscipline);
    localStorage.setItem("globalRegion", globalRegion);
    localStorage.setItem("globalDistrict", globalDistrict);
    localStorage.setItem("globalInstType", globalInstType);
    localStorage.setItem("globalStatus", globalStatus);
    localStorage.setItem("globalCoursePattern", globalCoursePattern);
    localStorage.setItem("globalCourseGroup", globalCourseGroup);
    localStorage.setItem("globalCourse", globalCourse);
    localStorage.setItem("globalCourseType", globalCourseType);
  }, [
    selectedInstCode,
    selectedInstId,
    selectedInstName,
    selectedInstDiscipline,
    globalRegion,
    globalDistrict,
    globalInstType,
    globalStatus,
    globalCoursePattern,
    globalCourseGroup,
    globalCourse,
    globalCourseType,
  ]);

  return (
    <ParamsContext.Provider
      value={{
        selectedInstCode,
        selectedInstId,
        selectedInstName,
        selectedInstDiscipline,
        globalRegion,
        globalDistrict,
        globalInstType,
        globalStatus,
        globalCoursePattern,
        globalCourseGroup,
        globalCourse,
        globalCourseType,
        setSelectedInstCode,
        setSelectedInstId,
        setSelectedInstName,
        setSelectedInstDiscipline,
        setGlobalRegion,
        setGlobalDistrict,
        setGlobalInstType,
        setGlobalStatus,
        setGlobalCoursePattern,
        setGlobalCourseGroup,
        setGlobalCourse,
        setGlobalCourseType,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};
