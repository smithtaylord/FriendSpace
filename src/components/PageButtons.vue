<template>
    <div class=" col-12 d-flex justify-content-between my-3 pt-4">
        <button @click="changePage('newer')" class=" border-btn btn bg-light text-primary posts-button fs-4"
            :disabled="newer == null">
            <i class="mdi mdi-chevron-left fs-4"></i><i class="mdi mdi-chevron-left fs-4"></i> Newer
        </button>
        <div>
            <p>
                {{ page }}
            </p>
        </div>
        <button @click="changePage('older')" class="border-btn btn bg-light text-primary posts-button fs-4"
            :disabled="older == null">
            Older <i class="mdi mdi-chevron-right fs-4"></i><i class="mdi mdi-chevron-right fs-4"></i>
        </button>

    </div>
</template>


<script>
import { onMounted, computed, ref, onUnmounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import { logger } from '../utils/Logger.js';
import { adsService } from '../services/AdsService.js';
import AdCard from '../components/AdCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        // const router = useRouter()
        // const editable = ref({})
        // async function getPosts() {
        //     try {
        //         await postsService.getPosts();
        //     }
        //     catch (error) {
        //         Pop.error(error, "[getting posts]");
        //     }
        // }

        function scrollToTop() {
            window.scrollTo(0, 0)
        }
        onMounted(() => {
            // getPosts();
            // getAds()
            scrollToTop()
        });

        onUnmounted(() => {
            postsService.clearPosts();
            profilesService.clearProfile();
            profilesService.clearProfiles()
        })
        return {
            // posts: computed(() => AppState.posts),
            page: computed(() => AppState.postsPage),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),
            // ads: computed(() => AppState.ads),
            // account: computed(() => AppState.account),
            // profile: computed(() => AppState.profile),
            // editable,


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
            },
            // async searchPostsAndProfiles() {
            //   try {
            //     let searchData = editable.value
            //     await postsService.searchPosts(searchData)
            //     await profilesService.searchProfiles(searchData)
            //     router.push({ name: 'Search', params: { searchTerm: searchData.query } })
            //   } catch (error) {
            //     Pop.error(error, '[search posts]')
            //   }
            // }
        };
    },
    // components: { PostCard, AdCard }
}
</script>


<style lang="scss" scoped></style>