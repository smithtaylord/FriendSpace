<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center p-3 bg-secondary text-light mt-2 rounded custom-border mb-3">PROFILES</h1>
                <div v-for="p in profiles" class="rounded custom-border">
                    <ProfilesCard :profile="p" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1 class="text-center p-3 bg-secondary text-light rounded custom-border">POSTS</h1>
                <div v-for="p in posts" class="custom-border rounded my-3 p-4">
                    <PostCard :post="p" />
                </div>
                <div>
                    <PageButtons />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { onMounted, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

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
        async function searchPostsAndProfiles() {
            try {
                logger.log(searchTerm, '[search term]')
                await postsService.searchPosts(searchTerm)
                await profilesService.searchProfiles(searchTerm)

            } catch (error) {
                Pop.error(error, '[search posts]')
            }
        }

        onMounted(() => {
            getAds()
            scrollToTop()
            searchPostsAndProfiles()
        });

        onUnmounted(() => {
            postsService.clearPosts();
            profilesService.clearProfile();
            profilesService.clearProfiles()
        })
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
                        scrollToTop()
                    } if (direction == 'newer') {
                        logger.log('newer')
                        await postsService.changePage(AppState.newerPage)
                        scrollToTop()
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
