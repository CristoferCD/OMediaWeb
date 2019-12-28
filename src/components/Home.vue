<template>
  <div>
    <section id="action-bar">
      <b-field>
        <b-input placeholder="Register show..." v-model="imdbId"></b-input>
        <p class="control">
          <b-button class="is-primary" @click="registerShow">Add</b-button>
        </p>
      </b-field>
    </section>
    <ShowList :shows="shows" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ShowList from "./ShowList.vue";
import omdb from "../js/omdb";

export default {
  name: "Home",
  components: {
    ShowList
  },
  computed: mapGetters("showlist", { shows: "getAllShows" }),
  created() {
    this.$store.dispatch("showlist/loadAllShows");
  },
  methods: {
    registerShow: async function() {
      await omdb.registerShow(this.imdbId);
      this.shows = await omdb.getShows();
    }
  }
};
</script>

<style scoped lang="scss">
#action-bar {
  margin-bottom: 2vh;

  & > .field {
    justify-content: flex-end;
  }
}
</style>
