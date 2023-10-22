import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class authService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async Login(body) {
    return await this.post("Authentications/Login", body);
  }
  async Logout(token) {
    return await this.postLogout("Authentications/LogOut", token);
  }
}
