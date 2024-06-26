import axios from "axios";
import React, { useEffect, useState } from "react";

const InstituteAdvSearch = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedInstType, setSelectedInstType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCoursePattern, setSelectedCoursePattern] = useState("");
  const [selectedCourseGroup, setSelectedCourseGroup] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");

  const [regions, setRegions] = useState([
    "Mumbai",
    "Pune",
    "Nagpur",
    "Chhatrapati Sambhaji Nagar",
  ]);
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

  useEffect(() => {
    async function fetchDropdownData() {
      const fetchRegions = await axios
        .get("http://localhost:3001/instituteAdvSearch/regionsList")
        .then((response) => response.data);
      setRegions(fetchRegions);

      const fetchDistricts = await axios
        .get("http://localhost:3001/instituteAdvSearch/districtsList")
        .then((response) => response.data);
      setDistricts(fetchDistricts);
      const fetchInstituteTypes = await axios
        .get("http://localhost:3001/instituteAdvSearch/instituteTypeList")
        .then((response) => response.data);
      setInstituteTypes(fetchInstituteTypes);
    }

    fetchDropdownData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row p-1">
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="region">
              <b>Region:</b>
            </label>
            <select className="form-control" name="region" id="region">
              <option value="all">All Regions</option>
              {regions.map((region) => {
                return (
                  <option value={region.reg_code}>{region.reg_name}</option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="district">
              <b>District:</b>
            </label>
            <select className="form-control" name="district" id="district">
              <option value="">---Select District---</option>
              {districts.map((district) => {
                return (
                  <option value={district.code}>{district.district}</option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="instituteType">
              <b>Institute Type:</b>
            </label>
            <select
              className="form-control"
              name="instituteType"
              id="instituteType"
            >
              {instituteTypes.map((inst) => {
                return (
                  <option value={inst.approv_id}>{inst.approv_name}</option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="status">
              <b>Status:</b>
            </label>
            <select className="form-control" name="status" id="status">
              {statusList.map((status) => {
                return <option>{status}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="coursePattern">
              <b>Course Pattern:</b>
            </label>
            <select
              className="form-control"
              name="coursePattern"
              id="coursePattern"
            >
              {coursePatterns.map((pattern) => {
                return <option>{pattern}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="courseGroup">
              <b>Course Group:</b>
            </label>
            <select
              className="form-control"
              name="courseGroup"
              id="courseGroup"
            >
              {courseGroups.map((group) => {
                return <option>{group}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="subCourse">
              <b>Course:</b>
            </label>
            <select className="form-control" name="subCourse" id="subCourse">
              {subCourse.map((sub) => {
                return <option>{sub}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="courseType">
              <b>Course Type:</b>
            </label>
            <select className="form-control" name="courseType" id="courseType">
              {courseTypeList.map((type) => {
                return <option>{type}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mt-3 d-flex order-3 justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              Search
            </button>
            <button type="reset" className="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteAdvSearch;
