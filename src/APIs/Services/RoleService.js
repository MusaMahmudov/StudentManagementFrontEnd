import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class roleService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllRoles() {
    return await this.getAll("Roles");
  }
  async getRoleById(id) {
    return await this.getById("Roles", id);
  }
  async createRole(body) {
    return await this.post("Roles", body);
  }
  async updateRole(id, body) {
    return await this.put("Roles", id, body);
  }
  async deleteRole(id) {
    return await this.delete("Roles", id);
  }
}
