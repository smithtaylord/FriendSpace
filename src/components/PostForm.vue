<template>
    <div class="component">
        <div class="p-2">
            <form @submit.prevent="handleSubmit" class="">
                <div class="form-floating custom-border2 mb-3">
                    <textarea v-model="editable.body" class="form-control" placeholder="Leave a comment here" id="body"
                        style="height: 100px" max-length="1000" required></textarea>
                    <label for="body">Share something!</label>
                </div>
                <div class="mb-3 custom-border2 form-floating">
                    <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl"
                        aria-describedby="image-url" maxlength="5000">
                    <label for="imgUrl" class="form-label" placeholder="picture">Picture</label>
                </div>
                <div class="text-end ">
                    <!-- TODO Is this the best way to do thi? I noticed that if you opened the modal to edit all your info would populate, but if you did not actually edit your information would still show up in the form at the top of the page? -->
                    <button data-bs-dismiss="modal" aria-label="Close" type="submit"
                        class="btn bg-secondary text-light custom-border2" title="create post"><i
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
        //TODO ASK if there is a better way to write this?
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