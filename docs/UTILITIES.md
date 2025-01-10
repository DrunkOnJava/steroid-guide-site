# Utility Documentation

## Date Utilities (`dateUtils.ts`)

The `dateUtils.ts` module provides functions for handling dates and time-related operations throughout the application.

### Key Functions

#### Date Formatting

```typescript
formatDate(date: Date, format: DateFormat = "short"): string
```

Formats dates according to user preferences and locale settings.

Options:

- `short`: "MM/DD/YYYY"
- `long`: "Month DD, YYYY"
- `iso`: "YYYY-MM-DD"

#### Date Calculations

```typescript
calculateDaysBetween(start: Date, end: Date): number
```

Calculates the number of days between two dates.

```typescript
addDays(date: Date, days: number): Date
```

Adds or subtracts days from a given date.

```typescript
isWithinRange(date: Date, start: Date, end: Date): boolean
```

Checks if a date falls within a specified range.

## Medication Utilities (`medicationUtils.ts`)

The `medicationUtils.ts` module handles medication-related calculations and validations.

### Key Functions

#### Dose Calculations

```typescript
calculateDosage(weight: number, dosagePerKg: number): number
```

Calculates medication dosage based on weight and dosage per kg.

```typescript
validateDosage(dose: number, min: number, max: number): boolean
```

Validates if a dosage falls within safe limits.

#### Schedule Management

```typescript
generateSchedule(medications: Medication[], startDate: Date): Schedule
```

Generates a medication schedule based on prescribed medications and start date.

```typescript
calculateOverlap(schedule1: Schedule, schedule2: Schedule): OverlapInfo[]
```

Identifies potential medication overlaps and interactions.

#### Safety Checks

```typescript
checkInteractions(medications: Medication[]): InteractionWarning[]
```

Checks for potential drug interactions between medications.

```typescript
validateFrequency(frequency: string, medication: Medication): boolean
```

Validates if medication frequency adheres to safe guidelines.

## Tracking Utilities (`trackingUtils.ts`)

The `trackingUtils.ts` module provides functionality for tracking and analyzing medication adherence and progress.

### Key Functions

#### Adherence Tracking

```typescript
calculateAdherence(scheduled: Dose[], taken: Dose[]): AdherenceMetrics
```

Calculates medication adherence metrics.

Returns:

```typescript
interface AdherenceMetrics {
  adherenceRate: number; // Percentage of doses taken as scheduled
  missedDoses: number; // Number of missed doses
  lateAdministrations: number; // Number of doses taken late
  streak: number; // Current streak of on-time doses
}
```

#### Progress Tracking

```typescript
trackProgress(measurements: Measurement[]): ProgressMetrics
```

Analyzes progress metrics over time.

```typescript
generateReport(trackingData: TrackingData): Report
```

Generates comprehensive progress reports.

#### Data Analysis

```typescript
analyzePatterns(trackingData: TrackingData): PatternAnalysis
```

Identifies patterns in medication usage and effectiveness.

```typescript
calculateTrends(metrics: Metric[]): TrendAnalysis
```

Analyzes trends in various tracking metrics.

## Best Practices

### Date Handling

1. Always use UTC for internal date storage
2. Convert to local time only for display
3. Use ISO format for date serialization
4. Handle timezone differences explicitly

Example:

```typescript
// Good
const utcDate = new Date();
const localDisplay = formatDate(utcDate, "long");

// Bad
const localDate = new Date().toLocaleString();
```

### Medication Management

1. Always validate dosages before calculations
2. Use precise decimal calculations for dosages
3. Include safety checks in all medication operations
4. Log all medication-related operations

Example:

```typescript
// Good
const dosage = calculateDosage(weight, dosagePerKg);
if (validateDosage(dosage, MIN_DOSE, MAX_DOSE)) {
  // Proceed with administration
}

// Bad
const dosage = weight * dosagePerKg;
// Proceed without validation
```

### Tracking

1. Store raw data alongside calculated metrics
2. Implement data validation for all tracking inputs
3. Use consistent units across all measurements
4. Include timestamp with all tracking data

Example:

```typescript
// Good
const trackingEntry = {
  timestamp: new Date().toISOString(),
  value: validateMeasurement(rawValue),
  unit: standardUnit,
};

// Bad
const trackingEntry = {
  value: rawValue,
  date: new Date().toString(),
};
```

## Error Handling

Each utility module implements comprehensive error handling:

```typescript
try {
  const result = calculateDosage(weight, dosagePerKg);
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else if (error instanceof CalculationError) {
    // Handle calculation error
  } else {
    // Handle unexpected error
  }
}
```

## Security Considerations

1. Sanitize all input data
2. Encrypt sensitive medical information
3. Implement access controls for medical data
4. Log all access to sensitive data

Example:

```typescript
const sensitiveData = await secureStore.getItem("medicalData", userKey);
const sanitizedInput = sanitizeInput(userInput);
const accessLog = {
  timestamp: new Date().toISOString(),
  userId: currentUser.id,
  action: "read",
  dataType: "medical",
};
```

## Testing

Each utility has corresponding test suites:

```typescript
describe("dateUtils", () => {
  test("formatDate handles various formats correctly", () => {
    // Test cases
  });
});

describe("medicationUtils", () => {
  test("calculateDosage returns correct values", () => {
    // Test cases
  });
});

describe("trackingUtils", () => {
  test("calculateAdherence provides accurate metrics", () => {
    // Test cases
  });
});
```
