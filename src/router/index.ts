import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Start from "../views/workout/Start.vue";
import Timer from "../views/workout/Timer.vue";
import Ready from "../views/workout/Ready.vue";
import Run from "../views/workout/Run.vue";
import Finished from "../views/workout/Finished.vue";
import About from "../views/static/About.vue";
import ToC from "../views/static/ToC.vue";
import Privacy from "../views/static/Privacy.vue";
import NotFound from "../views/static/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/workout/start", name: "Start", component: Start },
  { path: "/workout/timer", name: "Timer", component: Timer },
  { path: "/workout/ready", name: "Ready", component: Ready },
  { path: "/workout/run", name: "Run", component: Run },
  { path: "/workout/finished", name: "Finished", component: Finished },
  { path: "/about", name: "About", component: About },
  { path: "/terms-and-conditions", name: "Toc", component: ToC },
  { path: "/privacy-and-legal", name: "Privacy", component: Privacy },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
