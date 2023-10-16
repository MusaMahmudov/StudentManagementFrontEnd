import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class SubjectService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllSubjects() {
    return await this.getAll("Subjects");
  }
  async getSubjectById(id) {
    return await this.getById("Subjects", id);
  }
  async createSubject(body) {
    return await this.post("Subjects", body);
  }
  async updateSubject(id, body) {
    return await this.put("Subjects", id, body);
  }
  async deleteSubject(id) {
    return await this.delete("Subjects", id);
  }
}
