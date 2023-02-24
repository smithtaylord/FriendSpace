<template>
    <div class="PostCard">
        <div class="row">
            <div class="col-12">
                <div class="d-flex gap-5">
                    <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                        <img :src="post.creator.picture" alt="" class="rounded-circle profile-picture">
                    </router-link>
                    <div>
                        <h4>
                            {{ post.creator.name }}
                        </h4>
                        <p>
                            {{ post.createdAt }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3">
                {{ post.body }}
            </div>
            <div class="col-12 mt-3">
                <img :src="post.imgUrl" alt="" class="post-picture img-fluid">
            </div>
            <div class="col-12 text-end mt-3">
                <i class="mdi mdi-heart-outline"></i>
            </div>
        </div>

    </div>
</template>


<script>
import { Post } from '../models/Post.js';

export default {
    props: {
        post: {
            type: Post,
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

.post-picture {
    height: 20vh;
    width: 100%;
    object-fit: cover;
}
</style>