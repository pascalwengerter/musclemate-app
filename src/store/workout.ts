import { defineStore } from "pinia";
import { Workout } from "../../types";
import { availableWorkouts } from "../workouts";

export const useWorkoutStore = defineStore("workout", {
  state: () => {
    return {
      availableWorkouts,
      chosenWorkout: null as Workout | null,
      finished: false,
    };
  },
});
