<script lang="ts" setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
});

const { $v } = useMessage();
const auth = useAuth();
const loginForm = useFormDeclaration({
  schema: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
  onSubmit: async (form) => {
    console.log(form.data);

    await auth.doLogin({
      email: form.data.email,
      password: form.data.password,
    });
    await navigateTo("/");
  },
});
</script>

<template>
  <div class="grid place-items-center h-screen">
    <div class="p-5 flex flex-col gap-5 w-[60vw]">
      <UiForm class="flex flex-col gap-5" :form="loginForm">
        <div class="flex flex-col justify-start items-start gap-2">
          <h1 class="text-3xl font-bold text-center">Login</h1>
          <h2>Hello, and welcome back</h2>
        </div>
        <UFormGroup label="Email">
          <UInput
            v-model="loginForm.state.email"
            icon="i-heroicons-envelope"
            placeholder="user@email.com"
            :disabled="loginForm.isLoading.value"
            size="md"
            autofocus
            type="email"
          />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput
            v-model="loginForm.state.password"
            icon="i-heroicons-lock-closed"
            placeholder="password"
            size="md"
            :disabled="loginForm.isLoading.value"
            type="password"
          />
        </UFormGroup>

        <span class="w-full text-center text-sm text-red-500">
          {{ loginForm.error.value }}
        </span>
        <UButton
          :loading="loginForm.isLoading.value"
          block
          @click="loginForm.submit.value"
        >
          Login
        </UButton>
      </UiForm>
    </div>
  </div>
</template>

<style scoped></style>
