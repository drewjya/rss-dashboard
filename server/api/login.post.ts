import { encryptAes } from "~/utils/function/encrypt";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const body = await readBody(event);
  const encrypt = encryptAes(
    body.password,
    runtime.PRIVATE_KEY,
    runtime.IV_KEY
  );

  return encrypt;
});
