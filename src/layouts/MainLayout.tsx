import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../contexts/authContext";
import LoadingScreen from "../components/LoadingScreen";

export default function MainLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
