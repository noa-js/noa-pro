<template>
  <div class="app-main">
    <div class="container">
      <SuspenseRouterView />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .app-main {
    padding-top: 140px;
  }
  .container {
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    min-height: calc(100vh - 200px);
  }
</style>
