<template>
  <DarkLogo />
  <BackButton />
  <WorkoutCard>
    <h1 class="mb-8">Configure your workout</h1>
    <p>
      Exercise time in seconds:
      <label class="font-bold" for="exercise-time">
        {{ chosenWorkoutDuration.active }} Seconds
      </label>
    </p>
    <input
      id="exercise-time"
      v-model="chosenWorkoutDuration.active"
      class="block mx-auto my-3"
      min="5"
      max="60"
      step="5"
      type="range"
      name="exercise-time"
    />
    <p>
      Break time in seconds:
      <label class="font-bold" for="rest-time"> {{ chosenWorkoutDuration.rest }} Seconds </label>
    </p>
    <input
      id="rest-time"
      v-model="chosenWorkoutDuration.rest"
      class="block mx-auto my-3"
      min="5"
      max="60"
      step="1"
      type="range"
      name="rest-time"
    />
    <div class="text-center py-8">
      <router-link
        class="btn text-white border-dark bg-dark border-4 py-3 px-5"
        to="/workout/ready"
      >
        Done
      </router-link>
    </div>
  </WorkoutCard>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import router from "../../router";
import { useWorkoutStore } from "../../store/workout";

const store = useWorkoutStore();
let chosenWorkoutDuration;
if (store.chosenWorkout) {
  chosenWorkoutDuration = store.chosenWorkout.defaultDuration;
}

onBeforeMount(() => {
  if (!store.chosenWorkout) {
    router.push({ path: "/error", replace: true });
  }
});
</script>
