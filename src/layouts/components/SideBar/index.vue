<template>
  <div class="sidebar-wrapper">
    <div class="title-container" @click="() => router.push('/')">
      <img class="title-container__logo" alt="logo" src="/src/assets/logo.png" />
      <div class="title-container__title">{{ basicConfig.appName }}</div>
    </div>
    <SideBarMenu :routes="routes" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import SideBarMenu, { useSideBarMenu } from './SideBarMenu.vue';
  import basicConfig from '@/../config/basicConfig';

  const router = useRouter();
  const { routes } = useSideBarMenu(router.getRoutes());
</script>

<style lang="scss" scoped>
  .sidebar-wrapper {
    .title-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50px;
      padding: 0 16px;
      cursor: pointer;

      &__logo {
        width: 40px;
        height: 40px;
      }
      &__title {
        font-size: 24px;
        font-weight: bold;
        margin-left: 16px;
      }
    }
  }
</style>
