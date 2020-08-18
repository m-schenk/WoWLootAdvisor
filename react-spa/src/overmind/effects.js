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
            // does intentionally NOT load the wishlist from the server, this should be a joice
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
            if (response.status === 200) {
                if(response.data.wishlist === null) {
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
