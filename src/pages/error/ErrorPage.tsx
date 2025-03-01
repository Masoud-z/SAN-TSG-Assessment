import { Link, useRouteError } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="w-full h-screen justify-center items-center flex flex-col gap-4 "
    >
      <img src="./error.jpg" width={300} height={300} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <>
          {error && typeof error === "object"
            ? "statusText" in error
              ? error.statusText
              : "message" in error
              ? (error as Error).message
              : "Unknown error, check console for more details"
            : "Unknown error, check console for more details"}
        </>
      </p>
      <h2>
        <Link to={AppRouteKey.home.get()}>Home Page</Link>
      </h2>
    </div>
  );
};

export default ErrorPage;
