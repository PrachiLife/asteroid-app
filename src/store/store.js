import { createStore } from 'vuex';
import { fetchStatDetails } from '../api/stat';

export default createStore({
    state: {
        statDetails:[]
    },
    getters: {
        getStatDetails(state) {
            return state.statDetails;
        }
    },
    mutations:{
        async GET_STAT_DETAILS(state,payload) {
            const statResponse = await fetchStatDetails(payload);
                state.statDetails = Object.entries(statResponse.near_earth_objects).reduce((acc, [key, details]) => {
                details.forEach(detail => acc.push({ 
                    ...detail,
                    date:key,
                    asteroid_estimated_diameter: detail.estimated_diameter.kilometers,
                    asteroid_miss_distance: detail.close_approach_data[0].miss_distance.kilometers,
                    asteroid_relative_velocity: detail.close_approach_data[0].relative_velocity.kilometers_per_hour,
                }));
                return acc;
              }, []);
        }
    },
    actions: {
        getStatDetails({commit}, payload) {
            commit('GET_STAT_DETAILS', payload);
        }
    }
})