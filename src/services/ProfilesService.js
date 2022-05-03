import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { api } from './AxiosService.js';


class ProfilesService {
    async getProfile(id){
        const res = await api.get('api/profiles/'+id)
        
        AppState.activeProfile = res.data
    }
    async getByQuery(value){
        const res = await api.get('api/profiles?query='+value)
        logger.log(res.data)
        AppState.profileSearchResults.push(res.data)
    }
    async setActiveProfile(id){
        AppState.activeProfile = id
    }
}


export  const profilesService = new ProfilesService()