import type { LoginResponse } from "~/types";

export function useAuth() {
  // dependency
  const app = useAppStore();
  const path = useApiPath();
  const publicApi = usePublicApi();
  const runtime = useRuntimeConfig();
  const notif = useNotification();

  async function doLogin(param: { email: string; password: string }) {
    const encrypt = await publicApi.post(
      "/api/login",
      {
        password: param.password,
      },
      {
        baseURL: "",
      }
    );
    // console.log(encrypt);

    const response: LoginResponse = await publicApi.post(path.authLogin, {
      email: param.email,
      password: encrypt,
    });

    console.log(response);

    app.accessToken = response.data.token;
    app.refreshToken = response.data.token;

    app.user = {
      name: response.data.name,
    };
  }

  async function logout() {
    app.refreshToken = "invalid_token";
    app.accessToken = "invalid_token";
    app.user = undefined;
    return await navigateTo("/login");
  }

  return {
    logout,
    doLogin,
    refreshAuth: async () => {
      if (
        app.accessToken === "invalid_token" &&
        app.refreshToken === undefined
      ) {
        return false;
      }
      return true;
    },
  };
}
