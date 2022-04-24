<template>
  <suspense>
    <template #default>
      <router-view v-slot="{ Component }" v-if="props.openAnimation ?? false">
        <transition appear enter-active-class="animate__animated animate__fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
      <router-view v-else />
    </template>
    <template #fallback>
      <transition enter-active-class="animate__animated animate__fadeIn">
        <Loading />
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
