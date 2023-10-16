import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class examService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllExams() {
    return await this.getAll("Exams");
  }
  async getExamById(id) {
    return await this.getById("Exams", id);
  }
  async createExam(body) {
    return await this.post("Exams", body);
  }
  async deleteExam(id) {
    return await this.delete("Exams", id);
  }
  async updateExam(id, body) {
    return await this.put("Exams", id, body);
  }
}
