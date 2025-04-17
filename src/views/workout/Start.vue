<template>
  <DarkLogo />
  <BackButton />
  <WorkoutCard>
    <h1>Basic Workout</h1>
    <p>Choose a ready-made workout for the most convenient way of exercising.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <button
        v-for="workout in store.availableWorkouts"
        :key="workout.title"
        class="btn btn-gradient w-4/5 block my-3"
        @click="pickWorkoutAndAdvance(workout)"
      >
        Start {{ workout.title }}
      </button>
    </div>
  </WorkoutCard>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useWorkoutStore } from "../../store/workout";

const router = useRouter();
const store = useWorkoutStore();

const pickWorkoutAndAdvance = (workout) => {
  store.chosenWorkout = workout;
  router.push("/workout/timer");
};
</script>
