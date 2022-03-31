<template>
  <div class="sidebar-wrapper">
    <div class="title-container" @click="() => router.push('/')">
      <img class="title-container__logo" alt="logo" src="/src/assets/logo.png" />
      <div class="title-container__title">Noa Pro</div>
    </div>
    <SideBarMenu />
  </div>
</template>

<script setup lang="ts">
  import SideBarMenu from './SideBarMenu.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<style lang="scss" scoped>
  .sidebar-wrapper {
    .title-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50px;
      padding: 0 16px;
      cursor: pointer;

      &__logo {
        width: 40px;
        height: 40px;
      }
      &__title {
        font-size: 24px;
        font-weight: bold;
        margin-left: 16px;
      }
    }
  }
</style>
