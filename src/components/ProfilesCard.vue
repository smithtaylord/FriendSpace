<template>
    <div class="component">
        <div class="d-flex">
            <img class="profile-picture rounded-circle" :src="profile.picture" alt="">
            <div>
                <h6>{{ profile.class }}</h6>
                <h3>{{ profile.name }}</h3>
            </div>
        </div>

    </div>
</template>


<script>
import { Profile } from '../models/Profile.js';

export default {
    props: {
        profile: {
            type: Profile,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 5vh;
    width: 5vh;
    object-fit: cover;
}
</style>