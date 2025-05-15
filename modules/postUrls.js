class PostUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getPosts() {
        return `${this.baseUrl}/posts`;
    }

    getPostById(id) {
        return `${this.baseUrl}/posts/${id}`;
    }

    getPostsByTitle(title){
        return `${this.baseUrl}/posts?title=${title}`
    }
    createPost() {
        return `${this.baseUrl}/posts`;
    }

    removePostById(id) {
        return `${this.baseUrl}/posts/${id}`;
    }

    updatePostById(id) {
        return `${this.baseUrl}/posts/${id}`;
    }
}
export const postUrls = new PostUrls();