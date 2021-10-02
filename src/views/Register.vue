<template>
    <v-container class='fill-height' fluid>

      <v-card>
        <v-card-title>
          <span class="headline">New Account</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="NewAccountForm">
            <v-container>
              <v-row>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Name"
                    required
                    :rules="[
                    () => !! new_account.name|| '5E Username 不能为空',
                  ]"
                    v-model.trim="new_account.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Password*"
                    required
                    :rules="[
                    () => !! new_account.password || 'Password 不能为空',
                    () => !! new_account.password && new_account.password.length >= 6 || 'Password 不能少于6位'
                  ]"
                    v-model.trim="new_account.password"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Steam Username*"
                    required
                    :rules="[
                    () => !! new_account.username_steam || 'Steam Username 不能为空',
                    () => !! new_account.username_steam && new_account.username_steam.length >= 6 || 'Steam Username 不能少于6位'
                  ]"
                    v-model="new_account.username_steam"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Steam Password*"
                    required
                    :rules="[
                    () => !! new_account.password_steam || 'Steam Password 不能为空',
                    () => !! new_account.password_steam && new_account.password_steam.length >= 6 || 'Steam Password 不能少于6位'
                  ]"
                    v-model.trim="new_account.password_steam"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email" v-model.trim="new_account.email"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email Password" v-model.trim="new_account.email_password"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email Host" v-model.trim="new_account.email_host"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="success" @click="OnClickRegister">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
</template>

<script>
import userService from "../service/userService";
export default {
  name: "CustomerReg",
  methods: {
      OnClickRegister() {
          // TODO: Validation
        if (this.$refs["NewAccountForm"].validate()) {
            userService.customerRegister(this.new_account)
        }
      }
  },
  data() {
      return {
          new_account: {
            name: '',
            password: '',
          }
      }
  }
}
</script>