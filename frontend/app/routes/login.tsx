import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Log in to your account." },
  ];
}

export default function Login() {
  return (
    <main className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl">Login</h1>
      <form className="flex flex-col gap-4 mt-4">
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
        <div className="flex justify-end">
          <Button label="Login" variant="primary" />
        </div>
      </form>
      <hr className="my-5 border-gray-300 dark:border-gray-600" />
      <p>
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </main>
  );
}
