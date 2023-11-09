import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class userService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllUser(token) {
    return await this.getAll("Accounts", token);
  }
  async getAllUsersForStudentAndTeacherUpdate(token) {
    return await this.getAll(
      "Accounts/GetUserForStudentAndTeacherUpdate",
      token
    );
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
  async resetPassword(body) {
    return await this.post("Accounts/ResetPassword", body);
  }
  async confirmEmail(token, email) {
    return await this.post(`Accounts/ConfirmEmail/${token}/${email}`);
  }
  async forgotPassword(body) {
    return await this.post("Accounts/ForgotPassword", body);
  }
  async updateUser(id, body, token) {
    return await this.put("Accounts", id, body, token);
  }
  async deleteUser(id, token) {
    return await this.delete("Accounts", id, token);
  }
}
