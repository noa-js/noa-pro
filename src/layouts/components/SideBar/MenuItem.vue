<template>
  <el-icon v-if="props.route.icon"><component :is="props.route.icon" /></el-icon>
  <span>{{ $t(`page-${props.route.name}`) }}</span>
</template>

<script setup lang="ts">
  type Props = {
    route: Config.RouterMenu;
  };

  const props = defineProps<Props>();
</script>
