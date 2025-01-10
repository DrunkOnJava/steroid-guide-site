/**
 * @fileoverview Training and nutrition protocols data
 * @project     Steroid Guide Site
 * @module      data/trainingData
 */

import type { TrainingData } from "../types/training";

const trainingData: TrainingData = {
  phases: [
    {
      title: "Main Cycle Phase (Weeks 1-10)",
      description:
        "Capitalize on enhanced recovery with increased volume and progressive overload",
      workoutDays: [
        {
          name: "Push Day A",
          exercises: [
            { name: "Bench Press", sets: "4", reps: "6-8" },
            { name: "Incline DB Press", sets: "4", reps: "8-10" },
            { name: "Shoulder Press", sets: "4", reps: "8-10" },
            { name: "Lateral Raises", sets: "4", reps: "12-15" },
            { name: "Tricep Pushdowns", sets: "4", reps: "10-12" },
            { name: "Overhead Extensions", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Pull Day A",
          exercises: [
            { name: "Barbell Rows", sets: "4", reps: "6-8" },
            { name: "Weighted Pull-ups", sets: "4", reps: "8-10" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
            { name: "Barbell Curls", sets: "4", reps: "8-10" },
            { name: "Hammer Curls", sets: "3", reps: "12-15" },
            { name: "Rear Delt Flies", sets: "3", reps: "15-20" },
          ],
        },
        {
          name: "Legs A",
          exercises: [
            { name: "Squats", sets: "5", reps: "6-8" },
            { name: "Romanian Deadlifts", sets: "4", reps: "8-10" },
            { name: "Leg Press", sets: "4", reps: "10-12" },
            { name: "Leg Extensions", sets: "3", reps: "12-15" },
            { name: "Leg Curls", sets: "3", reps: "12-15" },
            { name: "Standing Calf Raises", sets: "4", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "500-700 above maintenance",
        protein: "2.0-2.2g per pound bodyweight",
        carbs: "2.5-3.0g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
    {
      title: "Transition Phase (Weeks 11-16)",
      description: "Maintain intensity while gradually reducing volume",
      workoutDays: [
        {
          name: "Upper Body Focus",
          exercises: [
            { name: "Incline Bench", sets: "4", reps: "8-10" },
            { name: "DB Shoulder Press", sets: "4", reps: "8-10" },
            { name: "Cable Flies", sets: "4", reps: "12-15" },
            { name: "Lat Pulldowns", sets: "4", reps: "10-12" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
            { name: "Tricep/Bicep Supersets", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Lower Body Focus",
          exercises: [
            { name: "Front Squats", sets: "4", reps: "8-10" },
            { name: "Walking Lunges", sets: "3", reps: "12/leg" },
            { name: "Hack Squats", sets: "3", reps: "10-12" },
            { name: "Leg Extensions", sets: "3", reps: "15-20" },
            { name: "Leg Curls", sets: "3", reps: "15-20" },
            { name: "Seated Calf Raises", sets: "4", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "300-400 above maintenance",
        protein: "2.0g per pound bodyweight",
        carbs: "2.0-2.5g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
    {
      title: "PCT Phase (Weeks 17-21)",
      description: "Focus on maintaining gains while reducing volume",
      workoutDays: [
        {
          name: "Full Body A",
          exercises: [
            { name: "Bench Press", sets: "3", reps: "8-10" },
            { name: "Barbell Rows", sets: "3", reps: "8-10" },
            { name: "Shoulder Press", sets: "3", reps: "10-12" },
            { name: "Leg Press", sets: "3", reps: "12-15" },
            { name: "Tricep Pushdowns", sets: "3", reps: "12-15" },
            { name: "Bicep Curls", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Full Body B",
          exercises: [
            { name: "Squats", sets: "3", reps: "8-10" },
            { name: "Pull-ups", sets: "3", reps: "8-10" },
            { name: "Incline Press", sets: "3", reps: "10-12" },
            { name: "Romanian Deadlifts", sets: "3", reps: "10-12" },
            { name: "Lateral Raises", sets: "3", reps: "12-15" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "Maintenance level",
        protein: "2.0g per pound bodyweight",
        carbs: "1.5-2.0g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
  ],
  recoveryProtocols: [
    {
      name: "Sleep Protocol",
      description:
        "Optimizing sleep is crucial for recovery, hormone production, and muscle growth",
      importance: "essential",
      frequency: "daily",
    },
    {
      name: "Stress Management",
      description:
        "Managing stress levels helps optimize recovery and hormone balance",
      importance: "recommended",
    },
    {
      name: "Active Recovery",
      description:
        "Light activity on rest days to promote blood flow and recovery",
      importance: "recommended",
      frequency: "rest days",
    },
    {
      name: "Morning Heart Rate",
      description:
        "Elevated morning heart rate can indicate insufficient recovery",
      importance: "recommended",
      frequency: "daily",
    },
    {
      name: "Sleep Quality",
      description: "Deep, uninterrupted sleep indicates good recovery",
      importance: "essential",
      frequency: "daily",
    },
    {
      name: "Training Performance",
      description: "Ability to maintain or increase weights/reps in workouts",
      importance: "essential",
      frequency: "per workout",
    },
    {
      name: "Joint Comfort",
      description: "Absence of unusual joint pain or stiffness",
      importance: "essential",
      frequency: "daily",
    },
  ],
};

export default trainingData;
