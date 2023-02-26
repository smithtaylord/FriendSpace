<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col-12">
                <h1>PROFILES</h1>
                <div v-for="p in profiles" class="rounded custom-border">
                    <ProfilesCard :profile="p" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>POSTS</h1>
                <div v-for="p in posts" class="custom-border rounded my-3 p-4">
                    <PostCard :post="p" />
                </div>
                <div class=" col-12 d-flex justify-content-around my-3 pt-4">
                    <button @click="changePage('newer')" class="btn bg-secondary text-light posts-button"
                        :disabled="newer == null">
                        Newer
                    </button>
                    <div>
                        <p>
                            {{ page }}
                        </p>
                    </div>
                    <button @click="changePage('older')" class="btn bg-secondary text-light posts-button"
                        :disabled="older == null">
                        Older
                    </button>
                </div>
            </div>

            <!-- <div class="col-3">
                <div v-for="ad in ads">
                    <AdCard :ad="ad" />
                </div>
            </div> -->
        </div>


    </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';

export default {
    setup() {
        const route = useRoute()
        const searchTerm = route.params.searchTerm
        async function getAds() {
            try {
                await adsService.getAds()
            } catch (error) {
                Pop.error(error, '[getting ads]')
            }
        }
        function scrollToTop() {
            window.scrollTo(0, 0)
        }

        onMounted(() => {
            getAds()
            scrollToTop()
        });
        return {
            searchTerm,
            posts: computed(() => AppState.posts),
            profiles: computed(() => AppState.profiles),
            ads: computed(() => AppState.ads),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),
            page: computed(() => AppState.postsPage),

            async changePage(direction) {

                try {
                    if (direction == 'older') {
                        logger.log('older')
                        await postsService.changePage(AppState.olderPage)
                        this.scrollToTop()
                    } if (direction == 'newer') {
                        logger.log('newer')
                        await postsService.changePage(AppState.newerPage)
                        this.scrollToTop()
                    }

                } catch (error) {
                    Pop.error(error, '[change page]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>
