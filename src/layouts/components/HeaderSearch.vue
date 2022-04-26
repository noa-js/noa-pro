<template>
  <div class="header-search">
    <el-select
      class="header-search__select"
      v-model="state.context.searchSelected"
      :placeholder="t('search-placeholder')"
      :remote-method="handleQuery"
      filterable
      remote
      @focus="handleFocus"
      @change="handleOnChange"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
      <el-option
        :key="item.value"
        v-for="item in state.context.options"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { Search } from '@element-plus/icons-vue';
  import { useHeaderSearch } from '@/machines/headerSearch.machine';

  const { t } = useI18n();
  const { state, send } = useHeaderSearch();

  const handleQuery = (searchValue: string) => {
    send({ type: 'SEARCH', payload: { searchValue } });
  };

  const handleOnChange = (name: any) => {
    send({ type: 'GOTO', payload: { name } });
  };

  const handleFocus = () => {
    send('FOCUS');
  };
</script>

<style lang="scss" scoped>
  .header-search {
    &__select {
      ::v-deep(.el-input__wrapper) {
        border: none;
        border-bottom: 1px solid #d9d9d9;
        border-radius: 0;
        background: rgba(255, 255, 255, 0);
        box-shadow: none !important;
      }
    }
  }
</style>

<i18n>
en_US:
  search-placeholder: Search Pages
zh_CN:
  search-placeholder: 搜索页面
</i18n>
