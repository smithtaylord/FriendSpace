<template>
  <button class="list-group-item dropdown-item list-group-item-action p-3 ms-3 my-5 text-secondary custom-border2 fs-3 "
    @click="login" v-if="!user.isAuthenticated">
    <i class="mdi mdi-login me-4"></i> Login to your profile
  </button>


  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-12 text-dark custom-border2 mt-4 ms-md-3 p-md-5">
        <div v-if="account.picture || user.picture">
          <div class="text-center pb-4 d-none d-md-block">
            <img :src="account.picture || user.picture" alt="account photo"
              class="rounded-circle profile-picture img-fluid" />
          </div>
          <h5 class="text-primary py-2 d-none d-md-block">{{ account.class }}</h5>
          <div class="d-flex justify-content-between align-items-baseline gap-3 pb-2 d-none d-md-block">
            <div class="d-flex align-items-baseline gap-3 pb-2">
              <h2 class="text-primary"><b>{{ account.name }}</b></h2>
              <i v-if="account.graduated" class="mdi mdi-school fs-1"></i>
            </div>
            <div class="d-flex align-items-baseline gap-3 pb-2">
              <a v-if="account.github" :href="account.github" target="_blank"><i
                  class="mdi mdi-github fs-1 text-secondary"></i></a>
              <a v-if="account.linkedin" :href="account.linkedin" target="_blank"><i
                  class="mdi mdi-linkedin fs-1 text-secondary"></i></a>
            </div>
          </div>
        </div>
        <div class="list-group mt-md-4">
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item dropdown-item list-group-item-action py-2 my-2 text-primary custom-border2 fs-5">
              <i class="mdi mdi-account-edit me-4"></i> Manage Account
            </div>
          </router-link>
          <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account.id } }">
            <div class="list-group-item dropdown-item list-group-item-action py-2 my-2 text-primary custom-border2 fs-5">
              <i class="mdi mdi-account me-4"></i> Profile
            </div>
          </router-link>
          <div
            class="list-group-item dropdown-item list-group-item-action text-danger selectable py-2 my-2 custom-border2 fs-5"
            @click="logout">
            <i class="mdi mdi-logout me-4"></i>
            logout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { logger } from '../utils/Logger.js'
export default {
  setup() {
    const router = useRouter()


    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
  width: 20vh;
}
</style>
