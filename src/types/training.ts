/**
 * @fileoverview TypeScript interface definitions for training and nutrition data
 * @project     Steroid Guide Site
 * @module      types/training
 */

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

export interface WorkoutDay {
  name: string;
  exercises: Exercise[];
}

export interface NutritionPlan {
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface TrainingPhase {
  title: string;
  description: string;
  workoutDays: WorkoutDay[];
  nutrition: NutritionPlan;
}

export interface RecoveryProtocol {
  name: string;
  description: string;
  frequency?: string;
  importance: "essential" | "recommended" | "optional";
}

export interface TrainingData {
  phases: TrainingPhase[];
  recoveryProtocols: RecoveryProtocol[];
}
