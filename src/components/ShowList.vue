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
    <section id="show-list">
      <div class="show-item" v-for="show in shows" :key="show.imdbId" @click="openDetails(show)">
        <div class="show-card">
          <figure class="image">
            <img :src="show.imgPoster">
          </figure>
        </div>
        <div class="show-info is-overlay">
          <p>{{show.name}}</p>
          <b-button>
            <i class="far fa-calendar-plus"/>
          </b-button>
        </div>
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
import ShowDetails from "./ShowDetails.vue";
import { getShows, registerShow } from "../js/omdb";

export default {
  name: "ShowList",
  components: {
    ShowDetails
  },
  props: {
    shows: []
  },
  data() {
    return {
      currentShow: {},
      isDetailsModalActive: false,
      imdbId: ""
    };
  },
  methods: {
    openDetails: function(show) {
      this.currentShow = show;
      this.isDetailsModalActive = true;
    },

    registerShow: async function() {
      await registerShow(this.imdbId);
      this.shows = await getShows();
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
figure {
  border-radius: 6px;
  height: 100%;
}
.show-item {
  position: relative;
  border-radius: 6px;
  flex: 1 1 0;
  max-width: 12vw;
  min-width: 10rem;
  margin: 0.8vw;
}
.show-item:hover > .show-card {
  filter: blur(3px);
}
.show-item:hover > .show-info {
  opacity: 1;
}
.show-card {
  box-shadow: 3px 3px 20px black;
  border-radius: 6px;
  height: 100%;
}
.show-info {
  transition: 0.3s;
  opacity: 0;
}
.show-info > .button {
  position: absolute;
  bottom: 0.5rem;
  right: 1vw;
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
.image > img {
  border-radius: 6px;
  height: 100%;
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
#action-bar > .field {
  justify-content: flex-end;
}
</style>
