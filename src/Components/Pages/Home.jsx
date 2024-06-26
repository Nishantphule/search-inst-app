import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InstituteSearch from "../Forms/InstituteSearch";
import InstituteAdvSearch from "../Forms/InstituteAdvSearch";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Home = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", marginTop: "20px" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            sx={{
              fontWeight: "bold",
              bgcolor: "inherit",
              fontFamily: "sans-serif",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            label="Institute Search"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: "bold",
              bgcolor: "#inherit",
              fontFamily: "sans-serif",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            label="Institute Advance Search"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <InstituteSearch />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <InstituteAdvSearch />
      </TabPanel>
    </Box>
  );
};

export default Home;
