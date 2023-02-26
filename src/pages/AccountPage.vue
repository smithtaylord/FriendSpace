<template>
  <div class="about text-center container mt-4 custom-border2">
    <div class="row">
      <div class="col-12 rounded-top"
        :style="{ backgroundImage: 'url(' + account.coverImg + ')', backgroundSize: 'cover' }">
        <div class="shadow-card mt-2 rounded">
          <h1>Welcome, {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container custom-border"> -->
  <!-- <div class="row">
    <div class="col-md-8 m-auto "> -->
  <div class="p-3 custom-border2">
    <form @submit.prevent="editAccount">
      <div class="row">
        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="name">
            <label for="floatingInput">Name</label>
          </div>
        </div>

        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="editable.picture" type="url" class="form-control" id="picture" placeholder="picture">
            <label for="floatingInput">Picture</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-floating mb-3 d-flex gap-2">
            <input v-model="editable.class" type="text" class="form-control" id="class" placeholder="Class">
            <label for="floatingInput">Class</label>
            <div class="form-check">
              <label class="form-check-label text-center" for="flexCheckDefault">
                <i class="mdi mdi-school"></i> Graduated
                <input v-model="editable.graduated" :checked="editable.graduated" class="form-check-input" type="checkbox"
                  value="" id="graduated">
              </label>
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="editable.coverImg" type="url" class="form-control" id="coverimg" placeholder="cover image">
            <label for="floatingInput">Cover Image</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="editable.github" type="url" class="form-control" id="github" placeholder="GitHub">
            <label for="floatingInput"><i class="mdi mdi-github"></i> GitHub</label>
          </div>
        </div>

        <div class="col-6">
          <div class="form-floating mb-3">
            <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin" placeholder="LinkedIn">
            <label for="floatingInput"><i class="mdi mdi-linkedin"></i> LinkedIn</label>
          </div>
        </div>
      </div>



      <div class="form-floating mb-3">
        <textarea v-model="editable.bio" type="text" class="form-control bio" id="bio" placeholder="bio"></textarea>
        <label for="floatingInput">Bio</label>
      </div>

      <button type="submit" class="btn bg-secondary">Save Changes</button>
    </form>
  </div>
  <!-- </div>
  </div> -->
  <!-- </div> -->
</template>

<script>
import { computed, ref, watchEffect, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { adsService } from '../services/AdsService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error, '[getting ads]')
      }
    }
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })

    onMounted(() => {
      getAds()
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          const formData = editable.value
          await accountService.editAccount(formData)
        } catch (error) {
          Pop.error(error, '[edit account]')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.bio {
  height: 15vh;
}

.shadow-card {
  background-color: rgba(0, 0, 0, 0.322);
  color: #F5F5F5;
}
</style>

