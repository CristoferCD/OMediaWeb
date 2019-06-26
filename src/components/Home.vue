<template>
    <ShowList :shows="shows"/>
</template>

<script>
import ShowList from "./ShowList.vue";
import omdb from "../js/omdb";

export default {
  name: "Home",
  components: {
    ShowList
  },
  data() {
    return {
      shows: []
    };
  },
  async created() {
    this.shows = await omdb.getShows();
  }
};
</script>

<style>
</style>
