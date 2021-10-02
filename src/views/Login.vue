<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>登录</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref='login-form'>
              <v-text-field
                label="用户名"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="[
                  () => !!username || '请输入用户名',
                  () => !!username && username.length >= 6 || '用户名必须大于6位',
                  () => !!username && username.length <= 20 || '用户名必须小于20位'
                ]"
              ></v-text-field>

              <v-text-field
                id="password"
                label="密码"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[
                  () => !!password|| '请输入密码',
                  () => !!password && password.length >= 6 || '密码必须大于6位',
                  () => !!password && password.length <= 20 || '密码必须小于20位'
                ]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="OnClickLogin">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions('userModule', [
      'login'
    ]),
    OnClickLogin() {
      var username = this.username;
      var password = this.password;
      if (this.$refs['login-form'].validate()) {
        this.login({username,password})
          .then(res=>{
            this.$router.push({path:"/"})
          }).catch(err=>{
            console.log(err)
          })
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
</style>