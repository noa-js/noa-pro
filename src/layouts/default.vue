<template>
  <div
    class="app-wrapper"
    :class="[sideBarCollapseState.matches('isCollapsed') ? 'hideSidebar' : 'openSidebar']"
    v-if="initialState.matches('authenticated')"
  >
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
        <TagView />
      </div>
      <AppMain />
      <Footer class="footer" />
    </div>
  </div>
  <Loading v-else />
</template>

<script setup lang="ts">
  import SideBar from './components/SideBar/index.vue';
  import NavBar from './components/NavBar.vue';
  import AppMain from './components/AppMain.vue';
  import Footer from './components/Footer.vue';
  import TagView from './components/TagView/index.vue';
  import { useInitialStateMachine } from '@/machines/initialState.machine';
  import { useSideBarCollapse } from '@/machines/sideBarCollapse.machine';

  import variables from '@/styles/variables.module.scss';

  const { state: sideBarCollapseState } = useSideBarCollapse();

  const { state: initialState, send: initialStateSend } = useInitialStateMachine();
  initialStateSend('GET');
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
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
</style>
