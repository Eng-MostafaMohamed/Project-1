import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function ProtectedAuthRoute({
  children,
}: {
  children: ReactElement;
}) {

  const { isLoggedIn } = useContext(authContext);

  return <div>{isLoggedIn ? <Navigate to={"/"} /> : children}</div>;
}
