import { AppState } from "../AppState.js";
import { api }  from "./AxiosService.js";

class DadsService{
async getAds() {
    const res = await api.get('api/ads')
    AppState.dads = res.data
}
}


export const dadsService = new DadsService()