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
  import { useRoute, useRouter } from 'vue-router';

  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();

  const pageNames = computed(() => {
    const routes = route.path.split('/').slice(1);
    const pageNames: string[] = [];

    const generator = (routePath: string) => {
      const pushPageName = (pageName) => {
        if (router.getRoutes().find((v) => v.name == routePath)) {
          pageNames.push(pageName);
        } else {
          pageNames.push('page-404');
        }
      };

      if (pageNames.length) {
        const parent = pageNames.slice(-1);
        pushPageName(`${parent}-${routePath}`);
      } else {
        pushPageName(`page-${routePath}`);
      }
    };

    routes.forEach(generator);

    return pageNames;
  });
</script>

<style lang="scss" scoped></style>
