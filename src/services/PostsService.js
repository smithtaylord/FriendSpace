import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

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
        const res = await api.get('api/posts', { params: { query: searchData.query } })
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

    async deletePost(postId) {
        const res = await api.delete('api/posts/' + postId)
        logger.log(res.data, '[deleted post]')
        let postIndex = AppState.posts.findIndex(p => p.id == postId)
        AppState.posts.splice(postIndex, 1)
    }


}

export const postsService = new PostsService()