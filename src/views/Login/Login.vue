<template>
  <v-app class="login-page">
    <v-app-bar app>
      <v-toolbar-title>登录</v-toolbar-title>
    </v-app-bar>

    <v-main class="login-page">
      <div style="flex: 62">
        <span>SIPOT</span>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation class="login-form">
        <v-text-field
          v-model="username"
          rules="nameRules"
          label="用户名"
          required
        />
        <v-text-field
          v-model="passowrd"
          :rules="passwordRules"
          label="密码"
          required
        />
        <v-btn color="error" class="mr-4"></v-btn>
    </v-main>

  </v-app>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
</style>
