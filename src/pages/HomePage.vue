<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Posts Section -->
      <div class="col-9">
        <div v-for="p in posts" class="border border-dark rounded my-3 p-4">
          <div class="row">
            <div class="col-12">
              <div class="d-flex gap-5">
                <img :src="p.creator.picture" alt="" class="rounded-circle profile-picture">
                <div>
                  <h4>
                    {{ p.creator.name }}
                  </h4>
                  <p>
                    {{ p.createdAt }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              {{ p.body }}
            </div>
            <div class="col-12 mt-3">
              <img :src="p.imgUrl" alt="" class="post-picture img-fluid">
            </div>
            <div class="col-12 text-end mt-3">
              <i class="mdi mdi-heart-outline"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- ADS SECTION -->
      <div class="col-3">

      </div>

    </div>

  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error, '[getting posts]')
      }
    }
    onMounted(() => {
      getPosts();
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.profile-picture {
  height: 5vh;
  width: 5vh;
  object-fit: cover;
}

.post-picture {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
</style>
