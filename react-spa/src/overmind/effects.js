import axios from 'axios';
import { response } from 'express';

const cache = {};

export const api = {
    async login() {

        const url = 'https://discord.com/api/oauth2/authorize?client_id=724982489529188352&redirect_uri=http%3A%2F%2Fraegae.maarten.ch%3A3000%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20guilds'
        await fetch(
            new Request(
                url, 
                {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true,
                    credentials: 'same-origin',
                }
            )
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
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
            bracket4: ( state.player.class === 'hunter' ? null : 
                [state.wishlist['bracket-4']['slot-1'].item, state.wishlist['bracket-4']['slot-2'].item,
                 state.wishlist['bracket-4']['slot-3'].item, state.wishlist['bracket-4']['slot-4'].item, 
                 state.wishlist['bracket-4']['slot-5'].item, state.wishlist['bracket-4']['slot-6'].item,]
            ),
            bracketless: 
                [state.wishlist['bracket-4']['slot-1'].item, state.wishlist['bracket-4']['slot-2'].item,
                 state.wishlist['bracket-4']['slot-3'].item, state.wishlist['bracket-4']['slot-4'].item, 
                 state.wishlist['bracket-4']['slot-5'].item, state.wishlist['bracket-4']['slot-6'].item,]
        }   
        await axios.post('http://localhost:3000/wishlist/save', value)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
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
