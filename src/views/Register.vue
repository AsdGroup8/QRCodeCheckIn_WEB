<template>
  <v-container class="fill-height" fluid>
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
                    () => !!new_account.name || ' name can not be empty',
                  ]"
                  v-model.trim="new_account.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Password*"
                  required
                  type="password"
                  :rules="[
                    () => !!new_account.password || 'password can not be empty',
                    () =>
                      (!!new_account.password &&
                        new_account.password.length >= 6) ||
                      'Password can not be less than 6 char',
                  ]"
                  v-model.trim="new_account.password"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Gender*"
                  required
                  :rules="[
                    () => !!new_account.gender || 'Gender can not be empty',
                  ]"
                  v-model="new_account.gender"
                ></v-text-field>
              </v-col>

              <!-- date picker  -->
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="date_picker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="new_account.dob"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="new_account.dob"
                    @input="date_picker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  :rules="[
                    () => !!new_account.email || 'email cannot be empty',
                    () =>
                      new_account.email.includes('@') || 'invalid email format',
                  ]"
                  v-model.trim="new_account.email"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Phone"
                  :rules="[
                    () => !!new_account.phone || 'phone cannot be empty',
                  ]"
                  v-model.trim="new_account.phone"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Address"
                  v-model.trim="new_account.address"
                ></v-text-field>
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
import { mapActions } from "vuex";
export default {
  name: "CustomerReg",
  methods: {
    ...mapActions("userModule", ["login"]),
    OnClickRegister() {
      if (this.$refs["NewAccountForm"].validate()) {
        userService
          .customerRegister(this.new_account)
          .then((res) => {
            var email = this.new_account.email;
            var password = this.new_account.password;
            this.login({ email, password })
              .then((res) => {
                this.$router.push({ path: "/" });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  data() {
    return {
      date_picker: false,
      new_account: {
        name: "",
        password: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
      },
    };
  },
};
</script>