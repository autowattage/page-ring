import homepage from "./views/index.html";

Bun.serve({
  routes: {
    "/": homepage,
  },
  development: true,
});
