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
        <div className="row">
          <div className="col-12 col-md-6">
            <label htmlFor="">Region:</label>
            <select className="form-control" name="" id="">
              <option value="">All Regions</option>
              {regions.map((region) => {
                return <option>{region} Region</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">District:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Institute Type:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Status:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Course Pattern:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Course Group:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Course:</label>
            <select className="form-control" name="" id=""></select>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Course Type:</label>
            <select className="form-control" name="" id=""></select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteAdvSearch;
