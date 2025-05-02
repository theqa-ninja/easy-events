import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events" },
    { name: "description", content: "Here are our upcoming events for our volunteers to sign up." },
  ];
}

export default function Events() {
  return (
    <main className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl">Events</h1>
    </main>
  );
}
