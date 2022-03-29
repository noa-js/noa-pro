<template>
  <div class="unauthenticated-wrapper">
    <div class="desc-card">
      <h1 class="desc-card__title">{{ t('title') }}</h1>
      <p class="desc-card__description">{{ t('description') }}</p>
    </div>
    <router-view />
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
  import Footer from './components/Footer.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  @import '@/styles/mixins.scss';

  .desc-card {
    color: white;
    position: relative;
    text-align: center;
    top: 50px;

    &__title {
      font-size: 36px;
      font-weight: bold;
    }
  }

  .unauthenticated-wrapper {
    @include clearfix;
    height: 100%;
    background: radial-gradient(farthest-side ellipse at 10% 0, #4bc0e7, #1ab3b3);
  }

  .footer {
    color: rgba(255, 255, 255, 0.726);
  }
</style>

<i18n>
en_US:
  title: Noa Pro
  description: Noa's integrated back-office solution.
</i18n>
