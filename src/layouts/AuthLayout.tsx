import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import LoadingScreen from "../components/LoadingScreen";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="border border-white/50 rounded-2xl p-6 min-w-xl bg-white/30">
        <Outlet />
      </div>
    </div>
  );
}