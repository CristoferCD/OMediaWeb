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
import { mapGetters } from 'vuex';

export default {
  name: "Discover",
  components: {
    ShowList
  },
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapGetters({
      shows: "search/getShows",
      isLoading: "search/isLoading"
    })
  },
  methods: {
    search() {
      this.$store.dispatch("search/search", this.query)
    }
  }
};
</script>

<style>
b-field {
  margin: 1vw;
}
</style>