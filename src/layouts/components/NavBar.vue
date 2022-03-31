<template>
  <div class="navbar">
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
  import { UserFilled } from '@element-plus/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { logout } from '@/utils/user';

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: rgba(255, 255, 255, 0.801);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .right-menu {
      display: flex;
      align-items: center;
      float: right;
      padding-right: 24px;
      height: 100%;

      .avatar-container {
        cursor: pointer;
        font-size: 14px;
        height: 100%;
        padding: 0 10px;

        &:hover {
          transition: background-color 0.5s;
          background-color: rgb(245, 245, 245);
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
