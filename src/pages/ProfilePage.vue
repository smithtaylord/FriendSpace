<template>
    <div v-if="profile" class="ProfilePage container-fluid text-dark">
        <!-- Profile Section -->

        <div class="row">
            <div class="col-12">
                <ProfileDetails />
            </div>
        </div>

        <!-- Create Post Section -->
        <div class="row">
            <div class="col-12">
                <div v-if="account.id == profile.id" class="col-12 my-3 custom-border rounded p-3 pt-4">
                    <PostForm />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-for="p in posts" class="custom-border rounded my-3 p-4">
                    <PostCard :post="p" />
                </div>
                <div>
                    <PageButtons />
                </div>
            </div>

            <!-- <div class="col-3">
                <div v-for="ad in ads">
                    <AdCard :ad="ad" />
                </div>
            </div> -->
        </div>

    </div>
    <div v-else>
        <Load />
    </div>
</template>


<script>
import { onMounted, computed, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';



export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
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
            getProfileById();
            getPostsByCreatorId();
            getAds()
            scrollToTop()
            // TODO Is this the best way to do this? This reloads the page if the url changes? Issues with changing to my profile if on another profile
            watch(
                () => route.params.profileId, (newId, oldId) => {
                    if (newId != oldId) {
                        router.go()
                    }
                })
        })
        onUnmounted(() => {
            postsService.clearPosts();
            profilesService.clearProfile();
            profilesService.clearProfiles()
        })
        return {
            posts: computed(() => AppState.posts),
            profile: computed(() => AppState.profile),
            ads: computed(() => AppState.ads),
            older: computed(() => AppState.olderPage),
            newer: computed(() => AppState.newerPage),
            page: computed(() => AppState.postsPage),
            account: computed(() => AppState.account),

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