import * as zod from "zod";
import { regex } from "../utils/regex";


export const signInSchema = zod
    .object({
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
    })