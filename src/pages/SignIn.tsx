import { Alert, Button, Input } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { authServices } from "../services/authService";
import { signInSchema } from "../schemas/signInSchema";
import type { LoginData } from "../types/loginData";
import { authContext } from "../contexts/authContext";

export default function SignIn() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(authContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "mostafa@gmail.com",
      password: "Mostafa@123",
    },
    resolver: zodResolver(signInSchema),
  });

  async function signIn(values: LoginData) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signIn(values);
      setIsLoggedIn(true);

      localStorage.setItem("token", data.data.token);
      setSuccessMsg(data.message);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setErrMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...getInputProps("email", "Email")}
              {...field}
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message as string}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...getInputProps("password", "Password")}
              {...field}
              isInvalid={!!errors.password?.message}
              errorMessage={errors.password?.message as string}
            />
          )}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign In
        </Button>
        <p>
          U don't have an account? <Link to={"/signup"}>Register now</Link>
        </p>
        {errMsg && (
          <Alert
            hideIcon
            color="danger"
            title={errMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
        {successMsg && (
          <Alert
            hideIcon
            color="success"
            title={successMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
      </div>
    </form>
  );
}