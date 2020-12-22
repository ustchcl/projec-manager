<template>
  <v-card class="login-dialog">
    <div class="login-dialog__title">登录</div>
    <v-form ref="form" v-model="valid" lazy-validation class="login-dialog__container">
      <v-text-field
        v-model="username"
        :counter="10"
        :rules="nameRules"
        label="用户名"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="密码"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="是否同意用户协议?"
        required
      ></v-checkbox>

      <v-btn color="error" class="mr-4" @click="register"> 注册 </v-btn>
      <v-btn color="warning" @click="login"> 登录 </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { account } from "@/core/Network";

@Component
export default class LoginDialog extends Vue {
  username = ""
  password = ""
  valid = true
  nameRules = [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length <= 18) || "Name must be less than 18 characters",
  ];

  passwordRules = [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length <= 16) || "Password must be less than 16 characters",
  ]

  checkbox = false

  async register() {
    const resp = await account.register(this.username, this.password);
    if (resp.ok) {
      console.log(await resp.json())
    }
  }

  async login() {
    const resp = await account.login(this.username, this.password);
    if (resp.ok) {
      console.log(await resp.json())
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    padding: 20px;
    font-size: 1.1em;
  }

  &__container {
    padding: 20px;
  }

  &__actions {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>