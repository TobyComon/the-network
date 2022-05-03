<template>
    <div class="container text-end me-0">
        <div class="me-4">
        <label class="me-5" for="search"><h4>Search Accounts</h4></label> <br>

        </div>
        <form>

           <input class=" p-2" name="search" type="text" @submit.prevent="search">
           <button class="btn p-2 mb-1 mx-1 me-0 btn-primary">Search</button>
        
        </form>


    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState.js'
import { profilesService } from '../services/ProfilesService.js'
export default {
   props: {
       profile: {
           type: Object
       }
   },
    setup(props){
        const router = useRouter()
        return {
            search() {
                router.push({name: "SearchPage", query:value})
            }
        }
    }
}
</script>


<style lang="scss" scoped>
h4{
    transition: color .5s;
}
h4:hover{
    color: var(--bs-primary)
}
</style>