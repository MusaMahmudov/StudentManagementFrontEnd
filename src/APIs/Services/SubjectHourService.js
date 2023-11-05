import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class subjectHourService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllSubjectHours(token) {
    return await this.getAll("SubjectHours", token);
  }
  async getSubjectHourById(id, token) {
    return await this.getById("SubjectHours", id, token);
  }
  async getSubjectHourByIdForUpdate(id, token) {
    return await this.getById("SubjectHours/update", id, token);
  }
  async createSubjectHours(body, token) {
    return await this.post("SubjectHours", body, token);
  }
  async updateSubjectHours(id, body, token) {
    return await this.put("SubjectHours", id, body, token);
  }
  async deleteSubjectHours(id, token) {
    return await this.delete("SubjectHours", id, token);
  }
}
