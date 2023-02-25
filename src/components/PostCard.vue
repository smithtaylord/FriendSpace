<template>
    <div class="PostCard">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-1">
                        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                            <img :src="post.creator.picture" alt="" class="rounded-circle profile-picture">
                        </router-link>
                    </div>
                    <div class="col-10">
                        <div>
                            <h4>
                                {{ post.creator.name }}
                            </h4>
                            <p>
                                {{ post.createdAt }}
                            </p>
                        </div>
                    </div>
                    <div v-if="post.creatorId == account.id" class="col-1 text-end">
                        <div class="dropdown my-2">
                            <div type="button" class="selectable" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-dots-horizontal fs-1 "></i>
                            </div>
                            <div class="dropdown-menu text-center fs-1">
                                <div class="list-group">
                                    <i type="button" class="mdi mdi-lead-pencil my-2"></i>
                                </div>
                                <div class="list-group">
                                    <i @click="deletePost(post)" type="button"
                                        class="mdi mdi-trash-can-outline text-danger my-2"></i>
                                </div>
                            </div>

                        </div>
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
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        post: {
            type: Post,
            required: true
        }
    },

    setup() {
        return {
            account: computed(() => AppState.account),
            async deletePost(post) {
                try {
                    if (await Pop.confirm('Are you sure you want to delete your post?')) {
                        await postsService.deletePost(post.id)
                    }
                } catch (error) {
                    Pop.error(error, '[delete post]')
                }
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

.post-picture {
    height: 30vh;
    width: 100%;
    object-fit: cover;
}
</style>