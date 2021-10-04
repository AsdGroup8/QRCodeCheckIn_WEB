<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            type="text"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            
             :rules="[
                  () => !!search || 'Please fill in the movie name or reservation id',
                  () => !!search && search.length >= 6 || 'length is less than 6',
                  () => !!search && search.length <= 40 || 'length longer than 6'
                ]"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="(item, reservation_index) in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.movietitle }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn
                  text
                  color="white"
                  @click="deleteReservation(reservation_index)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import historyService from "../service/historyService";
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "reservation_id",
      keys: ["ReservationID", "ReservationTime", "StartTime", "EndTime"],
      items: [
        {
          movietitle: "Venom: Let There Be Carnage",
          reservationid: 411111,
          reservationtime: "25/09/2021",
          starttime: "2:00pm",
          endtime: "3:00pm",
        },
        {
          movietitle: "The Addams Family 2",
          reservationid: 811111,
          reservationtime: "13/09/2021",
          starttime: "6:00pm",
          endtime: "7:00pm",
        },
        {
          movietitle: "The Many Saints of Newark",
          reservationid: 211111,
          reservationtime: "22/09/2021",
          starttime: "7:00pm",
          endtime: "9:00pm",
        },
        {
          movietitle: "Mayday",
          reservationid: 111111,
          reservationtime: "11/09/2021",
          starttime: "1:00pm",
          endtime: "3:00pm",
        },
        {
          movietitle: "Titane",
          reservationid: 511111,
          reservationtime: "03/09/2021",
          starttime: "8:00pm",
          endtime: "10:00pm",
        },
        {
          movietitle: "The Jesus Music",
          reservationid: 611111,
          reservationtime: "12/09/2021",
          starttime: "9:00pm",
          endtime: "11:00pm",
        },
        {
          movietitle: "Old Henry",
          reservationid: 711111,
          reservationtime: "17/09/2021",
          starttime: "4:00pm",
          endtime: "5:00pm",
        },
        {
          movietitle: "Love Actually",
          reservationid: 911111,
          reservationtime: "27/09/2021",
          starttime: "3:00pm",
          endtime: "5:00pm",
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  mounted() {
    historyService
      .getAllHistory()
      .then((res) => {
        this.items = JSON.parse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    deleteReservation(index) {
      var id = this.items[index].reservationid;
      historyService
        .delHistory(id)
        .then((res) => {
          alert("Delete Successe");
          this.items.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>