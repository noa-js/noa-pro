<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeInRight animate__faster"
    leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
    @after-leave="emit('close', props.name)"
  >
    <el-tag
      class="tag"
      closable
      :type="!props.active ? 'info' : ''"
      :effect="!props.active ? 'plain' : 'dark'"
      @click="onClick"
      v-show="!hide"
      @close="
        () => {
          if (route.name === props.name) {
            ElMessage.error(t('tag-close-error'));
          } else {
            hide = true;
          }
        }
      "
    >
      {{ t(`page-${props.name}`) }}
    </el-tag>
  </transition>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';

  type Props = {
    name: string;
    fullPath: string;
    active: boolean;
  };

  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();
  const hide = ref(false);

  const onClick = () => {
    router.push({ name: props.name });
  };

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (event: 'close', tagName: string): void;
  }>();
</script>

<style lang="scss" scoped>
  .tag {
    margin-right: 5px;
    cursor: pointer;
    &:last-child {
      margin-right: 0px;
    }
  }
</style>

<i18n>
en_US:
  tag-close-error: Cannot close the current Tag
</i18n>
