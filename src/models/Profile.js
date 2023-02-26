export class Profile {
    constructor(data) {
        this.id = data._id
        this.bio = data.bio
        this.class = data.class
        this.coverImg = data.coverImg
        this.github = data.github
        this.graduated = data.graduated
        this.linkedin = data.linkedin
        this.name = data.name
        this.picture = data.picture

    }
}

// TODO Is there anything wrong with doing this this way rather than how we did it in class? I am not sure I fully understand why we did it that way?