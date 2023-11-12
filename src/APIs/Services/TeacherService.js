import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class teacherService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllTeachers(token, search) {
    return await this.getAll("Teachers", token, search);
  }
  async getTeacherById(id, token) {
    return await this.getById("Teachers", id, token);
  }
  async getTeachersForGroupSubject(token) {
    return await this.getAll("Teachers/GetAllTeachersForUser", token);
  }
  async getAllTeachersForUserUpdate(token) {
    return await this.getAll("Teachers/GroupSubjectCreate", token);
  }
  async getTeacherByIdForUpdate(id, token) {
    return await this.getById("Teachers/update", id, token);
  }
  async createTeacher(body, token) {
    return await this.post("Teachers", body, token);
  }

  async deleteTeacher(id, token) {
    return await this.delete("Teachers", id, token);
  }
  async updateTeacher(id, body, token) {
    return await this.put("Teachers", id, body, token);
  }
}
export default teacherService;
