<template>
    <div class="card" v-for="d in dads" :key="d.id">
        <img :src="d.tall" alt="">
       
    </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { dadsService } from '../services/DadsService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
   
    setup(){
        onMounted(async () => {
            try {
             await dadsService.getAds()
            } catch (error) {
              logger.error(error)
              Pop.toast(error.message, 'error')
            }
        })
        return {
            dads: computed(() => AppState.dads)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>