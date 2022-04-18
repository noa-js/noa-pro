<template>
  <div class="tag-view">
    <Tag
      v-for="tag in tags"
      :key="tag.name"
      :name="tag.name"
      :full-path="tag.fullPath"
      :active="route.name === tag.name"
      @close="deleteTag"
      closable
    >
      {{ t(`page-${tag.name}`) }}
    </Tag>
  </div>
</template>

<script lang="ts">
  type TagData = {
    fullPath: string;
    meta: any;
    name: string;
    params: RouteParams;
    path: string;
    query: LocationQuery;
  };
</script>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useStorage } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import Tag from './Tag.vue';
  import type { LocationQuery, RouteParams } from 'vue-router';

  const route = useRoute();
  const { t } = useI18n();
  const tags = useStorage<TagData[]>('tags', [], sessionStorage);
  const whiteList = ['user-signin'];

  const deleteTag = (tagName: string) => {
    tags.value = tags.value.filter((v) => v.name !== tagName);
  };

  watch(
    route,
    (to) => {
      const { fullPath, meta, name, params, path, query } = to;

      if (tags.value.find((v) => v.fullPath === fullPath)) return;
      if (whiteList.includes(name as string)) return;

      tags.value.push({
        fullPath,
        meta,
        name: name as string,
        params,
        path,
        query,
      });
    },
    { immediate: true },
  );
</script>

<style lang="scss" scoped>
  .tag-view {
    display: flex;
    overflow-x: auto;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px rgba(0, 21, 41, 0.08);
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f3f3f3;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgb(204, 204, 204);
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    background-color: #c2c2c2;
  }
</style>
