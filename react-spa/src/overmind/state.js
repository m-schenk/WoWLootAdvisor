export const state = {
    player: {
        id: null,
        name: null,
        class: null,
        race: null,
        talent: null,
        aq_attendance: null,
        naxx_attendance: null,
        wishlist: null,
        role: null,
        loaded: false,
    },
    wishlist: {
        'locked': false,
        'bracket-1': {
            'slot-1': {
                id: '1-1',
                item: null,
            },
            'slot-2': {
                id: '1-2',
                item: null,
            },
            'slot-3': {
                id: '1-3',
                item: null,
            },
            'slot-4': {
                id: '1-4',
                item: null,
            },
            'slot-5': {
                id: '1-5',
                item: null,
            },
            'slot-6': {
                id: '1-6',
                item: null,
            },
            'points': 3,
            'prio-start': 50,
        },
        'bracket-2': {
            'slot-1': {
                id: '2-1',
                item: null,
            },
            'slot-2': {
                id: '2-2',
                item: null,
            },
            'slot-3': {
                id: '2-3',
                item: null,
            },
            'slot-4': {
                id: '2-4',
                item: null,
            },
            'slot-5': {
                id: '2-5',
                item: null,
            },
            'slot-6': {
                id: '2-6',
                item: null,
            },
            'points': 3,
            'prio-start': 47,
        },
        'bracket-3': {
            'slot-1': {
                id: '3-1',
                item: null,
            },
            'slot-2': {
                id: '3-2',
                item: null,
            },
            'slot-3': {
                id: '3-3',
                item: null,
            },
            'slot-4': {
                id: '3-4',
                item: null,
            },
            'slot-5': {
                id: '3-5',
                item: null,
            },
            'slot-6': {
                id: '3-6',
                item: null,
            },
            'points': 3,
            'prio-start': 44,
        },
        'bracket-4': {
            'slot-1': {
                id: '4-1',
                item: null,
            },
            'slot-2': {
                id: '4-2',
                item: null,
            },
            'slot-3': {
                id: '4-3',
                item: null,
            },
            'slot-4': {
                id: '4-4',
                item: null,
            },
            'slot-5': {
                id: '4-5',
                item: null,
            },
            'slot-6': {
                id: '4-6',
                item: null,
            },
            'points': 3,
            'prio-start': 41,
        },
        'bracketless': {
            'slot-1': {
                id: '5-1',
                item: null,
            },
            'slot-2': {
                id: '5-2',
                item: null,
            },
            'slot-3': {
                id: '5-3',
                item: null,
            },
            'slot-4': {
                id: '5-4',
                item: null,
            },
            'slot-5': {
                id: '5-5',
                item: null,
            },
            'slot-6': {
                id: '5-6',
                item: null,
            },
            'points': Infinity,
            'prio-start': 38,
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