import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://raegae.maarten.ch/api/'
})

const cache = {};

export const api = {
    loadProfile(state) {
        instance.get('player/loadProfile',
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
            if (response.data.player.class === 'Hunter') {
                if (state.wishlist['bracket-1'].points > 2) {
                    state.wishlist['bracket-1'].points = 2;
                }
                if (state.wishlist['bracket-2'].points > 2) {
                    state.wishlist['bracket-2'].points = 2;
                }
                if (state.wishlist['bracket-3'].points > 2) {
                    state.wishlist['bracket-3'].points = 2;
                }
            }
            // does intentionally NOT load the wishlist from the server, this should be a joice.
            return true;
        }).catch(err => {
            console.error(err);
            //return false;
        })
    },
    saveProfile(state, data) {
        instance.post('player/saveProfile', {
            name: data._name,
            race: data._race,
            class: data._class,
            role: data._role
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
            if (response.data.player.class === 'Hunter') {
                if (state.wishlist['bracket-1'].points > 2) {
                    state.wishlist['bracket-1'].points = 2;
                }
                if (state.wishlist['bracket-2'].points > 2) {
                    state.wishlist['bracket-2'].points = 2;
                }
                if (state.wishlist['bracket-3'].points > 2) {
                    state.wishlist['bracket-3'].points = 2;
                }
            }
            // does intentionally NOT load the wishlist from the server, this should be a joice.
        }).catch(err => {
            console.error(err);
            //return false;
        })
    },
    async saveWishlist(state) {
        try {
            const response = await instance.post('player/saveWishlist', { wishlist: state.wishlist });
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
    async loadWishlist(state) {
        try {
            const response = await instance.get('player/loadWishlist');
            console.log(JSON.stringify(response.data.wishlist))
            if (response.status === 200) {
                if (response.data.wishlist === null) {
                    return "You have no saved wishlist.";
                } else {
                    state.wishlist = response.data.wishlist;
                    return "Your wishlist has been loaded.";
                }
            } else {
                return "This should not have happend. Malvida is sowwyy =(.";
            }
        } catch (err) {
            console.error(err);
            return "There was an error loading your wishlist.";
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
