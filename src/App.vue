<template>
  <v-app>
    {{user_info}}
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>💣💣Boom Fish🐟🐟</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>天天摸🐟，身体棒!!</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/login" style="text-decoration:none" v-if="user_info==null">
        <v-icon>mdi-account</v-icon>
      </router-link>
      <v-menu offset-y v-if="user_info">
        <template v-slot:activator="{on, attrs}">
          <v-avatar color="teal" size="42" v-on="on" v-bind="attrs">
            <span class="white--text headline">{{user_info.name[0]}}</span>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="OnClickLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          <v-list-item @click="OnClickProfile">
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-dialog v-model="DialogAddUser" width="500" v-if="user_info.priv_level > 2">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-on="on" v-bind="attrs">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Add User</v-list-item-title>
              </v-list-item>
            </template>

            <v-card>
              <v-card-title class="headline">New User</v-card-title>
              <v-card-text>
                <v-form ref="AddUserForm">
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Username*"
                          required
                          v-model="user.username"
                          :rules="[
                            () => !! user.username || 'Username 不能为空',
                            () => !! user.username && user.username.length >= 6 || 'Username 不能少于6位'
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Password*"
                          required
                          v-model="user.password"
                          :rules="[
                            () => !! user.password || 'Password 不能为空',
                            () => !! user.password && user.password.length >= 6 || 'Password 不能少于6位'
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Name*"
                          required
                          v-model="user.name"
                          :rules="[
                            () => !! user.name || 'Name 不能为空',
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <v-text-field label="Privilege" v-model.number="user.priv_level"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="blue darken-1" @click="OnClickClose">Close</v-btn>
                <v-btn text color="green darken-1" @click="OnClickRegister">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
      <MessageBox />
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; ReCo</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import userService from "./service/userService";
export default {
  name: "App",

  data: () => ({
    //
    DialogAddUser: false,
    user: {
      username: "",
      password: "",
      priv_level: "",
      name: "",
    },
  }),
  computed: {
    ...mapState("userModule", ["user_info"]),
  },
  methods: {
    ...mapActions("userModule", ["logout"]),
    OnClickProfile() {
      console.log("Account Clicked!");
    },
    OnClickLogout() {
      this.logout();
    },
    OnClickRegister() {
      if (this.$refs["AddUserForm"].validate()) {
        userService
          .register(this.user)
          .then((res) => {
            this.$refs["AddUserForm"].reset();
            this.DialogAddUser = false;
            this.$store.dispatch('message',{message:"注册成功", type:"success", timeout:3000});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    OnClickClose() {
      this.$refs["AddUserForm"].reset();
      this.DialogAddUser = false;
    },
  },
  components: {
    'MessageBox': ()=> import("./components/MessageBox"),
  }
};
</script>
