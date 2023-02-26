<template>
    <div v-for="ad in ads">
        <div class="AdCard ">
            <img class="img-fluid mt-5 p-3 " :src="ad.tall" alt="" :title="ad.title">
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
    // props: {
    //     ad: {
    //         type: Object,
    //         required: true
    //     }
    // },
    setup() {
        return {
            ads: computed(() => AppState.ads)
        }
    }
}
</script>


<style lang="scss" scoped></style>