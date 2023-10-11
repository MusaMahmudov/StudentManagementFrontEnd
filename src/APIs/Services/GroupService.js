import BaseURL from "../BaseURLs";
import HTTPClient from "../HTTPClient";

class groupService extends HTTPClient {
  constructor() {
    super(BaseURL);
  }

  async getAllGroups() {
    return await this.getAll("Groups");
  }
}
export default groupService;
