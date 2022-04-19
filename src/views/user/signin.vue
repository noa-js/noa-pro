<template>
  <div class="wrapper">
    <el-card class="main-card">
      <template #header>
        <div class="title">{{ t('title') }}</div>
      </template>
      <el-form
        class="main-card__form"
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="username">
          <el-input v-model="formData.username" :placeholder="t('form-username')">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :placeholder="t('form-password')"
            clearable
            show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        style="width: 100%"
        :icon="CaretRight"
        @click="handleClick(formRef)"
        :loading="state.matches('pending')"
      >
        {{ t('button-signin') }}
      </el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { FormRules, FormInstance } from 'element-plus';
  import { Key, User, CaretRight } from '@element-plus/icons-vue';
  import { useMachine } from '@xstate/vue';
  import signinMachine from '@/machines/signin.machine';

  const { t } = useI18n();

  const formRef = ref<FormInstance>();

  const formData = ref<API.SigninData>({
    username: '',
    password: '',
  });

  const rules = ref<FormRules>({
    username: [{ required: true, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur' }],
  });

  const { state, send } = useMachine(signinMachine);

  const handleClick = async (form?: FormInstance) => {
    if (!form) return;

    await form.validate(async (valid, fields) => {
      if (valid) {
        send('signin', formData.value);
      } else {
        Promise.reject(fields);
      }
    });
  };
</script>

<style lang="scss" scoped>
  $width: 400px;
  $height: 230px;
  $color: white;
  $opacity-color: #ff00;

  .main-card {
    position: relative;
    left: calc(50% - $width / 2);
    top: 100px;
    width: $width;
    height: $height;

    .title {
      font-weight: bold;
      font-size: 24px;
    }

    &__form {
      width: $width - 40;
    }
  }

  .el-card {
    overflow: hidden;
    position: relative;
    z-index: 1;
    border-color: $opacity-color;
    border-radius: 5px;
    background: inherit;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    color: $color;

    --el-text-color-regular: $color;
    &:before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      margin: -20px;
      background: inherit;
      box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.3);
      filter: blur(10px);
      content: '';
    }
  }

  .el-input {
    --el-input-bg-color: $opacity-color;
    --el-input-placeholder-color: #fffaf;
    --el-text-color-placeholder: #e4e4e4;
    --el-text-color-secondary: white;
  }
</style>

<route lang="yaml">
meta:
  layout: unauthenticated
  noAuthenticationRequired: true
</route>

<i18n>
en_US:
  title: SignIn
  form-username: Username
  form-password: Password
  button-signin: SignIn
zh_CN:
  title: 登录
  form-username: 用户名
  form-password: 密码
  button-signin: 登录
</i18n>
