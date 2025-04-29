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
    <main className="p-5 max-w-3xl mx-auto">
      <h1 className="text-2xl">Login</h1>
      <form className="flex flex-col gap-4 mt-4">
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
        <Button label="Login" variant="primary" />
      </form>
    </main>
  );
}
