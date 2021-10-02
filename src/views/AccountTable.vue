<template>
  <div>
    <v-data-iterator :items="movies" disable-pagination hide-default-footer>
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="(item,index) in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title
                class="subheading font-weight-bold my-card-title"
                @click="OnClickName(index)"
              >
                <span class="headline" style="color:#ecf0f1">{{ item.title}}</span>
                <v-spacer></v-spacer>
                <!-- <v-menu bottom left offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon color="#ecf0f1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-btn
                        class="ma-2"
                        tile
                        outlined
                        color="orange"
                        right
                        @click.stop="UpdateAccount(index)"
                      >
                        <v-icon left>mdi-pencil</v-icon>Edit
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-dialog v-model="DeleteConfirmDialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="ma-2"
                            tile
                            outlined
                            color="red"
                            right
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon left>mdi-trash-can-outline</v-icon>DELE
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="headline">WARNING</v-card-title>
                          <v-card-text>是否确定要删除该账号?</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              outlined
                              @click="DeleteConfirmDialog=false"
                            >Cancel</v-btn>
                            <v-btn color="primary" @click.stop="DeleteAccount(index)">Confirm</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item>
                  </v-list>
                </v-menu> -->
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>5E用户名:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.username_5e}}
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="copy(item.username_5e)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>5E密码:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.password_5e}}
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="copy(item.password_5e)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>steam用户名:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.username_steam}}
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="copy(item.username_steam)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>steam密码:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.password_steam}}
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="copy(item.password_steam)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Email:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.email}}
                      <v-avatar style="position:absolute;right:6px;" @click="copy(item.email)">
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Email密码:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip style="background:white">
                      {{item.email_password}}
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="copy(item.email_password)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-content-copy</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>邮件服务器:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip color="primary">
                      <span>{{item.email_host}}</span>
                      <v-avatar
                        style="position:absolute;right:6px;"
                        @click="OpenEmailHost(item.email_host)"
                      >
                        <v-icon style="cursor:pointer" small>mdi-subdirectory-arrow-right</v-icon>
                      </v-avatar>
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>

                <!-- TODO: ELO -->
                <v-list-item>
                  <v-list-item-content>ELO:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip v-if="item.elo>0" color="teal" text-color="white">{{item.elo}}</v-chip>
                    <v-chip v-if="item.elo==-2" color="teal" text-color="white">定级赛</v-chip>
                    <v-avatar style="position:absolute;right:6px;">
                      <v-icon style="cursor:pointer" small>mid-content-copy</v-icon>
                    </v-avatar>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content class="align-end">
                    <v-progress-linear
                      rounded
                      striped
                      :value="item.newb_match_time / 6"
                      :color="item.newb_match_time < 600 ? 'amber' : 'green'"
                      height="25"
                    >
                      <template>
                        娱乐模式已玩
                        <strong>{{ item.newb_match_time }}</strong>分钟
                      </template>
                    </v-progress-linear>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

  </div>
</template>

<script>
import movieService from "../service/movieService"
export default {
  name: "AccountTable",
  methods: {
  },
  mounted() {
    movieService
      .getAllMovie()
      .then((res)=>{
        this.movies = JSON.parse(res.data).items
        console.log(this.movies[0])
      })
      .catch((err)=>{
        console.log(err)
      })
    
  },
  data() {
    return {
      itemsPerPage: 8,
      updating_account_index: null,
      dialog: false,
      dialogEdit: false,
      DeleteConfirmDialog: false,
      askForDomainDialog: false,
      updating_account: {},
      new_account: {
        username_5e: "",
        password_5e: "",
        username_steam: "",
        password_steam: "",
        email: "",
        email_password: "",
        email_host: "",
        domain_5e: "",
      },
      accounts: [],
      movies: []
    };
  },
};
</script>

<style scoped>
.my-card-title {
  cursor: pointer;
  background: linear-gradient(60deg, #3498db, #8e44ad, #55efc4, #e74c3c);
  animation: change 20s ease-in-out infinite;
  background-size: 200% 200%;
  /* transition: linear 0.5s; */
}

@keyframes change {
  0% {
    background-position: 0 30%;
  }
  25% {
    background-position: 20% 40%;
  }
  50% {
    background-position: 50% 70%;
  }
  75% {
    background-position: 100% 20%;
  }
  100% {
    background-position: 0% 30%;
  }
}
</style>