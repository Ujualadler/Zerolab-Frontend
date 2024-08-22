import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, TableHead } from "@mui/material";
import { CalculateOutlined, Save } from "@mui/icons-material";

const selectStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#8B8B8B", // Initial outline color
    },
    "&:hover fieldset": {
      borderColor: "#4D9900", // Outline color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4D9900", // Outline color when focused
    },
    "& .MuiSelect-select": {
      color: "white", // Text color
    },
    borderRadius: 3,
    height: "50px",
  },
  "& .MuiInputLabel-root": {
    color: "#8B8B8B", // Initial label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#4D9900", // Label color when focused
  },
};

interface RowData {
  name: string;
  designation: string;
  invitedBy: string;
  permissions: string;
}

function createData(
  name: string,
  designation: string,
  invitedBy: string,
  permissions: string
): RowData {
  return { name, designation, invitedBy, permissions };
}

const rows = [
  createData("Alin Anto", "Manager", "Self Joined", "Add Members"),
  createData("jissmon George", "Sales Rep", "Alin Anto", "Change Designation"),
  createData("Adarsh Shetty", "Sales Rep", "Alin Anton", "No Permissions"),
  createData("Annam Giri Prakash", "Sales Rep", "Alin Anto", "No Permissions"),
];

export default function EditableTable() {
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editData, setEditData] = React.useState<RowData | null>(null);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData({ ...rows[index] });
  };

  const handleSave = () => {
    if (editIndex !== null && editData) {
      rows[editIndex] = editData;
      setEditIndex(null);
      setEditData(null);
    }
  };

  const handleChange = (
    event: SelectChangeEvent<string>,
    field: keyof RowData
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: event.target.value as string,
      });
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "#03383D", color: "white" }}
        aria-label="editable table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Designation</TableCell>
            <TableCell sx={{ color: "white" }}>Invited By</TableCell>
            <TableCell sx={{ color: "white" }}>Permissions</TableCell>
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { borderBottom: 0 },
              }}
            >
              <TableCell sx={{ color: "white" }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {editIndex === index ? (
                  <Select
                    variant="standard"
                    sx={{
                      height: "30px",
                      color: "white",
                      borderBottom: "1px solid #4D9900",
                    }}
                    value={editData?.designation || ""}
                    onChange={(e) => handleChange(e, "designation")}
                  >
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Sales Rep">Sales Rep</MenuItem>
                  </Select>
                ) : (
                  row.designation
                )}
              </TableCell>
              <TableCell sx={{ color: "white" }}>{row.invitedBy}</TableCell>
              <TableCell sx={{ color: "white" }}>
                {editIndex === index ? (
                  <Select
                    variant="standard"
                    sx={{
                      height: "30px",
                      color: "white",
                      borderBottom: "1px solid #4D9900",
                    }}
                    value={editData?.permissions || ""}
                    onChange={(e) => handleChange(e, "permissions")}
                  >
                    <MenuItem value="Add Members">Add Members</MenuItem>
                    <MenuItem value="Change Designation">
                      Change Designation
                    </MenuItem>
                    <MenuItem value="No Permissions">No Permissions</MenuItem>
                  </Select>
                ) : (
                  row.permissions
                )}
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                {editIndex === index ? (
                  <IconButton sx={{ color: "#4D9900" }} onClick={handleSave}>
                    <Save />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ color: "#b22626" }}
                    onClick={() => handleEdit(index)}
                  >
                    <EditCalendarIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
