/**
 * @fileoverview Component showcase and documentation page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      ComponentDemo
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * A comprehensive demonstration page showcasing all UI components and their variations.
 * Serves as both documentation and a testing ground for component development.
 *
 * Component Sections:
 * - Buttons (variants, sizes, states)
 * - Badges (styles, sizes)
 * - Form Controls (inputs, selects)
 * - Icons (sizes, colors)
 * - Cards (variations, interactions)
 *
 * Interactive Features:
 * - Loading state toggles
 * - Hover effects
 * - Form input demonstrations
 * - Interactive card variations
 *
 * Layout Structure:
 * - Container with max width
 * - Card-based sections
 * - Responsive grid layouts
 * - Consistent spacing
 *
 * @example
 * ```tsx
 * import ComponentDemo from './pages/ComponentDemo';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/components" element={<ComponentDemo />} />
 *     </Router>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - @heroicons/react@2.2.0
 * - react-router-dom@7.1.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - UI component library
 * - Modern browser with CSS Grid support
 */

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Container,
  Input,
  Select,
  Icon,
} from "../components/ui";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function ComponentDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <Container size="lg" className="py-12">
      <div className="space-y-12">
        {/* Buttons Section */}
        <Card>
          <CardHeader
            title="Buttons"
            description="Various button styles and states"
          />
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button isLoading={loading} onClick={() => setLoading(!loading)}>
                Toggle Loading
              </Button>
              <Button leftIcon={<BellIcon className="w-5 h-5" />}>
                With Icon
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader
            title="Badges"
            description="Status indicators and labels"
          />
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Form Controls Section */}
        <Card>
          <CardHeader
            title="Form Controls"
            description="Input fields and select dropdowns"
          />
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Text Input"
                placeholder="Enter some text"
                helperText="This is a helper text"
              />
              <Input
                label="With Icon"
                placeholder="Search..."
                leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
              />
              <Input
                label="Error State"
                placeholder="Invalid input"
                error="This field is required"
              />
              <Select
                label="Select Option"
                placeholder="Choose an option"
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                  { value: "3", label: "Option 3" },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Icons Section */}
        <Card>
          <CardHeader
            title="Icons"
            description="Various icon styles and sizes"
          />
          <CardContent>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col items-center gap-2">
                <Icon icon={BellIcon} size="xl" />
                <span className="text-sm">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon icon={CheckCircleIcon} size="xl" color="success" />
                <span className="text-sm">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon icon={ExclamationCircleIcon} size="xl" color="error" />
                <span className="text-sm">Error</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader
            title="Card Variations"
            description="Different card styles and interactions"
          />
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card variant="hover" className="h-full">
              <CardHeader title="Hover Card" />
              <CardContent>
                This card has a hover effect. Try hovering over it!
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="interactive" className="h-full">
              <CardHeader title="Interactive Card" />
              <CardContent>
                This card has an interactive effect with scale.
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card variant="default" className="h-full">
              <CardHeader
                title="With Action"
                action={
                  <Button size="sm" variant="ghost">
                    View All
                  </Button>
                }
              />
              <CardContent>
                This card has an action button in its header.
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
