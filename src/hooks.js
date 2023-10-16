import { examService } from "./APIs/Services/ExamService";
import examTypeService from "./APIs/Services/ExamTypesService";
import facultyService from "./APIs/Services/FacultyService";
import groupService from "./APIs/Services/GroupService";
import { groupSubjectService } from "./APIs/Services/GroupSubjectService";
import { studentService } from "./APIs/Services/StudentService";
import { SubjectService } from "./APIs/Services/SubjectService";
import { TeacherRoleService } from "./APIs/Services/TeacherRoleService";
import teacherService from "./APIs/Services/TeacherService";
const useService = () => {
  const studentServices = new studentService();
  const groupServices = new groupService();
  const teacherServices = new teacherService();
  const facultyServices = new facultyService();
  const examTypeServices = new examTypeService();
  const subjectServices = new SubjectService();
  const teacherRoleServices = new TeacherRoleService();
  const examServices = new examService();
  const groupSubjectServices = new groupSubjectService();
  return {
    studentServices,
    groupServices,
    teacherServices,
    facultyServices,
    examTypeServices,
    subjectServices,
    teacherRoleServices,
    examServices,
    groupSubjectServices,
  };
};
export default useService;
