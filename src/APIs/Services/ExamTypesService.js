import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class examTypeService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllExamTypes(token) {
    return await this.getAll("ExamTypes", token);
  }
  async getExamTypeById(id, token) {
    return await this.getById("ExamTypes", id, token);
  }
  async getExamTypeByIdForUpdate(id, token) {
    return await this.getById("ExamTypes/update", id, token);
  }
  async createExamType(body, token) {
    return await this.post("ExamTypes", body, token);
  }
  async deleteExamType(id, token) {
    return await this.delete("ExamTypes", id, token);
  }
  async updateExamType(id, body, token) {
    return await this.put("ExamTypes", id, body, token);
  }
}
export default examTypeService;
