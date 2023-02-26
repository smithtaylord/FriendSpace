<template>
    <div class="component">
        <div class="p-2">
            <form @submit.prevent="handleSubmit" class="">
                <div class="form-floating custom-border2 mb-3">
                    <textarea v-model="editable.body" class="form-control" placeholder="Leave a comment here" id="body"
                        style="height: 100px"></textarea>
                    <label for="body">Share something!</label>
                </div>
                <div class="mb-3 custom-border2 form-floating">
                    <input v-model="editable.imgUrl" type="imgUrl" class="form-control" id="imgUrl"
                        aria-describedby="emailHelp">
                    <label for="imgUrl" class="form-label">Picture</label>
                </div>
                <div class="text-end ">
                    <button type="submit" class="btn bg-secondary text-light custom-border2" title="create post"><i
                            class="mdi mdi-send"></i></button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { ref, watchEffect, computed } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        // ASK if there is a better way to write this?
        watchEffect(() => {
            if (AppState.activePost != null) {
                editable.value = { ...AppState.activePost }
            } else {
                editable.value = {}
            }
        })
        return {
            editable,
            async handleSubmit() {
                try {

                    // How did we do the turnary function in class????
                    const formData = editable.value
                    if (editable.value.id) {
                        await postsService.editPost(formData)
                    } else {
                        await postsService.createPost(formData)
                    }
                    editable.value = {}
                } catch (error) {
                    Pop.error(error, '[create post]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>