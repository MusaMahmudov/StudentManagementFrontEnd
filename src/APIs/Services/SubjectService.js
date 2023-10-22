import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class SubjectService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllSubjects(token) {
    return await this.getAll("Subjects", token);
  }
  async getSubjectById(id, token) {
    return await this.getById("Subjects", id, token);
  }
  async createSubject(body, token) {
    return await this.post("Subjects", body, token);
  }
  async updateSubject(id, body, token) {
    return await this.put("Subjects", id, body, token);
  }
  async deleteSubject(id, token) {
    return await this.delete("Subjects", id, token);
  }
}
