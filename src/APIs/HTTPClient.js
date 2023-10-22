import axios from "axios";
class HTTPClient {
  BaseUrl;
  constructor(BaseUrl) {
    this.BaseUrl = BaseUrl;
  }
  async getAll(endPoint, token) {
    return await axios.get(`${this.BaseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getById(endPoint, id, token) {
    return await axios.get(`${this.BaseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async post(endPoint, body, token) {
    return await axios.post(`${this.BaseUrl}/${endPoint}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async postLogout(endPoint, token) {
    return await axios.post(`${this.BaseUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async put(endPoint, id, body, token) {
    return await axios.put(`${this.BaseUrl}/${endPoint}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async delete(endPoint, id, token) {
    return await axios.delete(`${this.BaseUrl}/${endPoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default HTTPClient;
