<template>
  <v-data-iterator :items="movies" disable-pagination hide-default-footer>
    <template v-slot:default="props">
      <v-row>
        <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
          v-for="(item,index) in props.items"
          :key="item.id"
        >
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>

          <v-img :src="item.image"></v-img>

          <v-card-title>{{ item.title }}</v-card-title>

          <v-card-text>
            <div class="my-4 text-subtitle-1">
              <strong>year:</strong>
              {{ item.year }}
            </div>
            <div class="my-4 text-subtitle-1">
              <strong>length:</strong>
              {{ item.runtimeStr }}
            </div>
            <div class="my-4 text-subtitle-1">
              <strong>Plot:</strong>
              {{ item.plot }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Movie Start Time</v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="new_reserv_date_picker_on[index]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="new_reserv_date[index]"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="new_reserv_date[index]"
                    @input="new_reserv_date_picker_on[index] = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
              <!-- time picker -->
              <v-col cols="12" lg="6">
                <v-menu
                  ref="time_menu"
                  v-model="new_reserv_time_picker_on[index]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="new_reserv_time[index]"
                  transition="scale-transition"
                  offset-y
                  min-width="250px"
                  max-width="250px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="new_reserv_time[index]"
                      label="Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="new_reserv_time_picker_on[index]"
                    v-model="new_reserv_time[index]"
                    full-width
                    @click:minute="$refs.time_menu[index].save(new_reserv_time[index])"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="onClickReserveMovie(index)">Reserve</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </template>
  </v-data-iterator>
</template>



<script>
import movieService from "../service/movieService"
import reservationService from "../service/reservationService";
import { mapState } from "vuex";
export default {
  data: () => ({
    loading: false,
    new_reserv_date: [],
    new_reserv_time: [],
    new_reserv_date_picker_on: [],
    new_reserv_time_picker_on: [],
    movies: [
      {
        id: '11111',
        title: 'Avatar',
        year: 2009,
        runtimeStr: 10,
        plot: 'aaaaaaaaaaa',
        image: 'a.png',
        genres: "Action, Adventure, Sci-Fi"
      },
      {
        id: '11112',
        title: 'Avatar',
        year: 2009,
        runtimeStr: 10,
        plot: 'aaaaaaaaaaa',
        image: 'a.png',
        genres: "Action, Adventure, Sci-Fi"
      },
      {
        id: '11113',
        title: 'Avatar',
        year: 2009,
        runtimeStr: 10,
        plot: 'aaaaaaaaaaa',
        image: 'a.png',
        genres: "Action, Adventure, Sci-Fi"
      },
      {
        id: '11114',
        title: 'Avatar',
        year: 2009,
        runtimeStr: 10,
        plot: 'aaaaaaaaaaa',
        image: 'a.png',
        genres: "Action, Adventure, Sci-Fi"
      },
    ]

  }),
  computed: {
    ...mapState("userModule", ["user_info"]),
  },
  mounted() {
    movieService.getAllMovie()
      .then(res => {
        this.movies = res.data
        var len = this.movies.length
        this.new_reserv_date = new Array(len)
        this.new_reserv_time = new Array(len)
        this.new_reserv_date_picker_on = new Array(len)
        this.new_reserv_time_picker_on = new Array(len)
        for (var i = 0; i < len; i++) {
          this.new_reserv_date_picker_on[i] = false
          this.new_reserv_time_picker_on[i] = false
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    onClickReserveMovie(index) {
      if (this.user_info) {
        var movie_id = this.movies[index].id
        var starttime = this.new_reserv_date[index] + " " + this.new_reserv_time[index]
        reservationService.createReservation({movie_id, starttime})
        .then(res => {
          console.log("success")
        })
        .catch(err => {
          console.log(err)
        })
      }
      window.location.replace("/login")
    },
  },
}
</script>