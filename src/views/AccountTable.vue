<template>
  <v-data-iterator :items="movies" disable-pagination hide-default-footer>
    <template v-slot:default="props">
      <v-row>
        <v-card :loading="loading" class="mx-auto my-12" max-width="374" v-for="(item,index) in props.items" :key="item.id">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <v-img height="250" src=item.poster></v-img>

          <v-card-title>{{item.title}}{{index}}</v-card-title>

          <v-card-text>

            <div class="my-4 text-subtitle-1">year:{{item.year}}</div>

            <div>length:{{item.length}}</div>
            <div>plot:{{item.plot}}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </template>
  </v-data-iterator>
</template>



<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    movies : [
      { 
        id : '11111',
        title :'Avatar',
        year : 2009,
        length : 10,
        plot : 'aaaaaaaaaaa',
        poster :'a.png',
      },
      { 
        id : '2222',
        title :'Unforgiven',
        year : 1992,
        length : 11,
        plot : 'bbbbbbbbb',
        poster :'b.png',
      },
      { 
        id : '3333',
        title :'Leon: The Professional',
        year : 1994,
        length : 12,
        plot : 'cccccccccc',
        poster :'c.png',
      },
      { 
        id : '4444',
        title :'The Hurt Locker',
        year : 1994,
        length : 13,
        plot : 'ddddddddddddd',
        poster :'d.png',
      }
    ]

  }),

  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>