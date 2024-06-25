import React, { useState } from "react";

const InstituteAdvSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedInstType, setSelectedInstType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCoursePattern, setSelectedCoursePattern] = useState("");
  const [selectedCourseGroup, setSelectedCourseGroup] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");

  const regions = ["Mumbai", "Pune", "Nagpur", "Chhatrapati Sambhaji Nagar"];
  const [districts, setDistricts] = useState(["Nashik", "Pune", "Akola"]);
  const [instituteTypes, setInstituteTypes] = useState([
    "All",
    "Aided Autonomous",
    "Learn & Earn",
    "Government Autonomous",
    "Government",
    "Government Aided",
    "UnAided",
    "Unaided Double Shift",
  ]);
  const [statusList, setStatusList] = useState([
    "Affiliated",
    "Not Affiliated",
    "All",
  ]);
  const [coursePatterns, setCoursePatterns] = useState([
    "All",
    "Yearly Full-Time",
    "Yearly Part-Time",
    "Semester Full-Time",
    "Semester Part-Time",
  ]);

  const [courseGroups, setCourseGroups] = useState(["All"]);
  const [subCourse, setSubCourse] = useState(["All"]);
  const [courseTypeList, setCourseTypeList] = useState([
    "All",
    "AICTE Approved",
    "Short Term",
  ]);

  return (
    <div>
      <form>
        <div className="row p-1">
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="region">Region:</label>
            <select className="form-control" name="region" id="region">
              <option value="all">All Regions</option>
              {regions.map((region) => {
                return <option>{region} Region</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="district">District:</label>
            <select className="form-control" name="district" id="district">
              <option value="">---Select District---</option>
              {districts.map((district) => {
                return <option>{district}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="instituteType">Institute Type:</label>
            <select
              className="form-control"
              name="instituteType"
              id="instituteType"
            >
              {instituteTypes.map((inst) => {
                return <option>{inst}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="">Status:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="">Course Pattern:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="">Course Group:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="">Course:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="">Course Type:</label>
            <select className="form-control" name="" id=""></select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteAdvSearch;
