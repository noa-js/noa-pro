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
        <PageHeader class="page-header" />
      </div>
      <AppMain />
      <Footer class="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { provide } from 'vue';
  import { useMachine } from '@xstate/vue';
  import SideBar from './components/SideBar/index.vue';
  import NavBar from './components/NavBar.vue';
  import AppMain from './components/AppMain.vue';
  import PageHeader from './components/PageHeader.vue';
  import Footer from './components/Footer.vue';
  import initialStateMachine from '@/machines/initialState.machine';
  import routerMenuCollapseMachine from '@/machines/routerMenuCollapse.machine';

  import variables from '@/styles/variables.module.scss';

  useMachine(initialStateMachine);
  const { state: routerMenuCollapseState, send: routerMenuCollapseSend } =
    useMachine(routerMenuCollapseMachine);

  provide('routerMenuCollapseState', routerMenuCollapseState);
  provide('routerMenuCollapseSend', routerMenuCollapseSend);
</script>

<style lang="scss" scoped>
  @import '@/styles/mixins.scss';
  @import '@/styles/variables.module.scss';
  @import '@/styles/sidebar.scss';

  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;

    @include clearfix;
  }

  .fixed-header {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    height: 140px;
  }
</style>
