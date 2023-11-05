import HTTPClient from "../HTTPClient";
import BaseUrlForAll from "../BaseURLs";
export class lessonTypeService extends HTTPClient {
  constructor() {
    super(BaseUrlForAll);
  }
  async getAllLessonTypes(token) {
    return await this.getAll("LessonTypes", token);
  }
  async getLessonTypeById(id, token) {
    return await this.getById("LessonTypes", id, token);
  }
  async getLessonTypeByIdForUpdate(id, token) {
    return await this.getById("LessonTypes/update", id, token);
  }
  async createLessonType(body, token) {
    return await this.post("LessonTypes", body, token);
  }
  async updateLessonType(id, body, token) {
    return await this.put("LessonTypes", id, body, token);
  }
  async deleteLessonType(id, token) {
    return await this.delete("LessonTypes", id, token);
  }
}
