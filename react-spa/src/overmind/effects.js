import axios from 'axios';

const cache = {};

export const api = {
    getPlayerProfile(state) {
        axios.get('http://raegae.maarten.ch:3000/api/player/getPlayerProfile', { withCredentials: true })
            .then( (response) => {
                state.player.id = response.data.player.id;
                if(response.data.player.name) {
                    state.player.name = response.data.player.name
                }
                if(response.data.player.class) {
                    state.player.class = response.data.player.class
                }
                if(response.data.player.race) {
                    state.player.race = response.data.player.race
                }
                if(response.data.player.talent) {
                    state.player.talent = response.data.player.talent
                }
                if(response.data.player.aq_attendance) {
                    state.player.aq_attendance = response.data.player.aq_attendance
                }
                if(response.data.player.naxx_attendance) {
                    state.player.naxx_attendance = response.data.player.naxx_attendance
                }
                if(response.data.player.role) {
                    state.player.role = response.data.player.role
                }
                state.player.loaded = true
            }).catch(error => {
                console.log(error);
            })
    },
    async sendWishlist(state) {
        const value = {
            bracket1:
                [state.wishlist['bracket-1']['slot-1'].item, state.wishlist['bracket-1']['slot-2'].item,
                state.wishlist['bracket-1']['slot-3'].item, state.wishlist['bracket-1']['slot-4'].item,
                state.wishlist['bracket-1']['slot-5'].item, state.wishlist['bracket-1']['slot-6'].item,],
            bracket2:
                [state.wishlist['bracket-2']['slot-1'].item, state.wishlist['bracket-2']['slot-2'].item,
                state.wishlist['bracket-2']['slot-3'].item, state.wishlist['bracket-2']['slot-4'].item,
                state.wishlist['bracket-2']['slot-5'].item, state.wishlist['bracket-2']['slot-6'].item,],
            bracket3:
                [state.wishlist['bracket-3']['slot-1'].item, state.wishlist['bracket-3']['slot-2'].item,
                state.wishlist['bracket-3']['slot-3'].item, state.wishlist['bracket-3']['slot-4'].item,
                state.wishlist['bracket-3']['slot-5'].item, state.wishlist['bracket-3']['slot-6'].item,],
            bracket4: (state.player.class === 'hunter' ? null :
                [state.wishlist['bracket-4']['slot-1'].item, state.wishlist['bracket-4']['slot-2'].item,
                state.wishlist['bracket-4']['slot-3'].item, state.wishlist['bracket-4']['slot-4'].item,
                state.wishlist['bracket-4']['slot-5'].item, state.wishlist['bracket-4']['slot-6'].item,]
            ),
            bracketless:
                [state.wishlist['bracket-4']['slot-1'].item, state.wishlist['bracket-4']['slot-2'].item,
                state.wishlist['bracket-4']['slot-3'].item, state.wishlist['bracket-4']['slot-4'].item,
                state.wishlist['bracket-4']['slot-5'].item, state.wishlist['bracket-4']['slot-6'].item,]
        }
        await axios.post('http://raegae.maarten.ch:3000/api/wishlist/save', value)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    },
    async searchItems(query) {
        let cancel;

        //check if there is currently an open request
        if (cancel) {
            //cancels perv. request
            cancel.cancel()
        }
        try {
            //check if query was cached
            if (cache[query]) {
                //return cached query
                return cache[query];
            }
            //create a new token
            cancel = axios.CancelToken.source();
            //send request with cancelToken
            const response = await axios('http://raegae.maarten.ch:3000/api/items?query=' + query, { cancelToken: cancel.token });
            const result = await response.data.results;

            //store query for caching
            cache[query] = result;

            //return unpacked result
            return result;

        } catch (error) {
            if (axios.isCancel(error)) {
                console.error('Request cancelled', error.message);
            } else {
                console.error('Something went bad: ', error.message);
            }
        }
    }
};
