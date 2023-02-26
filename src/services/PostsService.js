import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
// TODO HOW DO I MAKE SOME OF THESE FUNCTIONS MORE REUSABLE
class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.postsPage = res.data.page
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer
    }

    async getPostsByCreatorId(profileId) {
        const res = await api.get('api/posts', { params: { creatorId: profileId } })
        logger.log(res.data, '[getting posts by creator id]')
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.postsPage = res.data.page
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer
    }

    async searchPosts(searchData) {
        logger.log(searchData)
        const res = await api.get('api/posts', { params: { query: searchData } })
        logger.log(res.data, '[getting posts by query')
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.postsPage = res.data.page
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer
    }

    async changePage(direction) {
        const res = await api.get(direction)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.postsPage = res.data.page
        AppState.olderPage = res.data.older
        AppState.newerPage = res.data.newer
    }

    async createPost(formData) {
        const res = await api.post('api/posts', formData)
        logger.log(res.data, '[creating post]')
        AppState.posts.unshift(new Post(res.data))
    }
    async toggleLikes(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log('[toggle like]', res.data)
        let postIndex = AppState.posts.findIndex(p => p.id == postId)
        AppState.posts.splice(postIndex, 1, new Post(res.data))
    }

    async editPost(formData) {
        const postId = formData.id
        const res = await api.put('/api/posts/' + postId, { body: formData.body, imgUrl: formData.imgUrl })
        logger.log('[edit post]', res.data)
        let postIndex = AppState.posts.findIndex(p => p.id == postId)
        AppState.posts.splice(postIndex, 1, new Post(res.data))
        AppState.activePost = null
    }


    async deletePost(postId) {
        const res = await api.delete('api/posts/' + postId)
        logger.log(res.data, '[deleted post]')
        let postIndex = AppState.posts.findIndex(p => p.id == postId)
        AppState.posts.splice(postIndex, 1)
    }

    setPostActive(post) {
        AppState.activePost = post
    }

    clearPosts() {
        AppState.posts = []
    }




}

export const postsService = new PostsService()