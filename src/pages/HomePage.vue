<template>
  <div class="container-fluid">
    <!-- <div class="row">
      <div class="col-md-6 offset-md-6">
        <form @submit.prevent="searchPostsAndProfiles">
          <div class="input-group mb-3">
            <input v-model="editable.query" type="text" class="form-control" placeholder="search...."
              aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-secondary" type="submit" id="button-addon2"><i class="mdi mdi-magnify"></i></button>
          </div>
        </form>
      </div>
    </div> -->
    <div class="row">
      <!-- Posts Section -->
      <div class="col-9 px-5 py-2 my-2">
        <div>
          <PostForm />
        </div>
        <div v-for="p in posts" class="custom-border rounded my-3 p-4">
          <PostCard :post="p" />
        </div>
        <div class="d-flex justify-content-around mb-3">
          <button @click="changePage('newer')" class="btn bg-primary text-success posts-button" :disabled="newer == null">
            Newer
          </button>
          <div>
            <p>
              {{ page }}
            </p>
          </div>
          <button @click="changePage('older')" class="btn bg-primary text-success posts-button" :disabled="older == null">
            Older
          </button>
        </div>
      </div>
      <!-- ADS SECTION -->
      <div class="col-3">
        <div v-for="ad in ads">
          <AdCard :ad="ad" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
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
      // editable,


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
  components: { PostCard, AdCard }
}
</script>

<style scoped lang="scss">
.posts-button {
  width: 10vw;
}
</style>
