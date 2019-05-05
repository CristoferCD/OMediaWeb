<template>
  <div class="container">
    <b-field>
      <b-input placeholder="Search..." v-model="query" type="search"></b-input>
        <p class="control">
          <button class="button is-primary" @click="search">
              <i class="fas fa-search"/>
          </button>
        </p>
    </b-field>
    <ShowList :shows="shows"/>
  </div>
</template>

<script>
import ShowList from "./ShowList.vue";
import { search } from "../js/omdb";

export default {
  name: "Discover",
  components: {
    ShowList
  },
  data() {
    return {
      query: "",
      shows: []
    };
  },
  methods: {
    async search() {
      const pagedShows = await search(this.query);
      this.shows = pagedShows.data
    }
  }
};
</script>

<style>
</style>