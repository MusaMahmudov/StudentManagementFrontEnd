import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class groupService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllGroups(token) {
    return await this.getAll("Groups", token);
  }
  async getGroupById(id, token) {
    return await this.getById("Groups", id, token);
  }
  async createGroup(body, token) {
    return await this.post("Groups", body, token);
  }
  async deleteGroup(id, token) {
    return await this.delete("Groups", id, token);
  }
  async updateGroup(id, body, token) {
    return await this.put("Groups", id, body, token);
  }
}
export default groupService;
