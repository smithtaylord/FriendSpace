<template>
    <div v-if="profile" class="ProfilePage container-fluid">
        <!-- Profile Section -->
        <div class="row">
            <ProfileDetails />
        </div>
        <!-- Create Post Section -->
        <div class="row">
            <div class="col-12">
                <PostForm />
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <div v-for="p in posts" class="border border-dark rounded my-3 p-4">
                    <PostCard :post="p" />
                </div>
                <div class="d-flex justify-content-around mb-3">
                    <button @click="changePage('newer')" class="btn btn-secondary posts-button" :disabled="newer == null">
                        Newer
                    </button>
                    <div>
                        <p>
                            {{ page }}
                        </p>
                    </div>
                    <button @click="changePage('older')" class="btn btn-secondary posts-button" :disabled="older == null">
                        Older
                    </button>
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
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute();
        const profileId = route.params.profileId
        async function getProfileById() {
            try {
                await profilesService.getProfileById(profileId)
            } catch (error) {
                Pop.error(error, '[getting profile by id]')
            }
        }
        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(profileId)
            } catch (error) {
                Pop.error(error, '[getting posts by creator id]')
            }
        }

        onMounted(() => {
            getProfileById();
            getPostsByCreatorId();

        })
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.profile),
            ads: computed(() => AppState.ads),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),
            page: computed(() => AppState.postsPage),

            async changePage(direction) {

                try {
                    if (direction == 'older') {
                        logger.log('older')
                        await postsService.changePage(AppState.olderPage)
                    } if (direction == 'newer') {
                        logger.log('newer')
                        await postsService.changePage(AppState.newerPage)
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