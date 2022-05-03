<template>
<div class="container-fluid" ref="top">
  <div class="row">
  <div class="col-3 bg-dark">
    <Login />
  </div>

  <div class="col home">
    <Post v-for="p in posts" :key="p.id" :post="p" />
    <div class="p-5">
     <h4 class="text-dark">
       Page <i v-if="page > 1" class="mdi mdi-chevron-left selectable" @click="prevPg"></i> {{page}} of {{pages}} <i class="mdi mdi-chevron-right selectable" @click="nextPg"></i>
    </h4>
  </div>
    </div>
  <div v-if="user.isAuthenticated" class="col home">
    <CreatePost />
  </div>
  </div>
  <div class="col-md-3 me-5">
    <Dad/>
<!--     
    <img 
    v-for="(pic, i) in dads.tall"
    :key="i"
    :src="pic"
    > -->
  </div>
</div>

</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState.js'
import { dadsService } from '../services/DadsService.js'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  name: 'Home',
  setup() {
    

    
    onMounted(async () => {
      try {
       await postsService.getAll() 
      //  await dadsService.getAds()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      likes: computed(() => AppState.posts.likeIds),
      profiles: computed(() => AppState.profilSearchResults),
      dads: computed(() => AppState.dads),
      pages: computed(() => AppState.totalPages) , 
      page: computed(() => AppState.page),
      nextPg(){
        AppState.page ++
        postsService.getAll()
        scrollTo(0, 0, 0)
      } ,
      prevPg(){
        AppState.page --
        postsService.getAll()
         scrollTo(0, 0, 0)
      }   
    }
  },
   nextPg(){
     
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: start;
  text-align: center;
  
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
