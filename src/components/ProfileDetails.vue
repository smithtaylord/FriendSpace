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


<style lang="scss" scoped></style>