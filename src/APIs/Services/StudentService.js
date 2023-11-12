import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class studentService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllStudents(token) {
    return await this.getAll("Students", token);
  }
  async getAllStudentsForUserUpdate(token) {
    return await this.getAll("Students/GetAllStudentsForUserUpdate", token);
  }
  async getAllStudentsForCreateOrUpdateForExamResult(token) {
    return await this.getAll(
      "Students/GetStudentsForCreateOrUpdateForExamResult",
      token
    );
  }
  async getStudentsForGroupForDetails(groupId, token) {
    return await this.getById(
      "Students/GetStudentsForGroupForDetails",
      groupId,
      token
    );
  }
  async getStudentById(id, token) {
    return await this.getById("Students", id, token);
  }
  async getStudentByIdForUpdate(id, token) {
    return await this.getById("Students/update", id, token);
  }
  async getStudentForGroupUpdate(groupId, token) {
    return await this.getById(
      "Students/GetStudentsForGroupForUpdate",
      groupId,
      token
    );
  }
  async createStudent(body, token) {
    return await this.post("Students", body, token);
  }
  async updateStudent(id, body, token) {
    return await this.put("Students", id, body, token);
  }
  async deleteStudent(id, token) {
    return await this.delete("Students", id, token);
  }
}
