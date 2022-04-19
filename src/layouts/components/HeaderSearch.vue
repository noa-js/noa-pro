<template>
  <div class="header-search">
    <el-select
      class="header-search__select"
      v-model="searchSelected"
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
        v-for="item in options"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { Search } from '@element-plus/icons-vue';

  type Option = {
    label: string;
    value: string;
  };

  const { t } = useI18n();
  const router = useRouter();

  const searchSelected = ref('');
  const options = ref<Option[]>([]);
  const handleQuery = (searchValue: string) => {
    if (searchValue) {
      options.value = router
        .getRoutes()
        .filter(
          (route) =>
            route.name !== undefined &&
            !t(`page-${route.name as string}`).includes(route.name as string) &&
            t(`page-${route.name as string}`)
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase()),
        )
        .map((route) => ({
          label: t(`page-${route.name as string}`),
          value: route.name as string,
        }));
    } else {
      options.value = [];
    }
  };

  const handleOnChange = (routeName: any) => {
    router.push({ name: routeName });
  };

  const handleFocus = () => {
    options.value = [];
    searchSelected.value = '';
  };
</script>

<style lang="scss" scoped>
  .header-search {
    &__select {
      ::v-deep(.el-input__inner) {
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
