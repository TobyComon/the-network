<template>
    <div class="container">
        <div class="row">
            <img class="rounded cover-img m-2" :src="profile.coverImg" alt="">
        </div>
        <div class="row">
            <div v-if="!editing" class="col d-flex mt-2">
                <img class="rounded me-3 pfp" :src="profile.picture" alt="">
                <div class="text-dark card p-2">
                    <h2>{{profile.name}}</h2>
                    <h5 >Bio: 
                       
                           {{profile.bio}}
                           
                        </h5>
                        <h5 >Class of {{profile.class}}</h5>
                    <h5 v-if="!profile.graduated">Student at Boise CodeWorks</h5>
                    <h5 v-if="profile.graduated">CodeWorks Graduate! <i class="mdi mdi-school mdi-24px mdi-spin"></i></h5>
                    <h5><a :href="profile.github" class="mdi mdi-github"></a></h5>
                </div>
                <div v-if="profile.id == account.id">
                    <i
                    class="text-info selectable ms-2 mdi mdi-pencil"
                    @click="editing = true"
                    ></i>
                </div>
                <div class="ms-5" v-if="profile.id == account.id">
                    <CreatePost />
                </div>
            </div>
            <form v-else @submit.prevent="editAccount">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input
                     type="text"
                     class="form-control"
                     id="name"
                     aria-describedby="helpId"
                     placeholder="Name..."
                     v-model="profile.name"
                     />
                     <div>
                         <label for="bio" class="form-label">Bio</label>
                         <input type="text" class="form-control" id="bio" placeholder="Bio..." v-model="profile.bio">
                     </div>
                     <div>
                         <label for="class" class="form-label">Class</label>
                         <input type="text" class="form-control" id="class" placeholder="Class.." v-model="profile.class">
                     </div>
                     <div v-if="profile.github">
                         <label for="git" class="form-label">GitHub</label>
                         <input type="text" class="form-control" id="git" placeholder="GitHub Link..." v-model="profile.github">
                     </div>
                     <div>
                         <label for="img">Profile Picture</label>
                         <input type="text"
                         class="form-control"
                         id="img"
                         placeholder="New image link..."
                         v-model="profile.picture"
                         />
                     </div>
                      <div>
                         <label for="coverImg">Cover Image</label>
                         <input type="text"
                         class="form-control"
                         id="coverImg"
                         placeholder="New image link..."
                         v-model="profile.coverImg"
                         />
                     </div>
                </div>
                <button class="btn btn-danger" @click="editing = false">Cancel</button>
                <button class="btn btn-success ms-2">Submit</button>
            </form>
        </div>
        <div class="text-center">

        <Post v-for="p in posts" :key="p.id" :post="p" />
        <div class="p-5">
     <h4 class="text-dark">
       Page <i v-if="page > 1" class="mdi mdi-chevron-left selectable" @click="prevPg"></i> {{page}} of {{pages}} <i class="mdi mdi-chevron-right selectable" @click="nextPg"></i>
    </h4>
  </div>
        </div>
        <!-- FIXME Add next and previous (similar to home page) -->
    </div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState.js'
import { accountService } from '../services/AccountService.js'
import { profilesService } from '../services/ProfilesService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'

export default {
    setup(){
        const route = useRoute()
        const editing = ref(false)
        

        onMounted(async () => {
            try {
              await postsService.getByQuery({creatorId: route.params.id})
              await profilesService.getProfile(route.params.id)
              
              
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        })

        return {
            editing,
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.searchResults),
            account: computed(() => AppState.account), pages: computed(() => AppState.totalPages) , 
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
      },  
            async editAccount() {
                try {
                 await accountService.editAccount(AppState.activeProfile)
                 Pop.toast("Account Updated!", 'success')
                 editing.value = false
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
    height: 15vh;
    width: 15vh;
}
.cover-img{
    height: 20em;
    object-fit: cover;
    
}
</style>