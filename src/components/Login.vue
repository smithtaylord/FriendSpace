<template>
  <button class="btn selectable text-primarytext-uppercase my-2 my-lg-0" @click="login" v-if="!user.isAuthenticated">
    Login
  </button>


  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-12 text-dark">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo"
            class="rounded-circle profile-picture img-fluid" />
          <div class="d-flex gap-3">
            <h4>{{ account.name }}</h4>
            <i v-if="account.graduated" class="mdi mdi-school fs-4"></i>
          </div>
        </div>
        <div class="d-flex align-items-baseline gap-1">
          <h5> {{ account.class }}</h5>
          <a v-if="account.github" :href="account.github" target="_blank"><i
              class="mdi mdi-github fs-5 text-secondary"></i></a>
          <a v-if="account.linkedin" :href="account.linkedin" target="_blank"><i
              class="mdi mdi-linkedin fs-5 text-secondary"></i></a>
        </div>
        <div class="list-group">
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item dropdown-item list-group-item-action">
              Manage Account
            </div>
          </router-link>
          <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account.id } }">
            <div class="list-group-item dropdown-item list-group-item-action">
              Profile
            </div>
          </router-link>
          <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
            <i class="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 10vh;
  width: 10vh;
}
</style>
