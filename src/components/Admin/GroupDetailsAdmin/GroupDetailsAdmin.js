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
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { TokenContext } from "../../../Contexts/Token-context";
const GroupDetailsAdmin = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { Id } = useParams();
  const { groupServices, studentServices } = useService();
  const studentsQuery = useQuery([queryKeys.getStudentsQuery], () =>
    studentServices.getStudentsForGroupForDetails(Id, token)
  );
  const groupQuery = useQuery([queryKeys.getGroupQuery], () =>
    groupServices.getGroupById(Id, token)
  );

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
  //pagination part
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - studentsQuery.data?.data.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (groupQuery.isLoading || studentsQuery.isLoading) {
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
                <h1>Students:</h1>
              </div>
              <Root sx={{ maxWidth: "100%", width: 600 }}>
                <table aria-label="custom pagination table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Student</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rowsPerPage > 0
                      ? studentsQuery.data?.data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : studentsQuery.data?.data
                    ).map((student) => (
                      <tr key={student.id}>
                        <td style={{ width: 300 }} align="right">
                          {student.id}
                        </td>
                        <td>{student.fullName}</td>
                      </tr>
                    ))}
                    {emptyRows > 0 && (
                      <tr style={{ height: 41 * emptyRows }}>
                        <td colSpan={3} aria-hidden />
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <CustomTablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={studentsQuery.data?.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            "aria-label": "rows per page",
                          },
                          actions: {
                            showFirstButton: true,
                            showLastButton: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </tr>
                  </tfoot>
                </table>
              </Root>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};
export default GroupDetailsAdmin;
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
