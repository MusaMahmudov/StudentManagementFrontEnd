import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class teacherService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllTeachers(token) {
    return await this.getAll("Teachers", token);
  }
  async getTeacherById(id, token) {
    return await this.getById("Teachers", id, token);
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
