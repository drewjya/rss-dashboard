import { encryptAes } from "~/utils/function/encrypt";

export default defineEventHandler(async (event) => {
  type Token = {
    token: string;
    expired_date: string;
    refresh_token: string;
    refresh_expired_date: string;
  };
  const body = await readBody(event);
  const runtime = useRuntimeConfig();



  const encryptPass = encryptAes(
    body.password,
    runtime.PRIVATE_KEY,
    runtime.IV_KEY
  );
  return "Hello login.post";
});
