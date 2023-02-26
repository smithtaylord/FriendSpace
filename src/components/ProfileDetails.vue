<template>
    <div class="component text-dark">
        <div class="col-12">
            <div class="custom-border rounded mt-4">
                <div>
                    <img class="img-fluid cover-photo rounded" :src="profile.coverImg" alt="">
                </div>
                <div class="d-flex justify-content-between align-items-start px-3">
                    <div>
                        <img class="text-secondary rounded-circle profile-picture" :src="profile.picture" alt="">
                        <i v-if="profile.graduated" class="mdi mdi-school fs-1"></i>
                    </div>
                    <div>
                        <a v-if="profile.github" :href="profile.github" target="_blank"><i
                                class="text-secondary mdi mdi-github fs-1 px-3"></i></a>
                        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i
                                class="text-secondary mdi mdi-linkedin fs-1 px-3"></i></a>
                    </div>
                </div>
                <div class="move-up px-4">
                    <h5 class="ps-2 pb-2">{{ profile.class }}</h5>
                    <h2 class="ps-2">{{ profile.name }}</h2>
                    <p class="ps-2 move-down-a-little">{{ profile.bio }}</p>
                    <h6 class="text-end move-down" v-if="account.id == profile.id"><i @click="goToAccountPage"
                            class="mdi mdi-lead-pencil selectable text-secondary fs-3"></i>
                        Manage
                        Account</h6>
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

.move-up {
    transform: translateY(-6vh)
}

.move-down {
    transform: translateY(3vh)
}

.move-down-a-little {
    transform: translateY(1vh)
}

.cover-photo {
    height: 30vh;
    width: 100%;
    object-fit: cover;
}
</style>