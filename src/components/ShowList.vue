<template>
  <div>
    <section id="action-bar">
      <b-field>
        <b-input placeholder="Register show..." v-model="imdbId"></b-input>
        <p class="control">
          <button class="button is-primary" @click="registerShow">Add</button>
        </p>
      </b-field>
    </section>
    <section id="show-list">
      <div class="show-card" v-for="show in showList" :key="show.imdbId" @click="openDetails(show)">
        <figure class="image">
          <img :src="show.imgPoster">
        </figure>
      </div>
    </section>
    <section id="modals">
      <b-modal :active.sync="isDetailsModalActive">
        <ShowDetails :show="currentShow"/>
      </b-modal>
    </section>
  </div>
</template>

<script>
import ShowDetails from "./ShowDetails.vue"
import { getShows, registerShow } from "../js/omdb";

export default {
  name: "ShowList",
  components: {
    ShowDetails
  },
  props: {
    msg: String
  },
  data() {
    return {
      showList: [],
      currentShow: {},
      isDetailsModalActive: false,
      imdbId: ""
    };
  },
  async created() {
    this.showList = await getShows();
  },
  methods: {
    openDetails: function(show) {
      this.currentShow = show;
      this.isDetailsModalActive = true;
    },

    registerShow: async function() {
      await registerShow(this.imdbId)
      this.showList = await getShows();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  border-radius: 6px;
}
.show-card {
  position: relative;
  box-shadow: 3px 3px 20px black;
  border-radius: 6px;
  flex: 1 1 0;
  max-width: 12vw;
  min-width: 10rem;
  margin: .8vw;
}
.show-title {
  display: flex;
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
}
#show-list {
  display: grid;
  grid-gap: 1.5vw;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  width: 80%;
  margin: auto;
}
#action-bar {
  margin-bottom: 2vh;
}
#action-bar > .field{
  justify-content: flex-end;
}
</style>
