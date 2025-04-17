<template>
  <DarkLogo />
  <WorkoutCard>
    <div class="text-center max-w-xs mx-auto">
      <h1>Well done!</h1>
      <router-link
        class="btn text-dark border-dark border-4 py-3 px-5 block my-5"
        to="/workout/run"
      >
        Another round
      </router-link>
      <router-link class="btn btn-gradient block" to="/"> Back home </router-link>
    </div>
  </WorkoutCard>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted } from "vue";
import { useWorkoutStore } from "../../store/workout";
import router from "../../router/index";
import cheering from "../../assets/sounds/cheer.mp3";

const store = useWorkoutStore();

onBeforeMount(() => {
  if (store.finished === false) {
    router.push({ path: "/error", replace: true });
  }
});

const cheerSound = new Audio(cheering);

onMounted(() => {
  cheerSound.play();
});
</script>
