import { useQuery } from "react-query";
import useService from "../../../hooks";
import "./studentListAdmin.scss";
import { queryKeys } from "../../../QueryKeys";
import { StudentListTable } from "../../../UI/Tables/StudentListTable";

const StudentAdminPage = () => {
  return (
    <div className="student-list-admin">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Students</h1>
          </div>
          <div className="title-right">
            <h1>Student / All Students</h1>
          </div>
        </section>
        <section className="students">
          <div className="students-list">
            <div className="students-list-title">
              <h1>Students</h1>
            </div>
            <div className="students-list-info">
              <StudentListTable />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default StudentAdminPage;
