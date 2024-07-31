import React, { useContext, useEffect, useState } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstitutesList = () => {
  const navigate = useNavigate();

  // Search Params Variables
  const {
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
    setInstituteDetailsCode,
    setInstituteDetailsId,
    setInstituteDetailsDteCode,
    searchType,
    setGlobalCourseGroup,
    setSelectedInstDiscipline,
  } = useContext(ParamsContext);

  // states
  const [instituteList, setInstituteList] = useState([]);
  const [regionName, setRegionName] = useState("");
  const [districtName, setDistrictName] = useState("");

  //Function to navigate to details page and search dte code and new inst id
  async function handleInstituteDetailsCode(code) {
    navigate("/instituteDetails");
    setInstituteDetailsCode(code);
    const newInstID = await axios
      .get(`http://localhost:3001/instituteSearch/checkInstCode/${code}`)
      .then((response) => response.data[0].new_inst_id);
    setInstituteDetailsId(newInstID);

    const dteCode = await axios
      .get(`http://localhost:3001/instituteDetails/getDteCode/${code}`)
      .then((response) =>
        response.data.length > 0 ? response.data[0].dte_inst_code : ""
      );
    setInstituteDetailsDteCode(dteCode);
  }

  //render discipline according to search
  const renderDiscipline = () => {
    if (selectedInstDiscipline) {
      switch (selectedInstDiscipline) {
        case "ET":
          return "For Engineering / Technology";
        case "PH":
          return "For Pharmacy";
        case "AH":
          return "For Architecture";
        case "HM":
          return "For HMCT";
        case "PM":
          return "For Para-Medical";
        case "EPH":
          return "For Engineering / Technology & Pharmacy";
        case "ST":
          return "For Short Term";
        default:
          return "";
      }
    }
  };

  //Fetch List
  useEffect(() => {
    async function fetchList() {
      if (globalRegion && globalRegion !== "all") {
        const fetchRegion = await axios
          .get(
            `http://localhost:3001/instituteDetails/getRegionName/${globalRegion}`
          )
          .then((response) => response.data);
        console.log(fetchRegion.length ? fetchRegion[0].reg_name : "NA");
        fetchRegion.length
          ? setRegionName(fetchRegion[0].reg_name)
          : setRegionName("");
      } else {
        setRegionName("");
      }

      if (globalDistrict && globalDistrict !== "0") {
        const fetchInstDist = await axios
          .get(
            `http://localhost:3001/instituteDetails/getDistrictName/${globalDistrict}`
          )
          .then((response) => response.data);
        // console.log(fetchInstDist.length ? fetchInstDist[0].dist_name : "NA");
        fetchInstDist.length
          ? setDistrictName(fetchInstDist[0].district)
          : setDistrictName("");
      } else {
        setDistrictName("");
      }

      async function updateInstListData(list) {
        console.log(list);
        const updatedInstituteList = await Promise.all(
          list.map(async (inst) => {
            const fetchRegion = await axios
              .get(
                `http://localhost:3001/instituteDetails/getRegionName/${inst.reg_code}`
              )
              .then((response) => response.data);
            const fetchInstType = await axios
              .get(
                `http://localhost:3001/instituteSearch/getInstituteType/${inst.type}`
              )
              .then((response) => response.data);

            const fetchInstDist = await axios
              .get(
                `http://localhost:3001/instituteSearch/getDistrictName/${inst.inst_id}`
              )
              .then((response) => response.data);
            return {
              ...inst,
              reg_name: fetchRegion[0].reg_name,
              approv_name: fetchInstType[0].approv_name,
              dist_name: fetchInstDist.length ? fetchInstDist[0].dist_name : "",
            };
          })
        );
        return setInstituteList(updatedInstituteList);
      }

      //Condition wise fetched List
      if (selectedInstCode || selectedInstId || selectedInstName) {
        if (selectedInstId) {
          const fetchData = await axios
            .get(
              `http://localhost:3001/instituteSearch/institute/${selectedInstId}?type=id`
            )
            .then((response) => response.data);
          setInstituteList(fetchData);
        } else {
          const fetchData = await axios
            .get(
              `http://localhost:3001/instituteSearch/institute/${
                selectedInstCode || selectedInstName
              }?type=code`
            )
            .then((response) => response.data);
          setInstituteList(fetchData);
        }
      } else if (
        selectedInstDiscipline ||
        globalRegion ||
        globalDistrict ||
        globalInstType ||
        globalStatus ||
        globalCoursePattern ||
        globalCourseGroup ||
        globalCourse ||
        globalCourseType
      ) {
        if (searchType === "SimpleSearch") {
          if (selectedInstDiscipline !== "") {
            const fetchData = await axios
              .get(
                `http://localhost:3001/instituteSearch/institutes?discipline=${selectedInstDiscipline}&region=${globalRegion}&district=${globalDistrict}&instType=${globalInstType}&status=${globalStatus}&coursePat=${globalCoursePattern}&courseGroup=0&course=0&courseType=${globalCourseType}`
              )
              .then((response) => response.data);
            await updateInstListData(fetchData);
          } else {
            setSelectedInstDiscipline("");
            const fetchData = await axios
              .get(
                `http://localhost:3001/instituteSearch/institutes?discipline=&region=${globalRegion}&district=${globalDistrict}&instType=${globalInstType}&status=${globalStatus}&coursePat=${globalCoursePattern}&courseGroup=${globalCourseGroup}&course=${globalCourse}&courseType=${globalCourseType}`
              )
              .then((response) => response.data);
            await updateInstListData(fetchData);
          }
        } else {
          if (globalCourseGroup !== "0" && globalCourseGroup !== "All") {
            setSelectedInstDiscipline("");
            const fetchData = await axios
              .get(
                `http://localhost:3001/instituteSearch/institutes?discipline=&region=${globalRegion}&district=${globalDistrict}&instType=${globalInstType}&status=${globalStatus}&coursePat=${globalCoursePattern}&courseGroup=${globalCourseGroup}&course=${
                  globalCourseGroup !== "All" ? globalCourse : "0"
                }&courseType=${globalCourseType}`
              )
              .then((response) => response.data);
            await updateInstListData(fetchData);
          } else {
            const fetchData = await axios
              .get(
                `http://localhost:3001/instituteSearch/institutes?discipline=${selectedInstDiscipline}&region=${globalRegion}&district=${globalDistrict}&instType=${globalInstType}&status=${globalStatus}&coursePat=${globalCoursePattern}&courseGroup=0&course=0&courseType=${globalCourseType}`
              )
              .then((response) => response.data);
            await updateInstListData(fetchData);
          }
        }
      }
    }
    fetchList();
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

  console.log(instituteList);
  return (
    <div>
      <div style={{ overflow: "auto" }}>
        <table
          style={{ width: "100%" }}
          className="table table-stripped table-bordered"
        >
          <thead className="searchListTableHead">
            <tr>
              <th
                colSpan="9"
                className="text-center"
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
              >
                List Of Institutes
                <b> {renderDiscipline()}</b>
                <b> {districtName ? `For ${districtName} District ` : ""}</b>
                <b> {regionName ? `For ${regionName}` : ""}</b>
              </th>
            </tr>
            <tr>
              <th
                colSpan="9"
                className="text-center"
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
              >
                Institutes with AICTE And Govt Approved Short Term Courses
              </th>
            </tr>
            <tr>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Sr. No.
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Inst Code
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Inst ID
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Status
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Region
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Type
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Institute Name-District
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Intake
              </th>
              <th
                style={{ color: "#506a9e", backgroundColor: "#c9d9f3" }}
                className="text-center"
              >
                Enrolled Candidates
              </th>
            </tr>
          </thead>
          <tbody className="searchListTableBody">
            {instituteList.length ? (
              instituteList.map((institute, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td
                      onClick={() => {
                        handleInstituteDetailsCode(
                          institute.inst_id.replace(/^0+/, "")
                        );
                      }}
                      style={{
                        color: "darkblue",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      title="Click on Inst Code to view Institute Details"
                    >
                      {institute.inst_id.replace(/^0+/, "")}
                    </td>
                    <td>{institute.new_inst_id}</td>
                    <td>
                      {institute.status === "A"
                        ? "Affiliated"
                        : "Not Affiliated"}
                    </td>
                    <td>
                      {institute.dte_region ||
                        institute.reg_name.replace("Region", "")}
                    </td>
                    <td>{institute.approv_name}</td>
                    <td>
                      {institute.inst_name}-{institute.dist_name}
                    </td>
                    <td>{institute.intake >= 0 ? institute.intake : "NA"}</td>
                    <td>{institute.count}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9">
                  <b style={{ color: "Red" }}>No Data Found</b>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="searchListTableFooter">
            <tr>
              <td colSpan="6" className="text-end">
                Total No. Of Institutes:
              </td>
              <td colSpan="3">
                {instituteList.length && instituteList.length}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end">
                Total Intake:
              </td>
              <td colSpan="3">
                {instituteList.length &&
                instituteList.length === 1 &&
                instituteList[0].intake
                  ? instituteList[0].intake
                  : instituteList.reduce(
                      (pre, cur) => {
                        return { sum: pre.sum + cur.intake };
                      },
                      { sum: 0 }
                    ).sum}
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end">
                Total Enrollment(Regular):
              </td>
              <td colSpan="3">0</td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end">
                Total Enrollment(Other):
              </td>
              <td colSpan="3">0</td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end">
                Grand Total Enrollment:
              </td>
              <td colSpan="3">0</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default InstitutesList;
