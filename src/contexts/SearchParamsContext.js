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
    localStorage.getItem("globalRegion") || "0"
  );
  const [globalDistrict, setGlobalDistrict] = useState(
    localStorage.getItem("globalDistrict") || "0"
  );
  const [globalInstType, setGlobalInstType] = useState(
    localStorage.getItem("globalInstType") || "0"
  );
  const [globalStatus, setGlobalStatus] = useState(
    localStorage.getItem("globalStatus") || "all"
  );
  const [globalCoursePattern, setGlobalCoursePattern] = useState(
    localStorage.getItem("globalCoursePattern") || "0"
  );
  const [globalCourseGroup, setGlobalCourseGroup] = useState(
    localStorage.getItem("globalCourseGroup") || "0"
  );
  const [globalCourse, setGlobalCourse] = useState(
    localStorage.getItem("globalCourse") || "0"
  );
  const [globalCourseType, setGlobalCourseType] = useState(
    localStorage.getItem("globalCourseType") || "all"
  );

  const [instituteDetailsCode, setInstituteDetailsCode] = useState(
    localStorage.getItem("instituteDetailsCode") || ""
  );

  const [instituteDetailsId, setInstituteDetailsId] = useState(
    localStorage.getItem("instituteDetailsId") || ""
  );

  const [instituteDetailsDteCode, setInstituteDetailsDteCode] = useState(
    localStorage.getItem("instituteDetailsDteCode") || ""
  );

  const [searchType, setSearchType] = useState(
    localStorage.getItem("searchType") || ""
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
    localStorage.setItem("instituteDetailsCode", instituteDetailsCode);
    localStorage.setItem("instituteDetailsId", instituteDetailsId);
    localStorage.setItem("instituteDetailsDteCode", instituteDetailsDteCode);
    localStorage.setItem("searchType", searchType);
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
    instituteDetailsCode,
    instituteDetailsId,
    instituteDetailsDteCode,
    searchType,
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
        instituteDetailsCode,
        instituteDetailsId,
        instituteDetailsDteCode,
        searchType,
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
        setInstituteDetailsCode,
        setInstituteDetailsId,
        setInstituteDetailsDteCode,
        setSearchType,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};
