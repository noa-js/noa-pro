<template>
  <div class="hello">
    <div class="message">{{ msg }}</div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    msg: string;
  }
  defineProps<Props>();
</script>

<style lang="scss" scoped>
  .message {
    font-size: 24px;
    font-weight: bold;
  }
</style>
