<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <!-- REVIEW I have a search page, but it doesn't seem like I'm being routed there. And even then, it's still loading posts not profiles???? -->
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