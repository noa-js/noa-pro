<template>
  <div class="app-wrapper">
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
      </div>
      <AppMain />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import SideBar from './components/SideBar/index.vue';
  import NavBar from './components/NavBar.vue';
  import AppMain from './components/AppMain.vue';
  import Footer from './components/Footer.vue';
  import initialStateMachine from '@/machines/initialState.machine';

  import variables from '@/styles/variables.module.scss';
  import { useMachine } from '@xstate/vue';

  useMachine(initialStateMachine);
</script>

<style lang="scss" scoped>
  @import '@/styles/mixins.scss';
  @import '@/styles/variables.module.scss';
  @import '@/styles/sidebar.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #f0f2f5;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
  }
</style>
