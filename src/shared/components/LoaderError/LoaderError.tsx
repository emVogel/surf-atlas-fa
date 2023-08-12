import { useRouteError, useAsyncError } from "react-router-dom";
import { HttpResponseStatus } from "../../../model/spot.interface";

interface IRouterErrorResponse {
  status: number;
  data?: HttpResponseStatus;
  statusText: string;
  internal: boolean;
}

// TODO styling making it a fancy error
/**
 * React element for depicting an error on using the map-data-lodaer
 */
function LoaderError(): JSX.Element {
  const error = useAsyncError() as IRouterErrorResponse;
  const message = error?.statusText ?? "Whatsoever error ocuured";
  const status = error?.status ?? 400;
  return (
    <section>
      <h1>{status}</h1>
      <h2>{message}</h2>
    </section>
  );
}

export default LoaderError;
