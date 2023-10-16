import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class groupSubjectService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllGroupSubjects() {
    return await this.getAll("GroupSubjects");
  }
  async getGroupSubjectById(id) {
    return await this.getById("GroupSubjects", id);
  }
  async createGroupSubject(body) {
    return await this.post("GroupSubjects", body);
  }
  async updateGroupSubject(id, body) {
    return await this.put("GroupSubjects", id, body);
  }
  async deleteGroupSubject(id) {
    return await this.delete("GroupSubjects", id);
  }
}
