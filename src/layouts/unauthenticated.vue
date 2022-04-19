<template>
  <div class="unauthenticated-wrapper">
    <div class="desc-card">
      <div class="desc-card__title">{{ $t('title') }}</div>
      <p class="desc-card__description">{{ $t('description') }}</p>
    </div>
    <SuspenseRouterView :open-animation="true" />
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
  import Footer from './components/Footer.vue';
</script>

<style lang="scss" scoped>
  @import '@/styles/mixins.scss';

  .desc-card {
    position: relative;
    top: 50px;
    text-align: center;
    color: white;

    &__title {
      line-height: 50px;
      font-weight: bold;
      font-size: 36px;
    }
  }

  .unauthenticated-wrapper {
    height: 100%;
    background: radial-gradient(farthest-side ellipse at 10% 0, #4bc0e7, #1ab3b3);

    @include clearfix;
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    color: rgba(255, 255, 255, 0.726);
  }
</style>

<i18n>
en_US:
  title: Noa Pro
  description: Noa's integrated back-office solution.
zh_CN:
  title: Noa Pro
  description: Noa 综合后台解决方案
</i18n>
