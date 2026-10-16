import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {

  const { isLoggedIn } = useContext(authContext);

  return <div>{isLoggedIn ? children : <Navigate to={"/signin"} />}</div>;
}
