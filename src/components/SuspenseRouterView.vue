<template>
  <suspense>
    <template #default>
      <transition
        v-if="props.openAnimation ?? false"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <router-view />
      </transition>
      <router-view v-else />
    </template>
    <template #fallback>
      <transition enter-active-class="animate__animated animate__fadeIn">
        <div class="loading"> Loading... </div>
      </transition>
    </template>
  </suspense>
</template>

<script setup lang="ts">
  type Props = {
    openAnimation?: boolean;
  };

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
