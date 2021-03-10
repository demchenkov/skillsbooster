import { HttpParams } from "@angular/common/http";

const getParams = (data: object) => {
  if (data == null) {
    return new HttpParams();
  }

  return Object.entries(data)
    .filter(([key, val]) => key != null && val != null)
    .reduce((query, [key, val]) => query.append(key, val?.toString()), new HttpParams());
}

export const HttpParamsUtils = {
  getParams
}