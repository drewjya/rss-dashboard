export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();
  const excludedRoutes = {
    "/login": true,
    "/register": true,
  };
  if (to.path in excludedRoutes) return;

  const isRefreshSuccess = await auth.refreshAuth();
  if (!isRefreshSuccess) return navigateTo("/login");
  else {
    return;
  }
});
