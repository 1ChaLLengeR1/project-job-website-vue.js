export interface ResponseData {
  isValid: boolean;
  data: null | ResponseApiData;
  additional: null | ResponseApiAdditional;
}

export interface ResponseApi {
  status: string;
  status_code: number;
  data: ResponseApiData;
  additional: ResponseApiAdditional;
}

export type ResponseApiData = {};
export type ResponseApiAdditional = {};
