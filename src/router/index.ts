import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Start from "../views/workout/Start.vue";
import Timer from "../views/workout/Timer.vue";
import Session from "../views/workout/Session.vue";
import About from "../views/static/About.vue";
import ToC from "../views/static/ToC.vue";
import Privacy from "../views/static/Privacy.vue";
import NotFound from "../views/static/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/workout/start", name: "Start", component: Start },
  { path: "/workout/timer", name: "Timer", component: Timer },
  { path: "/workout/session", name: "Session", component: Session },
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
