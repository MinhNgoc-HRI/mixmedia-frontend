import axios from "axios";
import type { ApiResponse } from "./types";

export const handleError: (error: any) => ApiResponse<any> = (error) => {
  if (axios.isCancel(error)) {
    return {
      status: false,
      error: "Hủy api",
      data: null,
    };
  }
  if (axios.isAxiosError(error)) {
    return {
      status: false,
      data: error.response?.data,
      error:
        (error?.response?.data?.message as string) ||
        "Hệ thống đang có lỗi xảy ra, quý khách vui lòng thử lại sau ít phút",
    };
  }
  return {
    status: false,
    error: "đã có lỗi xảy ra",
    data: null,
  };
};
