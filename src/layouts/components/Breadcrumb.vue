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
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';

  const { t } = useI18n();

  const route = useRoute();
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
</script>

<style lang="scss" scoped></style>
