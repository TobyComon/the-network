<template>
  <div class="col-md-6">
    <div class="card shadow m-2">
      <div class="text-start d-flex p-2">
        <img
          class="pfp selectable shadow"
          :src="post.creator.picture"
          alt=""
          @click="goToProfile"
        />
        <h5 class="mx-2 mt-2 text-capitalize" @click="goToProfile">
          {{ post.creator.name }}
        </h5>
        <div v-if="post.creatorId == account.id">
          <i class="mdi mdi-delete" @click="removePost"></i>
        </div>
      </div>

      <h4>{{ post.body }}</h4>
      <img class="postimg rounded-top" :src="post.imgUrl" alt="" />
      <p class="text-center p-2">
        <strong>{{ new Date(post.createdAt).toDateString() }}</strong>
      </p>
      <p class="text-end me-3">
        <i
          class="text-danger selectable mdi mdi-heart mdi-24px"
          @click="likePost"
        ></i>
        {{ post.likes.length }}
      </p>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    return {
      posts: computed(() => AppState.posts),
      async likePost() {
        // FIXME call to service for likePost
        // if(likeIds contains account.id){
        // filter likes to remove the account object
        // }else
        // push account into likes
        // }
        await postsService.likePost(props.post.id);
        //  props.post.likes ? props.post.likes++ : props.post.likes --
      },

      account: computed(() => AppState.account),
      goToProfile() {
        let active = router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
        AppState.activeProfile = active;
        scrollTo(0, 0, 0);
      },
      async removePost() {
        try {
          if (await Pop.confirm()) {
            await postsService.removePost(props.post.id);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.pfp {
  height: 10vh;
  width: 10vh;
  border-radius: 3px;
  margin: 0.25em;

  transition: height 0.5s, width 0.5s, margin 0.5s;
}
.pfp:hover {
  height: 11vh;
  width: 11vh;
  margin: 0.3em;
}
.postimg {
  max-height: 80vh;
  max-width: 80vh;
  align-content: center;
}
</style>
