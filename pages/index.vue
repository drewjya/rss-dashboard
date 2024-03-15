<script lang="ts" setup>
const rss = ref([]);

const columns = [
  { label: "Title", key: "title" },
  { label: "Description", key: "description" },
  { label: "Type", key: "rss_type" },
  { label: "Created At", key: "created_at" },
];

const isLoading = ref(false);

const metaPage = ref({
  current_page: 1,
  last_page: 1,
  total: 1,
  count: 0,
  per_page: 15,
  record_per_page: 0,
  prev_page: "",
  next_page: "",
});

const page = ref(1);
const search = ref("");

watch(page, async (val) => {
  rss.value = [];
  isLoading.value = true;
  const load = await privateApi.get(apiPath.rssFeed, {
    baseURL: useRuntimeConfig().public.BASE_API_RSS,
    params: {
      type: "",
      page: `${val}`,
      search: search.value,
      limit: "15",
      sort: "desc",
      by: "published_at",
    },
  });
  isLoading.value = false;
  rss.value = load.data as any;
  metaPage.value = (load as any).meta;
});

watchDebounced(
  search,
  async (val) => {
    rss.value = [];
    const load = await privateApi.get(apiPath.rssFeed, {
      baseURL: useRuntimeConfig().public.BASE_API_RSS,
      params: {
        type: "",
        page: `${page.value}`,
        search: val,
        limit: "15",
        sort: "desc",
        by: "published_at",
      },
    });
    rss.value = load.data as any;
    isLoading.value = false;
    metaPage.value = (load as any).meta;
  },
  {
    debounce: 500,
    onTrigger: (val) => (isLoading.value = true),
    immediate: false,
  }
);

const privateApi = usePrivateApi();
const apiPath = useApiPath();
definePageMeta({
  colorMode: "light",
});

const isOpen = ref(false);

const content = ref();
onMounted(async () => {
  rss.value = [];
  isLoading.value = true;
  const val = await privateApi.get(apiPath.rssFeed, {
    baseURL: useRuntimeConfig().public.BASE_API_RSS,
    params: {
      type: "",
      page: "1",
      limit: "15",
      sort: "desc",
      by: "published_at",
    },
  });
  isLoading.value = false;
  rss.value = val.data as any;
  metaPage.value = (val as any).meta;
});
</script>

<template>
  <div class="p-8">
    <UButton
      label="Logout"
      @click="
        () => {
          const auth = useAuth();
          auth.logout();
        }
      "
    />
    <UModal v-model="isOpen"> <div v-html="content" class="p-4"></div></UModal>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="search" placeholder="Filter people..." />
    </div>
    <UTable
      :rows="rss"
      :columns="columns"
      :loading="isLoading"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
    >
      <template #title-data="{ row }">
        <button
          @click="
            () => {
              content = row.content;
              isOpen = true;
              console.log(row);
            }
          "
        >
          <span>{{ row.title }}</span>
        </button>
      </template>
      <template #created_at-data="{ row }">
        <span>{{ new Date(row.created_at).toLocaleString() }}</span>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination v-model="page" :page-count="1" :total="metaPage.last_page" />
    </div>
  </div>
</template>

<style scoped></style>
