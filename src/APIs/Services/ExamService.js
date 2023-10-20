import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class examService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllExams(token) {
    return await this.getAll("Exams", token);
  }
  async getExamById(id) {
    return await this.getById("Exams", id);
  }
  async getExamByIdForUpdate(id) {
    return await this.getById("Exams/update", id);
  }
  async createExam(body) {
    return await this.post("Exams", body);
  }
  async deleteExam(id, token) {
    return await this.delete("Exams", id, token);
  }
  async updateExam(id, body) {
    return await this.put("Exams", id, body);
  }
}
