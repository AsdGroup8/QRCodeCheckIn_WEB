<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none;color: antiquewhite;">
        Movie Check-in
        </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>Movie Ticket QR Check-in</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/login" style="text-decoration: none" v-if="user_info == null">
        <v-icon>mdi-account</v-icon>
      </router-link>
      <v-menu offset-y v-if="user_info">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="teal" size="42" v-on="on" v-bind="attrs">
            <!-- <span class="white--text headline">{{user_info.name[0]}}</span> -->
            <span class="white--text headline">U</span>
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

          <v-list-item href="/customer/reserv/history">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>
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
      <span class="white--text">&copy; ASD Group 8</span>
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
            this.$store.dispatch("message", {
              message: "注册成功",
              type: "success",
              timeout: 3000,
            });
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
    MessageBox: () => import("./components/MessageBox"),
  },
};
</script>
