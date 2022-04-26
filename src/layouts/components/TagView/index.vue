<template>
  <div class="wrapper">
    <div class="tag-view">
      <Tag
        v-for="tag in tags"
        :key="tag.fullPath"
        :name="tag.name"
        :full-path="tag.fullPath"
        :active="route.fullPath === tag.fullPath"
        @close="deleteTag"
        closable
      >
        {{ t(`page-${tag.name}`) }}
      </Tag>
    </div>
    <div class="extras">
      <el-dropdown>
        <el-icon class="extras__icon" :size="20">
          <arrow-down-bold />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :key="tag.fullPath"
              v-for="tag in tags.filter((t) => t.fullPath !== route.fullPath)"
              @click="dropdownClick(tag.fullPath)"
            >
              {{ t(`page-${tag.name}`) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip :content="t('tag-view-close-other')">
        <el-icon class="extras__icon" :size="20" @click="closeOtherTag"><close-bold /> </el-icon>
      </el-tooltip>
      <el-tooltip :content="t('tag-view-refresh-page')">
        <el-icon class="extras__icon" :size="20" @click="refreshPage"><refresh-left /></el-icon>
      </el-tooltip>
    </div>
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
    ref: Ref<any>;
  };
</script>

<script setup lang="ts">
  import type { Ref } from 'vue';
  import { watch, ref } from 'vue';
  import { useStorage } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import Tag from './Tag.vue';
  import type { LocationQuery, RouteParams } from 'vue-router';
  import { CloseBold, RefreshLeft, ArrowDownBold } from '@element-plus/icons-vue';
  import { useReloadPage } from '@/machines/reloadPage.machine';

  const route = useRoute();
  const router = useRouter();
  const { t } = useI18n();
  const tags = useStorage<TagData[]>('tags', [], sessionStorage);
  const { send: reloadPageSend } = useReloadPage();
  const whiteList = ['user-signin', 'all'];

  const deleteTag = (fullPath: string) => {
    tags.value = tags.value.filter((v) => v.fullPath !== fullPath);
  };

  const closeOtherTag = () => {
    tags.value = tags.value.filter((v) => v.fullPath === route.fullPath);
  };

  const dropdownClick = (fullPath: string) => {
    router.push(fullPath);
  };

  const refreshPage = () => {
    reloadPageSend('toggle');
  };

  watch(
    route,
    (to) => {
      const { fullPath, meta, name, params, path, query } = to;

      if (name === undefined) return;
      if (tags.value.find((v) => v.fullPath === fullPath)) return;
      if (whiteList.includes(name as string)) return;

      tags.value.push({
        fullPath,
        meta,
        name: name as string,
        params,
        path,
        query,
        ref: ref(),
      });
    },
    { immediate: true },
  );
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px rgba(0, 21, 41, 0.08);

    .tag-view {
      display: flex;
      overflow: auto;
      align-items: center;
      box-sizing: border-box;
      padding: 5px 10px;
      width: 100%;
    }

    .extras {
      display: flex;
      position: relative;
      align-items: center;
      box-sizing: border-box;
      margin-left: auto;
      padding: 5px 10px;
      border-left: 1px solid #c2c2c248;

      & > * {
        margin-right: 10px;

        &:last-child {
          margin-right: 0px;
        }
      }

      &__icon {
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: #409eff;
        }
      }
    }
  }
</style>

<i18n>
en_US:
  tag-view-close-other: Close other tags
  tag-view-refresh-page: Refresh page
zh_CN:
  tag-view-close-other: 关闭其他标签
  tag-view-refresh-page: 刷新页面
</i18n>
