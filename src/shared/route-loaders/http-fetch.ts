import {
  Feature,
  HttpResponseStatus,
  IDataResponse,
} from "../model/spot.interface";

/** fetch for the spots used by route-loaders */
export function getRequestByUrl(url: string): Promise<Feature[]> {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => {
      return new Promise((resolve) => {
        return setTimeout(() => {
          return resolve(response);
        }, 2000);
      }) as Promise<Response>;
    })
    .then((response: Response) => {
      console.log("fetching init");
      if (!response.ok || typeof response === "undefined") {
        return Promise.reject<HttpResponseStatus>({
          status: response.status || 400,
          message: response.statusText || "Something went wrong",
        });
      }
      return response.json();
    })
    .then((data: IDataResponse) => {
      const response: IDataResponse = data as IDataResponse;
      if (response.response_status.status > 399) {
        return Promise.reject({
          status: response.response_status.status,
          message: response.response_status.message,
        });
      }
      return response.data.features;
    })
    .catch((error: HttpResponseStatus) => {
      console.error(error.status, error.message);
      throw new Response("loading error", {
        status: error.status === 200 ? 400 : error.status,
        statusText: error.message,
      });
    });
}
