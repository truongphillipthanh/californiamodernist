# CMD System

**California Modernist Design - Internal Operational Tool**

A Taschen-inspired, map-first interface for managing architectural projects, permitting workflows, and client relationships.

## Tech Stack

- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS (with custom CMD design tokens)
- **Maps**: Mapbox GL JS
- **Routing**: React Router v6
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and add your Mapbox token:
   ```bash
   cp .env.local.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Design System

The CMD System follows the design specifications in `CMD_STYLE_GUIDE.md`:

- **Monochrome + Earned Color**: Stone palette (50-900) with color only for status
- **8px Base Unit**: All spacing derived from 8px grid
- **Taschen Minimalism**: Every element earns its presence
- **Map-First**: The spatial canvas is the foundation

## Project Structure

```
src/
├── components/
│   ├── layout/     # AppShell, navigation
│   ├── map/        # Map components (future)
│   ├── sidebar/    # Sidebar views (future)
│   ├── crm/        # CRM components (future)
│   └── ui/         # Shared UI components (future)
├── pages/          # Route pages
├── data/           # Mock data
├── lib/            # API and utilities
└── styles/         # CSS and design tokens
```

## Documentation

- `CMD_STYLE_GUIDE.md` - Complete design language specification
- `CMD_MASTER_CONTEXT.md` - Project architecture and context
- `CMD_PRD_v2.md` - Product requirements document
- `ROADMAP.md` - Development roadmap

## License

Proprietary - California Modernist Design
