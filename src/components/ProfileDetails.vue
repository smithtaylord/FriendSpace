<template>
    <div class="component">
        <div class="col-12">
            <div>
                <img :src="profile.picture" alt="">
                <h1>{{ profile.name }}</h1>
            </div>
        </div>
    </div>
</template>


<script>
// import { Profile } from '../models/Profile.js';

import { computed } from 'vue';
import { AppState } from '../AppState.js';

// TODO PULL THIS IN FROM THE APPSTATE!
export default {

    setup() {
        return {
            profile: computed(() => AppState.profile)
        }
    }
}
</script>


<style lang="scss" scoped></style>