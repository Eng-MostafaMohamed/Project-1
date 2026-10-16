import * as zod from "zod";
import { regex } from "../utils/regex";
import { getAge } from "../utils/helpers";


export const signUpSchema = zod
    .object({
        name: zod
            .string()
            .nonempty("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(20, "Name must be at most 20 characters"),
        email: zod
            .string()
            .nonempty("Email is required")
            .regex(regex.email, "Enter valid email"),
        password: zod
            .string()
            .nonempty("Password is required")
            .regex(
                regex.password,
                "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
            ),
        rePassword: zod.string().nonempty("Confirm Password is required"),
        dateOfBirth: zod
            .string()
            .nonempty("Birth Date is required")
            .refine((date) => getAge(date) >= 18, "Age must be at least 18"),
        gender: zod
            .string()
            .nonempty("Gender is required")
            .regex(regex.gender, "Gender must be Male or Female"),
    })
    .refine((data) => data.password == data.rePassword, {
        message: "Confirm Password must match the Password",
        path: ["rePassword"],
    });