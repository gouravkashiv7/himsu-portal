# Himsu Portal Frontend

This is the frontend application for the Himsu Portal, built with [Next.js](https://nextjs.org) 16 (App Router) and TypeScript. It serves as the user interface for accessing various portal services including college information, blood donation resources, and more.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (icons)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), Custom components
- **State Management:** [Zustand](https://github.com/pmndrs/zustand), [React Query](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Utilities:** Axios, date-fns, clsx, tailwind-merge
- **SEO:** next-seo, next-sitemap
- **Theming:** next-themes (Dark/Light mode)

## 📂 Project Structure

The project follows the standard Next.js App Router structure:

```
client/
├── app/                  # Application routes and pages
│   ├── blood-donation/   # Blood donation related pages
│   ├── college/          # College related pages
│   ├── faq/              # FAQ page
│   ├── resources/        # Resource pages
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout definition
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── blood/            # Components specific to blood donation feature
│   ├── college/          # Components specific to college feature
│   ├── home/             # Components used on the home page
│   ├── layout/           # Global layout components (Header, Footer, etc.)
│   ├── ui/               # Generic UI components (Buttons, Inputs, etc.)
│   ├── providers.tsx     # App-wide providers (Theme, QueryClient)
│   └── theme-toggle.tsx  # Dark/Light mode toggle
├── lib/                  # Utility functions and shared logic
│   ├── data/             # Static data and data access layers
│   └── utils.ts          # Helper functions (e.g., class name merging)
├── public/               # Static assets (images, icons)
└── ...config files       # Configuration for Next.js, Tailwind, TypeScript, etc.
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- [pnpm](https://pnpm.io/) (Package Manager)

### Installation

1.  Navigate to the client directory:

    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running Locally

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 📜 Scripts

| Script      | Description                                      |
| :---------- | :----------------------------------------------- |
| `dev`       | Starts the development server with hot-reloading |
| `build`     | Builds the application for production            |
| `start`     | Starts the production server                     |
| `postbuild` | Automatically runs `next-sitemap` after a build  |

## ⚙️ Configuration

- **Environment Variables:** Create a `.env.local` file in the root of the `client` directory to store environment-specific variables.
- **Tailwind CSS:** Configured via `postcss.config.mjs` and `globals.css` (Tailwind v4).
- **Sitemap:** Configured via `next-sitemap.config.js`.

## ✨ Key Features

- **Responsive Design:** Fully responsive layout using Tailwind CSS.
- **Dark Mode:** Built-in support for light and dark themes.
- **SEO Optimized:** Includes sitemap generation and SEO metadata.
- **Type Safety:** comprehensive TypeScript support.
