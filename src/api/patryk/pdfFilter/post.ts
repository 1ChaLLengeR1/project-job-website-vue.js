import { apiDownloadFile } from "@/api/common/post";
import type { ResponseData } from "@/types/global";

export async function pdfFilterDownload(body: FormData): Promise<ResponseData> {
  const urlPath = "/pdf_filter/create";
  const response = await apiDownloadFile(urlPath, body, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return pdfFIlter");
    return {
      isValid: false,
      data: response.data,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data,
    additional: response.additional,
  };
}
