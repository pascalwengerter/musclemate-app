<template>
  <DarkLogo />
  <BackButton />
  <WorkoutCard>
    <h1>Choose exercises</h1>
    <ul v-for="workout in workouts" :key="workout">
      <li v-for="exercise in workout" :key="exercise">
        <input type="checkbox" />
        <label>{{ exercise.name }}</label>
      </li>
    </ul>
    <br />
    <div>
      <input id="" type="text" name="" style="border: 3px dotted purple" />
      <label for="jump">Jumping Jacks</label>
      <input type="submit" value="Add" />
    </div>
    <br />
    <router-link class="btn btn-gradient" to="/workout/ready"> Done </router-link>
  </WorkoutCard>
</template>

<script>
export default {
  setup() {
    const exercises = [];
    // purge duplicate exercises from workouts
    return {
      exercises,
      workouts,
    };
  },
  methods: {
    ...mapMutations(["setWorkoutName"]),
    chooseExerciseAndAdvance() {
      // push all checkbox'ed exercies to exercises var
      // push all custom input'ed exercies to exercises var
      this.setWorkoutName("Custom");
      this.setExercises(this.exercises);
      this.$router.push({ path: "/workout/timer" });
    },
  },
};
</script>
