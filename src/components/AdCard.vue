<template>
    <div v-for="ad in ads">
        <div class="AdCard ">
            <img class="img-fluid mt-5 p-3 " :src="ad.tall" alt="" :title="ad.title">
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';
import Pop from '../utils/Pop.js';


export default {
    // props: {
    //     ad: {
    //         type: Object,
    //         required: true
    //     }
    // },
    setup() {

        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error, '[getting ads]')
            }
        }

        onMounted(() => {
            getAds()
        })
        return {
            ads: computed(() => AppState.ads)
        }
    }
}
</script>


<style lang="scss" scoped></style>