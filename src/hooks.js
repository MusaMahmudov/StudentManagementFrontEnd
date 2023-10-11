import facultyService from "./APIs/Services/FacultyService";
import groupService from "./APIs/Services/GroupService";
import { studentService } from "./APIs/Services/StudentService";
import teacherService from "./APIs/Services/TeacherService";
const useService = () => {
  const studentServices = new studentService();
  const groupServices = new groupService();
  const teacherServices = new teacherService();
  const facultyServices = new facultyService();
  return { studentServices, groupServices, teacherServices, facultyServices };
};
export default useService;
