import React, { useContext } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";

const AdvInstitutesList = () => {
  const {
    globalRegion,
    globalDistrict,
    globalInstType,
    globalStatus,
    globalCoursePattern,
    globalCourseGroup,
    globalCourse,
    globalCourseType,
  } = useContext(ParamsContext);
  return (
    <div>
      AdvInstitutesList - globalRegion:{globalRegion}, globalDistrict:
      {globalDistrict}, globalInstType:{globalInstType}, globalStatus:
      {globalStatus}, globalCoursePattern:{globalCoursePattern},
      globalCourseGroup:{globalCourseGroup}, globalCourse:{globalCourse},
      globalCourseType:{globalCourseType},
    </div>
  );
};

export default AdvInstitutesList;
