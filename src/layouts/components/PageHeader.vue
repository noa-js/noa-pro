<template>
  <div class="page-header-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :key="item"
        :to="index < pageNames.length - 1 ? { name: item.slice('page-'.length) } : undefined"
        v-for="(item, index) in pageNames"
      >
        {{ t(item) }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-page-header :content="t(`page-${route.name as string}`)" @back="back" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';

  const { t } = useI18n();

  const route = useRoute();
  const router = useRouter();

  const pageNames = computed(() => {
    const routes = route.fullPath.split('/').slice(1);
    const pageNames: string[] = [];

    const generator = (routePath: string) => {
      if (pageNames.length) {
        const parent = pageNames.slice(-1);
        pageNames.push(`${parent}-${routePath}`);
      } else {
        pageNames.push(`page-${routePath}`);
      }
    };
    routes.forEach(generator);

    return pageNames;
  });

  const back = () => router.back();
</script>

<style lang="scss" scoped>
  .page-header-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 16px;
    height: 60px;
    background-color: #fffd;
  }
</style>
