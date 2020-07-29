import axios from 'axios';

const cache = {};

export const api = {
    async login() {

        const url = 'https://discord.com/api/oauth2/authorize?client_id=734533006114553866&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fsuccess&response_type=code&scope=identify%20guilds%20email'

        await axios(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            credentials: 'same-origin',
          }).then(response => {
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
