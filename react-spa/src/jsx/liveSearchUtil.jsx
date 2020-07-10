import axios from 'axios';

const cache = {};

const makeRequestCreator = () => {
    let cancel;

    return async query => {
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
            const response = await axios(query, {cancelToken: cancel.token}); 
            const result = await response.data.results;

            //store query for caching
            cache[query] = result;

            //return unpacked result
            return result;

        } catch(error) {
            if(axios.isCancel(error)) {
                console.log('Request cancelled', error.message);
            } else {
                console.log('Something went bad: ', error.message);
            }
        }
    };
};

export const search = makeRequestCreator();