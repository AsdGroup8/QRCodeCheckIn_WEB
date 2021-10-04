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
                    () => !! new_account.name|| ' Username can not be empty',
                  ]"
                    v-model.trim="new_account.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Password*"
                    required
                    :rules="[
                    () => !! new_account.password || 'Password can not be empty',
                    () => !! new_account.password && new_account.password.length >= 6 || 'Password can not be less than 6 digits'
                  ]"
                    v-model.trim="new_account.password"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Gender*"
                    required
                    :rules="[
                    () => !! new_account.gender || 'Gender can not be empty',
                    () => !! new_account.gender && new_account.gender.length >= 6 || 'Gender can not be less than 2 digits'
                  ]"
                    v-model="new_account.gender"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="dob*"
                    required
                    :rules="[
                    () => !! new_account.dob || 'dob can not be empty',
                    () => !! new_account.dob && new_account.dob.length >= 6 || 'dob can not be less than 2 digits'
                  ]"
                    v-model.trim="new_account.dob"
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
            gender: '',
            dob:'',

          }

      }
  }
}
</script>