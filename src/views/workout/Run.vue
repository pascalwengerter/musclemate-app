<template>
  <DarkLogo />
  <WorkoutCard inner-padding="">
    <div
      class="rounded-t-2xl bg-gradient-to-r from-secondary to-primary py-8 text-center"
    >
      <h1 class="text-white text-7xl my-4">{{ countDown }}s</h1>
      <h2 class="text-white text-2xl">{{ subHeading }}</h2>
    </div>
    <div class="py-8 px-4 text-center">
      <h3 class="text-xl">Workout: {{ workoutTitle }}</h3>
      <progress class="border-dark border-4 mt-8" :value="progress" max="100" />
    </div>
  </WorkoutCard>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref } from "vue";
import { useRouter } from "vue-router";
import whistleActiveSound from "../../assets/sounds/whistle_2.mp3";
import whistleRestSound from "../../assets/sounds/whistle.mp3";
import { useWorkoutStore } from "../../store/workout";
import { Exercise } from "../../../types";

const router = useRouter();
const store = useWorkoutStore();

const currentWorkout = store.chosenWorkout || store.availableWorkouts[0];

const countDown = ref(0);
const currentExercise = ref("");
const exerciseIntervall = currentWorkout.defaultDuration.active;
const finished = ref(false);
const nextExercise = ref("");
const paused = ref(false);
const progress = ref(0);
const restInterval = currentWorkout.defaultDuration.rest;
const whistleActive = new Audio(whistleActiveSound);
const whistleRest = new Audio(whistleRestSound);
const workoutProgress = ref(0);

const workoutTitle = currentWorkout.title;
const workoutLength = currentWorkout.exercises.length;

const subHeading = computed(() => {
  if (unref(paused) && !unref(finished)) {
    return `Next up: ${nextExercise.value}`;
  } else if (!unref(paused) && !unref(finished)) {
    return currentExercise.value;
  } else {
    return "Final rest";
  }
});

const sleepOneSecond = () => {
  // Reduce below to 1 for dev purposes
  const ms = 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runWorkout = async (exerciseList: Exercise[]) => {
  store.finished = false;

  for (let index = 0; index < exerciseList.length; index++) {
    currentExercise.value = exerciseList[index].title;

    if (index + 1 == workoutLength) {
      nextExercise.value = "";
    } else {
      nextExercise.value = exerciseList[index + 1].title;
    }

    paused.value = false;
    whistleActive.play();
    countDown.value = exerciseIntervall;
    for (let i = 0; i <= exerciseIntervall; i++) {
      await sleepOneSecond();
      countDown.value -= 1;
    }

    workoutProgress.value++;
    progress.value = Math.floor((workoutProgress.value / workoutLength) * 100);

    paused.value = true;
    if (index + 1 == workoutLength) {
      finished.value = true;
    }

    whistleRest.play();
    countDown.value = restInterval;
    for (let j = 0; j <= restInterval; j++) {
      await sleepOneSecond();
      countDown.value -= 1;
    }
  }

  store.finished = true;
  router.push("finished");
};

onMounted(() => {
  runWorkout(currentWorkout.exercises);
});
</script>

<style lang="postcss" scoped>
progress[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 250px;
  height: 30px;
}
progress[value]::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}
progress[value]::-webkit-progress-value {
  background-image: -webkit-linear-gradient(left, #183a4b, #183a4b);
  border-radius: 0;
  background-size: 35px 30px, 100% 100%, 100% 100%;
}
progress[value]::-moz-progress-bar {
  background-image: -moz-linear-gradient(left, #183a4b, #183a4b);
  border-radius: 0;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}
</style>
