import {
    createStateHook,
    createActionsHook,
    createEffectsHook,
    createConnect
} from 'overmind-react'
import { state } from './state';
import * as actions from './actions';
import * as effects from './effects';

export const config = {
    state,
    actions,
    effects
}

export const connect = createConnect();
export const useActions = createActionsHook();
export const useState = createStateHook();
export const useEffects = createEffectsHook();