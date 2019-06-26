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
    <b-loading :is-full-page="true" :active.sync="isLoading"/>
  </div>
</template>

<script>
import ShowList from "./ShowList.vue";
import omdb from "../js/omdb";

export default {
  name: "Discover",
  components: {
    ShowList
  },
  data() {
    return {
      query: "",
      shows: [],
      isLoading: false
    };
  },
  methods: {
    async search() {
      this.isLoading = true
      const pagedShows = await omdb.search(this.query);
      this.shows = pagedShows.data
      this.isLoading = false
    }
  }
};
</script>

<style>
b-field {
  margin: 1vw;
}
</style>