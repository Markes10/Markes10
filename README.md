# Next.js Portfolio Terminal (GuestOS)

A retro terminal-style portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Quick Start

Double-click `run-project.bat` (Windows) or run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and type `help` in the terminal.

## Available Scripts

| Script                    | Description                            |
| ------------------------- | -------------------------------------- |
| `npm run dev`             | Start development server on port 3000  |
| `npm run build`           | Production build (standalone output)   |
| `npm run start`           | Start production server                |
| `npm run lint`            | Run ESLint                             |
| `npm run format`          | Format all files with Prettier         |
| `npm run format:check`    | Check formatting without writing       |
| `npm run test`            | Run Jest unit tests                    |
| `npm run e2e`             | Run Playwright browser tests           |
| `npm run storybook`       | Start Storybook on port 6006           |
| `npm run build-storybook` | Build Storybook static site            |
| `npm run typecheck`       | Run TypeScript type checking           |
| `npm run check`           | Run format, lint, test, and build      |
| `npm run security`        | Run npm audit (high severity)          |
| `npm run security:snyk`   | Run Snyk security scan (requires auth) |
| `npm run dev:db`          | Start dev server with database         |
| `npm run db:push`         | Push Prisma schema to database         |
| `npm run db:generate`     | Generate Prisma client                 |
| `npm run db:migrate`      | Run Prisma migrations                  |
| `npm run db:reset`        | Reset database                         |
| `npm run release`         | Run semantic-release                   |

## Project Structure

```
├── src/
│   ├── app/           # Next.js App Router pages & API
│   │   ├── api/       # REST API endpoints
│   │   │   ├── users/     # User CRUD
│   │   │   ├── posts/     # Post CRUD
│   │   │   └── projects/  # Project CRUD
│   │   └── page.tsx  # Terminal page
│   ├── components/    # React components
│   │   ├── Terminal.tsx  # Main terminal component
│   │   └── ui/        # shadcn/ui components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities
│       ├── db.ts      # Prisma client
│       └── terminal/  # Terminal engine
├── prisma/            # Database schema & seed
├── tests/             # Jest & Playwright tests
├── db/                # SQLite database file
└── .env               # Environment variables
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL` — SQLite database path (default: `file:./db/dev.db`)
- `API_WRITE_KEY` — bearer token required for API create, update, and delete operations

## Terminal Commands

Type `help` in the terminal for a full list of commands:

- `ls`, `cd`, `cat` — File system navigation
- `whoami`, `profile` — Display profile info
- `experience`, `projects`, `skills`, `education` — Portfolio sections
- `github [repo]` — GitHub profile / repo README viewer
- `contact`, `resume` — Contact info & resume download
- `theme [name]` — Switch terminal themes
- `crt`, `keys` — Toggle CRT effect & key sounds
- `clear` — Clear terminal screen
- `date`, `echo`, `uptime`, `neofetch`, `history`, `pwd`, `profile` — Shell utilities and profile display

## Themes

Built-in themes: `amber`, `green`, `white`, `cyber`, `red`, `purple`, `matrix`, `solarized`, `pink`, `blue`

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: shadcn/ui (Radix primitives)
- **Database**: SQLite via Prisma
- **Testing**: Jest + React Testing Library, Playwright
- **Storybook**: Component documentation
- **Linting**: ESLint + Prettier
- **Security**: npm audit, Snyk
- **Release**: semantic-release
