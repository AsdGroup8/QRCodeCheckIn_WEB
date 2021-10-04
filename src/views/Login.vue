<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref='login-form'>
              <v-text-field
                label="Username"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="[
                  () => !!username || 'Enter user name',
                  () => !!username && username.length >= 6 || 'username must bigger than 6',
                  () => !!username && username.length <= 40 || 'username must less than 10'
                ]"
              ></v-text-field>

              <v-text-field
                id="password"
                label="password"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[
                  () => !!password|| 'enter password',
                  () => !!password && password.length >= 6 || 'password must bigger than 6',
                  () => !!password && password.length <= 20 || 'password must less than 10'
                ]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" href="/customer/reg">Register</v-btn>

            <v-spacer></v-spacer>
            <v-btn color="primary" @click="OnClickLogin">Login</v-btn>
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
      var email = this.username;
      var password = this.password;
      if (this.$refs['login-form'].validate()) {
        this.login({email,password})
          .then(res=>{
            console.log(res)
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