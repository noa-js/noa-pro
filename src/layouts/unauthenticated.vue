<template>
  <div class="layout-wrapper">
    <div class="desc-card">
      <h1 class="title">{{ t('title') }}</h1>
      <p class="description">{{ t('description') }}</p>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .desc-card {
    color: #fff;
    position: relative;
    top: 10%;
    text-align: center;

    .title {
      margin-bottom: 10px;
    }
  }

  .layout-wrapper {
    height: 100%;
    background: radial-gradient(farthest-side ellipse at 10% 0, #4bc0e7, #1ab3b3);
    overflow: hidden;
  }
</style>

<i18n>
en_US:
  title: Noa Pro
  description: Noa's integrated back-office solution.
</i18n>
