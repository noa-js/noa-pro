<template>
  <div class="main">
    <div>
      <img alt="Noa logo" src="@/assets/logo.png" />
      <HelloWorld msg="Welcome to Noa Pro" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/mixins.scss';
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 600px;

    @include main;
  }
</style>
