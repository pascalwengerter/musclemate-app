<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
    <div
      :class="`bg-white rounded-2xl workoutcard col-span-2 md:col-start-2 mx-8 ${innerPadding}`"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ innerPadding: string }>(), {
  innerPadding: "py-7 px-5",
});
</script>
