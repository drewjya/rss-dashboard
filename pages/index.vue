<script lang="ts" setup>
const rss = ref([]);

const columns = [
  { label: "Title", key: "title" },
  { label: "Description", key: "description" },
  { label: "Type", key: "rss_type" },
  { label: "Created At", key: "created_at" },
];

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

watch(page, async (val) => {
  const load = await privateApi.get(apiPath.rssFeed, {
    baseURL: useRuntimeConfig().public.BASE_API_RSS,
    params: {
      type: "",
      page: `${val}`,
      limit: "15",
      sort: "desc",
      by: "published_at",
    },
  });
  rss.value = load.data as any;
  metaPage.value = (load as any).meta;
});

const privateApi = usePrivateApi();
const apiPath = useApiPath();

const isOpen = ref(false);

const content = ref();
onMounted(async () => {
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
    <UTable :rows="rss" :columns="columns">
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
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination v-model="page" :page-count="1" :total="metaPage.last_page" />
    </div>
  </div>
</template>

<style scoped></style>
