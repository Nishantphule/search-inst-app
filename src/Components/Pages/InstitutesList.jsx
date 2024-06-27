import React, { useContext } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";

const InstitutesList = () => {
  const {
    selectedInstCode,
    selectedInstId,
    selectedInstName,
    selectedInstDiscipline,
  } = useContext(ParamsContext);
  return (
    <div>
      InstitutesList -{selectedInstCode}
      {selectedInstId}
      {selectedInstName}
      {selectedInstDiscipline}
      <table className="table table-stripped table-bordered">
        <thead>
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
        <tbody></tbody>
        <tfoot>
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
  );
};

export default InstitutesList;
