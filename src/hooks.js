import { useEffect, useState } from "react";
import { authService } from "./APIs/Services/AuthService";
import { examResultService } from "./APIs/Services/ExamResultService";
import { examService } from "./APIs/Services/ExamService";
import examTypeService from "./APIs/Services/ExamTypesService";
import facultyService from "./APIs/Services/FacultyService";
import groupService from "./APIs/Services/GroupService";
import { groupSubjectService } from "./APIs/Services/GroupSubjectService";
import { lessonTypeService } from "./APIs/Services/LessonTypeService";
import { roleService } from "./APIs/Services/RoleService";
import { studentService } from "./APIs/Services/StudentService";
import { subjectHourService } from "./APIs/Services/SubjectHourService";
import { SubjectService } from "./APIs/Services/SubjectService";
import { TeacherRoleService } from "./APIs/Services/TeacherRoleService";
import teacherService from "./APIs/Services/TeacherService";
import { userService } from "./APIs/Services/UserService";
import { useQuery } from "react-query";
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
  const userServices = new userService();
  const authServices = new authService();
  const roleServices = new roleService();
  const lessonTypesServices = new lessonTypeService();
  const subjectHourServices = new subjectHourService();
  const examResultServices = new examResultService();
  return {
    subjectHourServices,
    studentServices,
    groupServices,
    teacherServices,
    facultyServices,
    examTypeServices,
    subjectServices,
    teacherRoleServices,
    examServices,
    groupSubjectServices,
    userServices,
    authServices,
    roleServices,
    lessonTypesServices,
    examResultServices,
  };
};
export default useService;

export const useCustomQuery = (queryKey, service) => {
  const [data, setData] = useState();
  const {
    data: queriedData,
    isLoading,
    isError,
    error,
  } = useQuery(queryKey, service);

  useEffect(() => {
    const storedData = localStorage.getItem(queryKey);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [queryKey]);
  useEffect(() => {
    if (queriedData) {
      setData(queriedData?.data);
      localStorage.setItem(queryKey, JSON.stringify(queriedData?.data));
    }
  }, [queryKey, queriedData]);
  return { isLoading, isError, error };
};
