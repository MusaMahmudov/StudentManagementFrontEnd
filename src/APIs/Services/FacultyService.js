import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class facultyService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }
  async getAllFaculties(token) {
    return await this.getAll("Faculties", token);
  }
  async getFacultyById(id, token) {
    return await this.getById("Faculties", id, token);
  }
  async getFacultyByIdForUpdate(id, token) {
    return await this.getById("Faculties/update", id, token);
  }
  async createFaculty(body, token) {
    return await this.post("Faculties", body, token);
  }
  async deleteFaculty(id, token) {
    return await this.delete("Faculties", id, token);
  }
  async updateFaculty(id, body, token) {
    return await this.put("Faculties", id, body, token);
  }
}
export default facultyService;
