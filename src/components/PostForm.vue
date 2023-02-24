<template>
    <div class="component">
        <form @submit.prevent="createPost">
            <div class="form-floating">
                <textarea v-model="editable.body" class="form-control" placeholder="Leave a comment here" id="body"
                    style="height: 100px"></textarea>
                <label for="body">Body</label>
            </div>
            <div class="mb-3">
                <label for="imgUrl" class="form-label">Picture</label>
                <input v-model="editable.imgUrl" type="imgUrl" class="form-control" id="imgUrl"
                    aria-describedby="emailHelp">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async createPost() {
                try {
                    const formData = editable.value
                    await postsService.createPost(formData)

                } catch (error) {
                    Pop.error(error, '[create post]')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>