import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class userService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllUser() {
    return await this.getAll("Accounts");
  }
  async getUserById(id) {
    return await this.getById("Accounts", id);
  }
  async getUserByIdForUpdate(id) {
    return await this.getById("Accounts/update", id);
  }
  async createUser(body) {
    return await this.post("Accounts", body);
  }
  async updateUser(id, body) {
    return await this.put("Accounts", id, body);
  }
  async deleteUser(id) {
    return await this.delete("Accounts", id);
  }
}
