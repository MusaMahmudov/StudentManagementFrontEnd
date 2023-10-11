import React from "react";
import axios from "axios";
class HTTPClient {
  BaseUrl;
  constructor(BaseUrl) {
    this.BaseUrl = BaseUrl;
  }
  async getAll(endPoint) {
    return await axios.get(`${this.BaseUrl}/${endPoint}`);
  }
  async put(endPoint, id, body) {
    return await axios.put(`${this.BaseUrl}/${endPoint}/${id}`, body);
  }
}
export default HTTPClient;
