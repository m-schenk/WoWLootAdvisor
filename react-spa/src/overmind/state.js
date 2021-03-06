export const state = {
    player: {
        _id: null,
        name: null,
        class: null,
        race: null,
        role: null,
        permissions: null,
        aq_attendance: null,
        naxx_attendance: null,
        wishlist: null,
        loaded: false,
        isComplete: null,
    },
    wishlist: {
        'locked': false,
        'bracket-1': {
            itemTypes: [],
            'slot-1': { item: {} },
            'slot-2': { item: {} },
            'slot-3': { item: {} },
            'slot-4': { item: {} },
            'slot-5': { item: {} },
            'slot-6': { item: {} },
            points: 3
        },
        'bracket-2': {
            itemTypes: [],
            'slot-1': { item: {} },
            'slot-2': { item: {} },
            'slot-3': { item: {} },
            'slot-4': { item: {} },
            'slot-5': { item: {} },
            'slot-6': { item: {} },
            points: 3
        },
        'bracket-3': {
            itemTypes: [],
            'slot-1': { item: {} },
            'slot-2': { item: {} },
            'slot-3': { item: {} },
            'slot-4': { item: {} },
            'slot-5': { item: {} },
            'slot-6': { item: {} },
            points: 3
        },
        'bracket-4': {
            itemTypes: [],
            'slot-1': { item: {} },
            'slot-2': { item: {} },
            'slot-3': { item: {} },
            'slot-4': { item: {} },
            'slot-5': { item: {} },
            'slot-6': { item: {} },
            points: 3
        },
        'bracketless': {
            'slot-1': { item: {} },
            'slot-2': { item: {} },
            'slot-3': { item: {} },
            'slot-4': { item: {} },
            'slot-5': { item: {} },
            'slot-6': { item: {} },
            'slot-7': { item: {} },
            'slot-8': { item: {} },
            'slot-9': { item: {} },
            'slot-10': { item: {} },
            'slot-11': { item: {} },
            'slot-12': { item: {} },
            'slot-13': { item: {} },
            'slot-14': { item: {} },
            'slot-15': { item: {} },
            'slot-16': { item: {} },
            'slot-17': { item: {} },
            'slot-18': { item: {} },
            'slot-19': { item: {} },
            'slot-20': { item: {} },
            'slot-21': { item: {} },
            'slot-22': { item: {} },
            'slot-23': { item: {} },
            'slot-24': { item: {} },
            'slot-25': { item: {} },
            'slot-26': { item: {} },
            'slot-27': { item: {} },
            'slot-28': { item: {} },
            'slot-29': { item: {} },
            'slot-30': { item: {} },
            'slot-31': { item: {} },
            'slot-32': { item: {} },
        },
        filterList: [],
    },
    liveSearch: {
        'id': 'live-search-id',
        'result': {},
        'query': '',
        'isSearching': false,
    },
}