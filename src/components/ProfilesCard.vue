<template>
    <div class="component">
        <div class="d-flex align-items-center p-3 mb-3">
            <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
                <img class="profile-picture rounded-circle ms-2" :src="profile.picture" :alt="profile.name"
                    v-on:error="onImageError">
            </router-link>
            <div class="ms-4">
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
        return {
            onImageError() {
                event.target.src = 'https://cdn-icons-png.flaticon.com/512/1147/1147254.png'
            }
        }
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