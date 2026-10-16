import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { HeroUIProvider } from "@heroui/react";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute";
import CounterContextProvider from "./contexts/counterContext";
import AuthContextProvider from "./contexts/authContext";
import PostDetails from "./pages/PostDetails";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: (
          <ProtectedAuthRoute>
            <SignUp />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectedAuthRoute>
            <SignIn />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:postId",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <HeroUIProvider>
              <RouterProvider router={router}></RouterProvider>
            </HeroUIProvider>
          </CounterContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
