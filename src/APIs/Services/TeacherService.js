import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class teacherService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllTeachers() {
    return await this.getAll("Teachers");
  }
  async getTeacherById(id) {
    return await this.getById("Teachers", id);
  }
  async getTeacherByIdForUpdate(id) {
    return await this.getById("Teachers/update", id);
  }
  async createTeacher(body) {
    return await this.post("Teachers", body);
  }

  async deleteTeacher(id) {
    return await this.delete("Teachers", id);
  }
  async updateTeacher(id, body) {
    return await this.put("Teachers", id, body);
  }
}
export default teacherService;
