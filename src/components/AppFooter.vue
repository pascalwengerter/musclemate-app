<template>
  <footer class="my-3 p-4 md:p-6">
    <p>
      <span
        class="md:float-left md:my-0 md:text-initial md:inline my-3 float-none text-center block"
      >
        © {{ currentYear }} MuscleMate
      </span>
      <span
        class="md:float-right md:my-0 md:text-initial md:inline my-3 float-none text-center block lba"
      >
        Design by
        <a
          href="https://www.linkedin.com/in/valentin-eiber-018383173/"
          target="_blank"
          rel="noopener"
        >
          Valentin Eiber
        </a>
      </span>
    </p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style>
.lba a,
.inline-link {
  background: -webkit-linear-gradient(#6deaa7, #43cdec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lba:hover a,
.lba:focus a {
  text-decoration: underline;
}
</style>
