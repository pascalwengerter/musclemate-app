<template>
  <footer class="flex justify-center my-3 p-4 md:p-6">
    <p class="md:my-0 md:text-initial my-3">© {{ currentYear }} MuscleMate</p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
