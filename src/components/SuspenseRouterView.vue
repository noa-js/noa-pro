<template>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div class="loading"> Loading... </div>
    </template>
  </suspense>
</template>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
