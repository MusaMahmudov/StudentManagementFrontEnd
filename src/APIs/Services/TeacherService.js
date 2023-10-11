import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class teacherService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllTeachers() {
    return await this.getAll("Teachers");
  }
}
export default teacherService;
