import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import { toast } from "react-toastify";

const InstituteSearch = () => {
  const navigate = useNavigate();
  // const constructQuery = async () => {
  //   let newQuery = `SELECT * FROM institutes WHERE `;

  //   if (icode !== "") {
  //     newQuery += `inst_id = ${icode}`;
  //   } else {
  //     let conditions = [];
  //     let isSelected = "N";

  //     if (filters.discip !== "0") {
  //       isSelected = "Y";
  //       conditions.push(`discipline = ${filters.discip}`);
  //     }

  //     if (filters.region !== 0) {
  //       if (filters.region === "5005") {
  //         conditions.push(`inst_id IN ('998','999')`);
  //       } else {
  //         conditions.push(`reg_code = ${filters.region}`);
  //       }
  //       isSelected = "Y";
  //     }

  //     if (filters.insttype !== 0) {
  //       conditions.push(`type = ${filters.insttype}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.inst_status === "affiliated") {
  //       conditions.push(`status = 'A'`);
  //       isSelected = "Y";
  //     } else if (filters.inst_status === "notaffiliated") {
  //       conditions.push(`status != 'A'`);
  //       isSelected = "N";
  //     }

  //     if (filters.course !== 0) {
  //       conditions.push(`course_id = ${filters.course}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.course_start) {
  //       conditions.push(
  //         `start_year ${filters.course_start} ${filters.course_inst_code}`
  //       );
  //       isSelected = "Y";
  //     }

  //     if (filters.course_type) {
  //       conditions.push(`course_type1 = '${filters.course_type}'`);
  //       isSelected = "Y";
  //     }

  //     if (filters.start_year) {
  //       conditions.push(
  //         `inst_start_year ${filters.start_year} ${filters.start_inst_code}`
  //       );
  //       isSelected = "Y";
  //     }

  //     if (filters.courseid !== 0) {
  //       conditions.push(`course_id = ${filters.courseid}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.cgroup4 !== "0") {
  //       conditions.push(`group_id = ${filters.cgroup4}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.cpattern !== 0) {
  //       conditions.push(`pattern_code = ${filters.cpattern}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.district !== 0) {
  //       conditions.push(`inst_dist = ${filters.district}`);
  //       isSelected = "Y";
  //     }

  //     if (filters.gender !== "0" && filters.gender !== "") {
  //       conditions.push(`gender = '${filters.gender}'`);
  //       isSelected = "Y";
  //     }

  //     if (filters.discip !== "") {
  //       const disciplineGroups = {
  //         PH: "G25",
  //         AH: ["G11", "G26"],
  //         HM: "G24",
  //         PM: "G6",
  //         EPH: [
  //           "G12",
  //           "G13",
  //           "G14",
  //           "G15",
  //           "G16",
  //           "G17",
  //           "G18",
  //           "G19",
  //           "G20",
  //           "G21",
  //           "G22",
  //           "G23",
  //           "G25",
  //         ],
  //         ST: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
  //       };
  //       const groupIds = disciplineGroups[filters.discip] || [
  //         "G12",
  //         "G13",
  //         "G14",
  //         "G15",
  //         "G16",
  //         "G17",
  //         "G18",
  //         "G19",
  //         "G20",
  //         "G21",
  //         "G22",
  //         "G23",
  //       ];
  //       conditions.push(`group_id IN (${groupIds.join(", ")})`);
  //     }

  //     newQuery += conditions.join(" AND ");

  //     if (isSelected === "N") {
  //       const fetchedIcode = await fetchInstituteCode(dtecode);
  //       if (fetchedIcode) {
  //         setIcode(fetchedIcode);
  //       }
  //     }
  //   }

  //   setQuery(newQuery);
  // };

  // constructQuery();
  const {
    setSelectedInstCode,
    setSelectedInstId,
    setSelectedInstName,
    setSelectedInstDiscipline,
  } = useContext(ParamsContext);

  const [instCode, setInstCode] = useState("");
  const [searchInstCode, setSearchInstCode] = useState("");
  const [instId, setInstId] = useState("");
  const [instName, setInstName] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [dteCode, setDteCode] = useState("");
  const [filteredInstituteNames, setFilteredInstituteNames] = useState([]);
  const [instituteNameInput, setInstituteNameInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dteErrorMessage, setDteErrorMessage] = useState("");

  const handleRadioChange = (event) => {
    setSelectedDiscipline(event.target.value);
    setSelectedInstDiscipline(event.target.value);
  };

  const handleInstIdChange = (event) => {
    setInstId(event.target.value);
    setSelectedInstId(event.target.value);
  };

  const handleInstCodeChange = (event) => {
    setInstCode(event.target.value);
    setSelectedInstCode(event.target.value);
  };

  const handleDteCodeChange = (event) => {
    const dteCode = event.target.value;
    setDteCode(dteCode);
  };

  const [instituteNames, setInstituteNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetch = await axios.get(
        "http://localhost:3001/instituteSearch/institutesList"
      );
      const data = fetch.data;
      setInstituteNames(data);
    }
    fetchData();
  }, []);

  async function resetForm() {
    setInstCode("");
    setInstId("");
    setInstName("");
    setInstituteNameInput("");
    setSelectedDiscipline("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function checkInstCode() {
      let flag;
      const fetchData = await axios
        .get(`http://localhost:3001/instituteSearch/checkInstCode/${instCode}`)
        .then((response) => response.data);
      if (fetchData.length) flag = true;
      else {
        flag = false;
        toast.error("Please Check Institute Code");
      }
      return flag;
    }

    async function checkInstId() {
      let flag;
      const fetchData = await axios
        .get(`http://localhost:3001/instituteSearch/checkInstId/${instId}`)
        .then((response) => response.data);
      if (fetchData.length) flag = true;
      else {
        flag = false;
        toast.error("Please Check Institute Id");
      }
      return flag;
    }

    if (validateForm()) {
      setSelectedInstDiscipline(selectedDiscipline);
      setSelectedInstCode(instCode);
      setSelectedInstId(instId);
      setSelectedInstName(instName);
      if (instCode) {
        if (await checkInstCode()) {
          navigate("/instituteSearchList");
        }
      } else if (instId) {
        if (await checkInstId()) {
          navigate("/instituteSearchList");
        }
      } else {
        navigate("/instituteSearchList");
      }
    }
  };

  const validateForm = () => {
    const filledOptions = [
      instCode,
      instId,
      instName,
      selectedDiscipline,
    ].filter((option) => option !== "");

    if (filledOptions.length === 0) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      setErrorMessage(
        "Please select or type at least one option from Institute Code, ID, Name, or Discipline."
      );
      toast.error(
        "Please select or type at least one option from Institute Code, ID, Name, or Discipline.!!"
      );
      return false;
    } else if (filledOptions.length > 1) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      setErrorMessage(
        "Please select only one option from Institute Code, ID, Name, or Discipline."
      );
      toast.error(
        "Please select only one option from Institute Code, ID, Name, or Discipline!!"
      );
      return false;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setErrorMessage("");
      return true;
    }
  };

  const handleSearchInstCode = async () => {
    if (dteCode) {
      try {
        const fetch = await axios.get(
          `http://localhost:3001/instituteSearch/getInstCode/${dteCode}`
        );
        const res = fetch.data;
        setSearchInstCode(res[0].inst_code);
        setInstCode(res[0].inst_code);
        setDteErrorMessage("");
      } catch (error) {
        setSearchInstCode("");
        setInstCode("");
        toast.error("Institute code Not Found!! Try another DTE Code.");
        setDteErrorMessage("Institute code Not Found!! Try another DTE Code.");
      }
    } else {
      setSearchInstCode("");
      setInstCode("");
      toast.error("Please Enter DTE Code.");
      setDteErrorMessage("Please Enter DTE Code.");
    }
  };

  const handleInstituteNameInput = (event) => {
    const inputValue = event.target.value;
    setInstituteNameInput(inputValue);

    if (inputValue) {
      const filtered = instituteNames.filter((inst) => {
        const name = `${inst.inst_id.replace(/^0+/, "")} - ${inst.inst_name}`;
        return name
          .toLowerCase()
          .trim()
          .includes(inputValue.toLowerCase().trim());
      });
      setSelectedInstName(filtered[0].inst_id.replace(/^0+/, ""));
      setFilteredInstituteNames(filtered);
      setIsDropdownVisible(true);
    } else {
      setFilteredInstituteNames(instituteNames);
    }
  };

  const handleInstituteNameSelect = (name, id) => {
    setInstituteNameInput(name);
    setInstName(id);
    setSelectedInstName(id.replace(/^0+/, ""));
    setIsDropdownVisible(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-8 order-md-1 order-2">
            <div className="row mb-4 mt-sm-3 mt-md-0">
              <div className="text-center mb-3">
                <h6 style={{ color: "Red" }}>
                  <b>Select Any One from below</b>
                </h6>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="msbtecode1">
                  <b>MSBTE Institute Code:</b>
                </label>
                <input
                  placeholder="Type Institute Code..."
                  onChange={handleInstCodeChange}
                  value={instCode}
                  id="msbtecode1"
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="col-12 d-md-none">
                <h5 className="text-center my-3">OR</h5>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="msbtecode2">
                  <b>MSBTE Institute Id:</b>
                </label>
                <input
                  placeholder="Type Institute Id..."
                  onChange={handleInstIdChange}
                  id="msbtecode2"
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="col-12 d-md-none">
                <h5 className="text-center my-3">OR</h5>
              </div>

              <div className="col-12 d-none d-md-flex justify-content-center align-items-center">
                <h5 className="mx-3">OR</h5>
              </div>

              <div
                className="col-12 col-lg-6 mb-3"
                onMouseLeave={() => setIsDropdownVisible(false)}
              >
                <label htmlFor="institutename">
                  <b>Select Institute Name:</b>
                </label>
                <input
                  autoComplete="false"
                  onMouseEnter={() => setIsDropdownVisible(true)}
                  onChange={handleInstituteNameInput}
                  value={instituteNameInput}
                  onFocus={() => {
                    setFilteredInstituteNames(instituteNames);
                    setIsDropdownVisible(true);
                  }}
                  id="institutename"
                  type="text"
                  placeholder="Select Institute Name..."
                  className="form-control"
                />
                {isDropdownVisible && (
                  <select
                    size="5"
                    className="form-control position-absolute w-100"
                    style={{ zIndex: 1 }}
                  >
                    <option
                      value=""
                      onClick={() => {
                        handleInstituteNameSelect("");
                        setIsDropdownVisible(false);
                      }}
                    >
                      ---Select Institute Name---
                    </option>
                    {!instituteNameInput
                      ? instituteNames.map((inst, index) => {
                          let name = `${inst.inst_id.replace(/^0+/, "")} - ${
                            inst.inst_name
                          }`;
                          return (
                            <option
                              key={index}
                              onClick={() =>
                                handleInstituteNameSelect(name, inst.inst_id)
                              }
                            >
                              {inst.inst_id.replace(/^0+/, "")} -{" "}
                              {inst.inst_name}
                            </option>
                          );
                        })
                      : filteredInstituteNames.map((inst, index) => {
                          let name = `${inst.inst_id.replace(/^0+/, "")} - ${
                            inst.inst_name
                          }`;
                          return (
                            <option
                              key={index}
                              onClick={() =>
                                handleInstituteNameSelect(name, inst.inst_id)
                              }
                            >
                              {inst.inst_id.replace(/^0+/, "")} -{" "}
                              {inst.inst_name}
                            </option>
                          );
                        })}
                  </select>
                )}
              </div>

              <div className="col-12 d-md-none">
                <h5 className="text-center my-3">OR</h5>
              </div>

              <div className="col-12 col-lg-6 mb-3">
                <label htmlFor="discipline">
                  <b>Discipline:</b>
                </label>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="ET"
                    id="radio1"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "ET"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio1" className="form-check-label">
                    Engineering Technology
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="PH"
                    id="radio2"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "PH"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio2" className="form-check-label">
                    Pharmacy
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="EPH"
                    id="radio3"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "EPH"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio3" className="form-check-label">
                    Engineering Technology + Pharmacy
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="AH"
                    id="radio4"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "AH"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio4" className="form-check-label">
                    Architecture
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="HM"
                    id="radio5"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "HM"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio5" className="form-check-label">
                    HMCT
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="PM"
                    id="radio6"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "PM"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio6" className="form-check-label">
                    Para Medical
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="ST"
                    id="radio7"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "ST"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio7" className="form-check-label">
                    Non-AICTE
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 order-md-2 order-1 mb-3">
            <div className="mb-2">
              <label htmlFor="dtecode">
                <b>DTE CODE :</b>
              </label>
              <input
                type="text"
                id="dtecode"
                name="dtecode"
                title="Enter DTE code to Search Institute..."
                className="form-control"
                placeholder="Enter DTE code to Search Institute..."
                onChange={handleDteCodeChange}
              />
            </div>
            <div className="d-grid">
              <input
                type="button"
                id="search"
                value="Search Institute"
                className="btn btn-primary"
                onClick={() => handleSearchInstCode()}
              />
            </div>
            <div className="pt-3">
              {dteErrorMessage && (
                <div className="col-12 mt-3">
                  <p className="text-danger text-center">{dteErrorMessage}</p>
                </div>
              )}
              {searchInstCode && (
                <div className="col-12 mt-3">
                  <p className="text-danger text-center">
                    Institute Code:{searchInstCode}
                  </p>
                </div>
              )}
            </div>
          </div>
          {errorMessage && (
            <div className="col-12 mt-3">
              <p className="text-danger text-center">{errorMessage}</p>
            </div>
          )}
          <div className="col-12 mt-3 d-flex order-3 justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              Search
            </button>
            <button
              onClick={() => resetForm()}
              type="reset"
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

export default InstituteSearch;
