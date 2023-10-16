import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class facultyService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllFaculties() {
    return await this.getAll("Faculties");
  }
  async getFacultyById(id) {
    return await this.getById("Faculties", id);
  }
  async createFaculty(body) {
    return await this.post("Faculties", body);
  }
  async deleteFaculty(id) {
    return await this.delete("Faculties", id);
  }
  async updateFaculty(id, body) {
    return await this.put("Faculties", id, body);
  }
}
export default facultyService;
