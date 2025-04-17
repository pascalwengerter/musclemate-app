<template>
  <div class="mt-8 md:mt-6 flex flex-col justify-center items-center">
    <img
      class="home-logo my-4 md:my-6 block w-4/5 md:w-3/5"
      alt="MuscleMate Logo"
      src="../assets/images/home_logo.png"
    />
    <nav>
      <router-link class="btn btn-gradient block my-5" to="/workout/start">
        Workout now
      </router-link>
    </nav>
  </div>
  <nav id="nav-2" class="p-4 md:p-6 mt-12 mb-3 md:my-6 text-center md:text-left uppercase">
    <ul>
      <li>
        <router-link class="my-1 block" to="/about">About</router-link>
      </li>
      <li>
        <router-link class="my-1 block" to="/terms-and-conditions">
          Terms & Conditions
        </router-link>
      </li>
      <li>
        <router-link class="my-1 block" to="/privacy-and-legal"> Privacy & Legal </router-link>
      </li>
    </ul>
  </nav>
</template>
