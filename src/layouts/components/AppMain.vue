<template>
  <div class="app-main">
    <div class="container">
      <SuspenseRouterView :open-animation="true" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .app-main {
    padding-top: 80px;
  }
  .container {
    overflow: hidden;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    min-height: calc(100vh - 300px);
  }
</style>
