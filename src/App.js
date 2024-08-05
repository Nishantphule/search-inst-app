import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Button, Paper } from "@mui/material";
import Home from "./Components/Pages/Home";
import InstitutesList from "./Components/Pages/InstitutesList";
import AdvInstitutesList from "./Components/Pages/AdvInstitutesList";
import InstitutesDetails from "./Components/Pages/InstitutesDetails";
import { useEffect, useMemo, useState } from "react";
import loader from '../src/assests/imgs/Pulse@1x-1.0s-200px-200px.svg';

function App() {
  const navigate = useNavigate();

  const [ip, setIp] = useState('');
  const allowAll = 0; // New state to allow all IPs
  const [isAllowed, setIsAllowed] = useState(false);

  const allowedIps = useMemo(() => ["182.70.120.222",], []); // Replace with your allowed IPs

  const isIpAllowed = useMemo(() => {
    return allowAll || allowedIps.includes(ip);
  }, [allowAll, ip, allowedIps]); // Dependencies: allowAll, ip, allowedIps
  
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;
        setIp(userIp);
      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
    };

    fetchIp();
  }, [allowedIps]);

  useEffect(() => {
    setIsAllowed(isIpAllowed);
  }, [isIpAllowed]); // Only update when isIpAllowed changes

  return (
    <>
   
    <Paper elevation={3}>
    {isAllowed ? <div className="App">
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
      </div>:ip!== "" && <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <h3 style={{color:"red"}}><b>
      Server will start soon...</b></h3>
      <img src={loader} alt="Loading..." />
        </div>}
      
    </Paper>
    </>
    
  );
}

export default App;
