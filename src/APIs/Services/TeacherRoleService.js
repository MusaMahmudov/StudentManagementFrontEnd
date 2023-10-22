import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class TeacherRoleService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllTeacherRoles(token) {
    return await this.getAll("TeacherRoles", token);
  }
  async getTeacherRoleById(id, token) {
    return await this.getById("TeacherRoles", id, token);
  }
  async createTeacherRole(body, token) {
    return await this.post("TeacherRoles", body, token);
  }
  async deleteTeacherRole(id, token) {
    return await this.delete("TeacherRoles", id, token);
  }
  async updateTeacherRole(id, body, token) {
    return await this.put("TeacherRoles", id, body, token);
  }
}
