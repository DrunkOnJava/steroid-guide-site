# Steroid Guide Site

A comprehensive web application providing educational information and guidance about steroids, including cycle management, compound information, and safety considerations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [UI Components](#ui-components)
  - [Component Library Overview](#component-library-overview)
  - [Installation](#installation)
  - [Component Documentation](#component-documentation)
    - [Button](#button)
    - [Card](#card)
    - [Badge](#badge)
    - [Input](#input)
    - [Select](#select)
    - [Container](#container)
    - [Icon](#icon)
  - [Best Practices](#best-practices)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- 📊 Cycle Overview and Management
- 💊 Detailed Compound Information
- 📅 Medication Schedule
- 🏋️ Training and Nutrition Guidelines
- 🔒 Safety Considerations
- 📖 Comprehensive Glossary

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- HeadlessUI
- HeroIcons

## UI Components

### Component Library Overview

The application includes a comprehensive set of reusable UI components built with TypeScript and Tailwind CSS. These components are:

- Fully typed with TypeScript
- Styled with Tailwind CSS
- Accessible (ARIA support, keyboard navigation)
- Responsive by default
- Customizable through props and Tailwind classes

View the live component demo at [/components](http://localhost:5173/components) after starting the development server.

### Installation

The components are built into the project and available through the `components/ui` directory. To use them in your components:

```tsx
import { Button, Card, Input } from "../components/ui";
```

### Component Documentation

#### Button

The Button component provides a consistent way to trigger actions.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

```tsx
import { Button } from "./components/ui";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With loading state
<Button isLoading>Loading...</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>
```

#### Card

The Card component provides a flexible container for content with optional header and footer sections.

**Props:**

- `variant`: 'default' | 'hover' | 'interactive'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `border`: boolean
- `shadow`: boolean

**Sub-components:**

- `CardHeader`: Title and optional description/action
- `CardContent`: Main content area
- `CardFooter`: Footer content area

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "./components/ui";

<Card>
  <CardHeader title="Card Title" description="Optional description" />
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>

// With variants
<Card variant="hover">Hover effect</Card>
<Card variant="interactive">Scale on hover</Card>
```

#### Badge

The Badge component is used for status indicators and labels.

**Props:**

- `variant`: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: 'none' | 'sm' | 'md' | 'full'

```tsx
import { Badge } from "./components/ui";

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

#### Input

The Input component provides a consistent way to collect user input.

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `fullWidth`: boolean

```tsx
import { Input } from "./components/ui";

<Input
  label="Username"
  placeholder="Enter username"
  helperText="This is helper text"
/>

// With error state
<Input
  label="Email"
  error="Invalid email address"
/>

// With icons
<Input
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
```

#### Select

The Select component provides a dropdown selection interface.

**Props:**

- `label`: string
- `error`: string
- `helperText`: string
- `options`: SelectOption[]
- `placeholder`: string
- `fullWidth`: boolean

**SelectOption interface:**

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

```tsx
import { Select } from "./components/ui";

<Select
  label="Choose option"
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>;
```

#### Container

The Container component provides consistent max-width and padding.

**Props:**

- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `centered`: boolean

```tsx
import { Container } from "./components/ui";

<Container size="lg">Content with max-width</Container>;
```

#### Icon

The Icon component provides consistent sizing and coloring for icons.

**Props:**

- `icon`: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted'
- `label`: string (for accessibility)

```tsx
import { Icon } from "./components/ui";
import { BellIcon } from "@heroicons/react/24/outline";

<Icon icon={BellIcon} size="md" color="primary" />;
```

### Best Practices

1. **Use the Barrel Import**

```tsx
import { Button, Card, Input } from "./components/ui";
```

2. **Leverage TypeScript**

```tsx
import type { ButtonProps, CardProps } from "./components/ui";
```

3. **Customize with Tailwind**

```tsx
<Button className="bg-custom-color hover:bg-custom-hover">Custom Style</Button>
```

4. **Follow Accessibility Guidelines**

- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure keyboard navigation works
- Include proper form labels
- Test with screen readers

5. **Component Composition**

- Combine components to build complex interfaces
- Use layout components like Container for consistent spacing
- Leverage component variants before custom styles
- Keep components focused and single-purpose

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/drunkonjava/steroid-guide-site.git
cd steroid-guide-site
```

2. Install VSCode Extensions:
   - GitHub Actions (github.vscode-github-actions)
   - markdownlint (davidanson.vscode-markdownlint)
   - Code Spell Checker (streetsidesoftware.code-spell-checker)

These extensions are recommended in `.vscode/extensions.json` and should be automatically suggested by VSCode.

3. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Available Scripts

### Development

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production, generates sitemap, and captures screenshots
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checking
- `npm test` - Runs tests (when implemented)

### Documentation

- `npm run screenshots` - Manually captures full-page screenshots of all routes
- `npm run lint:md` - Checks markdown files for style consistency
- `npm run check:links` - Validates all documentation links
- `npm run check:spelling` - Performs spell checking on documentation
- `npm run test:code-examples` - Tests code examples in documentation

### Documentation Automation

The project includes comprehensive documentation automation through GitHub Actions:

1. **Quality Checks**:

   - Markdown style consistency
   - Link validation
   - Spell checking
   - Code example testing
   - Documentation size monitoring

2. **Automated Updates**:

   - Sitemap generation
   - File header management
   - Pull request creation with detailed reports

3. **Configuration**:
   - `.markdownlint.json` - Markdown style rules
   - `.cspell.json` - Custom dictionary and spell check settings

The documentation workflow runs automatically when documentation files are changed and creates a pull request with updates and check results. The workflow can be monitored and managed directly in VSCode through the GitHub Actions tab, which provides:

- Real-time workflow status
- Detailed logs and error messages
- Ability to manually trigger workflows
- Quick access to workflow runs and artifacts
- Visual workflow graphs
- Security analysis

The VSCode GitHub Actions integration is pre-configured through `.vscode/settings.json` with optimized settings for workflow visualization and management.

### Automated Screenshots

The build process automatically captures full-page screenshots of every route in the application. These screenshots are saved in the `/screenshots` directory and include:

- Home page
- Introduction
- Cycle Overview
- Compounds
- Training & Nutrition
- Glossary
- Safety
- Schedule

Screenshots are automatically updated during each build to ensure they reflect the latest version of the site. This helps with visual regression testing and documentation. You can also manually capture screenshots using `npm run screenshots` (requires the development server to be running).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
