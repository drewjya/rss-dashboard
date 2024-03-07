export const useApiPath = () => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  return {
    authLogin: encodeURI(`/api-admin/admin/login`),
    authRefresh: encodeURI(`/loginMultipleRole/token`),

    rssFeed: encodeURI(`/api-admin/rssfeed`),
  };
};
