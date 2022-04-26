<template>
  <div class="wrapper">
    <el-dropdown>
      <el-icon class="icon" :size="20"><flag /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :key="local.value"
            v-for="local in localeConfig.locales"
            @click="handleChangeLanguage(local.value)"
          >
            {{ local.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { useStorage } from '@vueuse/core';
  import { Flag } from '@element-plus/icons-vue';
  import localeConfig from '@/../config/locale';
  import locales from '@/locales';

  const locale = useStorage('locale', localeConfig.default);

  const handleChangeLanguage = (language: string) => {
    locale.value = language;
  };

  watchEffect(() => {
    locales.global.locale.value = locale.value;
  });
</script>

<style lang="scss" scoped>
  .icon {
    position: relative;
    cursor: pointer;
    transform: translateY(15%);
  }
</style>
