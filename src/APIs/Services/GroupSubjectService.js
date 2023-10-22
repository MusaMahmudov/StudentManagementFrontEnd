import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class groupSubjectService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllGroupSubjects(token) {
    return await this.getAll("GroupSubjects", token);
  }
  async getGroupSubjectById(id, token) {
    return await this.getById("GroupSubjects", id, token);
  }
  async createGroupSubject(body, token) {
    return await this.post("GroupSubjects", body, token);
  }
  async updateGroupSubject(id, body, token) {
    return await this.put("GroupSubjects", id, body, token);
  }
  async deleteGroupSubject(id, token) {
    return await this.delete("GroupSubjects", id, token);
  }
}
