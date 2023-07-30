import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({ isAdmin, selected, setSelected }) => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelected(event.target.value);
        navigate(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="select-page-label">Pages</InputLabel>
            <Select
                labelId="select-page-label"
                id="select-page"
                value={selected}
                label={selected}
                onChange={handleChange}
            >
                <MenuItem value="/">Dashboard</MenuItem>
                <MenuItem value="/Test">Test</MenuItem>
                <MenuItem value="/BugReports">Bug Reports</MenuItem>
                <MenuItem value="/calendar">Scheduling Tests</MenuItem>
                <MenuItem value="/domain">Domain Chart</MenuItem>
                <MenuItem value="/pie">Pie Chart</MenuItem>
                <MenuItem value="/line">Bugs & Tests Timeline</MenuItem>
                <MenuItem value="/geography">Bugs By Geography</MenuItem>
                {isAdmin && <MenuItem value="/team">Manage Team</MenuItem>}
                {isAdmin && <MenuItem value="/form">Create New User</MenuItem>}
                <MenuItem value="/faq">Knowledge Center</MenuItem>
            </Select>
        </FormControl>
    );
};

export default MobileMenu;
