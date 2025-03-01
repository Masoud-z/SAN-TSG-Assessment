import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";

const NotFound = () => {
  return (
    <div
      id="error-page"
      className="w-full h-screen justify-center items-center flex flex-col gap-4 "
    >
      <h1>404</h1>
      <img src="./404.jpg" width={300} height={300} />
      <h2>Page Not Found</h2>
      <h3 className="underline">
        <Link to={AppRouteKey.home.get()}>Home Page</Link>
      </h3>
    </div>
  );
};

export default NotFound;
