# Project TODO List

## Component Modularization

### Today Page ✅

- [x] Extract CycleProgress component for progress tracking
- [x] Create StatsGrid component for quick stats display
- [x] Create DateDisplay component for current date/time
- [x] Extract MedicationList component for daily medications
- [x] Create ScheduleDisplay component for full schedule
- [x] Move MedicationTooltip to utilities
- [x] Create utility functions module for date/cycle calculations

### Training & Nutrition Page ✅

- [x] Create WorkoutDay component for exercise lists
- [x] Extract NutritionGrid component for macro tracking
- [x] Create RecoverySection component
- [x] Extract PhaseSelector component for phase tabs
- [x] Create shared types module for training/nutrition interfaces

### Safety Page ✅

- [x] Create BloodworkSection component
- [x] Create HealthMarkersSection component
- [x] Create EmergencyProtocolsSection component
- [x] Create EquipmentSection component
- [x] Create PreventiveMeasuresSection component
- [x] Extract SafetyCard component for reusable safety info displays

### Glossary Page ✅

- [x] Create TermDefinition component for individual terms
- [x] Create CategorySection component for grouped terms
- [x] Create AdditionalInfo component for expandable term details
- [x] Extract search and filter functionality to separate component

### Shared Components ✅

- [x] Create TooltipWrapper component for consistent tooltip usage
- [x] Extract IconWithLabel component for consistent icon+text layouts
- [x] Create StatsCard component for reusable stat displays
- [x] Create TooltipList component for reusable tooltip-enabled lists
- [x] Create CategoryHeader component for consistent section headers

### Compounds Page ✅

- [x] Create CompoundTypeSchedule component for compound metadata display
- [x] Create BenefitsList component for displaying compound benefits
- [x] Create ConsiderationsList component for displaying considerations
- [x] Create StorageInfo component for compound storage details
- [x] Extract CompoundHeader component for consistent compound headers
- [x] Create CompoundMetadata component for type/schedule/half-life display
- [x] Create InfoList component for reusable benefit/consideration lists

### Cycle Overview Page ✅

- [x] Create CycleLegend component for displaying compound type indicators
- [x] Create CycleTableHeader component for consistent table headers
- [x] Create CycleTableRow component for individual cycle entries
- [x] Extract CyclePhaseIndicator component for phase coloring
- [x] Create CompoundTypeIndicator component for type styling
- [x] Extract FrequencyCell component with EOD tooltip
- [x] Create CycleTableContainer for responsive table wrapper

### Medication Schedule Page

- [ ] Create PhaseHeader component for phase titles
- [ ] Create MedicationCard component for daily medications
- [ ] Create ScheduleLegend component for phase indicators
- [ ] Extract PrintControls component for print/share buttons
- [ ] Create QRCodeDisplay component for digital access
- [ ] Extract MedicationTooltip component for consistent tooltips
- [ ] Create PhaseSection component for rendering phase blocks
- [ ] Extract schedule generation logic to utilities

### Data Organization

- [x] Move glossary terms to separate data file
- [x] Create types file for glossary term interfaces
- [ ] Move safety protocols to separate data file
- [ ] Create types file for safety protocol interfaces
- [ ] Organize workout/nutrition data into separate files
- [ ] Create shared types for workout/nutrition interfaces
- [x] Move cycle data to separate data file (profileCycles.ts)
- [x] Create types file for cycle data interfaces (compounds.ts)
- [ ] Extract color configuration to theme constants
- [x] Create shared types for compound-related interfaces (compounds.ts)
- [x] Move medication schedule data to separate file (profileSchedules.ts)
- [x] Create types for medication schedule interfaces (compounds.ts)
- [x] Extract date calculation utilities to shared module (dateUtils.ts)
- [ ] Create shared constants for phase configurations

## UI Components ✅

### Completed

- [x] Created base UI component library with TypeScript and Tailwind CSS
- [x] Implemented Button component with variants, sizes, and loading states
- [x] Implemented Card component with header, content, and footer sections
- [x] Created Badge component for status indicators
- [x] Added Input component with validation and icon support
- [x] Added Select component for dropdown selections
- [x] Created Container component for layout management
- [x] Added Icon component wrapper for consistent icon usage
- [x] Created component demo page at `/components`
- [x] Added comprehensive documentation in README.md

### Future Improvements

- [ ] Add more button variants (e.g., gradient, icon-only)
- [ ] Implement dark mode support for all components
- [ ] Add animation options for interactive components
- [ ] Create form component for handling form state
- [ ] Add tooltip component
- [ ] Add dropdown menu component
- [ ] Add modal/dialog component
- [ ] Add pagination component
- [ ] Add tabs component
- [ ] Add accordion component
- [ ] Add toast notifications
- [ ] Add date picker component
- [ ] Add autocomplete component
- [ ] Add slider component
- [ ] Add progress indicators

## Testing

- [ ] Add unit tests for all UI components
- [ ] Add integration tests for component interactions
- [ ] Add accessibility tests
- [ ] Add visual regression tests
- [ ] Add performance benchmarks

## Documentation

- [ ] Add Storybook for component documentation
- [ ] Create interactive playground
- [ ] Add more complex usage examples
- [ ] Add component composition examples
- [ ] Document theming system

## Accessibility

- [ ] Conduct full accessibility audit
- [ ] Add ARIA live regions where needed
- [ ] Improve keyboard navigation
- [ ] Add screen reader testing documentation
- [ ] Implement focus management system

## Performance

- [ ] Optimize component bundle sizes
- [ ] Add code splitting for larger components
- [ ] Implement component lazy loading
- [ ] Add performance monitoring
- [ ] Optimize re-renders

## Developer Experience

- [ ] Add component generators
- [ ] Improve TypeScript types
- [ ] Add prop validation warnings
- [ ] Create development tools/utilities
- [ ] Add more code examples

## Design System

- [ ] Create design tokens
- [ ] Document spacing system
- [ ] Document color system
- [ ] Create typography scale
- [ ] Define animation guidelines

## Infrastructure

- [ ] Set up automated releases
- [ ] Improve build system
- [ ] Add CI/CD pipelines
- [ ] Set up automated dependency updates
- [ ] Implement versioning strategy
