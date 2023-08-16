import { Navigate } from "react-router-dom";

const NotFoundPage = () => {
  return <Navigate to={"/"} replace={true} />;
};

export default NotFoundPage;
