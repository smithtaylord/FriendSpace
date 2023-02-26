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

<!-- TODO does it make sense that I used a component for my buttons? -->
<script>
import { onMounted, computed, ref, onUnmounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { profilesService } from '../services/ProfilesService.js';


export default {
    setup() {
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
            page: computed(() => AppState.postsPage),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),

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
        };
    },
}
</script>


<style lang="scss" scoped></style>