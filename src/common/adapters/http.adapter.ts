import { HttpAdapter } from "@common/interfaces/http-adapter.interface";
import { Injectable, Logger } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class HttpAdapterService implements HttpAdapter {
  private readonly logger = new Logger(HttpAdapterService.name);

  private axios: AxiosInstance = axios;

  async get<T>(url: string, config?: any): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async post<T>(url: string, body?: any, config?: any): Promise<T> {
    try {
      const { data } = await this.axios.post<T>(url, body, config);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    try {
      const { data } = await this.axios.delete<T>(url, config);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
