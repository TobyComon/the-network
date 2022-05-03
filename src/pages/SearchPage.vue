<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <!-- FIXME this needs to be a v-for to render the multiple profiles -->
                <Profile v-for="p in profiles" :key="p.id" />
            </div>
        </div>

    </div>
</template>


<script>
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>