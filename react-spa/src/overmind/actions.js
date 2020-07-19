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

export const dragHandler = pipe( //just for now, will become an effect i guess later
    mutate(({ state }, result) => {
        const { destination, source, draggableId } = result;

        if(!destination) {
            return;
        }

        console.log(source)


        if( source['droppableId'] === state.liveSearch['id'] ) {
            //dragging from livesearch
            console.log('from live search')
            if( destination['droppableId'] === 'delete-zone') {
                //to remove
                console.log('to remove')
                return;
            }
            //to wishlist
            console.log('to wishlist')
            const [ bracketId, slotId ] = destination['droppableId'].split("_")
            const [, slotIdInt ] = slotId.split("-")

            const stateItem = state.liveSearch.result[source.index]

            const item = {
                id: stateItem.id,
                name: stateItem.name,
                itemType: stateItem.itemType,
                itemCategory: stateItem.itemCategory,
                raid: stateItem.raid,
                encounters: stateItem.encounters,
                priority: stateItem.priority,
                deName: stateItem.deName
            }

            if( (slotIdInt % 2 === 0) && (state.wishlist[bracketId]['slot-'+(parseInt(slotIdInt)-1)].item !== null ) && (state.wishlist[bracketId]['slot-'+(parseInt(slotIdInt)-1)].item.itemCategory === "Reserved") ) {
                return
            }

            if( (item.itemCategory === "Reserved") && (slotIdInt%2 !== 1) ) {
                return
            }

            if( (item.itemCategory === "Reserved") || (item.itemCategory === "Limited") ) {
                if(state.wishlist[bracketId]['points'] === 0) {
                    return
                }
                state.wishlist[bracketId]['points']--
            }
            
            if(state.wishlist[bracketId][slotId].item !== null) {
                if(state.wishlist[bracketId][slotId].item.itemCategory === "Reserved" || state.wishlist[bracketId][slotId].item.itemCategory === "Limited") {
                    state.wishlist[bracketId]['points']++
                }
            }

            state.wishlist[bracketId][slotId].item = item

        } else {
            //dragging from wishlist into wishlist or remove¨
            console.log('from wishlist')
            if( destination['droppableId'] === 'delete-zone') {
                console.log('to remove')
                //remove item from wishlist
                const [ bracketId, slotId ] = source['droppableId'].split("_")
                if(state.wishlist[bracketId][slotId].item.itemCategory === "Reserved" || state.wishlist[bracketId][slotId].item.itemCategory === "Limited") {
                    state.wishlist[bracketId]['points']++
                }
                state.wishlist[bracketId][slotId].item = null
                return

            }
            console.log('to wishlist')
            //move item inside wishlist
            const [ sourceBracketId, sourceSlotId ] = source['droppableId'].split("_")
            const [ destinationBracketId, destinationSlotId ] = destination['droppableId'].split("_")
            const [, sourceSlotIdInt ] = sourceSlotId.split("-")
            const [, destinationSlotIdInt ] = destinationSlotId.split("-")

            if( state.wishlist[destinationBracketId][destinationSlotId].item === null ) {
                    
                const stateItem = state.wishlist[sourceBracketId][sourceSlotId].item

                const item = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName
                }

                if( (item.itemCategory === "Reserved") && (destinationSlotIdInt%2 !== 1) ) {
                    return
                }

                if( item.itemCategory === "Reserved" || item.itemCategory === "Limited" && destinationBracketId !== sourceBracketId ) {
                    if(state.wishlist[destinationBracketId]['points'] === 0) {
                        return
                    } else {
                        state.wishlist[destinationBracketId]['points']--
                        state.wishlist[sourceBracketId]['points']++
                    }
                }

                state.wishlist[destinationBracketId][destinationSlotId].item = item
                state.wishlist[sourceBracketId][sourceSlotId].item = null
            } else {
                let stateItem = state.wishlist[sourceBracketId][sourceSlotId].item
                const sourceItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName
                }
                stateItem = state.wishlist[destinationBracketId][destinationSlotId].item
                const destinationItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName
                }

                if(sourceItem.itemCategory === "Reserved" && destinationSlotIdInt%2 !== 1) {
                    return
                } else if( (sourceItem.itemCategory === "Reserved") && (state.wishlist[destinationBracketId]['slot-'+(parseInt(destinationSlotIdInt)+1)].item !== null) ) {
                    return
                }

                if( (sourceItem.itemCategory === "Reserved" || sourceItem.itemCategory === "Limited") && (destinationItem.itemCategory === "Unlimited") && destinationBracketId !== sourceBracketId) {
                    if(state.wishlist[destinationBracketId]['points'] === 0) {
                        return
                    } else {
                        state.wishlist[destinationBracketId]['points']--
                        state.wishlist[sourceBracketId]['points']++
                    }
                }
                if(destinationItem.itemCategory === "Reserved" && sourceSlotIdInt%2 !== 1) {
                    return
                } else if( (destinationItem.itemCategory === "Reserved") && (state.wishlist[sourceBracketId]['slot-'+(parseInt(sourceSlotIdInt)+1)].item !== null) ) {
                    return
                }
                console.log('slot-'+(parseInt(sourceSlotIdInt)+1))
                if( (destinationItem.itemCategory === "Reserved" || destinationItem.itemCategory === "Limited") && (sourceItem.itemCategory === "Unlimited") && destinationBracketId !== sourceBracketId) {
                    if(state.wishlist[sourceBracketId]['points'] === 0) {
                        return
                    } else {
                        state.wishlist[sourceBracketId]['points']--
                        state.wishlist[destinationBracketId]['points']++
                    }
                }
                state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem
                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem
            }
         }
    }),
)

