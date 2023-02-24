<template>
    <div class="AdCard">
        <img class="img-fluid mt-5 p-3" :src="ad.tall" alt="" :title="ad.title">
    </div>
</template>


<script>
export default {
    props: {
        ad: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>