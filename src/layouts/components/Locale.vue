<template>
  <div class="wrapper">
    <el-dropdown>
      <el-icon class="icon" :size="20"><flag /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :key="locale.value"
            v-for="locale in localeConfig.locales"
            @click="handleChangeLanguage(locale.value)"
          >
            {{ locale.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { Flag } from '@element-plus/icons-vue';
  import localeConfig from '~/config/locale';
  import { useLocale } from '@/machines/locale.machine';

  const { send } = useLocale();

  const handleChangeLanguage = (language: string) => {
    send({ type: 'CHANGE_LOCALE', payload: language });
  };
</script>

<style lang="scss" scoped>
  .icon {
    position: relative;
    cursor: pointer;
    transform: translateY(15%);
  }
</style>
