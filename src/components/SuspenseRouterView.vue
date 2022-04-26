<template>
  <suspense>
    <template #default>
      <router-view v-slot="{ Component }" v-if="props.openAnimation ?? false">
        <transition appear enter-active-class="animate__animated animate__fadeIn">
          <keep-alive>
            <component :is="Component" v-if="state.matches('show')" />
          </keep-alive>
        </transition>
      </router-view>
      <router-view v-else v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="state.matches('show')" />
        </keep-alive>
      </router-view>
    </template>
    <template #fallback>
      <transition enter-active-class="animate__animated animate__fadeIn">
        <Loading />
      </transition>
    </template>
  </suspense>
</template>

<script setup lang="ts">
  import { useReloadPage } from '@/machines/reloadPage.machine';
  type Props = {
    openAnimation?: boolean;
  };

  const props = defineProps<Props>();
  const { state } = useReloadPage();
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
