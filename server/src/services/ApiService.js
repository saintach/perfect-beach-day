import config from "../config.js";
import axios from "axios";

const DEFAULT_PARAMS = {
  appid: config.api.key,
};

class ApiService {
  constructor(axiosConfig) {
    this.axios = axios.create({
      baseURL: config.api.one_call_url,
      ...axiosConfig,
    });
  }
  static geocoding(axiosConfig) {
    return new ApiService({
      baseURL: config.api.geocoding_url,
      ...axiosConfig,
    });
  }
  get(endpoint, params) {
    const result = this.axios.get(endpoint, {
      params: {
        ...params,
        ...DEFAULT_PARAMS,
      },
    });
    return result;
  }
  post(endpoint, body) {
    return this.axios.post(endpoint, body);
  }
  patch(endpoint, body) {
    return this.axios.patch(endpoint, body);
  }
  delete(endpoint, body) {
    return this.axios.delete(endpoint, body);
  }
}

export const api = new ApiService();
export const geocodingApi = ApiService.geocoding();
