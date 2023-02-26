<template>
  <div v-if="posts.length" class="container-fluid">

    <div class="row">
      <!-- Posts Section -->
      <div class="col-12 d-md-none">
        <Login />
      </div>
      <div class="col-12 px-md-5 py-2 my-2 ">
        <div v-if="account.id" class=" col-12 my-3 custom-border rounded p-3 pt-4 d-none d-md-block">
          <PostForm />
        </div>
        <div>
          <PageButtons />
        </div>
        <div v-for="p in posts" class="col-12 custom-border rounded my-3 pt-4">
          <PostCard :post="p" />
        </div>
        <div>
          <PageButtons />
        </div>
      </div>

    </div>

  </div>
  <div v-else>
    <Load />
  </div>
</template>
<!-- TODO I removed ads and my buttons from this page to clean it up, but was curious as to why I needed all of the functions that go with my buttons and ads on this page, I tested it with ads and they stopped loading, is this correct? -->
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


export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error, "[getting posts]");
      }
    }
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error, '[getting ads]')
      }
    }
    // TODO is this the best way to go to the top of the page when you move pages?
    function scrollToTop() {
      window.scrollTo(0, 0)
    }
    onMounted(() => {
      getPosts();
      getAds()
      scrollToTop()
    });
    onUnmounted(() => {
      postsService.clearPosts();
      profilesService.clearProfile();
      profilesService.clearProfiles()
    })
    return {
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.postsPage),
      older: computed(() => AppState.olderPage),
      newer: computed(() => AppState.newerPage),
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),

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
  components: { PostCard, AdCard }
}
</script>

<style scoped lang="scss">
.posts-button {
  width: 10vw;
}
</style>
