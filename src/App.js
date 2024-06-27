import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Paper } from "@mui/material";
import Home from "./Components/Pages/Home";
import InstitutesList from "./Components/Pages/InstitutesList";
import AdvInstitutesList from "./Components/Pages/AdvInstitutesList";

function App() {
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
              <h5 style={{ fontFamily: "sans-serif", marginBottom: "0px" }}>
                Institute Search for Year 2024-25
              </h5>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instituteSearchList" element={<InstitutesList />} />
              <Route
                path="/advInstituteSearchList"
                element={<AdvInstitutesList />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default App;
