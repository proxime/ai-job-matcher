import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { fieldAria } from "../ui/field-aria.ts";
import { button, glow, input } from "../ui/styles.ts";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email.")
    .pipe(z.email("Enter a valid email address.")),
  password: z.string().min(1, "Enter your password."),
});

const fieldError = "text-[15px] text-jc-pink-soft";

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12 text-[17px]">
      <title>Sign in – Job Coast</title>

      <div className="flex w-full max-w-115 flex-col gap-7">
        <div className="text-center">
          <p className="font-display text-[40px] italic">
            <span className="text-jc-pink">JOB</span>{" "}
            <span className="text-jc-teal">COAST</span>
          </p>
          <p className="mt-2.5 text-jc-text-body">
            Paste a job offer, see if it is worth your time, keep every
            contract in one place.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(() => navigate("/profile"))}
          className={clsx(glow.pink, "flex flex-col gap-4.5 p-8")}
        >
          <h1 className="text-2xl font-bold">Sign in</h1>

          <button type="button" className={clsx(button.secondary, "bg-jc-bg")}>
            Continue with Google
          </button>

          <div
            aria-hidden="true"
            className="flex items-center gap-3 text-[15px] text-jc-text-muted"
          >
            <span className="h-px flex-1 bg-jc-line" />
            or
            <span className="h-px flex-1 bg-jc-line" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={emailId} className="text-[15px] font-medium">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={input.onSurface}
              {...fieldAria(emailId, { error: !!errors.email })}
              {...register("email")}
            />
            {errors.email && (
              <p id={`${emailId}-error`} className={fieldError}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={passwordId} className="text-[15px] font-medium">
                Password
              </label>
              <Link to="/sign-in" className="text-[15px]">
                Forgot?
              </Link>
            </div>
            <input
              id={passwordId}
              type="password"
              autoComplete="current-password"
              className={input.onSurface}
              {...fieldAria(passwordId, { error: !!errors.password })}
              {...register("password")}
            />
            {errors.password && (
              <p id={`${passwordId}-error`} className={fieldError}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className={button.primary}>
            Sign in
          </button>
        </form>

        <p className="text-center text-jc-text-muted">
          No account yet? <Link to="/sign-in">Create one</Link>
        </p>
      </div>
    </main>
  );
}
