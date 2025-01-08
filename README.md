# First Cycle Guide - React Documentation Site

A comprehensive guide for first-time steroid cycle users, built with React, Tailwind CSS, and deployed on Netlify.

## Features

- 📱 Responsive design
- 📖 Markdown content support
- 🎨 Modern UI with Tailwind CSS
- 📊 Interactive tables and components
- 🔄 Client-side routing
- 📱 Mobile-friendly navigation

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- React Markdown
- Vite

## Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd steroid-guide-site
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

1. Create a production build:

```bash
npm run build
```

2. Preview the production build:

```bash
npm run preview
```

## Deployment

This site is configured for deployment on Netlify. To deploy:

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

The site will automatically deploy when changes are pushed to the main branch.

## Project Structure

```
steroid-guide-site/
├── public/
│   └── content/         # Markdown content files
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   └── App.tsx         # Main application component
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Content Management

The site content is organized in markdown files under `public/content/`. Each section has its own file:

- `01_introduction.md`
- `02_cycle_overview.md`
- `03_pharmacological_profiles.md`
- `04_training_nutrition.md`
- `05_glossary.md`
- `06_safety_considerations.md`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is private and confidential. All rights reserved.
