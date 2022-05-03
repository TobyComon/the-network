<template>
<div class="container-fluid card p-5 shadow mt-2">
    <div class="text-start mb-3">
        <img class="pfp" :src="account.picture" alt="">
    </div>
    <form @submit.prevent="createPost()" class="">
        <div class="form-group">
            <label for="body">What's on your mind, {{account.name}}?</label>
        <input type="text" class="form-control" id="body" v-model="newPost.body">
        </div>
         <div class="form-group">
      <label for="img" class="form-label">Image:</label>
      <input
        type="url"
        class="form-control"
        
        v-model="newPost.imgUrl"
        />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState.js'

export default {
    
    setup(){
        const newPost = ref({})

        
        return {
            account: computed(() => AppState.account),
            newPost,
            async createPost(){
                try {
                 await postsService.createPost(newPost.value)
                 newPost.value = {}
                 
                } catch (error) {
                  logger.error(error)
                  Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.pfp{
    height: 8vh;
    width: 8vh;
    border-radius: 3px;
    margin: .25em;

}
</style>