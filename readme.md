# Resort Booking App

A full-stack web application for browsing and booking resort accommodations, built as a group project for uwe degree program.

---

## Tech Stack

| Layer         | Technology       |
| ------------- | ---------------- |
| Frontend      | Next.js          |
| Backend       | ASP.NET Core     |
| Database      | PostgreSQL       |
| Orchestration | Turborepo + pnpm |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v24+)
- [.NET SDK](https://dotnet.microsoft.com/) (v10+)
- [pnpm](https://pnpm.io/) (v10+)
- [PostgreSQL](https://www.postgresql.org/) (v17+)

### Installation

```bash
git clone <repo-url>
cd <project-folder>
pnpm install
```

Set up your environment variables (see each app's `.env.example`), then start the dev server:

```bash
pnpm dev
```

---

## Scripts

| Command                       | Description                                |
| ----------------------------- | ------------------------------------------ |
| `pnpm dev`                    | Run frontend + backend in development mode |
| `pnpm build`                  | Build frontend + backend                   |
| `pnpm --filter web dev`       | Run Next.js only                           |
| `pnpm --filter backend dev`   | Run ASP.NET Core only                      |
| `pnpm --filter web build`     | Build Next.js only                         |
| `pnpm --filter backend build` | Build ASP.NET Core only                    |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, commit conventions, and the PR process.
