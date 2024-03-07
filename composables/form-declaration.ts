import type { UnwrapNestedRefs } from "vue";
import type { ZodType, z } from "zod";
import type { ServerResponseError, UFormApi } from "~/types";
import type { FormSubmitEvent } from "../node_modules/@nuxt/ui/dist/runtime/types";

type FormInitialValue<T extends ZodType<any, any, any>> = Partial<{
  [k in keyof z.output<T>]: any;
}>;

export function useFormDeclaration<T extends z.ZodRawShape>(arg: {
  schema: z.ZodObject<T>;

  onSubmit: (
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  onError?: (
    error: any,
    formElementApi: Ref<UFormApi | undefined>
  ) => Promise<void>;

  initial?: FormInitialValue<typeof arg.schema>;
}) {
  const notif = useNotification();

  const clientSubmitWrapperFunction = ref<() => void>();
  const isLoading = ref(false);
  const state = reactive(initialStates(arg.schema, arg.initial));
  const error = ref<string>();
  const formRef = ref<UFormApi>();

  async function submitEvent(
    formSubmitEvent: FormSubmitEvent<z.output<typeof arg.schema>>
  ) {
    isLoading.value = true;
    error.value = undefined;
    try {
      await arg.onSubmit(formSubmitEvent, formRef);
    } catch (e) {
      console.log(e);

      const response = e as ServerResponseError;
      notify(response);
      error.value = response.stat_msg;
      if (arg.onError) await arg.onError(error, formRef);
    }
    isLoading.value = false;
  }

  function notify(response: ServerResponseError) {
    if (response.stat_msg && response.stat_code) {
      if (response.stat_code >= 400 && response.stat_code <= 499)
        notif.warn({ message: response.stat_msg });
      else if (response.stat_code >= 500 && response.stat_code <= 599)
        notif.error({ message: response.stat_msg });
      else if (response.stat_code >= 200 && response.stat_code <= 299)
        notif.ok({ message: response.stat_msg });
    }
  }

  function reset() {
    const states = Object.entries(state);
    for (const [name] of states) {
      state[name] = undefined;
      if (arg.initial && arg.initial[name]) state[name] = arg.initial[name];
    }
  }

  function initialStates(schema: z.AnyZodObject, defaults?: any) {
    const initialState = {} as any;
    for (const key in schema.shape) {
      initialState[key] = undefined;
      if (defaults) initialState[key] = defaults[key];
    }
    return initialState;
  }

  return {
    state: state as UnwrapNestedRefs<z.infer<typeof arg.schema>>,
    isLoading: isLoading as Ref<boolean>,
    schema: arg.schema,
    submitEvent,
    error,
    ref: formRef,
    reset,
    submit: clientSubmitWrapperFunction,
  };
}
