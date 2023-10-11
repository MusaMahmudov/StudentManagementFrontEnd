import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class facultyService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllFaculties() {
    return await this.getAll("Faculties");
  }
}
export default facultyService;
