export const useApiPath = () => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  return {
    authLogin: encodeURI(`//admin/login`),
    authRefresh: encodeURI(`/api/auth/refresh`),
    
  };
};
