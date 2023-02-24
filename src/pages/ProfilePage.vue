<template>
    <div class="component">


    </div>
</template>


<script>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService.js';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute();
        const profileId = route.params.profileId
        async function getProfileById() {
            try {
                await profilesService.getProfileById(profileId)
            } catch (error) {
                Pop.error(error, '[getting profile by id]')
            }
        }
        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(profileId)
            } catch (error) {
                Pop.error(error, '[getting posts by creator id]')
            }
        }

        onMounted(() => {
            getProfileById();
            getPostsByCreatorId()
        })
        return {
            profileId
        }
    }
}
</script>


<style lang="scss" scoped></style>