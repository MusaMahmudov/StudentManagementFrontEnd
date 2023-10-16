import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class examTypeService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllExamTypes() {
    return await this.getAll("ExamTypes");
  }
  async getExamTypeById(id) {
    return await this.getById("ExamTypes", id);
  }
  async createExamType(body) {
    return await this.post("ExamTypes", body);
  }
  async deleteExamType(id) {
    return await this.delete("ExamTypes", id);
  }
  async updateExamType(id, body) {
    return await this.put("ExamTypes", id, body);
  }
}
export default examTypeService;
