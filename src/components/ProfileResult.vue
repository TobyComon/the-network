<template>
  <div class="container text-end me-0">
    <div class="me-4">
      <label class="me-5" for="search"><h4>Search Accounts</h4></label> <br />
    </div>
    <!-- NOTE @submit needs to go directly on the form element, because that is where we are capturing the event -->
    <form @submit.prevent="search">
      <input class="p-2" name="search" type="text" v-model="query.body" />
      <button class="btn p-2 mb-1 mx-1 me-0 btn-primary">Search</button>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { profilesService } from "../services/ProfilesService.js";
export default {
  props: {
    profile: {
      type: Object,
    },
  },
  setup(props) {
    const query = ref({});
    const router = useRouter();
    return {
      query,
      search() {
        // NOTE make sure to test in small steps - first thing is to make sure that the submit actually calls the function we intend it to
        // debugger;
        router.push({ name: "SearchPage", query: query.value });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
h4 {
  transition: color 0.5s;
}
h4:hover {
  color: var(--bs-primary);
}
</style>
