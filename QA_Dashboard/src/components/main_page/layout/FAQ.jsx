import { Box, useTheme } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../hooks/theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How to Run a Test?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To run a test, navigate to the "Tests" page and select the test you want to run.
            Click the "Run Test" button to initiate the test execution.
            The system will display the test results once the execution is complete.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How to View Test Reports?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Test reports can be viewed by accessing the "Reports" section.
            Select the test you are interested in, and the system will display the detailed report containing the test's status, duration, and any encountered issues.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How to Submit a Bug Report?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To submit a bug report, go to the "Bug Reports" section and click on the "New Bug Report" button. 
            Fill out the required information, including the test case, bug description, and steps to reproduce the issue. 
            Once submitted, the bug report will be assigned to the relevant team for further investigation.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I tell my role?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can look it up at the top of the sidebar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Why can't I access management tools?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Make sure that your role is admin, as normal testers do not have access to management tools.
            If you want to acquire an admin role, please contact the site's admin.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default FAQ;
