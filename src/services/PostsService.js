import { AppState } from "../AppState.js";
import { logger }  from "../utils/Logger.js";
import { api }  from "./AxiosService.js";

class PostsService {
    async getAll() {
        const res = await api.get('api/posts?page='+ AppState.page)
        // logger.log(res.data)
        AppState.posts = res.data.posts
        logger.log(AppState.activeProfile)
        AppState.totalPages = res.data.totalPages
        logger.log(AppState.totalPages)
        
    }
    async getByQuery(params){
        const res = await api.get('api/posts', {params})
        // logger.log(res.data)
        AppState.searchResults = res.data.posts
    }
    async createPost(newPost){
        const res = await api.post('api/posts', newPost)
        logger.log(res.data)
        AppState.posts.push(res.data)
    }
    async likePost(id){
        const res = await api.post(`api/posts/${id}/like`)
        if(res.data.likes = AppState.account.id) {
            res.data.likes.filter(AppState.account.id)
        } else{
            res.data.likes.push(AppState.account.id)
            
        }
        

    }
    async removePost(id){
        await api.delete('api/posts/' + id)
        
    }
}


export const postsService = new PostsService()