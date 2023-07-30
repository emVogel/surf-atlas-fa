import { useRouteError } from "react-router-dom";
import { HttpResponseStatus } from "../../../model/spot.interface";

function LoaderError() {
  const error = useRouteError() as HttpResponseStatus;
  const message = error.message ?? "An error occurred!";
  return (
    <section>
      <h1>{error?.status}</h1>
      <h2>{message}</h2>
    </section>
  );
}

export default LoaderError;
