<template>
  <div class="routes-menu-container">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><IconMenu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><Document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  export const useSideBarMenu = (routes: RouteRecordNormalized[]) => {
    const menuConfigGenerator = (routeMenuConfig: Config.RoutesMenu) => {
      const routeConfig = routes.find((route) => route.name === routeMenuConfig.name);
      const formatName = (childrenRouteConfig) =>
        ({
          ...childrenRouteConfig,
          name: `${routeMenuConfig.name}-${childrenRouteConfig.name}`,
        } as Config.RoutesMenu);

      if (routeConfig) {
        return {
          ...routeMenuConfig,
          path: routeConfig.path,
          meta: routeConfig.meta,
          children: routeMenuConfig.children?.length
            ? routeMenuConfig.children.map(formatName).map(menuConfigGenerator)
            : [],
        } as Config.FullRoutesMenu;
      }
    };

    return { menuConfigGenerator };
  };
</script>

<script setup lang="ts">
  import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import routesMenu from '@/../config/routesMenu';
  import type { RouteRecordNormalized } from 'vue-router';

  const router = useRouter();
  const { menuConfigGenerator } = useSideBarMenu(router.getRoutes());

  const menuConfig = routesMenu.map(menuConfigGenerator);
  console.log(menuConfig);
</script>
