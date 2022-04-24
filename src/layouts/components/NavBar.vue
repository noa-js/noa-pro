<template>
  <div class="navbar">
    <div class="left-container">
      <el-icon class="collapse-icon" :size="30" @click="handleClick">
        <component :is="sideBarCollapseState.matches('notCollapsed') ? Fold : Expand" />
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="right-menu">
      <HeaderSearch />
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <el-avatar :icon="UserFilled" size="small" />
          <span>{{ initialState.context.currentUser.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item @click="logout">{{ t('menu-logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <Locale />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { UserFilled, Fold, Expand } from '@element-plus/icons-vue';
  import { logout } from '@/utils/user';
  import { useInitialStateMachine } from '@/machines/initialState.machine';
  import { useSideBarCollapse } from '@/machines/sideBarCollapse.machine';
  import HeaderSearch from './HeaderSearch.vue';
  import Breadcrumb from './Breadcrumb.vue';
  import Locale from './Locale.vue';

  const { t } = useI18n();
  const { state: sideBarCollapseState, send: sideBarCollapseSend } = useSideBarCollapse();

  const { state: initialState } = useInitialStateMachine();

  console.log(initialState);

  const handleClick = () => {
    sideBarCollapseSend('CLICK');
  };
</script>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    position: relative;
    padding: 0 10px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .left-container {
      display: inline-flex;
      align-items: center;
      height: 100%;

      .collapse-icon {
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .right-menu {
      display: inline-flex;
      float: right;
      align-items: center;
      height: 100%;

      & > * {
        margin-right: 10px;

        &:last-child {
          margin-right: 0px;
        }
      }

      .avatar-container {
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        font-size: 14px;

        &:hover {
          background-color: rgb(245, 245, 245);
          transition: background-color 0.5s;
        }

        .avatar-wrapper {
          .el-avatar {
            margin-right: 8px;
            margin-top: 10px;
            transform: translateY(15%);
          }
        }
      }
    }
  }
</style>

<i18n>
en_US:
  menu-logout: Logout
zh_CN:
  menu-logout: 注销
</i18n>
