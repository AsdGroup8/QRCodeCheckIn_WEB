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
          <div>
            <v-img height="250" src=item.poster></v-img>

            <v-card-title>{{current.title}}</v-card-title>

            <v-card-text>

              <div class="my-4 text-subtitle-1">year:{{current.year}}</div>

              <div>length:{{current.length}}</div>
              <div>plot:{{current.plot}}</div>
            </v-card-text>
            <v-card-text>
              <v-btn depressed color="primary">
                More
              </v-btn>
            </v-card-text>
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
      movies: [
        {
          id: '11111',
          title: 'Avatar',
          year: 2009,
          length: 10,
          plot: 'aaaaaaaaaaa',
          poster: 'a.png',
        },
        {
          id: '2222',
          title: 'Unforgiven',
          year: 1992,
          length: 11,
          plot: 'bbbbbbbbb',
          poster: 'b.png',
        },
        {
          id: '3333',
          title: 'Leon: The Professional',
          year: 1994,
          length: 12,
          plot: 'cccccccccc',
          poster: 'c.png',
        },
        {
          id: '4444',
          title: 'The Hurt Locker',
          year: 1994,
          length: 13,
          plot: 'ddddddddddddd',
          poster: 'd.png',
        }
      ],
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