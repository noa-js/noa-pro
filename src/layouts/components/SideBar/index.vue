<template>
  <div class="sidebar-wrapper">
    <div class="title-container" @click="() => router.push('/')">
      <img class="title-container__logo" alt="logo" src="/src/assets/logo.png" />
      <div class="title-container__title" v-if="sideBarCollapseState.matches('notCollapsed')">
        {{ basicConfig.appName }}
      </div>
    </div>
    <SideBarMenu :routes="routes" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import SideBarMenu, { useSideBarMenu } from './SideBarMenu.vue';
  import basicConfig from '@/../config/basic';
  import { useSideBarCollapse } from '@/machines/sideBarCollapse.machine';

  const router = useRouter();
  const { routes } = useSideBarMenu(router.getRoutes());

  const { state: sideBarCollapseState } = useSideBarCollapse();
</script>

<style lang="scss" scoped>
  .sidebar-wrapper {
    .title-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 12px;
      height: 50px;
      cursor: pointer;

      &__logo {
        width: 40px;
        height: 40px;
      }

      &__title {
        overflow: hidden;
        position: relative;
        margin-left: 8px;
        background: radial-gradient(farthest-side ellipse at 10% 0, #409eff, #37dd7c);
        vertical-align: bottom;
        text-overflow: ellipsis;
        text-align: center;
        font-family: Stencil Std;
        font-weight: bold;
        font-size: 24px;
        white-space: nowrap;
        transform: translateY(15%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
</style>
