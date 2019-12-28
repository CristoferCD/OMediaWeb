<template>
  <div>
    <section id="show-list">
      <div class="show-item" v-for="show in shows" :key="show.imdbId" @click="openDetails(show)">
        <div class="show-card">
          <figure class="image">
            <img :src="show.imgPoster" />
          </figure>
        </div>
        <div class="show-info is-overlay">
          <b-button size="is-small" @click="follow(show.imdbId)">
            <i class="fa fa-plus" />
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import omdb from "../js/omdb";
export default {
  name: "ShowList",
  props: {
    shows: Array
  },
  data() {
    return {
      currentShow: {},
      isDetailsModalActive: false,
      imdbId: ""
    };
  },
  methods: {
    openDetails(show) {
      this.$router.push("/show/" + show.imdbId);
    },
    async follow(id) {
      await omdb.follow(id, true);
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
  max-width: 12vw;
  height: 100%;
}
.show-info {
  transition: 0.3s;
  opacity: 0;
  position:absolute;
  left: 12vw;

  & > .button {
    position: absolute;
    left: .25rem;
    bottom: 0;
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
</style>
