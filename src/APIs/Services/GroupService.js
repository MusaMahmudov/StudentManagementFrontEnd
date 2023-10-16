import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class groupService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllGroups() {
    return await this.getAll("Groups");
  }
  async getGroupById(id) {
    return await this.getById("Groups", id);
  }
  async createGroup(body) {
    return await this.post("Groups", body);
  }
  async deleteGroup(id) {
    return await this.delete("Groups", id);
  }
  async updateGroup(id, body) {
    return await this.put("Groups", id, body);
  }
}
export default groupService;
