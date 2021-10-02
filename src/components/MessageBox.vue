// timeout会导致报错 -> 直接修改vuex里的值
<template>
  <div>
    <v-snackbar multi-line v-model="snackbar.visible" :timeout="snackbar.timeout" top :color="snackbar.type">
      {{ snackbar.message }}
    <template v-slot:action="{attrs}">
      <v-btn dark text v-bind="attrs" @click="OnClickClose">Close</v-btn>
    </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "messageMain",
  data() {
    return {};
  },
  computed: {
    ...mapState(["snackbar"]),
  },
  methods: {
    OnClickClose() {
      this.$store.commit("CLOSE_MESSAGE");
    }
  }
};
</script>