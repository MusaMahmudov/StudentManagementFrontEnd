import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class studentService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllStudents() {
    return await this.getAll("Students");
  }
  async updateStudent(id, body) {
    return await this.put("Students", id, body);
  }
}
