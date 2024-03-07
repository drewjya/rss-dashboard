import type { LoginResponse } from "~/types";

export function useAuth() {
  // dependency
  const app = useAppStore();
  const path = useApiPath();
  const publicApi = usePublicApi();

  async function doLogin(param: { email: string; password: string }) {
    const response: LoginResponse = await publicApi.post(path.authLogin, {
      email: param.email,
      password: param.password,
    });
    app.refreshToken = response.data.token.refreshToken;
    app.accessToken = response.data.token.accessToken;
    app.user = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      profilePicture: response.data.user.profilePicture,
    };
  }

  async function refreshAuth(): Promise<boolean> {
    try {
      const response: LoginResponse = await publicApi.get(path.authRefresh, {
        headers: {
          Authorization: "Bearer " + (app.refreshToken ?? "invalid_token"),
        },
      });
      app.accessToken = response.data.token.accessToken;
      app.refreshToken = response.data.token.refreshToken;
      app.user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        profilePicture: response.data.user.profilePicture,
      };
      console.log(app.user);

      return true;
    } catch (e) {
      return false;
    }
  }

  async function logout() {
    app.refreshToken = "invalid_token";
    app.accessToken = "invalid_token";
    app.user = undefined;
    return await navigateTo("/login");
  }

  return {
    refreshAuth,
    logout,
    doLogin,
  };
}
