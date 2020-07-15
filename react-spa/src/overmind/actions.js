import { pipe, debounce, mutate } from 'overmind';


export const searchItems = pipe(
    mutate(({ state }, value) => {
        state.query = value;
    }),
    debounce(250),
    mutate( async({ state, effects }) => {
        state.isSearchingItems = true;
        state.itemSearchResult = await effects.api.searchItems(state.query);
        state.isSearchingItems = false;
    })
)
