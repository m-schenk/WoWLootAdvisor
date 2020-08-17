import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://raegae.maarten.ch/api/'
})

const cache = {};

export const api = {
    getPlayerProfile(state) {
        instance.get('player/getPlayerProfile',
        ).then((response) => {
            state.player._id = response.data.player._id;
            state.player.isComplete = response.data.isComplete;
            if (response.data.player.name) {
                state.player.name = response.data.player.name
            }
            if (response.data.player.class) {
                state.player.class = response.data.player.class
            }
            if (response.data.player.race) {
                state.player.race = response.data.player.race
            }
            if (response.data.player.role) {
                state.player.role = response.data.player.role
            }
            if (response.data.player.aq_attendance) {
                state.player.aq_attendance = response.data.player.aq_attendance
            }
            if (response.data.player.naxx_attendance) {
                state.player.naxx_attendance = response.data.player.naxx_attendance
            }
            if (response.data.player.permissions) {
                state.player.permissions = response.data.player.permissions
            }
            if (response.data.player.wishlist.bracket1) state.player.debug.bracket1 = [...response.data.player.wishlist.bracket1]
            if (response.data.player.wishlist.bracket2) state.player.debug.bracket2 = [...response.data.player.wishlist.bracket2]
            if (response.data.player.wishlist.bracket3) state.player.debug.bracket3 = [...response.data.player.wishlist.bracket3]
            if (response.data.player.wishlist.bracket4) state.player.debug.bracket4 = [...response.data.player.wishlist.bracket4]
            if (response.data.player.wishlist.bracketless) state.player.debug.bracketless = [...response.data.player.wishlist.bracketless]

            if (response.player.class === 'Hunter') {
                if(state.wishlist['bracket-1'].points === 3) {
                    state.wishlist['bracket-1'].points = 2;
                }
                if(state.wishlist['bracket-2'].points === 3) {
                    state.wishlist['bracket-2'].points = 2;
                }
                if(state.wishlist['bracket-3'].points === 3) {
                    state.wishlist['bracket-3'].points = 2;
                }
            }

            return true;
        }).catch(err => {
            console.error(err);
            //return false;
        })
    },
    sendProfile(state, data) {
        instance.post('player/postPlayerProfile', {
            _name: data._name,
            _race: data._race,
            _class: data._class,
            _role: data._role
        }).then((response) => {
            state.player._id = response.data.player._id;
            state.player.isComplete = response.data.isComplete;
            if (response.data.player.name) {
                state.player.name = response.data.player.name
            }
            if (response.data.player.class) {
                state.player.class = response.data.player.class
            }
            if (response.data.player.race) {
                state.player.race = response.data.player.race
            }
            if (response.data.player.role) {
                state.player.role = response.data.player.role
            }
            if (response.data.player.aq_attendance) {
                state.player.aq_attendance = response.data.player.aq_attendance
            }
            if (response.data.player.naxx_attendance) {
                state.player.naxx_attendance = response.data.player.naxx_attendance
            }
            if (response.data.player.permissions) {
                state.player.permissions = response.data.player.permissions
            }
            if (response.data.player.wishlist.bracket1) state.player.debug.bracket1 = [...response.data.player.wishlist.bracket1]
            if (response.data.player.wishlist.bracket2) state.player.debug.bracket2 = [...response.data.player.wishlist.bracket2]
            if (response.data.player.wishlist.bracket3) state.player.debug.bracket3 = [...response.data.player.wishlist.bracket3]
            if (response.data.player.wishlist.bracket4) state.player.debug.bracket4 = [...response.data.player.wishlist.bracket4]
            if (response.data.player.wishlist.bracketless) state.player.debug.bracketless = [...response.data.player.wishlist.bracketless]

            if (response.player.class === 'Hunter') {
                if(state.wishlist['bracket-1'].points === 3) {
                    state.wishlist['bracket-1'].points = 2;
                }
                if(state.wishlist['bracket-2'].points === 3) {
                    state.wishlist['bracket-2'].points = 2;
                }
                if(state.wishlist['bracket-3'].points === 3) {
                    state.wishlist['bracket-3'].points = 2;
                }
            }

        }).catch(err => {
            console.error(err);
            //return false;
        })
    },
    async sendWishlist(state) {
        const wishlist = {
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
            bracket4: (state.player.class === 'Hunter' ? null :
                [state.wishlist['bracket-4']['slot-1'].item, state.wishlist['bracket-4']['slot-2'].item,
                state.wishlist['bracket-4']['slot-3'].item, state.wishlist['bracket-4']['slot-4'].item,
                state.wishlist['bracket-4']['slot-5'].item, state.wishlist['bracket-4']['slot-6'].item,]
            ),
            bracketless:
                [state.wishlist['bracketless']['slot-1'].item, state.wishlist['bracketless']['slot-2'].item,
                state.wishlist['bracketless']['slot-3'].item, state.wishlist['bracketless']['slot-4'].item,
                state.wishlist['bracketless']['slot-5'].item, state.wishlist['bracketless']['slot-6'].item,
                state.wishlist['bracketless']['slot-7'].item, state.wishlist['bracketless']['slot-8'].item,
                state.wishlist['bracketless']['slot-9'].item, state.wishlist['bracketless']['slot-10'].item,
                state.wishlist['bracketless']['slot-11'].item, state.wishlist['bracketless']['slot-12'].item,
                state.wishlist['bracketless']['slot-13'].item, state.wishlist['bracketless']['slot-14'].item,
                state.wishlist['bracketless']['slot-15'].item, state.wishlist['bracketless']['slot-16'].item,
                state.wishlist['bracketless']['slot-17'].item, state.wishlist['bracketless']['slot-18'].item,
                state.wishlist['bracketless']['slot-19'].item, state.wishlist['bracketless']['slot-20'].item,
                state.wishlist['bracketless']['slot-21'].item, state.wishlist['bracketless']['slot-22'].item,
                state.wishlist['bracketless']['slot-23'].item, state.wishlist['bracketless']['slot-24'].item,
                state.wishlist['bracketless']['slot-25'].item, state.wishlist['bracketless']['slot-26'].item,
                state.wishlist['bracketless']['slot-27'].item, state.wishlist['bracketless']['slot-28'].item,
                state.wishlist['bracketless']['slot-29'].item, state.wishlist['bracketless']['slot-30'].item,
                state.wishlist['bracketless']['slot-31'].item, state.wishlist['bracketless']['slot-32'].item,]
        }
        try {
            const response = await instance.post('player/saveWishlist', { wishlist: wishlist })
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        };
    },
    async searchItems(query) {
        let cancel;

        //check if there is currently an open request
        if (cancel) {
            //cancels perv. request
            cancel.cancel()
        }
        //check if query was cached
        if (cache[query]) {
            //return cached query
            return cache[query];
        }
        //create a new token
        cancel = axios.CancelToken.source();
        //send request with cancelToken
        try {
            const response = await instance.get('items?query=' + query, { cancelToken: cancel.token })
            const result = await response.data.results;

            //store query for caching
            cache[query] = result;

            //return unpacked result
            return result;
        } catch (err) {
            if (axios.isCancel(err)) {
                console.error('Request cancelled', err.message);
            } else {
                console.error('Something went bad: ', err.message);
            }
        };
    }
};
