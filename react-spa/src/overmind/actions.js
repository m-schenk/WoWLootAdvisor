import { pipe, debounce, mutate } from 'overmind';


export const searchItems = pipe(
    mutate(({ state }, value) => {
        state.liveSearch['query'] = value;
    }),
    debounce(250),
    mutate( async({ state, effects }) => {
        state.liveSearch['isSearching'] = true;
        state.liveSearch['result'] = await effects.api.searchItems(state.liveSearch['query']);
        state.liveSearch['isSearching'] = false;
    })
)

export const login = () => {
    window.location = 'http://raegae.maarten.ch:3000/api/discord/login'
}

export const sendWishlist = pipe(
    mutate(({ state, effects }) => {
        effects.api.sendWishlist(state);
    })
)

export const isAuthenticated = pipe(
    mutate(({ state, effects }) => {
        effects.api.isAuthenticated(state);
    })
)

export const dragHandler = pipe( //just for now, will become an effect I guess.. later
    mutate(({ state }, result) => {
        const { destination, source } = result;

        //when destination null => draggable was not over any droppable, so we are done.
        if( !destination ) {
            return;
        }

        /* when destination 'delete-zone' => we have to remove the item by case, if it's from the 
        live search we don't do anything, if it's from inside the wishlist we have to remove the 
        item and check for allocation points */
        if( destination['droppableId'] === 'delete-zone' ) {
            if( source['droppableId'] === state.liveSearch['id'] ) {
                return;
            } else { //item is from wishlist
                const [ sourceBracketId, sourceSlotId ] = source['droppableId'].split("_");
                /* when the item to remove is reserved or limited, we need to give back one allocation point */
                if( (state.wishlist[sourceBracketId][sourceSlotId].item.itemCategory === "Reserved") || 
                    (state.wishlist[sourceBracketId][sourceSlotId].item.itemCategory === "Limited") ) {
                    state.wishlist[sourceBracketId]['points']++;
                }
                console.log(state.wishlist[sourceBracketId][sourceSlotId].item.id)
                console.log(state.wishlist.filterList.indexOf(state.wishlist[sourceBracketId][sourceSlotId].item.id))
                const sliceid = state.wishlist.filterList.indexOf(state.wishlist[sourceBracketId][sourceSlotId].item.id)
                state.wishlist.filterList.splice(sliceid, 1)
                state.wishlist[sourceBracketId][sourceSlotId].item = null;
                return;
            }
        }

        //destination can only be wishlist from now, so we can savely use string split on destination to recieve bracketId and slotId
        const [ destinationBracketId, destinationSlotId ] = destination['droppableId'].split("_");
        const [, destinationSlotIdInt ] = destinationSlotId.split("-");

        //when dropping to back slot, checking if front slot is occupied by reserved item
        if( (destinationSlotIdInt % 2 === 0) && 
            (state.wishlist[destinationBracketId]['slot-'+(parseInt(destinationSlotIdInt)-1)].item !== null ) && 
            (state.wishlist[destinationBracketId]['slot-'+(parseInt(destinationSlotIdInt)-1)].item.itemCategory === "Reserved") ) {
            return;
        }

        let stateItem;
        let [ sourceBracketId, sourceSlotId ] = [ null, null ];
        let sourceSlotIdInt = null;

        //decide where the item is from live-search or wishlist, read item to stateItem
        if( source['droppableId'] === state.liveSearch['id'] ) {
            stateItem = state.liveSearch.result[source.index];
        } else {
            [ sourceBracketId, sourceSlotId ] = source['droppableId'].split("_");
            [, sourceSlotIdInt ] = sourceSlotId.split("-");
            stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;
        }

        //item already in wishlist
        if( state.wishlist.filterList.includes(stateItem.id) && (source['droppableId'] === state.liveSearch['id'])) {
            return;
        }

        //clone source item from overmind state to memory
        const sourceItem = {
            id: stateItem.id,
            name: stateItem.name,
            itemType: stateItem.itemType,
            itemCategory: stateItem.itemCategory,
            raid: stateItem.raid,
            encounters: stateItem.encounters,
            priority: stateItem.priority,
            deName: stateItem.deName,
        };

        //clone destination item from overmind state to memory if it exists
        let destinationItem;

        if( state.wishlist[destinationBracketId][destinationSlotId].item === null ) {
            destinationItem = null;
        } else {
            stateItem = state.wishlist[destinationBracketId][destinationSlotId].item
            destinationItem = {
                id: stateItem.id,
                name: stateItem.name,
                itemType: stateItem.itemType,
                itemCategory: stateItem.itemCategory,
                raid: stateItem.raid,
                encounters: stateItem.encounters,
                priority: stateItem.priority,
                deName: stateItem.deName
            };
        }

        //source item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
        if( (sourceItem.itemCategory === "Reserved") && (destinationSlotIdInt%2 !== 1 ) ) {
            return;
        } else if( (sourceItem.itemCategory === "Reserved") && (state.wishlist[destinationBracketId]['slot-'+(parseInt(destinationSlotIdInt)+1)].item !== null) ) {
            return;
        }

        //destination item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
        if( ( destinationItem !== null ) && (destinationItem.itemCategory === "Reserved") && (sourceSlotIdInt%2 !== 1) ) {
            return;
        } else if( ( destinationItem !== null ) && (destinationItem.itemCategory === "Reserved") && 
            (state.wishlist[sourceBracketId]['slot-'+(parseInt(sourceSlotIdInt)+1)].item !== null) ) {
            return;
        }

        //ONLY wishlist to wishlist swap reserved or limited source item with empty slot or unlimited destination item from different brackets
        if( ( (sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited") ) && 
            ( (destinationItem === null) || (destinationItem.itemCategory === "Unlimited") ) && 
            ( (sourceBracketId !== null) && destinationBracketId !== sourceBracketId) ) {
            if(state.wishlist[destinationBracketId]['points'] === 0) {
                return;
            } else {
                state.wishlist[destinationBracketId]['points']--;
                state.wishlist[sourceBracketId]['points']++;
            }
        }

        /* ONLY for items from live search: item costs allocation points check if bracket has enought, if so deduce by one. */
        if( ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) && (sourceBracketId === null)) {
            if(state.wishlist[destinationBracketId]['points'] === 0) {
                return;
            }
            state.wishlist[destinationBracketId]['points']--;
        }

        /* swap reserved or limited destination item with empty slot or unlimited source item from 
        different brackets OR live search => special case for items from live search 
        (swap out a reserved or limited item should give one allocation point back) */
        if( ( destinationItem !== null ) && ( (destinationItem.itemCategory === "Reserved") || (destinationItem.itemCategory === "Limited") ) && 
            (sourceItem.itemCategory === "Unlimited") && 
            (destinationBracketId !== sourceBracketId) ) {
            if( source['droppableId'] === state.liveSearch['id'] ) {
                state.wishlist[destinationBracketId]['points']++;
            } else {
                if(state.wishlist[sourceBracketId]['points'] === 0) {
                    return;
                } else {
                    state.wishlist[sourceBracketId]['points']--;
                    state.wishlist[destinationBracketId]['points']++;
                }
            }
        }
        if( source['droppableId'] === state.liveSearch['id'] ) {
            state.wishlist.filterList.push(sourceItem.id)
        }
        //set state of items
        state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;
        if( sourceBracketId !== null ) {
            state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;
        }
    }),
)
