<template>
    <div class="component">
        <div class="col-12">
            <div class="">
                <div>
                    <img class="img-fluid cover-photo" :src="profile.coverImg" alt="">
                </div>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div>
                        <img class="rounded-circle profile-picture" :src="profile.picture" alt="">
                        <i v-if="profile.graduated" class="mdi mdi-school fs-1"></i>
                    </div>
                    <div>
                        <a v-if="profile.github" :href="profile.github" target="_blank"><i
                                class="mdi mdi-github fs-1 px-3"></i></a>
                        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i
                                class="mdi mdi-linkedin fs-1 px-3"></i></a>
                    </div>
                </div>
                <div>
                    <h5>{{ profile.class }}</h5>
                    <h2>{{ profile.name }}</h2>
                    <h3 v-if="account.id == profile.id"><i @click="goToAccountPage"
                            class="mdi mdi-lead-pencil selectable"></i>
                        Manage
                        Account</h3>
                    <p>{{ profile.bio }}</p>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
// import { Profile } from '../models/Profile.js';

import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';

// TODO PULL THIS IN FROM THE APPSTATE!
export default {

    setup() {
        const router = useRouter()
        return {
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),
            goToAccountPage() {
                router.push({ name: 'Account' })
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 20vh;
    width: 20vh;
    transform: translateY(-10vh);

}

.cover-photo {
    height: 30vh;
    width: 100%;
    object-fit: cover;
}
</style>