import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getAll() {
    const res = await api.get('api/posts?page=' + AppState.page)
    logger.log('get all posts', res.data)
    AppState.posts = res.data.posts
    logger.log(AppState.activeProfile)
    AppState.totalPages = res.data.totalPages
    logger.log(AppState.totalPages)
  }

  async searchPosts(query) {
    const res = await api.get(`api/posts?query=${query.body}`)
    AppState.searchResults = res.data
    // NOTE implement pagination
    logger.log('search res', res.data)
  }

  async getByQuery(params) {
    // NOTE get posts by profile id
    const res = await api.get('api/posts?page=' + AppState.page, { params })
    logger.log('profile posts', res.data)
    AppState.searchResults = res.data.posts
    AppState.totalPages = res.data.totalPages
  }
  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log(res.data)
    AppState.posts.push(res.data)
  }
  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    if (res.data.likes = AppState.account.id) {
      res.data.likes.filter(AppState.account.id)
    } else {
      res.data.likes.push(AppState.account.id)

    }


  }
  async removePost(id) {
    await api.delete('api/posts/' + id)

  }
}


export const postsService = new PostsService()
