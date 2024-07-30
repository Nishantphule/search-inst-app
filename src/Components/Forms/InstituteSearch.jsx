import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParamsContext } from "../../contexts/SearchParamsContext";
import { toast } from "react-toastify";

const InstituteSearch = () => {
  const navigate = useNavigate();

  // SearchParams variables
  const {
    // selectedInstCode,
    //     selectedInstId,
    //     selectedInstName,
    selectedInstDiscipline,
    setSelectedInstCode,
    setSelectedInstId,
    setSelectedInstName,
    setSelectedInstDiscipline,
    setSearchType,
  } = useContext(ParamsContext);

  //state variables
  const [instCode, setInstCode] = useState("");
  const [searchInstCode, setSearchInstCode] = useState("");
  const [instId, setInstId] = useState("");
  const [instName, setInstName] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState(
    selectedInstDiscipline
  );
  const [dteCode, setDteCode] = useState("");
  const [filteredInstituteNames, setFilteredInstituteNames] = useState([]);
  const [instituteNameInput, setInstituteNameInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dteErrorMessage, setDteErrorMessage] = useState("");
  const [instituteNames, setInstituteNames] = useState([]);

  //function to handle discipline input radio change
  const handleRadioChange = (event) => {
    setSelectedDiscipline(event.target.value);
    setSelectedInstDiscipline(event.target.value);
  };

  //function to handle Institute Id input change
  const handleInstIdChange = (event) => {
    setInstId(event.target.value);
    setSelectedInstId(event.target.value);
  };

  //function to handle Institute Code input change
  const handleInstCodeChange = (event) => {
    setInstCode(event.target.value);
    setSelectedInstCode(event.target.value);
  };

  //function to handle DTE code input change
  const handleDteCodeChange = (event) => {
    const dteCode = event.target.value;
    setDteCode(dteCode);
  };

  // Get institutes List for dropdown
  useEffect(() => {
    async function fetchData() {
      const fetch = await axios.get(
        "http://localhost:3001/instituteSearch/institutesList"
      );
      const data = fetch.data;
      setInstituteNames(data);
    }
    fetchData();
  }, [selectedDiscipline]);

  // function to reset form
  async function resetForm() {
    setInstCode("");
    setInstId("");
    setInstName("");
    setInstituteNameInput("");
    setSelectedDiscipline("");
    setSelectedInstDiscipline("");
  }

  //function to handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //check inst code if entered
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

    //check inst id if entered
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

    //validateForm condition form
    if (validateForm()) {
      setSelectedInstDiscipline(selectedDiscipline);
      setSelectedInstCode(instCode);
      setSelectedInstId(instId);
      setSelectedInstName(instName);
      if (instCode) {
        if (await checkInstCode()) {
          setSearchType("SimpleSearch");
          navigate("/instituteSearchList");
        }
      } else if (instId) {
        if (await checkInstId()) {
          setSearchType("SimpleSearch");
          navigate("/instituteSearchList");
        }
      } else {
        setSearchType("SimpleSearch");
        navigate("/instituteSearchList");
      }
    }
  };

  //Validate form
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

  //function to get Inst code using DTE code
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

  //function to filter dropdown options
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
      console.log(filtered.length ? filtered[0].inst_id : "NA");
      if (filtered.length) {
        setSelectedInstName(filtered[0].inst_id.replace(/^0+/, ""));
        setFilteredInstituteNames(filtered);
        setIsDropdownVisible(true);
      } else {
        setSelectedInstName("");
        toast.error("Enter Valid Institute Name!");
        setDteErrorMessage("Enter Valid Institute Name!");
      }
    } else {
      setFilteredInstituteNames(instituteNames);
    }
  };

  //function to handle institute name change
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

              {/* Institute Code Input */}
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

              {/* Institute ID Input */}
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

              {/* Institute Name Dropdown and Input */}
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

              {/* Discipline radio buttons */}
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

          {/* DTE Code Input */}
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
