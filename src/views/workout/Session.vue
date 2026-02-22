<template>
  <DarkLogo />

  <!-- Ready phase -->
  <template v-if="phase === 'ready'">
    <BackButton />
    <WorkoutCard class="text-center">
      <h1 class="mb-8">Ready?</h1>
      <p class="">Make sure your speakers are turned on.</p>
      <div class="py-8">
        <button class="btn text-dark border-dark border-4 py-3 px-5" @click="startWorkout">
          Go
        </button>
      </div>
    </WorkoutCard>
  </template>

  <!-- Running phase -->
  <template v-if="phase === 'running'">
    <WorkoutCard inner-padding="">
      <div class="rounded-t-2xl bg-gradient-to-r from-secondary to-primary py-8 text-center">
        <BicepsIcon :isRunning="!paused" />
        <h1 class="text-white text-7xl my-4">{{ countDown }}s</h1>
        <h2 class="text-white text-2xl">{{ subHeading }}</h2>
      </div>
      <div class="py-8 px-4 text-center">
        <h3 class="text-xl">Workout: {{ workoutTitle }}</h3>
        <progress class="border-dark border-4 mt-8" :value="progress" max="100" />
      </div>
    </WorkoutCard>
  </template>

  <!-- Finished phase -->
  <template v-if="phase === 'finished'">
    <WorkoutCard>
      <div class="text-center max-w-xs mx-auto">
        <h1>Well done!</h1>
        <button
          class="btn text-dark border-dark border-4 py-3 px-5 block my-5 w-full"
          @click="anotherRound"
        >
          Another round
        </button>
        <router-link class="btn btn-gradient block" to="/"> Back home </router-link>
      </div>
    </WorkoutCard>
  </template>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, unref } from "vue";
import { useWakeLock } from "@vueuse/core";
import whistleActiveSound from "../../assets/sounds/whistle_2.mp3";
import whistleRestSound from "../../assets/sounds/whistle.mp3";
import cheering from "../../assets/sounds/cheer.mp3";
import BicepsIcon from "../../components/BicepsIcon.vue";
import { useWorkoutStore } from "../../store/workout";
import { Exercise } from "../../../types";

const store = useWorkoutStore();
const currentWorkout = store.chosenWorkout || store.availableWorkouts[0];

const phase = ref<"ready" | "running" | "finished">("ready");

const countDown = ref(0);
const currentExercise = ref("");
const exerciseIntervall = currentWorkout.defaultDuration.active;
const finished = ref(false);
const nextExercise = ref("");
const paused = ref(false);
const progress = ref(0);
const restInterval = currentWorkout.defaultDuration.rest;
const workoutProgress = ref(0);

const workoutTitle = currentWorkout.title;
const workoutLength = currentWorkout.exercises.length;

const whistleActive = new Audio(whistleActiveSound);
const whistleRest = new Audio(whistleRestSound);
const cheerSound = new Audio(cheering);

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
  const ms = 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runWorkout = async (exerciseList: Exercise[]) => {
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

  phase.value = "finished";
  cheerSound.play();
};

const resetState = () => {
  countDown.value = 0;
  currentExercise.value = "";
  finished.value = false;
  nextExercise.value = "";
  paused.value = false;
  progress.value = 0;
  workoutProgress.value = 0;
};

const wakeLock = useWakeLock();

const startWorkout = () => {
  phase.value = "running";
  runWorkout(currentWorkout.exercises);
  wakeLock.request("screen").catch((e) => {
    console.info("Wake lock request failed:", e);
  });
};

const anotherRound = () => {
  resetState();
  phase.value = "running";
  runWorkout(currentWorkout.exercises);
};

onMounted(() => {
  screen.orientation?.lock?.("portrait-primary").catch(() => {
    // Silently fail — not supported on all browsers/contexts
  });
});

onUnmounted(() => {
  screen.orientation?.unlock?.();
  wakeLock.release().catch((e) => {
    console.warn("Wake lock release failed:", e);
  });
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
  background-size:
    35px 30px,
    100% 100%,
    100% 100%;
}
progress[value]::-moz-progress-bar {
  background-image: -moz-linear-gradient(left, #183a4b, #183a4b);
  border-radius: 0;
  background-size:
    35px 20px,
    100% 100%,
    100% 100%;
}
</style>
