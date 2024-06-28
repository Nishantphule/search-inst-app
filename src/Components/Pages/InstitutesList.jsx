import React, { useContext, useEffect, useState } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstitutesList = () => {
  const navigate = useNavigate();

  const {
    selectedInstCode,
    selectedInstId,
    selectedInstName,
    selectedInstDiscipline,
  } = useContext(ParamsContext);

  const [instituteList, setInstituteList] = useState([]);

  useEffect(() => {
    async function fetchList() {
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
      }
    }
    fetchList();
  }, [
    selectedInstCode,
    selectedInstId,
    selectedInstName,
    selectedInstDiscipline,
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
            {instituteList.map((institute, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td
                    onClick={() => navigate("/instituteDetails")}
                    style={{
                      color: "darkblue",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {institute.inst_id.replace(/^0+/, "")}
                  </td>
                  <td>{institute.new_inst_id}</td>
                  <td>
                    {institute.status === "A" ? "Affiliated" : "Not Affiliated"}
                  </td>
                  <td>{institute.dte_region}</td>
                  <td>{institute.approv_name}</td>
                  <td>
                    {institute.inst_name}-{institute.dist_name}
                  </td>
                  <td>{institute.intake}</td>
                  <td>{institute.count}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="searchListTableFooter">
            <tr>
              <td colSpan="6" className="text-end">
                Total No. Of Institutes:
              </td>
              <td colSpan="3">1</td>
            </tr>
            <tr>
              <td colSpan="6" className="text-end">
                Total Intake:
              </td>
              <td colSpan="3">360</td>
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
