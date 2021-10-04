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
                label="username"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="[
                  () => !!username || 'Please enter your username',
                  () => !!username && username.length >= 6 || 'Username must be greater than 6 digits',
                  () => !!username && username.length <= 20 || 'Username must be less than 20 digits'
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
                  () => !!password|| 'Please enter your password',
                  () => !!password && password.length >= 6 || 'Password must be greater than 6 digits',
                  () => !!password && password.length <= 20 || 'Password must be less than 20 digits'
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