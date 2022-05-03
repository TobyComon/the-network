<template>
    <div class="profile">
<!-- FIXME render the data of the profile passed in as a prop -->
        <!-- <Profile v-for="p in profiles" :key="p.id" :profile="p" /> -->
        <Profile />
    </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from '../AppState.js'
export default {
    props: {
        profile: {
            type: Object,
            required: true
        }
    },
    // FIXME missing profile prop
   // REVIEW I have props here, but what do I do with them to make it so that it loads the same profile on refresh? 
    setup(props){
        const route = useRoute()

        onMounted(async () => {
            // await profilesService.getProfile(route.params.id)
            // await profilesService.getProfile(id)
        })
        return {
            // profile: computed(() => AppState.activeProfile.id)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>