import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/signUpSchema";
import { useState } from "react";
import { authServices } from "../services/authService";
import type { RegisterData } from "../types/registerData";

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Mostafa",
      email: "Mostafa@gmail.com",
      password: "Mostafa@123",
      rePassword: "Mostafa@123",
      dateOfBirth: "2008-09-20",
      gender: "male",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function signUp(values: RegisterData) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signUp(values);

      setSuccessMsg(data.message);
      setIsLoading(false);
      navigate("/signin");
    } catch (error: any) {
      setErrMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Create Account</h1>
          <p>Sign up to start your journey</p>
        </div>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...getInputProps("text", "Full Name")}
              {...field}
              isInvalid={!!errors.name?.message}
              errorMessage={errors.name?.message as string}
            />
          )}
        />

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

        <Controller
          name="rePassword"
          control={control}
          render={({ field }) => (
            <Input
              {...getInputProps("password", "Confirm Password")}
              {...field}
              isInvalid={!!errors.rePassword?.message}
              errorMessage={errors.rePassword?.message as string}
            />
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <Input
              {...getInputProps("date", "Birth Date")}
              {...field}
              isInvalid={!!errors.dateOfBirth?.message}
              errorMessage={errors.dateOfBirth?.message as string}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              {...getInputProps(undefined, "Gender")}
              selectedKeys={field.value ? [field.value] : []}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              isInvalid={!!errors.gender?.message}
              errorMessage={errors.gender?.message as string}
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>
          )}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to={"/signin"}>Login now</Link>
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