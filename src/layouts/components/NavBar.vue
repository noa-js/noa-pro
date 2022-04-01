<template>
  <div class="navbar">
    <div class="left-container">
      <el-icon class="collapse-icon" :size="30" @click="handleClick">
        <component :is="routerMenuCollapseState.matches('notCollapsed') ? Fold : Expand" />
      </el-icon>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <el-avatar :icon="UserFilled" size="small" />
          <span>admin</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item @click="logout">{{ t('menu-logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { UserFilled, Fold, Expand } from '@element-plus/icons-vue';
  import { logout } from '@/utils/user';
  import { useRouterMenuCollapse } from '@/hooks';

  const { t } = useI18n();
  const { state: routerMenuCollapseState, send: routerMenuCollapseSend } = useRouterMenuCollapse();

  const handleClick = () => {
    routerMenuCollapseSend('CLICK');
  };
</script>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    position: relative;
    height: 50px;
    background: rgba(255, 255, 255, 0.801);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .left-container {
      display: inline-flex;
      align-items: center;
      margin-left: 10px;
      height: 100%;

      .collapse-icon {
        cursor: pointer;
      }
    }

    .right-menu {
      display: inline-flex;
      float: right;
      align-items: center;
      padding-right: 24px;
      height: 100%;

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
</i18n>
