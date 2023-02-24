<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Posts Section -->
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
      <!-- ADS SECTION -->
      <div class="col-3">
        <div v-for="ad in ads">
          <AdCard :ad="ad"/>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import PostCard from '../components/PostCard.vue';
import { logger } from '../utils/Logger.js';
import { adsService } from '../services/AdsService.js';
import AdCard from '../components/AdCard.vue';

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
    onMounted(() => {
      getPosts();
      getAds()
    });
    return {
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.postsPage),
      older: computed(() => AppState.olderPage),
      newer: computed(() => AppState.newerPage),
      ads: computed(() => AppState.ads),

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
