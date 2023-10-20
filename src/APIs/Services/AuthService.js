import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

export class authService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async Auth(body) {
    return await this.post("Authentications/Login", body);
  }
}
