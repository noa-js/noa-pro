<template>
  <div class="routes-menu-container">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="(route.name as string)"
      :unique-opened="true"
      :collapse="sideBarCollapseState.matches('isCollapsed')"
    >
      <SideBarItem :key="item.name" :route="item" v-for="item in props.routes" />
    </el-menu>
  </div>
</template>

<script lang="ts">
  export const useSideBarMenu = (routers: RouteRecordNormalized[]) => {
    const menuConfigGenerator = (routerMenuConfig: Config.RouterMenu) => {
      const routeConfig = routers.find((route) => route.name === routerMenuConfig.name);
      const formatName = (childrenRouteConfig) =>
        ({
          ...childrenRouteConfig,
          name: `${routerMenuConfig.name}-${childrenRouteConfig.name}`,
        } as Config.RouterMenu);

      return {
        ...routerMenuConfig,
        path: routeConfig?.path,
        meta: routeConfig?.meta ?? routerMenuConfig.meta,
        children: routerMenuConfig.children?.length
          ? routerMenuConfig.children.map(formatName).map(menuConfigGenerator)
          : [],
      } as Config.RouterMenu;
    };

    const routes: Config.RouterMenu[] = routesMenu.map(menuConfigGenerator);

    return { routes };
  };
</script>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import SideBarItem from './SideBarItem.vue';
  import routesMenu from '~/config/routerMenu';
  import { useSideBarCollapse } from '@/machines/sideBarCollapse.machine';
  import type { RouteRecordNormalized } from 'vue-router';

  type Props = {
    routes: Config.RouterMenu[];
  };

  const route = useRoute();
  const props = defineProps<Props>();
  const { state: sideBarCollapseState } = useSideBarCollapse();
</script>

<style lang="scss" scoped>
  .el-menu {
    border-right: none;
  }
</style>
