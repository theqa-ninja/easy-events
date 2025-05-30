## About
Easy Events is a web app that helps organizations manage their volunteer signups. The MVP will provide the following functionality:
- Admins can create and manage volunteer events
- Admins can edit event details, date/time of an event and event description
- Admins can set volunteer roles needed for an event upon event creation
- Admins can set desired number of adult and teenager volunteer slots
- Admins can mark volunteers as "checked in" as they show up
- Volunteers can signup to volunteer at an event
- Volunteers can receive email confirmation of their signup
- Volunteers can cancel their signup and send a notification to an admin that they can no longer attend the event

## Project considerations
While developing this project, we built it to meet the need of a specific organization. That said, we hope that other organizations may find this tool useful and use/repurpose it for their needs. Thus, we have built this with an eye towards multi-tenancy.

## 🛠️ Tech Stack
- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for the frontend
- [Ruby on Rails](https://rubyonrails.org/) backend with a [PostgreSQL] database 
- [Tailwind](https://tailwindcss.com/) for styling components
- [Yup](https://github.com/jquense/yup) for client-side form validations

## 📦 Installation

We developed this app using Node version `v23.11.0`.

```bash
git clone https://github.com/theqa-ninja/easy-events.git
cd easy-events
npm install
```

## 🔧 Available Scripts

In the project directory, you can run:

`npm install` – Installs packages and dependencies.

`npm run dev` – Runs the app in development mode
