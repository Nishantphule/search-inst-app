import React, { useContext, useEffect, useState } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import axios from "axios";

const InstitutesDetails = () => {
  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [aicteCourses, setAicteCourses] = useState([]);
  const [nonaicteCourses, setNonAicteCourses] = useState([]);
  const [ddDetails, setddDetails] = useState([]);
  const [instituteInfo, setInstituteInfo] = useState({});
  const [districtName, setDistrictName] = useState("");
  const [regionName, setRegionName] = useState("");
  const { instituteDetailsCode, instituteDetailsId, instituteDetailsDteCode } =
    useContext(ParamsContext);
  useEffect(() => {
    async function fetchDetails() {
      const ddDetails = await axios
        .get(
          `http://localhost:3001/instituteDetails/getDDdetails/${instituteDetailsCode}`
        )
        .then((response) => response.data);
      setddDetails(ddDetails);
      const instInfo = await axios
        .get(
          `http://localhost:3001/instituteDetails/getInstInfo/${instituteDetailsCode}`
        )
        .then((response) => response.data);
      console.log(instInfo);
      setInstituteInfo(instInfo[0]);
      const fetchDistrict = await axios
        .get(
          `http://localhost:3001/instituteDetails/getDistrictName/${instInfo[0].inst_dist}`
        )
        .then((response) => response.data);

      setDistrictName(fetchDistrict[0].district);
      console.log(instInfo[0].reg_inst, instInfo[0].inst_dist);
      const fetchRegion = await axios
        .get(
          `http://localhost:3001/instituteDetails/getRegionName/${instInfo[0].reg_inst}`
        )
        .then((response) => response.data);

      setRegionName(fetchRegion[0].reg_name);
    }
    fetchDetails();
  }, [instituteDetailsCode]);

  return (
    <div id="content">
      <div className="whitebox">
        <div className="box_mid" style={{ minHeight: "490px", height: "auto" }}>
          <div className="header">
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <tr>
                <th width="18%">
                  <img
                    width="110"
                    src={require("../../assests/imgs/maha1.gif")}
                    alt="Maharashtra State Board"
                  />
                </th>
                <th
                  className="Header"
                  valign="middle"
                  align="center"
                  style={{ textAlign: "center" }}
                >
                  <h1>
                    Maharashtra State Board of Technical Education, Mumbai
                  </h1>
                  <h2>
                    Government Polytechnic Building, 49, Kherwadi, Aliyawar Jung
                    Marg, Bandra (E), Mumbai 400 051.
                  </h2>
                  <div>
                    Institute Affiliation Information Form for Year{" "}
                    <span id="affil_year">2024-2025</span>
                  </div>
                  <div>
                    Institute Code&nbsp;
                    <span id="institute_code">{instituteDetailsCode}</span>
                    &nbsp;&nbsp;
                    <font color="red">
                      Institute ID&nbsp;
                      <span id="institute_id">{instituteDetailsId}</span>
                    </font>
                    <br />
                    DTE Code&nbsp;
                    <a title="Click on Inst Code to view Details of Institute.">
                      <font color="blue">
                        <span id="dte_code">{instituteDetailsDteCode}</span>
                      </font>
                    </a>
                  </div>
                </th>
              </tr>
            </table>
          </div>

          <table
            width="100%"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            className="table-bordered"
          >
            <thead>
              <tr>
                <th colspan="4" style={{ textAlign: "center" }}>
                  Institute Information Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Name</strong>
                </td>
                <td width="85%" colspan="3" valign="middle" align="left">
                  &nbsp;
                  <span id="institute_name">{instituteInfo.inst_name}</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Address</strong>
                </td>
                <td width="80%" colspan="3" align="left" valign="middle">
                  &nbsp;
                  <span id="institute_address">
                    {instituteInfo.inst_address}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "20%", textAlign: "right" }}>
                  <strong>Institute Phone No</strong>
                </td>
                <td width="30%" align="left" valign="middle">
                  &nbsp;
                  <span id="institute_phone">
                    {!instituteInfo.inst_ph || !instituteInfo.inst_std
                      ? "NA"
                      : `${instituteInfo.inst_std} - ${instituteInfo.inst_ph}`}
                  </span>
                </td>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Fax No</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="institute_fax">
                    {!instituteInfo.inst_fax || !instituteInfo.inst_fax_std
                      ? "NA"
                      : `${instituteInfo.inst_fax_std} - ${instituteInfo.inst_fax}`}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Email ID</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="institute_email">{instituteInfo.inst_email}</span>
                </td>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Web Site</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="institute_website">
                    {instituteInfo.inst_web ? instituteInfo.inst_web : "NA"}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute District</strong>
                </td>
                <td
                  style={{
                    width: "15%",
                    textAlign: "left",
                    valign: "middle",
                  }}
                >
                  &nbsp;
                  <span id="institute_district">{districtName}</span>
                </td>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Institute Region</strong>
                </td>
                <td align="left" valign="middle">
                  <strong>
                    &nbsp;<span id="institute_region">{regionName}</span>
                    {/* &nbsp;Region */}
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Name of Trust</strong>
                </td>
                <td colspan="3" align="left" valign="middle">
                  &nbsp;<span id="trust_name">Trust Name</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Address of Trust</strong>
                </td>
                <td colspan="3" align="left" valign="middle">
                  &nbsp;<span id="trust_address">Trust Address</span>
                </td>
              </tr>
              <tr>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Trust Phone No</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="trust_phone">Trust Phone</span>
                </td>
                <td style={{ width: "15%", textAlign: "right" }}>
                  <strong>Trust Email</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="trust_email">Trust Email</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            width="100%"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            className="table-bordered"
          >
            <thead>
              <tr>
                <th colspan="4" style={{ textAlign: "center" }}>
                  Institute Contact Details:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="20%" align="right" valign="middle">
                  <strong>Principal Name</strong>
                </td>
                <td width="30%" valign="middle" align="left">
                  &nbsp;<span id="principal_name">Principal Name</span>
                </td>
                <td width="20%" align="right" valign="middle">
                  <strong>Principal's Phone Number</strong>
                </td>
                <td width="30%" align="left" valign="middle">
                  &nbsp;<span id="principal_phone">Principal Phone</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Principal's Mobile Number</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="principal_mobile">Principal Mobile</span>
                </td>
                <td align="right" valign="middle">
                  <strong>Principal's Email Address</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="principal_email">Principal Email</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Principal's Office Phone Number</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="principal_office_phone">
                    Principal Office Phone
                  </span>
                </td>
                <td align="right" valign="middle">
                  <strong>Principal's Email Address (Provided By MSBTE)</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="principal_msbte_email">Principal MSBTE Email</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Principal Office Fax Number</strong>
                </td>
                <td align="left" valign="middle" colspan="3">
                  &nbsp;<span id="principal_fax">Principal Fax</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Other Contact Person's Name</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="other_contact_name">Other Contact Name</span>
                </td>
                <td align="right" valign="middle">
                  <strong>Other Person's Phone Number</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="other_contact_phone">Other Contact Phone</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Other Person's Email Address</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="other_contact_email">Other Contact Email</span>
                </td>
                <td align="right" valign="middle">
                  <strong>Other Contact Person's Designation</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="other_contact_designation">
                    Other Contact Designation
                  </span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>Other Mobile Number</strong>
                </td>
                <td align="left" valign="middle" colspan="3">
                  &nbsp;<span id="other_contact_mobile">Other Mobile</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>MSBTE Co-Ordinator Name</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="coordinator_name">Coordinator Name</span>
                </td>
                <td align="right" valign="middle">
                  <strong>MSBTE Co-Ordinator Phone Number</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="coordinator_phone">Coordinator Phone</span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>MSBTE Co-Ordinator Email Address</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;<span id="coordinator_email">Coordinator Email</span>
                </td>
                <td align="right" valign="middle">
                  <strong>MSBTE Co-Ordinator Designation</strong>
                </td>
                <td align="left" valign="middle">
                  &nbsp;
                  <span id="coordinator_designation">
                    Coordinator Designation
                  </span>
                </td>
              </tr>
              <tr>
                <td align="right" valign="middle">
                  <strong>MSBTE Co-Ordinator Mobile Number</strong>
                </td>
                <td align="left" valign="middle" colspan="3">
                  &nbsp;
                  <span id="coordinator_mobile">Coordinator Mobile</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            width="100%"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            className="table-bordered"
          >
            <thead>
              <tr>
                <th colSpan="4" style={{ textAlign: "center" }}>
                  Approval Letter Details
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Replace the following conditional rendering with dynamic data as needed */}
              {true && (
                <>
                  <tr>
                    <td width="20%" align="right" valign="middle">
                      <strong>AICTE Letter No</strong>
                    </td>
                    <td width="30%" align="left" valign="middle">
                      &nbsp;AICTE Letter No
                    </td>

                    <td width="20%" align="right" valign="middle">
                      <strong>AICTE Letter Date</strong>
                    </td>
                    <td width="30%" align="left" valign="middle">
                      &nbsp;AICTE Letter Date
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>AICTE Letter Period</strong>
                    </td>
                    <td colSpan="" align="left" valign="middle">
                      &nbsp; From:&nbsp;&nbsp;AICTE From Date,
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      To:&nbsp;&nbsp;AICTE To Date
                    </td>
                    <td align="right" valign="middle">
                      <strong>Affiliation Year</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;Affiliation Year
                    </td>
                  </tr>
                </>
              )}
              {true && (
                <tr>
                  <td align="right" valign="middle">
                    <strong>Government Letter No</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;Government Letter No
                  </td>

                  <td align="right" valign="middle">
                    <strong>Government Letter Date</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;Government Letter Date
                  </td>
                </tr>
              )}
              {true && (
                <tr>
                  <td align="right" valign="middle">
                    <strong>DTE Letter No</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;DTE Letter No
                  </td>

                  <td align="right" valign="middle">
                    <strong>DTE Letter Date</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;DTE Letter Date
                  </td>
                </tr>
              )}
              {true && (
                <tr>
                  <td align="right" valign="middle">
                    <strong>PCI Letter No</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;PCI Letter No
                  </td>
                  <td align="right" valign="middle">
                    <strong>PCI Letter Date</strong>
                  </td>
                  <td align="left" valign="middle">
                    &nbsp;PCI Letter Date
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {true ? (
            <table
              width="100%"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="table-bordered"
            >
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    align="center"
                    style={{ textAlign: "center" }}
                  >
                    Transaction No.(NEFT/ UPI payment) Details of Affiliation
                    Fee:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="alt">
                  <th width="1%" align="center" valign="middle">
                    Sr No
                  </th>
                  <th width="80%" align="center" valign="middle">
                    Transaction No.(NEFT/ UPI payment)
                  </th>
                  <th width="10%" align="left" valign="middle">
                    Amount
                  </th>
                </tr>
                <tr>
                  <td align="center" valign="middle">
                    1
                  </td>
                  <td align="center" valign="middle">
                    Transaction ID
                  </td>
                  <td align="left" valign="middle">
                    Affiliation Fee
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table
              width="100%"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="table-bordered"
            >
              <thead>
                <tr>
                  <th colSpan="7" align="left">
                    DD Details of Affiliation Fee:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="alt">
                  <th width="6%" align="center" valign="middle">
                    Sr No
                  </th>
                  <th width="7%" align="center" valign="middle">
                    DD No
                  </th>
                  <th width="12%" align="left" valign="middle">
                    DD Date
                  </th>
                  <th align="center" valign="middle">
                    Bank Name
                  </th>
                  <th align="center" valign="middle">
                    Bank Area
                  </th>
                  <th align="center" valign="middle">
                    Bank City
                  </th>
                  <th width="7%" align="center" valign="middle">
                    Amount
                  </th>
                </tr>
                <tr>
                  <td align="center" valign="middle">
                    1
                  </td>
                  <td align="center" valign="middle">
                    DD No
                  </td>
                  <td align="left" valign="middle">
                    DD Date
                  </td>
                  <td align="left" valign="middle">
                    Bank Name
                  </td>
                  <td align="center" valign="middle">
                    Bank Area
                  </td>
                  <td align="center" valign="middle">
                    Bank City
                  </td>
                  <td align="center" valign="middle">
                    Affiliation Fee
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" align="right" valign="middle">
                    Total DD Amount
                  </td>
                  <td align="center" valign="middle">
                    Total Amount
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <div style={{ overflow: "scroll" }}>
            <table
              width="100%"
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="table-bordered"
            >
              <tr>
                <th colSpan="18" align="left">
                  Institute Affiliated Courses:
                </th>
              </tr>
              <tr className="alt">
                <th align="center" width="3%" valign="middle">
                  Sr.No
                </th>
                <th align="center" width="5%" valign="middle">
                  Code
                </th>
                <th align="left" width="15%" valign="middle">
                  Course Name [Start Year]
                </th>
                <th align="center" width="5%" valign="middle">
                  De-Affiliated
                </th>
                <th align="center" width="5%" valign="middle">
                  Closed By AICTE / <br /> Applied For Closure
                </th>
                <th align="center" width="5%" valign="middle">
                  Affiliation From{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  De-Affiliation From{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Closed By AICTE From / Applied For Closure From{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  NBA Accreditation{" "}
                  <font style={{ fontSize: "9px", color: "blue" }}>
                    (Y-Yes,N-No)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Accreditation From Date{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Accreditation To Date{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Punitive Action{" "}
                </th>
                <th align="center" width="5%" valign="middle">
                  Punitive From Date{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Punitive To Date{" "}
                  <font style={{ fontSize: "9px", color: "red" }}>
                    (YYYY-MM-DD)
                  </font>
                </th>
                <th align="center" width="5%" valign="middle">
                  Block BY MSBTE{" "}
                </th>
                <th align="center" width="5%" valign="middle">
                  Duration
                </th>
                <th align="center" width="7%" valign="middle">
                  Course Pattern
                </th>
                <th align="center" width="5%" valign="middle">
                  Intake
                </th>
              </tr>
              {aicteCourses.map((course, index) => {
                const displayCourseDetails =
                  course.block_by_msbte === "Y" ? "Y" : "N";
                return (
                  <React.Fragment key={index}>
                    {index === 0 && (
                      <tr colSpan="18" className="alt_th">
                        <th
                          width="100%"
                          colSpan="18"
                          align="center"
                          valign="middle"
                          style={{ color: "#660066", fontSize: "13px" }}
                        >
                          AICTE Approved{" "}
                          {course.length > 1 ? "Courses" : "Course"}
                        </th>
                      </tr>
                    )}
                    <tr
                      style={
                        displayCourseDetails === "Y"
                          ? { backgroundColor: "#ffff66" }
                          : {}
                      }
                    >
                      <td align="center" valign="middle">
                        {index + 1}
                      </td>
                      <td align="center" valign="middle">
                        {course.code}
                      </td>
                      <td align="left" valign="middle">
                        <strong>
                          {course.name} - [{course.start_year}]
                          {displayCourseDetails === "Y" && <br />}
                          {displayCourseDetails === "Y" && (
                            <strong style={{ color: "red" }}>
                              {" "}
                              &nbsp;(Block BY MSBTE)
                            </strong>
                          )}
                        </strong>
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y" ? (
                          course.allow_affil === "D" ? (
                            <strong style={{ color: "red" }}>YES</strong>
                          ) : (
                            "NO"
                          )
                        ) : (
                          "--"
                        )}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y" ? (
                          course.closed_by_aicte === "Y" ? (
                            <strong style={{ color: "green" }}>
                              Closed By AICTE
                            </strong>
                          ) : course.applied_for_closure === "Y" ? (
                            <strong style={{ color: "blue" }}>
                              Applied for Closure
                            </strong>
                          ) : (
                            "NO"
                          )
                        ) : (
                          "--"
                        )}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.affilation_since
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.deaffilation_since
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.closed_since
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y" ? (
                          course.accridation === "Y" ? (
                            <strong style={{ color: "red" }}>YES</strong>
                          ) : (
                            "NO"
                          )
                        ) : (
                          "--"
                        )}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.accridiation_start_since
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.accridiation_end_since
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y" ? (
                          course.punitive_flag === "Y" ? (
                            <strong style={{ color: "red" }}>Yes</strong>
                          ) : (
                            "NO"
                          )
                        ) : (
                          "--"
                        )}
                      </td>
                      <td align="left" valign="middle">
                        {course.punitive_flag === "Y" &&
                        displayCourseDetails !== "Y"
                          ? course.punitive_start_date
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {course.punitive_flag === "Y" &&
                        displayCourseDetails !== "Y"
                          ? course.punitive_end_date
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {course.block_by_msbte === "Y" ? (
                          <strong style={{ color: "red" }}>Yes</strong>
                        ) : (
                          "NO"
                        )}
                      </td>
                      <td align="center" valign="middle">
                        {displayCourseDetails !== "Y" ? course.duration : "--"}
                      </td>
                      <td align="center" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? {
                              1: "Yearly Full Time",
                              2: "Yearly Part-Time",
                              3: "Semester Full Time",
                              4: "Semester Part-Time",
                            }[course.pattern_code] || ""
                          : "--"}
                      </td>
                      <td align="center" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? course.closed_by_aicte === "Y" ||
                            course.allow_affil === "D"
                            ? "0"
                            : course.intake
                          : "--"}
                        {course.punitive_flag === "Y" &&
                          displayCourseDetails !== "Y" &&
                          " #"}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                <td
                  colSpan="18"
                  style={{
                    color: "red",
                    fontSize: "9px",
                    fontWeight: "bold",
                  }}
                >
                  # - Punitive Action against the Institute
                  <br />
                </td>
              </tr>
            </table>
          </div>
          <div style={{ overflow: "scroll" }}>
            {
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className="table-bordered"
              >
                <thead>
                  <tr className="alt">
                    <th align="center" width="3%" valign="middle">
                      Sr.No
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Code
                    </th>
                    <th align="left" width="15%" valign="middle">
                      Course Name [Start Year]
                    </th>
                    <th align="center" width="5%" valign="middle">
                      De-Affiliated
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Closed By AICTE / <br /> Applied For Closure
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Affiliation From{" "}
                      <span style={{ fontSize: "9px", color: "red" }}>
                        (YYYY-MM-DD)
                      </span>
                    </th>
                    <th align="center" width="5%" valign="middle">
                      De-Affiliation From{" "}
                      <span style={{ fontSize: "9px", color: "red" }}>
                        (YYYY-MM-DD)
                      </span>
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Closed By AICTE From / Applied For Closure From{" "}
                      <span style={{ fontSize: "9px", color: "red" }}>
                        (YYYY-MM-DD)
                      </span>
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Block BY MSBTE{" "}
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Duration
                    </th>
                    <th align="center" width="7%" valign="middle">
                      Course Pattern
                    </th>
                    <th align="center" width="5%" valign="middle">
                      Intake
                    </th>
                  </tr>
                  <tr className="alt_th">
                    <th
                      width="100%"
                      colSpan="12"
                      align="center"
                      valign="middle"
                      style={{ color: "#660066", fontSize: "13px" }}
                    >
                      Short Term{" "}
                      {nonaicteCourses.length > 1 ? "Courses" : "Course"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nonaicteCourses.map((course, index) => {
                    const displayCourseDetails =
                      course.block_by_msbte === "Y" ? "Y" : "N";
                    return (
                      <tr
                        key={index}
                        style={
                          displayCourseDetails === "Y"
                            ? { backgroundColor: "#ffff66" }
                            : {}
                        }
                      >
                        <td align="center" valign="middle">
                          {index + 1}
                        </td>
                        <td align="center" valign="middle">
                          {course.code}
                        </td>
                        <td align="left" valign="middle">
                          <strong>
                            {course.name} - [{course.start_year}]
                            {displayCourseDetails === "Y" && <br />}
                            {displayCourseDetails === "Y" && (
                              <span style={{ color: "red" }}>
                                {" "}
                                (Block BY MSBTE)
                              </span>
                            )}
                          </strong>
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y" ? (
                            course.allow_affil === "D" ? (
                              <strong style={{ color: "red" }}>YES</strong>
                            ) : (
                              "NO"
                            )
                          ) : (
                            "--"
                          )}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.closed_by_aicte === "Y"
                              ? "Closed By AICTE"
                              : course.applied_for_closure === "Y"
                              ? "Applied for Closure"
                              : "NO"
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.affilation_since
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.deaffilation_since
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.closed_since
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {course.block_by_msbte === "Y" ? (
                            <strong style={{ color: "red" }}>Yes</strong>
                          ) : (
                            "NO"
                          )}
                        </td>
                        <td align="center" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.duration
                            : "--"}
                        </td>
                        <td align="center" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.pattern_code === 1
                              ? "Yearly Full Time"
                              : course.pattern_code === 2
                              ? "Yearly Part-Time"
                              : course.pattern_code === 3
                              ? "Semester Full Time"
                              : course.pattern_code === 4
                              ? "Semester Part-Time"
                              : course.pattern_code === 5
                              ? "Semester Correspondence"
                              : course.pattern_code === 6
                              ? "Yearly Correspondence"
                              : "--"
                            : "--"}
                        </td>
                        <td align="center" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? course.closed_by_aicte === "Y" ||
                              course.allow_affil === "D"
                              ? "0"
                              : course.intake
                            : "--"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
          </div>
          <div>
            {
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className="table-bordered"
              >
                <tr className="alt_th">
                  <td align="left" valign="middle">
                    <span style={{ color: "red" }}>Remark:-&nbsp;&nbsp;</span>
                    {/* {"*" || remarkPost} */}
                    <span style={{ color: "red" }}>*</span>
                  </td>
                </tr>
              </table>
            }
            <div className="notebox">
              <h2>Note : </h2>
              <ul>
                <li>
                  This is an Information filled by Institute only for the
                  purpose of Affiliation with MSBTE.
                </li>
              </ul>
            </div>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th height="5" colSpan="2" align="left" valign="middle">
                    &nbsp;
                  </th>
                </tr>
                <tr style={{ fontSize: "11px" }}>
                  <th
                    width="50%"
                    style={{ textAlign: "left", paddingLeft: "5px" }}
                    valign="middle"
                  >
                    Information Last Updated On {formatDate(Date.now())}
                  </th>
                  <th
                    width="55%"
                    style={{ textAlign: "right", paddingRight: "5px" }}
                    valign="middle"
                  >
                    &nbsp;&nbsp;Url : -
                    <a href="https://online.msbte.co.in/msbte24/index.php">
                      https://online.msbte.co.in/msbte24/index.php
                    </a>
                  </th>
                </tr>
                <tr>
                  <th height="5" colSpan="2" align="left" valign="middle">
                    &nbsp;
                  </th>
                </tr>
              </thead>
            </table>
            <center>
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                id="tblPrint"
              >
                <tr>
                  <td align="center" width="100%">
                    <form>
                      <input
                        type="button"
                        value="Print This Page"
                        onClick={() => window.print()}
                        className="btn-blue"
                      />
                    </form>
                  </td>
                </tr>
                <tr>
                  <th height="5" colSpan="2" align="left" valign="middle">
                    &nbsp;
                  </th>
                </tr>
              </table>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutesDetails;
