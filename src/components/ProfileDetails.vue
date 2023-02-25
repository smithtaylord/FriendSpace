<template>
    <div class="component">
        <div class="col-12">
            <div>
                <img :src="profile.picture" alt="">
                <h1>{{ profile.name }} </h1>
                <h3 v-if="account.id == profile.id"><i @click="goToAccountPage" class="mdi mdi-lead-pencil selectable"></i>
                    Manage
                    Account</h3>
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


<style lang="scss" scoped></style>