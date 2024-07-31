import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Button, Paper } from "@mui/material";
import Home from "./Components/Pages/Home";
import InstitutesList from "./Components/Pages/InstitutesList";
import AdvInstitutesList from "./Components/Pages/AdvInstitutesList";
import InstitutesDetails from "./Components/Pages/InstitutesDetails";

function App() {
  const navigate = useNavigate();
  return (
    <Paper elevation={3}>
      <div className="App">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <a href="/" title="Maharashtra State Board of Technical Education">
              {" "}
              MSBTE
            </a>
          </div>
          <div className="clear"></div>
        </div>
        <div
          className="container-fluid"
          style={{
            marginTop: "30px",
          }}
        >
          <div
            style={{
              border: "1px solid black",
              minHeight: "80vh",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#E3E8F0",
                padding: "5px",
              }}
            >
              <h6
                style={{
                  fontFamily: "sans-serif",
                  marginBottom: "0px",
                  fontWeight: "bold",
                }}
              >
                Institute Search for Year 2024-25{" "}
                {window.location.href === "http://localhost:3000/" ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      marginLeft: "10px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Click here to go Back
                  </Button>
                )}
              </h6>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instituteSearchList" element={<InstitutesList />} />
              <Route
                path="/advInstituteSearchList"
                element={<AdvInstitutesList />}
              />
              <Route path="/instituteDetails" element={<InstitutesDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default App;
