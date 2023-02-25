import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
    async getProfileById(profileId) {
        const res = await api.get('api/profiles/' + profileId)
        logger.log('getting profile', res.data)
        AppState.profile = new Profile(res.data)
    }

    async searchProfiles(searchData) {
        const res = await api.get('api/profiles', { params: { query: searchData.query } })
        logger.log(res.data, '[getting profiles by query')
        AppState.profiles = res.data.map(p => new Profile(p))
    }
}

export const profilesService = new ProfilesService()