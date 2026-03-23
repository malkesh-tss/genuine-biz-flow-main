# The Scale Summit - Speed Networking Landing Page

A modern, responsive landing page for The Scale Summit's free virtual speed networking event for business owners.

## Features

- 🎯 Fast-paced networking format (30 minutes)
- 👥 High-quality attendees (business owners, decision-makers)
- 💰 Completely free to attend
- 🎨 Modern design with gold/navy color scheme
- ✨ Smooth animations and visual effects
- 📱 Fully responsive

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: Radix UI + shadcn/ui
- **Animations**: CSS animations with Tailwind

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build

```bash
# Create production build
npm run build
```

## Project Structure

```
├── src/
│   ├── assets/           # Static assets (images, logos)
│   ├── components/       # React components
│   │   ├── ui/          # UI components (shadcn/ui)
│   │   └── PageLoader.tsx
│   ├── hooks/           # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   └── Index.tsx   # Main landing page
│   ├── App.tsx         # Root app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Public static files
├── index.html          # HTML template
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## License

© 2026 The Scale Summit. All rights reserved.
