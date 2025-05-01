import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Register for an account." },
  ];
}

export default function Register() {
  return (
    <main className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl">Register</h1>
      <form className="flex flex-col gap-4 mt-4">
        <Input name="name" label="Name" />
        <Input name="email" label="Email" />
        <Input name="phone_number" label="Phone Number" />
        <label className="block">Are you over 18?</label>
        <Input name="is_over_18" label="Yes" type="radio" />
        <Input name="is_over_18" label="No" type="radio" />
        <Input name="password" label="Password" type="password" />
        <Input name="confirmPassword" label="Confirm Password" type="password" />
        <div className="flex justify-end">
          <Button label="Register" variant="primary" />
        </div>
      </form>
      <hr className="my-5 border-gray-300 dark:border-gray-600" />
      <p>
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </main>
  );
}
