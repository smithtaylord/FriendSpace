<template>
  <nav class="d-flex justify-content-between align-items-center bg-primary px-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center text-success">
        <h3><i class="mdi mdi-crowd"></i>FriendSpace </h3>
      </div>
    </router-link>
    <div class="collapse navbar-collapse" id="navbarText">

      <!-- LOGIN COMPONENT HERE -->
      <!-- <Login /> -->
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mt-2 add-width">
          <form @submit.prevent="searchPostsAndProfiles">
            <div class="input-group mb-3">
              <input v-model="editable.query" type="text" class="form-control" placeholder="search posts and profiles..."
                aria-label="Recipient's username" aria-describedby="button-addon2">
              <button class="btn bg-info text-success" type="submit" id="button-addon2"><i
                  class="mdi mdi-magnify"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postsService } from '../services/PostsService.js'
import { profilesService } from '../services/ProfilesService.js'
import Pop from '../utils/Pop.js'
import Login from './Login.vue'
export default {
  setup() {
    const router = useRouter()
    const editable = ref({
      query: ''
    })
    return {
      editable,
      // TODO THIS FUNCTION IS DIFFERENT THAN THE ONE ON THE SEARCH PAGE, is there another way to make sure this page loads on refresh?
      async searchPostsAndProfiles() {
        try {
          let searchData = editable.value.query
          await postsService.searchPosts(searchData)
          await profilesService.searchProfiles(searchData)
          router.push({ name: 'Search', params: { searchTerm: searchData } })
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[search posts]')
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.add-width {
  width: 30vw;
}
</style>
