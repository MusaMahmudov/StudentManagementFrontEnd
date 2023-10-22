import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class userService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllUser(token) {
    return await this.getAll("Accounts", token);
  }
  async getUserById(id, token) {
    return await this.getById("Accounts", id, token);
  }
  async getUserByIdForUpdate(id, token) {
    return await this.getById("Accounts/update", id, token);
  }
  async createUser(body, token) {
    return await this.post("Accounts", body, token);
  }
  async updateUser(id, body, token) {
    return await this.put("Accounts", id, body, token);
  }
  async deleteUser(id, token) {
    return await this.delete("Accounts", id, token);
  }
}
