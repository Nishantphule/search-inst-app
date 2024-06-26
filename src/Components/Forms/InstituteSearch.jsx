import axios from "axios";
import React, { useEffect, useState } from "react";

const InstituteSearch = () => {
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
  };

  const handleInstIdChange = (event) => {
    setInstId(event.target.value);
  };

  const handleInstCodeChange = (event) => {
    setInstCode(event.target.value);
  };

  const handleDteCodeChange = (event) => {
    const dteCode = event.target.value;
    setDteCode(dteCode);
    console.log(dteCode);
  };

  const [instituteNames, setInstituteNames] = useState([
    "Institute A",
    "Institute B",
    "P.V.G",
    "Government Poly",
  ]);

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
  console.log(instituteNames);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(instCode, "Inst Code");
      console.log(instId, "Inst Id");
      console.log(instName, "Inst Name");
      console.log(selectedDiscipline, "Discipline");
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
        "Please select at least one option from Institute Code, ID, Name, or Discipline."
      );
      alert(
        "Please select at least one option from Institute Code, ID, Name, or Discipline.!!"
      );
      return false;
    } else if (filledOptions.length > 1) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      setErrorMessage(
        "Please select only one option from Institute Code, ID, Name, or Discipline."
      );
      alert(
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
        alert("Institute code Not Found!! Try another DTE Code.");
        setDteErrorMessage("Institute code Not Found!! Try another DTE Code.");
      }
    } else {
      setSearchInstCode("");
      setInstCode("");
      alert("Please Enter DTE Code.");
      setDteErrorMessage("Please Enter DTE Code.");
    }
  };

  const handleInstituteNameInput = (event) => {
    const inputValue = event.target.value;
    setInstituteNameInput(inputValue);
    if (inputValue) {
      const filtered = instituteNames.filter((inst) =>
        inst.inst_name
          .toLowerCase()
          .trim()
          .includes(inputValue.toLowerCase().trim())
      );
      setFilteredInstituteNames(filtered);
      setIsDropdownVisible(true);
    } else {
      setFilteredInstituteNames(instituteNames);
    }
  };

  const handleInstituteNameSelect = (name) => {
    setInstituteNameInput(name);
    setInstName(name);
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
                  placeholder="Select Institute Code..."
                  onChange={handleInstCodeChange}
                  value={instCode}
                  id="msbtecode1"
                  type="text"
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
                  placeholder="Select Institute Id..."
                  onChange={handleInstIdChange}
                  id="msbtecode2"
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="col-12 d-md-none">
                <h5 className="text-center my-3">OR</h5>
              </div>

              <div className="col-12 d-none d-md-flex justify-content-center align-items-center">
                <h5 className="mx-3">OR</h5>
              </div>

              <div className="col-12 col-lg-6 mb-3">
                <label htmlFor="institutename">
                  <b>Select Institute Name:</b>
                </label>
                <input
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
                          let name = `${inst.inst_id.replace(/0/g, "")} - ${
                            inst.inst_name
                          }`;
                          return (
                            <option
                              key={index}
                              onClick={() => handleInstituteNameSelect(name)}
                            >
                              {inst.inst_id.replace(/0/g, "")} -{" "}
                              {inst.inst_name}
                            </option>
                          );
                        })
                      : filteredInstituteNames.map((inst, index) => {
                          let name = `${inst.inst_id.replace(/0/g, "")} - ${
                            inst.inst_name
                          }`;
                          return (
                            <option
                              key={index}
                              onClick={() => handleInstituteNameSelect(name)}
                            >
                              {inst.inst_id.replace(/0/g, "")} -{" "}
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
                    value="Engineering Technology"
                    id="radio1"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "Engineering Technology"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio1" className="form-check-label">
                    Engineering Technology
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="Pharmacy"
                    id="radio2"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "Pharmacy"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio2" className="form-check-label">
                    Pharmacy
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="Engineering Technology + Pharmacy"
                    id="radio3"
                    type="radio"
                    className="form-check-input"
                    checked={
                      selectedDiscipline === "Engineering Technology + Pharmacy"
                    }
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio3" className="form-check-label">
                    Engineering Technology + Pharmacy
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="Architecture"
                    id="radio4"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "Architecture"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio4" className="form-check-label">
                    Architecture
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="HMCT"
                    id="radio5"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "HMCT"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio5" className="form-check-label">
                    HMCT
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="Para Medical"
                    id="radio6"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "Para Medical"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="radio6" className="form-check-label">
                    Para Medical
                  </label>
                </div>
                <div className="form-check">
                  <input
                    name="discipline"
                    value="Non-AICTE"
                    id="radio7"
                    type="radio"
                    className="form-check-input"
                    checked={selectedDiscipline === "Non-AICTE"}
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
            <button type="reset" className="btn btn-secondary">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstituteSearch;
