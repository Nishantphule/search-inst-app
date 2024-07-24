import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import { toast } from "react-toastify";

const InstituteAdvSearch = () => {
  const {
    globalRegion,
    globalDistrict,
    globalInstType,
    globalStatus,
    globalCoursePattern,
    globalCourseGroup,
    globalCourse,
    globalCourseType,
    setGlobalRegion,
    setGlobalDistrict,
    setGlobalInstType,
    setGlobalStatus,
    setGlobalCoursePattern,
    setGlobalCourseGroup,
    setGlobalCourse,
    setGlobalCourseType,
    setSearchType,
    setSelectedInstCode,
    setSelectedInstId,
    setSelectedInstName,
  } = useContext(ParamsContext);

  const [selectedRegion, setSelectedRegion] = useState(globalRegion);
  const [selectedDistrict, setSelectedDistrict] = useState(globalDistrict);
  const [selectedInstType, setSelectedInstType] = useState(globalInstType);
  const [selectedStatus, setSelectedStatus] = useState(globalStatus);
  const [selectedCoursePattern, setSelectedCoursePattern] =
    useState(globalCoursePattern);
  const [selectedCourseGroup, setSelectedCourseGroup] =
    useState(globalCourseGroup);
  const [selectedCourse, setSelectedCourse] = useState(globalCourse);
  const [selectedCourseType, setSelectedCourseType] =
    useState(globalCourseType);

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [statusList, setStatusList] = useState([
    { name: "Affiliated", value: "affiliated" },
    { name: "Not Affiliated", value: "notaffiliated" },
    { name: "All", value: "all" },
  ]);
  const [coursePatterns, setCoursePatterns] = useState([]);

  const [courseGroups, setCourseGroups] = useState([]);
  const [subCourse, setSubCourse] = useState([]);
  const [courseTypeList, setCourseTypeList] = useState([
    { name: "All", value: "all" },
    { name: "AICTE Approved", value: "A" },
    { name: "Short Term", value: "S" },
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

      const fetchCoursePatterns = await axios
        .get("http://localhost:3001/instituteAdvSearch/coursePatternList")
        .then((response) => response.data);
      setCoursePatterns(fetchCoursePatterns);

      const fetchCourseGroups = await axios
        .get("http://localhost:3001/instituteAdvSearch/courseGroupList")
        .then((response) => response.data);
      setCourseGroups(fetchCourseGroups);
    }

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (selectedCourseGroup !== "") {
      async function fetchCourses() {
        console.log(selectedCourseGroup, "checking course group");
        const fetchCourses = await axios
          .get(
            `http://localhost:3001/instituteAdvSearch/courseList/${selectedCourseGroup}`
          )
          .then((response) => response.data);
        setSubCourse(fetchCourses);
      }

      fetchCourses();
    }
  }, [selectedCourseGroup]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/instituteSearchList");
    setGlobalRegion(selectedRegion);
    setGlobalDistrict(selectedDistrict);
    setGlobalInstType(selectedInstType);
    setGlobalStatus(selectedStatus);
    setGlobalCoursePattern(selectedCoursePattern);
    setGlobalCourseGroup(selectedCourseGroup);
    setGlobalCourse(selectedCourse);
    setGlobalCourseType(selectedCourseType);
    setSelectedInstCode("");
    setSelectedInstId("");
    setSelectedInstName("");
    setSearchType("AdvSearch");
  };
  const handleReset = (e) => {
    setSelectedRegion("0");
    setSelectedDistrict("0");
    setSelectedInstType("0");
    setSelectedStatus("affiliated");
    setSelectedCoursePattern("0");
    setSelectedCourseGroup("0");
    setSelectedCourse("0");
    setSelectedCourseType("all");
    setSelectedInstDiscipline("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row p-1">
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="region">
              <b>Region:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setGlobalRegion(e.target.value);
              }}
              value={selectedRegion}
              className="form-control"
              name="region"
              id="region"
            >
              <option value="all">All Regions</option>
              {regions.map((region) => {
                return (
                  <option key={region.reg_code} value={region.reg_code}>
                    {region.reg_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="district">
              <b>District:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setGlobalDistrict(e.target.value);
              }}
              value={selectedDistrict}
              className="form-control"
              name="district"
              id="district"
            >
              <option value="">---Select District---</option>
              {districts.map((district) => {
                return (
                  <option key={district.code} value={district.code}>
                    {district.district}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="instituteType">
              <b>Institute Type:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedInstType(e.target.value);
                setGlobalInstType(e.target.value);
              }}
              value={selectedInstType}
              className="form-control"
              name="instituteType"
              id="instituteType"
            >
              <option value="All">All</option>
              {instituteTypes.map((inst) => {
                return (
                  <option key={inst.approv_id} value={inst.approv_id}>
                    {inst.approv_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="status">
              <b>Status:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setGlobalStatus(e.target.value);
              }}
              value={selectedStatus}
              className="form-control"
              name="status"
              id="status"
            >
              {statusList.map((status, i) => {
                return (
                  <option key={i} value={status.value}>
                    {status.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="coursePattern">
              <b>Course Pattern:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedCoursePattern(e.target.value);
                setGlobalCoursePattern(e.target.value);
              }}
              value={selectedCoursePattern}
              className="form-control"
              name="coursePattern"
              id="coursePattern"
            >
              <option value="All">All</option>
              {coursePatterns.map((pattern) => {
                return (
                  <option key={pattern.code} value={pattern.code}>
                    {pattern.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="courseGroup">
              <b>Course Group:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedCourseGroup(e.target.value);
                setGlobalCourseGroup(e.target.value);
              }}
              value={selectedCourseGroup}
              className="form-control"
              name="courseGroup"
              id="courseGroup"
            >
              <option value="All">All</option>
              {courseGroups.map((group) => {
                return (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="subCourse">
              <b>Course:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setGlobalCourse(e.target.value);
              }}
              value={selectedCourse}
              className="form-control"
              name="subCourse"
              id="subCourse"
            >
              <option value="All">All</option>
              {subCourse.map((sub) => {
                return (
                  <option key={sub.course_id} value={sub.course_id}>
                    {sub.course_code}-{sub.course_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3 p-1">
            <label htmlFor="courseType">
              <b>Course Type:</b>
            </label>
            <select
              onChange={(e) => {
                setSelectedCourseType(e.target.value);
                setGlobalCourseType(e.target.value);
              }}
              value={selectedCourseType}
              className="form-control"
              name="courseType"
              id="courseType"
            >
              {courseTypeList.map((type) => {
                return (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 mt-3 d-flex order-3 justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              Search
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteAdvSearch;
