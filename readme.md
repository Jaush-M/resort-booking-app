# Resort Booking App

A full-stack web application for browsing and booking resort accommodations, built as a group project for uwe degree program.

---

## Tech Stack

| Layer         | Technology       |
| ------------- | ---------------- |
| Frontend      | Next.js          |
| Backend       | Hono             |
| Database      | PostgreSQL       |
| Orchestration | Turborepo + bun  |

---

## Getting Started

### Prerequisites

- [bun](https://bun.com/) (v1.3+)
- [PostgreSQL](https://www.postgresql.org/) (v17+)

### Installation

```bash
git clone <repo-url>
cd <project-folder>
bun install
```

Set up your environment variables (see each app's `.env.example`), then start the dev server:

```bash
bun dev
```

---

## Scripts

| Command                           | Description                                |
| --------------------------------- | ------------------------------------------ |
| `bun dev`                         | Run frontend + backend in development mode |
| `bun run build`                   | Build frontend + backend                   |
| `bun run --filter web dev`        | Run Next.js only                           |
| `bun run --filter api dev`        | Run API only                               |
| `bun run --filter web build`      | Build Next.js only                         |
| `bun run --filter api build`      | Build API only                             |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, commit conventions, and the PR process.
