<template>
  <div class="container">
    <div class="row">
      <Post v-for="p in searchedPosts" :key="p.id" :post="p" />
      <!--  I have a search page, but it doesn't seem like I'm being routed there. And even then, it's still loading posts not profiles???? -->
      <!-- NOTE we werent binding the search input field into a ref - we alos didn't have the submit.prevent on the form element itself. WE then needed to pull off the query from the url and pass it through to the service layer, where we make the API call with the query appended to the URL -->
      <!-- FIXME this needs to be a v-for to render the multiple profiles -->
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  setup() {
    // NOTE useRoute gains us access to the URL object and all of its properties
    // NOTE useRouter gains us access to the vue router for navigating locally
    const route = useRoute();
    // NOTE this works similarly to a onMounted, BUT this will do something if a reactive value within it changes at any point. Think ProxyState.on but way cooler
    watchEffect(async () => {
      try {
        await postsService.searchPosts(route.query);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      route,
      searchedPosts: computed(() => AppState.searchResults.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
