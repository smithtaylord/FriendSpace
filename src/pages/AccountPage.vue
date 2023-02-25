<template>
  <div class="about text-center container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <form @submit.prevent="editAccount">

          <div class="form-floating mb-3">
            <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.picture" type="url" class="form-control" id="picture" placeholder="picture">
            <label for="floatingInput">Picture</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.coverImg" type="url" class="form-control" id="coverimg" placeholder="cover image">
            <label for="floatingInput">Cover Image</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.github" type="url" class="form-control" id="github" placeholder="GitHub">
            <label for="floatingInput"><i class="mdi mdi-github"></i> GitHub</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin" placeholder="LinkedIn">
            <label for="floatingInput"><i class="mdi mdi-linkedin"></i> LinkedIn</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editable.class" type="text" class="form-control" id="class" placeholder="Class">
            <label for="floatingInput">Class</label>
          </div>
          <div class="form-check">
            <input v-model="editable.graduated" :checked="editable.graduated" class="form-check-input" type="checkbox"
              value="" id="graduated">
            <label class="form-check-label text-start" for="flexCheckDefault">
              <i class="mdi mdi-school"></i> Graduated
            </label>
          </div>

          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
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
</style>

