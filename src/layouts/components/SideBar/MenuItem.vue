<template>
  <el-icon v-if="props.route.icon"><component :is="props.route.icon" /></el-icon>
  <span>{{ t(`page-${props.route.name}`) }}</span>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  type Props = {
    route: Config.RouterMenu;
  };

  const { t } = useI18n();
  const props = defineProps<Props>();
</script>
