<template>
  <div>
    <v-data-iterator :items="accounts" disable-pagination hide-default-footer>
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="(item,index) in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title
                class="subheading font-weight-bold my-card-title"
                @click="OnClickName(index)"
              >
                <span class="headline" style="color:#ecf0f1">{{ item.username_5e }}</span>
                <v-spacer></v-spacer>
                <v-menu bottom left offset-y>
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
                </v-menu>
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
                  <v-list-item-content>信用分:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip
                      :color="CreditColor(item.credit)"
                      :text-color="CreditTextColor(item.credit)"
                    >
                      {{item.credit}}
                      <v-avatar style="position:absolute;right:6px;" @click="RefreshStat(index)">
                        <v-icon style="cursor:pointer" small>mdi-refresh</v-icon>
                      </v-avatar>
                    </v-chip>
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

          <!-- 当5E Domain自动获取失败的时候，弹出该对话框，要求用户手动输入，否则添加失败 -->
      <v-dialog persistent max-width="300" v-model="askForDomainDialog">
        <v-card>
          <v-card-title>
            <span class="headline">Account 5E Domain</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="Account5EDomainForm">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="10" md="10">
                    <v-text-field
                      label="5E Domain"
                      required
                      v-model.trim="new_account.domain_5e"
                      :rules="[
                        () => !! new_account.domain_5e || '5E Domain 不能为空'
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="CloseAskForDomainDialog">Close</v-btn>
            <v-btn color="blue darken-1" text @click="OnClickSave">Save</v-btn>
            <v-btn color="red darken-1" text @click="OnClickAbort">Abort</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- 新增账号的Dialog -->
    <v-dialog persistent max-width="600" v-model="dialog">

      <template v-slot:activator="{ on, attrs}">
        <v-btn bottom color="teal" dark fab fixed right v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

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
                    label="5E Username*"
                    required
                    :rules="[
                    () => !! new_account.username_5e || '5E Username 不能为空',
                  ]"
                    v-model.trim="new_account.username_5e"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="5E Password*"
                    required
                    :rules="[
                    () => !! new_account.password_5e || '5E Password 不能为空',
                    () => !! new_account.password_5e && new_account.password_5e.length >= 6 || '5E Password 不能少于6位'
                  ]"
                    v-model.trim="new_account.password_5e"
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
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="OnClickSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 编辑账号 -->
    <v-dialog persistent max-width="600" v-model="dialogEdit">
      <v-card>
        <v-card-title>
          <span class="headline">New Account</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="UpdatingAccountForm">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="5E Username*"
                    required
                    disabled
                    :rules="[
                    () => !! updating_account.username_5e || '5E Username 不能为空',
                  ]"
                    v-model="updating_account.username_5e"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="5E Password*"
                    required
                    :rules="[
                    () => !! updating_account.password_5e || '5E Password 不能为空',
                    () => !! updating_account.password_5e && updating_account.password_5e.length >= 6 || '5E Password 不能少于6位'
                  ]"
                    v-model="updating_account.password_5e"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Steam Username*"
                    required
                    disabled
                    :rules="[
                    () => !! updating_account.username_steam || 'Steam Username 不能为空',
                    () => !! updating_account.username_steam && updating_account.username_steam.length >= 6 || 'Steam Username 不能少于6位'
                  ]"
                    v-model="updating_account.username_steam"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Steam Password*"
                    required
                    :rules="[
                    () => !! updating_account.password_steam || 'Steam Password 不能为空',
                    () => !! updating_account.password_steam && updating_account.password_steam.length >= 6 || 'Steam Password 不能少于6位'
                  ]"
                    v-model="updating_account.password_steam"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email" v-model="updating_account.email"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email Password" v-model="updating_account.email_password"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Email Host" v-model="updating_account.email_host"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field disabled label="5E User Domain" v-model="updating_account.domain_5e"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="OnClickUpdate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import accountService from "../service/accountService";
export default {
  name: "AccountTable",
  methods: {
    OnClickName(index) {
      if (this.accounts[index].url_5e.length > 0)
        window.open(this.accounts[index].url_5e, "_blank");
    },
    RefreshStat(index) {
      accountService
        .get_credit_elo(this.accounts[index].id)
        .then((res) => {
          this.accounts[index].elo = res.data.elo;
          this.accounts[index].credit = res.data.credit;
          this.accounts[index].newb_match_time = res.data.newb_match_time;
        })
        .catch((err) => {
          console.log("请确保5e url 不为空!");
        });
    },
    CreditTextColor(number) {
      if (number >= 85) {
        return "black";
      } else {
        return "white";
      }
    },
    CreditColor(number) {
      if (number >= 85) {
        return "green";
      } else {
        return "red";
      }
    },
    OnClickSave() {
      if (this.$refs["NewAccountForm"].validate()) {
        console.log("Click Save");
        accountService
          .add_account(this.new_account)
          .then((res) => {
            if (res.code == 70) {
              // TODO: 要求用户输入5E Domain
              this.$store.dispatch("message", {
                message: "自动获取5E Domain失败，请手动输入",
                type: "fail",
              });
              this.askForDomainDialog = true;
              return;
            }
            this.dialog = false;
            this.$refs["NewAccountForm"].reset();
            if (this.askForDomainDialog)
              this.$refs["Account5EDomainForm"].reset();
            this.$store.dispatch("message", {
              message: "添加成功",
              type: "success",
            });
            accountService
              .get_all()
              .then((res) => {
                this.accounts = res.data.accounts;
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
    copy(item) {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", item);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(input);
    },
    OpenEmailHost(url) {
      if (url.length > 0) window.open(url, "_blank");
    },
    UpdateAccount(index) {
      this.updating_account_index = index;
      this.updating_account = this.accounts[index];
      this.dialogEdit = true;
    },
    DeleteAccount(index) {
      accountService
        .delete_account(this.accounts[index].id)
        .then((res) => {
          if (res.code == 0) {
            this.$store.dispatch("message", {
              message: "删除成功",
              type: "info",
            });
            this.DeleteConfirmDialog = false;
          }
          this.accounts.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OnClickUpdate() {
      if (this.$refs["UpdatingAccountForm"].validate()) {
        accountService
          .update_account(this.updating_account)
          .then((res) => {
            this.dialogEdit = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    CloseAskForDomainDialog() {
      this.askForDomainDialog = false;
      this.dialog = false;
      this.$store.dispatch("message", {
        message:
          "因为5E Domain为空,所以无法获取账号的信用分，天梯分，和娱乐模式时间",
        type: "amber",
      });
      this.new_account.domain_5e = "-1";
      accountService
        .add_account(this.new_account)
        .then((res) => {
          this.$refs["Account5EDomainForm"].reset();
          this.$refs["NewAccountForm"].reset();

          this.$store.dispatch("message", {
            message: "添加成功",
            type: "success",
          });
          accountService
            .get_all()
            .then((res) => {
              this.accounts = res.data.accounts;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    OnClickAbort() {
      this.$refs["Account5EDomainForm"].reset();
      this.$refs["NewAccountForm"].reset();
      this.askForDomainDialog = false;
      this.dialog = false;
    },
  },
  mounted() {
    accountService
      .get_all()
      .then((res) => {
        this.accounts = res.data.accounts;
        for (var i = 0; i < this.accounts.length; i++) {
          this.accounts[i].played_persentage =
            this.accounts[i].newb_match_time / 6;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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