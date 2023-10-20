import { useLocation, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useService from "../../../../hooks";
import { useQuery } from "react-query";
import { queryKeys } from "../../../../QueryKeys";
import { AdminGroupTitle } from "../../../../UI/Common/AdminGroupTitle";
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
const GroupSubjectDetailsAdmin = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const { groupSubjectServices } = useService();
  const groupSubjectQuery = useQuery([queryKeys.getGroupSubjects], () =>
    groupSubjectServices.getGroupSubjectById(Id)
  );
  if (groupSubjectQuery.isLoading) {
    return <h1>Is Loading...</h1>;
  }
  if (groupSubjectQuery.isError) {
    return (
      <h1>
        {groupSubjectQuery.error.response.data.message ??
          `Group with id:${Id} not found`}
      </h1>
    );
  }

  console.log(groupSubjectQuery.data?.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const teachers = groupSubjectQuery.data?.data.teachers;

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
          child1={" details"}
          child2={" Group's subject / Group's subject Details"}
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
                    <p>{groupSubjectQuery.data?.data.id}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Subject</h1>
                    <p>{groupSubjectQuery.data?.data.subject.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Group</h1>
                    <p>{groupSubjectQuery.data?.data.group.name}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Credits</h1>
                    <p>{groupSubjectQuery.data?.data.credits}</p>
                  </section>
                </div>
                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Total Weeks</h1>
                    <p>{groupSubjectQuery.data?.data.totalWeeks}</p>
                  </section>
                </div>

                <div className="info">
                  <section className="info-left">
                    <PersonOutlineIcon fontSize="small" />
                  </section>
                  <section className="info-right">
                    <h1>Hours</h1>
                    <p>{groupSubjectQuery.data?.data.hours}</p>
                  </section>
                </div>
              </div>
            </section>
            <section className="group-students">
              <div>
                <h1>Teachers:</h1>
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
                      <StyledTableCell>Role</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers && teachers.length > 0 ? (
                      teachers.map((teacher) => (
                        <StyledTableRow
                          key={teacher.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {teacher.fullName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {teacher.roleName}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={2} align="center">
                          No Teachers
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
export default GroupSubjectDetailsAdmin;
