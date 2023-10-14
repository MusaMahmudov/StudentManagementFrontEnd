import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { queryKeys } from "../../QueryKeys";
import useService from "../../hooks";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export const DeleteButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      size="small"
      startIcon={<DeleteIcon />}
      color="error"
    >
      {children}
    </Button>
  );
};
export const UpdateButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      size="small"
      sx={{ m: 1.5 }}
      color="warning"
    >
      {children}
    </Button>
  );
};
export const DetailButton = ({ ...props }) => {
  return (
    <Button {...props} variant="contained" size="small" color="info">
      Detail
    </Button>
  );
};
