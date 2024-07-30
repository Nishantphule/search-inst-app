import React, { useContext, useEffect, useState } from "react";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import axios from "axios";

const InstitutesDetails = () => {
  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to format the date
  const formatDateF = (dateString) => {
    const dateF = dateString.substring(0, 10);
    return dateF;
  };

  // states
  const [aicteCourses, setAicteCourses] = useState([]);
  const [nonaicteCourses, setNonAicteCourses] = useState([]);
  const [ddDetails, setddDetails] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalAmountdd, setTotalAmountDD] = useState(0);
  const [bankCityNames, setBankCityNames] = useState([]);
  const [instDetails, setInstDetails] = useState([]);
  const [instituteInfo, setInstituteInfo] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [regionName, setRegionName] = useState("");

  //Variables from Search params
  const { instituteDetailsCode, instituteDetailsId, instituteDetailsDteCode } =
    useContext(ParamsContext);

  //fetch Institute details
  useEffect(() => {
    async function fetchDetails() {
      const ddDetails = await axios
        .get(
          `http://localhost:3001/instituteDetails/getDDdetails/${instituteDetailsCode}`
        )
        .then((response) => response.data);

      const transactionPays = [...ddDetails].filter((dd) => dd.flag === "T");
      setTransactions(transactionPays);
      console.log(transactionPays, "Transacss");

      setddDetails(ddDetails.filter((dd) => dd.flag !== "T"));
      console.log(ddDetails, "dddetails");

      // Total DD amount
      const ddTotalAmount = ddDetails.reduce(
        (pre, cur) => {
          return { sum: pre.sum + cur.affil_fee };
        },
        { sum: 0 }
      );
      setTotalAmountDD(ddTotalAmount.sum);

      //fetching bank city names
      const bankCity = await axios
        .get(`http://localhost:3001/instituteDetails/getBankCityNames`)
        .then((response) => response.data);
      setBankCityNames(bankCity);

      // Function to replace city codes with city names
      const replaceCityCodes = (bankDetails, cityDetails) => {
        return bankDetails.map((bankDetail) => {
          const matchedCity = cityDetails.find((city) =>
            bankDetail.bank_city.toString().includes(city.city_code.toString())
          );
          if (matchedCity) {
            return {
              ...bankDetail,
              bank_city: matchedCity.city_name,
            };
          }
          return bankDetail; // If no match is found, return the original bank detail
        });
      };

      // replacing the city code with name
      const updatedDDdetails = await replaceCityCodes(ddDetails, bankCity);
      console.log(updatedDDdetails);
      setddDetails(updatedDDdetails);

      const instInfo = await axios
        .get(
          `http://localhost:3001/instituteDetails/getInstInfo/${instituteDetailsCode}`
        )
        .then((response) => response.data);
      console.log(instInfo);
      setInstituteInfo(instInfo);

      const instituteDetails = await axios
        .get(
          `http://localhost:3001/instituteDetails/instituteInfo/${
            instituteDetailsCode || instituteDetailsId
          }`
        )
        .then((response) => response.data);
      console.log(instituteDetails[0].type, "Type");

      const aictecourses = await axios
        .get(
          `http://localhost:3001/instituteDetails/getaictecourses/${instituteDetailsCode}?type=${instituteDetails[0].type}`
        )
        .then((response) => response.data);
      setAicteCourses(aictecourses);

      const nonaictecourses = await axios
        .get(
          `http://localhost:3001/instituteDetails/getnonaictecourses/${instituteDetailsCode}?type=${instituteDetails[0].type}`
        )
        .then((response) => response.data);
      setNonAicteCourses(nonaictecourses);
      console.log(aictecourses, nonaictecourses, "Checking all courses");

      if (instInfo.length > 0) {
        const fetchDistrict = await axios
          .get(
            `http://localhost:3001/instituteDetails/getDistrictName/${instInfo[0].inst_dist}`
          )
          .then((response) => response.data);
        console.log(fetchDistrict, "checking district");
        fetchDistrict.length && setDistrictName(fetchDistrict[0].district);
        console.log(instInfo[0].reg_inst, instInfo[0].inst_dist);

        const fetchRegion = await axios
          .get(
            `http://localhost:3001/instituteDetails/getRegionName/${instInfo[0].reg_inst}`
          )
          .then((response) => response.data);

        setRegionName(fetchRegion[0].reg_name);
      }
    }
    fetchDetails();
  }, [instituteDetailsCode]);
  return (
    <div id="content">
      <div className="whitebox">
        <div className="box_mid" style={{ minHeight: "490px", height: "auto" }}>
          {/* Header */}
          <div className="header header_detail">
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <thead>
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
                      Government Polytechnic Building, 49, Kherwadi, Aliyawar
                      Jung Marg, Bandra (E), Mumbai 400 051.
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
              </thead>
            </table>
          </div>

          {/* Institute Info */}
          {instituteInfo.length > 0 ? (
            <div style={{ overflowX: "scroll" }}>
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className="table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th colSpan="4" style={{ textAlign: "center" }}>
                      Institute Information Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Name</strong>
                    </td>
                    <td width="85%" colSpan="3" valign="middle" align="left">
                      &nbsp;
                      <span id="institute_name">
                        {instituteInfo[0].inst_name}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Address</strong>
                    </td>
                    <td width="80%" colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="institute_address">
                        {instituteInfo[0].inst_address}
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
                        {!instituteInfo[0].inst_ph || !instituteInfo[0].inst_std
                          ? "NA"
                          : `${instituteInfo[0].inst_std} - ${instituteInfo[0].inst_ph}`}
                      </span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Fax No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_fax">
                        {!instituteInfo[0].inst_fax ||
                        !instituteInfo[0].inst_fax_std
                          ? "NA"
                          : `${instituteInfo[0].inst_fax_std} - ${instituteInfo[0].inst_fax}`}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Email ID</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_email">
                        {instituteInfo[0].inst_email}
                      </span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Web Site</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_website">
                        {instituteInfo[0].inst_web
                          ? instituteInfo[0].inst_web
                          : "NA"}
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
                    <td colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="trust_name">{instituteInfo[0].trust_name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Address of Trust</strong>
                    </td>
                    <td colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="trust_address">
                        {instituteInfo[0].trust_address}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Trust Phone No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="trust_phone">
                        {instituteInfo[0].trust_std}-{instituteInfo[0].trust_ph}
                      </span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Trust Email</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="trust_email">
                        {instituteInfo[0].trust_email}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: "scroll" }}>
              <table
                width="100%"
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className="table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th colSpan="4" style={{ textAlign: "center" }}>
                      Institute Information Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Name</strong>
                    </td>
                    <td width="85%" colSpan="3" valign="middle" align="left">
                      &nbsp;
                      <span id="institute_name">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Address</strong>
                    </td>
                    <td width="80%" colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="institute_address">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%", textAlign: "right" }}>
                      <strong>Institute Phone No</strong>
                    </td>
                    <td width="30%" align="left" valign="middle">
                      &nbsp;
                      <span id="institute_phone">NA</span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Fax No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_fax">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Email ID</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_email">NA</span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Web Site</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="institute_website">NA</span>
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
                      <span id="institute_district">NA</span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Institute Region</strong>
                    </td>
                    <td align="left" valign="middle">
                      <strong>
                        &nbsp;<span id="institute_region">NA</span>
                        {/* &nbsp;Region */}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Name of Trust</strong>
                    </td>
                    <td colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="trust_name">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Address of Trust</strong>
                    </td>
                    <td colSpan="3" align="left" valign="middle">
                      &nbsp;
                      <span id="trust_address">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Trust Phone No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="trust_phone">NA</span>
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>
                      <strong>Trust Email</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="trust_email">NA</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Institute Contact */}
          {instituteInfo.length > 0 ? (
            <div style={{ overflowX: "scroll" }}>
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
                      &nbsp;
                      <span id="principal_name">
                        {instituteInfo[0].nam_princpl}
                      </span>
                    </td>
                    <td width="20%" align="right" valign="middle">
                      <strong>Principal's Phone Number</strong>
                    </td>
                    <td width="30%" align="left" valign="middle">
                      &nbsp;
                      <span id="principal_phone">
                        {instituteInfo[0].inst_std}-{instituteInfo[0].inst_ph}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal's Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_mobile">
                        {instituteInfo[0].pri_cell}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Principal's Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_email">
                        {instituteInfo[0].pri_email}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal's Office Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_office_phone">
                        {instituteInfo[0].pri_off_std}-
                        {instituteInfo[0].pri_off_ph}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>
                        Principal's Email Address (Provided By MSBTE)
                      </strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_msbte_email">NS</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal Office Fax Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="principal_fax">
                        {instituteInfo[0].pri_fax_std}-
                        {instituteInfo[0].pri_fax_no}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Contact Person's Name</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_name">
                        {instituteInfo[0].othr_name_per}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Other Person's Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_phone">
                        {instituteInfo[0].othr_std}-{instituteInfo[0].oth_ph}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Person's Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_email">
                        {instituteInfo[0].othr_email}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Other Contact Person's Designation</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_designation">
                        {instituteInfo[0].othr_desig}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="other_contact_mobile">
                        {instituteInfo[0].oth_mobile}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Name</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_name">
                        {instituteInfo[0].coname}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_phone">
                        {instituteInfo[0].costd}-{instituteInfo[0].coph}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_email">
                        {instituteInfo[0].coeid}
                      </span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Designation</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_designation">
                        {instituteInfo[0].codesig}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="coordinator_mobile">
                        {instituteInfo[0].comobile}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: "scroll" }}>
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
                      &nbsp;
                      <span id="principal_name">NA</span>
                    </td>
                    <td width="20%" align="right" valign="middle">
                      <strong>Principal's Phone Number</strong>
                    </td>
                    <td width="30%" align="left" valign="middle">
                      &nbsp;
                      <span id="principal_phone">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal's Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_mobile">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Principal's Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_email">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal's Office Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_office_phone">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>
                        Principal's Email Address (Provided By MSBTE)
                      </strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="principal_msbte_email">NS</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Principal Office Fax Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="principal_fax">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Contact Person's Name</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_name">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Other Person's Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_phone">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Person's Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_email">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>Other Contact Person's Designation</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="other_contact_designation">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Other Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="other_contact_mobile">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Name</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_name">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Phone Number</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_phone">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Email Address</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_email">NA</span>
                    </td>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Designation</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      <span id="coordinator_designation">NA</span>
                    </td>
                  </tr>
                  <tr>
                    <td align="right" valign="middle">
                      <strong>MSBTE Co-Ordinator Mobile Number</strong>
                    </td>
                    <td align="left" valign="middle" colSpan="3">
                      &nbsp;
                      <span id="coordinator_mobile">NA</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Documents details */}
          <div style={{ overflowX: "scroll" }}>
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
                {instituteInfo[0] ? (
                  <>
                    <tr>
                      <td width="20%" align="right" valign="middle">
                        <strong>AICTE Letter No</strong>
                      </td>
                      <td width="30%" align="left" valign="middle">
                        &nbsp;{instituteInfo[0].aicte_letter_no}
                      </td>

                      <td width="20%" align="right" valign="middle">
                        <strong>AICTE Letter Date</strong>
                      </td>
                      <td width="30%" align="left" valign="middle">
                        &nbsp;
                        {instituteInfo[0].aicte_letter_date !== "0000-00-00"
                          ? formatDate(instituteInfo[0].aicte_letter_date)
                          : "00/00/0000"}
                      </td>
                    </tr>
                    <tr>
                      <td align="right" valign="middle">
                        <strong>AICTE Letter Period</strong>
                      </td>
                      <td colSpan="" align="left" valign="middle">
                        &nbsp; From:&nbsp;&nbsp;{instituteInfo[0].aictefromdate}
                        , &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        To:&nbsp;&nbsp;{instituteInfo[0].aictetodate}
                      </td>
                      <td align="right" valign="middle">
                        <strong>Affiliation Year</strong>
                      </td>
                      <td align="left" valign="middle">
                        &nbsp;{instituteInfo[0].affil_year}
                      </td>
                    </tr>
                  </>
                ) : (
                  ""
                )}
                {instituteInfo[0] && (
                  <tr>
                    <td align="right" valign="middle">
                      <strong>Government Letter No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;{instituteInfo[0].govt_letter_no}
                    </td>

                    <td align="right" valign="middle">
                      <strong>Government Letter Date</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      {instituteInfo[0].govt_letter_date !== "0000-00-00"
                        ? formatDate(instituteInfo[0].govt_letter_date)
                        : "00/00/0000"}
                    </td>
                  </tr>
                )}
                {instituteInfo[0] && (
                  <tr>
                    <td align="right" valign="middle">
                      <strong>DTE Letter No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;{instituteInfo[0].dte_letter_no}
                    </td>

                    <td align="right" valign="middle">
                      <strong>DTE Letter Date</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      {instituteInfo[0].dte_letter_date !== "0000-00-00"
                        ? formatDate(instituteInfo[0].dte_letter_date)
                        : "00/00/0000"}
                    </td>
                  </tr>
                )}
                {instituteInfo[0] && (
                  <tr>
                    <td align="right" valign="middle">
                      <strong>PCI Letter No</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      {instituteInfo[0].pci_letter_no
                        ? instituteInfo[0].pci_letter_no
                        : "NA"}
                    </td>
                    <td align="right" valign="middle">
                      <strong>PCI Letter Date</strong>
                    </td>
                    <td align="left" valign="middle">
                      &nbsp;
                      {instituteInfo[0].pci_letter_date !== "0000-00-00"
                        ? formatDate(instituteInfo[0].pci_letter_date)
                        : "00/00/0000"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Institute Transactions details */}
          {transactions.length > 0 && (
            <div style={{ overflowX: "scroll" }}>
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
                      colSpan="8"
                      align="center"
                      style={{ textAlign: "center" }}
                    >
                      Transaction No.(NEFT/ UPI payment) Details of Affiliation
                      Fee:
                    </th>
                  </tr>
                  <tr className="alt">
                    <th width="5%" align="center" valign="middle">
                      Sr No
                    </th>
                    <th width="80%" colSpan="5" align="center" valign="middle">
                      Transaction No.(NEFT/ UPI payment)
                    </th>
                    <th width="7%" colSpan="2" align="left" valign="middle">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((dd, i) => {
                    if (dd.flag === "T") {
                      return (
                        <tr key={i}>
                          <td align="center" valign="middle">
                            {i + 1}
                          </td>
                          <td align="left" colSpan="5" valign="middle">
                            {dd.trans_id}
                          </td>
                          <td align="left" colSpan="2" valign="middle">
                            {dd.affil_fee}
                          </td>
                        </tr>
                      );
                    }
                  })}
                  {ddDetails.length < 1 ? (
                    <tr>
                      <td colSpan="6" align="right" valign="middle">
                        Total Amount
                      </td>
                      <td align="left" valign="middle">
                        {totalAmountdd}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Institute DD details */}
          {ddDetails.length > 0 && (
            <div style={{ overflowX: "scroll" }}>
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
                      colSpan="7"
                      align="center"
                      style={{ textAlign: "center" }}
                    >
                      DD Details of Affiliation Fee:
                    </th>
                  </tr>
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
                </thead>
                <tbody>
                  {ddDetails.map((dd, i) => {
                    if (dd.flag !== "T") {
                      return (
                        <tr key={i}>
                          <td align="center" valign="middle">
                            {i + 1}
                          </td>
                          <td align="center" valign="middle">
                            {dd.dd_no}
                          </td>
                          <td align="left" valign="middle">
                            {formatDate(dd.dd_date)}
                          </td>
                          <td align="left" valign="middle">
                            {dd.bank_name}
                          </td>
                          <td align="left" valign="middle">
                            {dd.bank_area}
                          </td>
                          <td align="left" valign="middle">
                            {dd.bank_city}
                          </td>
                          <td align="left" valign="middle">
                            {dd.affil_fee}
                          </td>
                        </tr>
                      );
                    }
                  })}
                  <tr>
                    <td colSpan="6" align="right" valign="middle">
                      Total Amount
                    </td>
                    <td align="left" valign="middle">
                      {totalAmountdd}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* AICTE Courses */}
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
                      <tr colSpan="18" className="alt_th" key={index}>
                        <th
                          width="100%"
                          colSpan="18"
                          valign="middle"
                          style={{
                            textAlign: "center",
                            color: "#660066",
                            fontSize: "13px",
                          }}
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
                          ? formatDateF(course.affilation_since)
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? formatDateF(course.deaffilation_since)
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? formatDateF(course.closed_since)
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
                          ? formatDateF(course.accridiation_start_since)
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {displayCourseDetails !== "Y"
                          ? formatDateF(course.accridiation_end_since)
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
                          ? formatDateF(course.punitive_start_date)
                          : "--"}
                      </td>
                      <td align="left" valign="middle">
                        {course.punitive_flag === "Y" &&
                        displayCourseDetails !== "Y"
                          ? formatDateF(course.punitive_end_date)
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

          {/* Non-AICTE/Short Term Courses */}
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
                      valign="middle"
                      style={{
                        textAlign: "center",
                        color: "#660066",
                        fontSize: "13px",
                      }}
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
                            ? formatDateF(course.affilation_since)
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? formatDateF(course.deaffilation_since)
                            : "--"}
                        </td>
                        <td align="left" valign="middle">
                          {displayCourseDetails !== "Y"
                            ? formatDateF(course.closed_since)
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

          {/* Footer */}
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
