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
            <img :src="show.imgPoster" />
          </figure>
        </div>
        <div class="show-info is-overlay">
          <p>{{show.name}}</p>
          <b-button>
            <i class="far fa-calendar-plus" />
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import omdb from "../js/omdb";

export default {
  name: "ShowList",
  computed: mapGetters("showlist", { shows: "getAllShows" }),
  data() {
    return {
      currentShow: {},
      isDetailsModalActive: false,
      imdbId: ""
    };
  },
  created() {
    this.$store.dispatch("showlist/loadAllShows");
  },
  methods: {
    openDetails: function(show) {
      this.$router.push("/show/" + show.imdbId);
    },

    registerShow: async function() {
      await omdb.registerShow(this.imdbId);
      this.shows = await omdb.getShows();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

  &:hover {
    & > .show-card {
      filter: blur(3px);
    }

    & > .show-info {
      opacity: 1;
    }
  }
}
.show-card {
  box-shadow: 3px 3px 20px black;
  border-radius: 6px;
  height: 100%;
}
.show-info {
  transition: 0.3s;
  opacity: 0;

  & > .button {
    position: absolute;
    bottom: 0.5rem;
    right: 1vw;
  }
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

  & > .field {
    justify-content: flex-end;
  }
}
</style>
