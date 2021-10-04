<template>
  <div class="code">
    <div class="goods">
      <v-card>
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <div class="flex">
          <div class="img">
            <img width="70%" src="https://s3.bmp.ovh/imgs/2021/10/145d63bfa02e742a.png" alt="">
          </div>
          
        </div>

      </v-card>
    </div>
    <!-- <div class="code_img">
      <img src="https://s3.bmp.ovh/imgs/2021/10/145d63bfa02e742a.png" alt="">
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    current () {
      return this.movies.filter(ele => ele.id === this.$route.params.id)[0]
    }
  }
}
</script>
<style scoped>
.code {
  width: 100%;
  height: 100vh;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.goods {
  width: 40%;
}
.code_img {
  position: fixed;
  right: -10%;
}
.code_img img {
  width: 50%;
}
.flex {
  display: flex;
  align-items: center;
}
.img {
  text-align: center;
}
.flex > * {
  flex: 1;
}
</style>