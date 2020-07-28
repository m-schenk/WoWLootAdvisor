import axios from 'axios';

const cache = {};

export const api = {
    async login() {

        await axios.get('http://localhost:3000/discord/login', {
            crossdomain: true
        })
    },
    async searchItems(query) {
        let cancel;

        //check if there is currently an open request
        if(cancel) {
            //cancels perv. request
            cancel.cancel()
        }
        try {
            //check if query was cached
            if(cache[query]) {
                //return cached query
                return cache[query];
            }
            //create a new token
            cancel = axios.CancelToken.source();
            //send request with cancelToken
            const response = await axios('http://localhost:3000/items?query='+query, {cancelToken: cancel.token});
            const result = await response.data.results;

            //store query for caching
            cache[query] = result;

            //return unpacked result
            return result;

        } catch(error) {
            if(axios.isCancel(error)) {
                console.error('Request cancelled', error.message);
            } else {
                console.error('Something went bad: ', error.message);
            }
        }
    }
};
