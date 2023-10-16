import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class TeacherRoleService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllTeacherRoles() {
    return await this.getAll("TeacherRoles");
  }
  async getTeacherRoleById(id) {
    return await this.getById("TeacherRoles", id);
  }
  async createTeacherRole(body) {
    return await this.post("TeacherRoles", body);
  }
  async deleteTeacherRole(id) {
    return await this.delete("TeacherRoles", id);
  }
  async updateTeacherRole(id, body) {
    return await this.put("TeacherRoles", id, body);
  }
}
