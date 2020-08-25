import { pipe, debounce, mutate } from 'overmind';
import _ from 'lodash';

export const searchItems = pipe(
    mutate(({ state }, value) => {
        state.liveSearch['query'] = value;
    }),
    debounce(250),
    mutate(async ({ state, effects }) => {
        state.liveSearch['isSearching'] = true;
        state.liveSearch['result'] = await effects.api.searchItems(state.liveSearch['query']);
        state.liveSearch['isSearching'] = false;
    })
)

export const saveWishlist = async ({ state, effects }) => {
    return await effects.api.saveWishlist(state);
}

export const loadWishlist = async ({ state, effects }) => {
    return await effects.api.loadWishlist(state);
}

export const loadProfile = async ({ state, effects }) => {
    await effects.api.loadProfile(state);
}

export const saveProfile = async ({ state, effects }, data) => {
    await effects.api.saveProfile(state, data);
}

export const dragHandler = async ({ state }, result) => {
    const { destination, source } = result;

    //when destination null => draggable was not over any droppable, so we are done.
    if (!destination) {
        return;
    }

    // itemtypes
    const weapon = ["Sword", "Mace", "Polearm", "Two-Hand, Sword", "Two-Hand, Axe", "Dagger", "Axt", "Two-Hand, Mace", "Staff", "Fist Weapon"];
    const ranged = ["Bow", "Crossbow", "Gun", "Relic", "Wand"];
    const offhand = ["Shield", "Offhand"];

    /**********************************************************************************************/
    /********************************** LIVE SEARCH ==> ANYWHERE **********************************/
    /**********************************************************************************************/
    if (source['droppableId'] === state.liveSearch['id']) {

        // from live search to remove
        if (destination['droppableId'] === 'delete-zone') {
            return;
        }

        // from live search to bracketless
        if (destination['droppableId'].includes('bracketless')) {

            // get bracketId and slotId into vars
            const [destinationBracketId, destinationSlotId] = destination['droppableId'].split("_");

            // get the dragged item
            const stateItem = state.liveSearch.result[source.index];

            // check if item is already inside the wishlist
            if (state.wishlist.filterList.includes(stateItem.id)) {
                if(stateItem.id === '21232') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Imperial Qiraji Armaments can only be added twice at maximum.";
                    }
                } else if(stateItem.id === '20928') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Qiraji Bindings of Command can only be added twice at maximum.";
                    }
                } else if(stateItem.id === '20932') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Qiraji Bindings of Dominace can only be added twice at maximum.";
                    }
                } else {
                    return "This item is already inside your wishlist.";
                }
            }

            // clone source item from overmind state to memory
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

            // check if there is a item at destination, if so remove it from filterlist
            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {
                // remove item at destination from filterlist
                const sliceid = state.wishlist.filterList.indexOf(state.wishlist[destinationBracketId][destinationSlotId].item.id);
                state.wishlist.filterList.splice(sliceid, 1);
            }

            // push item into filterlist (for duplicate checks)
            state.wishlist.filterList.push(sourceItem.id);

            // set item into state
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;
            return "Item was added to your wishlist."
        }

        // from live search to brackets
        if (destination['droppableId'].includes('bracket-')) {

            // get bracketId and slotId into vars
            const [destinationBracketId, destinationSlotId] = destination['droppableId'].split("_");
            const [, destinationSlotIdInt] = destinationSlotId.split("-");

            // when dropping to back slot, checking if front slot is occupied by reserved item
            if ((destinationSlotIdInt % 2 === 0) &&
                (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item, 'id')) &&
                (state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item.itemCategory === "Reserved")) {
                return "This slot is locked because of the Reserved item in the front slot.";
            }

            // get the dragged item
            const stateItem = state.liveSearch.result[source.index];

            // check if item is already inside the wishlist
            if (state.wishlist.filterList.includes(stateItem.id)) {
                if(stateItem.id === '21232') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Imperial Qiraji Armaments can only be added twice at maximum.";
                    }
                } else if(stateItem.id === '20928') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Qiraji Bindings of Command can only be added twice at maximum.";
                    }
                } else if(stateItem.id === '20932') {
                    let count = 0;
                    state.wishlist.filterList.array.forEach(item => {
                        if(item === stateItem.id) {
                            count++;
                        }
                    });
                    if(count > 2) {
                        return "Qiraji Bindings of Dominace can only be added twice at maximum.";
                    }
                } else {
                    return "This item is already inside your wishlist.";
                }
            }

            // modify item type to overclassed
            const sourceFixedItemType = weapon.includes(stateItem.itemType) ? "Weapon" : ranged.includes(stateItem.itemType) ? "Ranged" : offhand.includes(stateItem.itemType) ? "Offhand" : stateItem.itemType;

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

            //source item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
            if ((sourceItem.itemCategory === "Reserved") && (destinationSlotIdInt % 2 !== 1)) {
                return "Reserved items go only in front slots.";
            } else if ((sourceItem.itemCategory === "Reserved") && (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) + 1)].item, 'id'))) {
                return "Slot behind Reserved items must be empty on drop.";
            }

            // check if there is a item at destination
            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {

                // no need to clone it, will only be removed, ref is enough
                const destinationItem = state.wishlist[destinationBracketId][destinationSlotId].item

                // modify item type to overclassed
                const destinationFixedItemType = weapon.includes(destinationItem.itemType) ? "Weapon" : ranged.includes(destinationItem.itemType) ? "Ranged" : offhand.includes(destinationItem.itemType) ? "Offhand" : destinationItem.itemType;

                // check if item types are different and if the source item type is elsewhere in this bracket (if there the same it's fine)
                if ((sourceFixedItemType !== destinationFixedItemType) &&
                    (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType))) {
                    return "This item type is already inside destination bracket.";
                }

                // check allocation points
                if ((destinationItem.itemCategory === "Reserved") || (destinationItem.itemCategory === "Limited")) {
                    if ((sourceItem.itemCategory !== "Reserved") && (sourceItem.itemCategory !== "Limited")) {
                        // old item was costing alloc points, new does not cost
                        state.wishlist[destinationBracketId].points++;
                    }
                } else {
                    if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                        // old item does not cost alloc points, new does cost
                        if (state.wishlist[destinationBracketId].points === 0) {
                            return "Destination bracket has no more allocation points left";
                        } else {
                            state.wishlist[destinationBracketId].points--;
                        }
                    }
                }

                // remove old item at destination from filterlist
                const sliceid = state.wishlist.filterList.indexOf(state.wishlist[destinationBracketId][destinationSlotId].item.id);
                state.wishlist.filterList.splice(sliceid, 1);

                // swap item types only when there not the same
                if (destinationFixedItemType !== sourceFixedItemType) {
                    // remove old item type from bracket
                    state.wishlist[destinationBracketId].itemTypes.splice(state.wishlist[destinationBracketId].itemTypes.indexOf(destinationFixedItemType), 1);
                    // push new item type to bracket
                    state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
                }
            } else { // no item at destination

                // check if item type already in bracket
                if (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType)) {
                    return "This item type is already inside this bracket.";
                }

                // check allocation points
                if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                    // check if bracket has points remaining
                    if (state.wishlist[destinationBracketId].points === 0) {
                        return "Destination bracket has no more allocation points left";
                    } else {
                        // reduce alloc point
                        state.wishlist[destinationBracketId].points--;
                    }
                }
                // push new item type to bracket
                state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
            }
            // push new item into filterlist (for duplicate checks)
            state.wishlist.filterList.push(sourceItem.id);

            // set item into state
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            return "Item was added to your wishlist.";
        }
    }

    /**********************************************************************************************/
    /*********************************** BRACKETS ==> ANYWHERE ************************************/
    /**********************************************************************************************/
    if (source['droppableId'].includes('bracket-')) {
        // get source bracket or bracketless slot id
        const [sourceBracketId, sourceSlotId] = source['droppableId'].split("_");
        const [, sourceSlotIdInt] = sourceSlotId.split("-");

        // from bracket to remove
        if (destination['droppableId'] === 'delete-zone') {
            // check if item was reserved or limited
            if ((state.wishlist[sourceBracketId][sourceSlotId].item.itemCategory === 'Reserved') ||
                (state.wishlist[sourceBracketId][sourceSlotId].item.itemCategory === 'Limited')) {
                state.wishlist[sourceBracketId].points++; //giving back 1 alloc point for removing reserved or limited
            }
            // remove item from filterlist (filterlist is blocking items from entering 2 times)
            const sliceid = state.wishlist.filterList.indexOf(state.wishlist[sourceBracketId][sourceSlotId].item.id);
            state.wishlist.filterList.splice(sliceid, 1);

            // remove itemType from bracket
            const checkItemType = state.wishlist[sourceBracketId][sourceSlotId].item.itemType;
            const itemType = weapon.includes(checkItemType) ? "Weapon" : ranged.includes(checkItemType) ? "Ranged" : offhand.includes(checkItemType) ? "Offhand" : checkItemType;
            state.wishlist[sourceBracketId].itemTypes.splice(state.wishlist[sourceBracketId].itemTypes.indexOf(itemType), 1);

            // remove item from bracket state
            state.wishlist[sourceBracketId][sourceSlotId].item = {};
            return "Item has been removed from wishlist.";
        }

        // get destination bracket or bracketless slot id
        const [destinationBracketId, destinationSlotId] = destination['droppableId'].split("_");
        const [, destinationSlotIdInt] = destinationSlotId.split("-");

        // from bracket to bracketless
        if (destination['droppableId'].includes('bracketless')) {

            // get the dragged item
            let stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;

            // modify item type to overclassed
            const sourceFixedItemType = weapon.includes(stateItem.itemType) ? "Weapon" : ranged.includes(stateItem.itemType) ? "Ranged" : offhand.includes(stateItem.itemType) ? "Offhand" : stateItem.itemType;

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

            // check if there is a item at destination
            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {

                // item must be cloned, it's a swap
                stateItem = state.wishlist[destinationBracketId][destinationSlotId].item;

                const destinationItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName,
                };

                // modify item type to overclassed
                const destinationFixedItemType = weapon.includes(destinationItem.itemType) ? "Weapon" : ranged.includes(destinationItem.itemType) ? "Ranged" : offhand.includes(destinationItem.itemType) ? "Offhand" : destinationItem.itemType;

                // check if item types are different and if the source item type is elsewhere in this bracket (if there the same it's fine)
                if ((sourceFixedItemType !== destinationFixedItemType) &&
                    (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType))) {
                    return "This item type is already inside destination bracket.";
                }

                // check allocation points
                if (((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited"))
                    && (destinationItem.itemCategory === "Unlimited")) {
                    // old item was costing alloc points, new does not cost
                    state.wishlist[sourceItem].points++;

                } else {
                    if ((destinationItem.itemCategory === "Reserved") || (destinationItem.itemCategory === "Limited")) {
                        // old item does not cost alloc points, new does cost
                        if (state.wishlist[sourceBracketId].points === 0) {
                            return "Destination bracket has no more allocation points left";
                        } else {
                            state.wishlist[sourceBracketId].points--;
                        }
                    }
                }

                // swap item types only when there not the same
                if (destinationFixedItemType !== sourceFixedItemType) {
                    // remove old item type from bracket
                    state.wishlist[sourceBracketId].itemTypes.splice(state.wishlist[sourceBracketId].itemTypes.indexOf(sourceFixedItemType), 1);
                    // push new item type to bracket
                    state.wishlist[sourceBracketId].itemTypes.push(destinationFixedItemType);
                }
                // set destination item into state
                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;

            } else { // no item at destination

                // check allocation points
                if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                    state.wishlist[sourceBracketId].points++;
                }

                // remove old item type from source bracket
                state.wishlist[sourceBracketId].itemTypes.splice(state.wishlist[sourceBracketId].itemTypes.indexOf(sourceFixedItemType), 1);

                // set null at source because there was no swap item
                state.wishlist[sourceBracketId][sourceSlotId].item = {};
            }

            // set source item into state
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            //return "DEBUG: Item was swapped inside your wishlist (bracket to bracketless)";
            return;
        }

        // swap inside bracket
        if (destinationBracketId === sourceBracketId) {

            // when dropping to back slot, checking if front slot is occupied by reserved item
            if ((destinationSlotIdInt % 2 === 0) &&
                (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item, 'id')) &&
                (state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item.itemCategory === "Reserved")) {
                return "This slot is locked because of the Reserved item in the front slot.";
            }

            const stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;

            // clone source item from overmind state to memory
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

            //source item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
            if (sourceItem.itemCategory === "Reserved") {
                if (destinationSlotIdInt % 2 === 0) {
                    return "Reserved items go only in front slots.";
                } else if (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) + 1)].item, 'id')) {
                    return "Slot behind Reserved items must be empty on drop.";
                }
            }

            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {
                const stateItem2 = state.wishlist[destinationBracketId][destinationSlotId].item;

                const destinationItem = {
                    id: stateItem2.id,
                    name: stateItem2.name,
                    itemType: stateItem2.itemType,
                    itemCategory: stateItem2.itemCategory,
                    raid: stateItem2.raid,
                    encounters: stateItem2.encounters,
                    priority: stateItem2.priority,
                    deName: stateItem2.deName,
                };

                //destination item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
                if (destinationItem.itemCategory === "Reserved") {
                    if (sourceSlotIdInt % 2 === 0) {
                        return "Reserved items go only in front slots.";
                    } else if (_.has(state.wishlist[sourceBracketId]['slot-' + (parseInt(sourceSlotIdInt) + 1)].item, 'id')) {
                        return "Slot behind Reserved items must be empty on drop.";
                    }
                }

                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;
            } else {
                state.wishlist[sourceBracketId][sourceSlotId].item = {};
            }
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            //return "DEBUG: Items have been swapped (inside bracket)";
            return;
        }

        // swap inside brackets
        if (destinationBracketId !== sourceBracketId) {

            // when dropping to back slot, checking if front slot is occupied by reserved item
            if ((destinationSlotIdInt % 2 === 0) &&
                (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item, 'id')) &&
                (state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item.itemCategory === "Reserved")) {
                return "This slot is locked because of the Reserved item in the front slot.";
            }

            // get the dragged item
            let stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;

            // modify item type to overclassed
            const sourceFixedItemType = weapon.includes(stateItem.itemType) ? "Weapon" : ranged.includes(stateItem.itemType) ? "Ranged" : offhand.includes(stateItem.itemType) ? "Offhand" : stateItem.itemType;

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

            //source item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
            if (sourceItem.itemCategory === "Reserved") {
                if (destinationSlotIdInt % 2 !== 1) {
                    return "Reserved items go only in front slots.";
                } else if (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) + 1)].item, 'id')) {
                    return "Slot behind Reserved items must be empty on drop.";
                }
            }

            // check if there is a item at destination
            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {

                // item must be cloned, it's a swap
                stateItem = state.wishlist[destinationBracketId][destinationSlotId].item;

                const destinationItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName,
                };

                //destination item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
                if (destinationItem.itemCategory === "Reserved") {
                    if (sourceSlotIdInt % 2 !== 1) {
                        return "Reserved items go only in front slots.";
                    } else if (_.has(state.wishlist[sourceBracketId]['slot-' + (parseInt(sourceSlotIdInt) + 1)].item, 'id')) {
                        return "Slot behind Reserved items must be empty on drop.";
                    }
                }

                // modify item type to overclassed
                const destinationFixedItemType = weapon.includes(destinationItem.itemType) ? "Weapon" : ranged.includes(destinationItem.itemType) ? "Ranged" : offhand.includes(destinationItem.itemType) ? "Offhand" : destinationItem.itemType;

                // check if item types are different and if the source item type is elsewhere in destination bracket (if there the same it's fine)
                if ((sourceFixedItemType !== destinationFixedItemType) &&
                    (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType))) {
                    return "Source item type is already inside destination bracket.";
                }

                // check if item types are different and if the destination item type is elsewhere in source bracket (if there the same it's fine)
                if ((sourceFixedItemType !== destinationFixedItemType) &&
                    (state.wishlist[sourceBracketId].itemTypes.includes(destinationFixedItemType))) {
                    return "Destination item type is already inside source bracket.";
                }

                // check allocation points, if both reserved||limited or both unlimited just pass.
                if (((destinationItem.itemCategory === "Reserved") || (destinationItem.itemCategory === "Limited"))
                    && (sourceItem.itemCategory === "Unlimited")) {
                    // destination item was costing alloc points, source does not cost
                    if (state.wishlist[sourceBracketId].points > 0) {
                        state.wishlist[sourceBracketId].points--;
                        state.wishlist[destinationBracketId].points++;
                    } else {
                        return "Source bracket has no more allocation points left";
                    }
                }

                if (((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited"))
                    && (destinationItem.itemCategory === "Unlimited")) {
                    // source item was costing alloc points, destination does not cost
                    if (state.wishlist[destinationBracketId].points > 0) {
                        state.wishlist[destinationBracketId].points--;
                        state.wishlist[sourceBracketId].points++;
                    } else {
                        return "Destination bracket has no more allocation points left";
                    }
                }

                // swap item types only when there not the same
                if (destinationFixedItemType !== sourceFixedItemType) {
                    // remove source item type from source bracket
                    state.wishlist[sourceBracketId].itemTypes.splice(state.wishlist[sourceBracketId].itemTypes.indexOf(sourceFixedItemType), 1);
                    // remove destination item type from destination bracket
                    state.wishlist[destinationBracketId].itemTypes.splice(state.wishlist[destinationBracketId].itemTypes.indexOf(destinationFixedItemType), 1);
                    // push source item type to destination bracket
                    state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
                    // push destination item type to source bracket
                    state.wishlist[sourceBracketId].itemTypes.push(destinationFixedItemType);
                }
                // set destination item into state
                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;

            } else { // no item at destination

                //check if item type already in bracket
                if (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType)) {
                    return "This item type is already inside destination bracket.";
                }

                // check allocation points
                if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                    // check if bracket has points remaining
                    if (state.wishlist[destinationBracketId].points > 0) {
                        // reduce alloc point
                        state.wishlist[destinationBracketId].points--;
                        state.wishlist[sourceBracketId].points++;
                    } else {
                        return "Destination bracket has no more allocation points left";
                    }
                }

                // remove item type from old bracket
                state.wishlist[sourceBracketId].itemTypes.splice(state.wishlist[sourceBracketId].itemTypes.indexOf(sourceFixedItemType), 1);

                // push item type to new bracket
                state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
                // set null at source because there was no swap item
                state.wishlist[sourceBracketId][sourceSlotId].item = {};
            }

            // set source item into state
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            //return "DEBUG: Item was swapped inside your wishlist (bracket to bracket)";
            return;
        }
        return "Error: Report this to Malvida immediately if you see this msg.";
    }

    /**********************************************************************************************/
    /********************************** BRACKETLESS ==> ANYWHERE **********************************/
    /**********************************************************************************************/
    if (source['droppableId'].includes('bracketless')) {
        // get source bracket or bracketless slot id
        const [sourceBracketId, sourceSlotId] = source['droppableId'].split("_");

        // from bracketless to remove
        if (destination['droppableId'] === 'delete-zone') {
            // remove item from filterlist (filterlist is blocking items from entering 2 times)
            const sliceid = state.wishlist.filterList.indexOf(state.wishlist[sourceBracketId][sourceSlotId].item.id);
            state.wishlist.filterList.splice(sliceid, 1);

            // remove item from bracket state
            state.wishlist[sourceBracketId][sourceSlotId].item = {};
            return "Item has been removed from wishlist.";
        }

        // get destination bracket or bracketless slot id
        const [destinationBracketId, destinationSlotId] = destination['droppableId'].split("_");
        const [, destinationSlotIdInt] = destinationSlotId.split("-");

        // from bracketless to bracket
        if (destination['droppableId'].includes('bracket-')) {

            // when dropping to back slot, checking if front slot is occupied by reserved item
            if ((destinationSlotIdInt % 2 === 0) &&
                (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item, 'id')) &&
                (state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) - 1)].item.itemCategory === "Reserved")) {
                return "This slot is locked because of the Reserved item in the front slot.";
            }

            // get the dragged item
            let stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;

            // modify item type to overclassed
            const sourceFixedItemType = weapon.includes(stateItem.itemType) ? "Weapon" : ranged.includes(stateItem.itemType) ? "Ranged" : offhand.includes(stateItem.itemType) ? "Offhand" : stateItem.itemType;

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

            //source item is reserved => should only be able to go to front slots and if it goes to front, backslot must be clear
            if ((sourceItem.itemCategory === "Reserved") && (destinationSlotIdInt % 2 !== 1)) {
                return "Reserved items go only in front slots.";
            } else if ((sourceItem.itemCategory === "Reserved") &&
                (_.has(state.wishlist[destinationBracketId]['slot-' + (parseInt(destinationSlotIdInt) + 1)].item, 'id'))) {
                return "Slot behind Reserved items must be empty on drop.";
            }

            // check if there is a item at destination
            if (_.has(state.wishlist[destinationBracketId][destinationSlotId].item, 'id')) {

                // item must be cloned, it's a swap
                stateItem = state.wishlist[destinationBracketId][destinationSlotId].item;

                const destinationItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName,
                };

                // modify item type to overclassed
                const destinationFixedItemType = weapon.includes(destinationItem.itemType) ? "Weapon" : ranged.includes(destinationItem.itemType) ? "Ranged" : offhand.includes(destinationItem.itemType) ? "Offhand" : destinationItem.itemType;

                // check if item types are different and if the source item type is elsewhere in this bracket (if there the same it's fine)
                if ((sourceFixedItemType !== destinationFixedItemType) &&
                    (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType))) {
                    return "This item type is already inside destination bracket.";
                }

                // check allocation points
                if (((destinationItem.itemCategory === "Reserved") || (destinationItem.itemCategory === "Limited"))
                    && (sourceItem.itemCategory === "Unlimited")) {
                    // old item was costing alloc points, new does not cost
                    state.wishlist[destinationBracketId].points++;

                } else {
                    if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                        // old item does not cost alloc points, new does cost
                        if (state.wishlist[destinationBracketId].points === 0) {
                            return "Destination bracket has no more allocation points left";
                        } else {
                            state.wishlist[destinationBracketId].points--;
                        }
                    }
                }

                // swap item types only when there not the same
                if (destinationFixedItemType !== sourceFixedItemType) {
                    // remove old item type from bracket
                    state.wishlist[destinationBracketId].itemTypes.splice(state.wishlist[destinationBracketId].itemTypes.indexOf(destinationFixedItemType), 1);
                    // push new item type to bracket
                    state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
                }
                // set destination item into state
                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;

            } else { // no item at destination

                //check if item type already in bracket
                if (state.wishlist[destinationBracketId].itemTypes.includes(sourceFixedItemType)) {
                    return "This item type is already inside this bracket.";
                }

                // check allocation points
                if ((sourceItem.itemCategory === "Reserved") || (sourceItem.itemCategory === "Limited")) {
                    // check if bracket has points remaining
                    if (state.wishlist[destinationBracketId].points > 0) {
                        // reduce alloc point
                        state.wishlist[destinationBracketId].points--;
                    } else {
                        return "Destination bracket has no more allocation points left";
                    }
                }
                // push new item type to bracket
                state.wishlist[destinationBracketId].itemTypes.push(sourceFixedItemType);
                // set null at source because there was no swap item
                state.wishlist[sourceBracketId][sourceSlotId].item = {};
            }

            // set source item into state
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            //return "DEBUG: Item was swapped inside your wishlist (bracketless to bracket)";
            return;
        }
        // swaps inside bracketless
        if (destination['droppableId'].includes('bracketless')) {

            let stateItem = state.wishlist[sourceBracketId][sourceSlotId].item;

            // clone source item from overmind state to memory
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

            stateItem = state.wishlist[destinationBracketId][destinationSlotId].item;

            // if there is a item at destination swap else set source null
            if (_.has(stateItem, 'id')) {
                const destinationItem = {
                    id: stateItem.id,
                    name: stateItem.name,
                    itemType: stateItem.itemType,
                    itemCategory: stateItem.itemCategory,
                    raid: stateItem.raid,
                    encounters: stateItem.encounters,
                    priority: stateItem.priority,
                    deName: stateItem.deName,
                };
                state.wishlist[sourceBracketId][sourceSlotId].item = destinationItem;
            } else {
                state.wishlist[sourceBracketId][sourceSlotId].item = {};
            }
            state.wishlist[destinationBracketId][destinationSlotId].item = sourceItem;

            //return "DEBUG: Items have been swapped (inside bracketless)";
            return;
        }
        return "ERROR: Report this to Malvida immediately if you see this msg.";
    }
}
