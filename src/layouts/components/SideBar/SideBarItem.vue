<template>
  <el-sub-menu v-if="props.route.children?.length" :index="props.route.name">
    <template #title>
      <MenuItem :route="props.route" />
    </template>
    <SideBarItem :key="item.name" :route="item" v-for="item in props.route.children" />
  </el-sub-menu>
  <el-menu-item v-else :index="props.route.name" @click="handleClick(props.route)">
    <MenuItem :route="props.route" />
  </el-menu-item>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import MenuItem from './MenuItem.vue';

  type Props = {
    route: Config.RouterMenu;
  };

  const router = useRouter();

  const handleClick = (route: Config.RouterMenu) => {
    const { name, href } = route;
    if (href) {
      window.open(href);
    } else if (name) {
      router.push({ name });
    }
  };

  const props = defineProps<Props>();
</script>
