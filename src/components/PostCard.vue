<template>
    <div class="PostCard text-dark p-2">
        <div class="row">
            <div class="col-10">
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
                            <p class="text-secondary">
                                {{ post.createdAt }}
                            </p>
                        </div>
                    </div>
                    <div v-if="post.creatorId == account.id" class="col-1 text-end">
                        <div class="dropdown my-2">
                            <div type="button" class="selectable" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="text-primary mdi mdi-dots-horizontal fs-1 "></i>
                            </div>
                            <div class="dropdown-menu text-center fs-1">
                                <div class="list-group">
                                    <i @click="setPostActive(post)" type="button" class="mdi mdi-lead-pencil my-2"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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
            <div class="col-8 m-auto mt-3">
                <img v-if="post.imgUrl" :src="post.imgUrl" alt="" class="post-picture img-fluid">
            </div>
            <div v-if="account.id" class="col-12 text-end mt-3">
                <i @click="toggleLikes(post)" type="button"
                    :class="`text-success mdi fs-3 ${(post.likeIds.includes(account.id)) ? 'mdi-heart' : 'mdi-heart-outline'}`"></i>
                <p v-if="post.likes.length > 0">{{ post.likes.length }}</p>
            </div>
        </div>

    </div>

    <Modal>

    </Modal>
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
            },

            setPostActive(post) {
                try {
                    postsService.setPostActive(post)
                } catch (error) {
                    Pop.error(error, '[setting post active]')
                }
            },

            async toggleLikes(post) {
                try {
                    const postId = post.id
                    await postsService.toggleLikes(postId)
                } catch (error) {
                    Pop.error(error, '[toggle likes]')
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