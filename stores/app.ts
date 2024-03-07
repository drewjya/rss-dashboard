import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useAppStore = defineStore("GlobalApp", () => {
  // Dependency
  const colorMode = useColorMode();
  // States
  const user = ref<{
    name: string;
  }>();
  const accessToken = ref<string>("invalid_token");
  const sessionId = ref<string>(uuid());

  const refreshToken = useCookie<string | undefined>(
    useRuntimeConfig().public.REFRESH_TOKEN_KEY,
    { maxAge: 60 * 60 * 24 * 30 }
  );

  const headerTitle = ref<string>();
  const emojiKey = ref<string>();
  const isDark = computed({
    get: () => colorMode.value === "dark",
    set: (value: boolean) => (colorMode.preference = value ? "dark" : "light"),
  });

  return {
    user,
    accessToken,
    refreshToken,
    sessionId,
    isDark,
    headerTitle,
    emojiKey,
  };
});
