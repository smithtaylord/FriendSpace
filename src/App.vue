<template>
  <div>
    <header class="sticky-top">
      <Navbar />
    </header>
  </div>
  <main class="container-fluid">
    <div class="row">
      <div class="col-3">
        <Login />
      </div>
      <div class="col-6">
        <router-view />
      </div>
      <div class="col-3">
        <AdCard />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
