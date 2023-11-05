import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class examResultService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllExamResults(token) {
    return await this.getAll("ExamResults", token);
  }
  async getExamResultById(id, token) {
    return await this.getById("ExamResults", id, token);
  }
  async getExamResultByIdForUpdate(id, token) {
    return await this.getById("ExamResults/update", id, token);
  }
  async createExamResult(body, token) {
    return await this.post("ExamResults", body, token);
  }
  async deleteExamResult(id, token) {
    return await this.delete("ExamResults", id, token);
  }
  async updateExamResult(id, body, token) {
    return await this.put("ExamResults", id, body, token);
  }
}
