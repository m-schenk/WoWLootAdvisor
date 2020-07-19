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
            console.log('destination: ', destination)
            console.log('bracketId: ', bracketId)
            console.log('slotId: ', slotId)

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

            state.wishlist[bracketId][slotId].item = item

        } else {
            //dragging from wishlist into wishlist or remove¨
            console.log('from wishlist')
            if( destination['droppableId'] === 'delete-zone') {
                console.log('to remove')
                //remove item from wishlist
                const [ bracketId, slotId ] = source['droppableId'].split("_")
                state.wishlist[bracketId][slotId].item = null

            }
            console.log('to wishlist')
            //move item inside wishlist



        }
        

    }),
)

