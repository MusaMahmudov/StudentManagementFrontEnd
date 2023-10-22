import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class examService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllExams(token) {
    return await this.getAll("Exams", token);
  }
  async getExamById(id, token) {
    return await this.getById("Exams", id, token);
  }
  async getExamByIdForUpdate(id, token) {
    return await this.getById("Exams/update", id, token);
  }
  async createExam(body, token) {
    return await this.post("Exams", body, token);
  }
  async deleteExam(id, token) {
    return await this.delete("Exams", id, token);
  }
  async updateExam(id, body, token) {
    return await this.put("Exams", id, body, token);
  }
}
