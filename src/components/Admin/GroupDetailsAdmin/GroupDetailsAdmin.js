import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./groupDetailsAdmin.scss";
import useService from "../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../QueryKeys";
import { AdminGroupTitle } from "../../../UI/Common/AdminGroupTitle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const GroupDetailsAdmin = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const { groupServices } = useService();
  const groupQuery = useQuery([queryKeys.getGroupQuery], () =>
    groupServices.getGroupById(Id)
  );
  if (groupQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (groupQuery.isError) {
    return (
      <h1>
        {groupQuery.error.response.data.message ??
          `Group with id:${Id} not found`}
      </h1>
    );
  }

  const handleNavigation = (id) => {
    navigate(`/Students/${id}`, { replace: true });
  };

  console.log(groupQuery.data?.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const students = groupQuery.data?.data.students;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="group-details">
      <div className="container">
        <AdminGroupTitle
          child1={"Group details"}
          child2={" Group / Group Details"}
        />
        <section className="profile">
          <div className="details">
            <section className="personal-details">
              <div className="card">
                <h1>Details:</h1>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Id</h1>
                    <p>{groupQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Name</h1>
                    <p>{groupQuery.data?.data.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Student Count</h1>
                    <p>{groupQuery.data?.data.studentCount}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Year</h1>
                    <p>{groupQuery.data?.data.year}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Faculty Name</h1>
                    <p>{groupQuery.data?.data.facultyName}</p>
                  </section>
                </div>
              </div>
            </section>
            <section className="group-students">
              <div>
                <h1>Students</h1>
              </div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: 400 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Full Name</StyledTableCell>
                      <StyledTableCell>Id</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students && students.length > 0 ? (
                      students.map((student) => (
                        <StyledTableRow
                          key={student.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell
                            onClick={() => handleNavigation(student.id)}
                            component="th"
                            scope="row"
                          >
                            {student.fullName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {student.id}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={2} align="center">
                          No Students
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GroupDetailsAdmin;
