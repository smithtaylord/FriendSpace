export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likes = data.likes
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
    }
}