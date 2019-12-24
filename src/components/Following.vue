<template>
  <ShowList :shows="shows"/>
</template>

<script>
import { mapGetters } from "vuex";
import ShowList from "./ShowList.vue";

export default {
    name: "Following",
    components: {
        ShowList
    },
    computed: mapGetters("showlist", { shows: "getAllShows" }),
    created() {
        this.$store.dispatch("showlist/loadFollowing");
    }
}
</script>

<style>

</style>