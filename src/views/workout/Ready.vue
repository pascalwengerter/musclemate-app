<template>
  <DarkLogo />
  <BackButton />
  <WorkoutCard class="text-center">
    <h1 class="mb-8">Ready?</h1>
    <p class="">Make sure your speakers are turned on.</p>
    <div class="py-8">
      <router-link class="btn text-dark border-dark border-4 py-3 px-5" to="/workout/run">
        Go
      </router-link>
    </div>
  </WorkoutCard>
</template>
