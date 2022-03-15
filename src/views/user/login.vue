<template>
  <div class="wrapper">
    <el-card class="main-card">
      <template #header>{{ t('title') }}</template>
      <el-form
        class="main-card__form"
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item :label="t('form-username')" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item :label="t('form-password')" prop="password">
          <el-input v-model="formData.password" clearable show-password />
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width: 100%" @click="handleClick(formRef)">{{
        t('button-login')
      }}</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import type { FormRules, FormInstance } from 'element-plus';
  import { login } from '@/services/user';

  const { t } = useI18n();

  const formRef = ref<FormInstance>();

  const formData = ref<API.LoginData>({
    username: '',
    password: '',
  });

  const rules = ref<FormRules>({
    username: [{ required: true, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur' }],
  });

  const handleClick = async (form?: FormInstance) => {
    if (!form) return;

    await form.validate(async (valid, fields) => {
      if (valid) {
        await login(formData.value);
      } else {
        Promise.reject(fields);
      }
    });
  };
</script>

<style lang="scss" scoped>
  $width: 500px;
  .wrapper {
    height: 100%;
  }

  .main-card {
    width: $width;
    position: relative;
    top: 20%;
    left: 40%;

    &__form {
      width: $width - 40;
    }
  }
</style>

<route>
meta:
  layout: unauthenticated
</route>

<i18n>
en_US:
  title: Login
  form-username: Username
  form-password: Password
  button-login: Login
</i18n>
