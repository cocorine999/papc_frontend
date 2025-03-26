import router from "../../router";
import { AUTH_TOKEN } from "@/services/configs/environment.js";


export default function guest({ next, store, from }) {
  const token = store.getters["auths/GET_ACCESS_TOKEN"];

  // Si l'utilisateur est un visiteur, il peut accéder au login
  if (token === AUTH_TOKEN ) {
    if (from.path === "/" || from.path === "/login") {
      return next("/dashboard/projets");
    }
    return next(); // Il peut naviguer normalement
  }

  // Si l'utilisateur est connecté, il ne doit pas accéder à /login
  if (token) {
    return next("/dashboard/projets"); // Redirige vers le dashboard
  }

  return next(); // Laisse l'accès normal si aucun token
}
