<template>
    <ShowList :shows="shows"/>
</template>

<script>
import ShowList from "./ShowList.vue";
import { getShows } from "../js/omdb";

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
    this.shows = await getShows();
  }
};
</script>

<style>
</style>
