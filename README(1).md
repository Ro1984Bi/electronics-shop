# Electronics Shop

A full-stack electronics shop built as a learning project with TanStack Start, React, TypeScript, Bun, and Turso.

![Electronics Shop preview](./docs/electronics-shop-preview.png)

## Features

- Responsive dark-themed interface
- Product catalog backed by Turso
- Product search
- Product detail pages
- Shopping cart with quantity controls
- Cart persistence using Zustand and `localStorage`
- Authentication with Auth.js
- Protected product creation
- Toast notifications

> This is a local learning project. It does not include a payment gateway or a real checkout flow.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework and routing |
| [React](https://react.dev/) | User interface |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Bun](https://bun.sh/) | JavaScript runtime and package manager |
| [Turso](https://turso.tech/) | Hosted SQLite-compatible database used for development |
| [Drizzle ORM](https://orm.drizzle.team/) | Type-safe database queries and schema |
| [Auth.js](https://authjs.dev/) | Authentication |
| [Zustand](https://zustand.docs.pmnd.rs/) | Client-side cart state and persistence |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Vite](https://vite.dev/) | Development server and build tooling |
| [Lucide React](https://lucide.dev/) | Icons |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [ESLint](https://eslint.org/) | Code linting |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Turso database and its credentials configured in `.env`

### Installation

```bash
git clone <your-repository-url>
cd electronics-shop
bun install
```

Create a `.env` file in the project root and add the environment variables required by the database and authentication configuration. Do not commit secrets.

### Run locally

```bash
bun --bun run dev
```

Open the local URL printed by the development server (usually `http://localhost:3000`).

### Type-check

```bash
bunx tsc --noEmit
```

## Project Status

This project is for study and practice. Payment processing, real checkout, and deployment are intentionally out of scope.

## License

No license has been specified yet.
