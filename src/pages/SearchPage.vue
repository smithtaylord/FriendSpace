<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-9">
                <div class="row">
                    <div class="col-12">
                        <h1>PROFILES</h1>
                        <div v-for="p in profiles">
                            <ProfilesCard :profile="p" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h1>POSTS</h1>
                        <div v-for="p in posts" class="border border-dark rounded my-3 p-4">
                            <PostCard :post="p" />
                        </div>
                        <div class="d-flex justify-content-around mb-3">
                            <button @click="changePage('newer')" class="btn btn-secondary posts-button"
                                :disabled="newer == null">
                                Newer
                            </button>
                            <div>
                                <p>
                                    {{ page }}
                                </p>
                            </div>
                            <button @click="changePage('older')" class="btn btn-secondary posts-button"
                                :disabled="older == null">
                                Older
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div v-for="ad in ads">
                    <AdCard :ad="ad" />
                </div>
            </div>
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

        onMounted(() => {
            getAds()
        })
        return {
            searchTerm,
            posts: computed(() => AppState.posts),
            profiles: computed(() => AppState.profiles),
            ads: computed(() => AppState.ads),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),
            page: computed(() => AppState.postsPage),
        }
    }
}
</script>


<style lang="scss" scoped></style>