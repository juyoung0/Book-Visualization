import {ActionType} from './actions'
import {appDispatcher} from './appDispatcher'

export const menuStore = {menu:'', onChange:null}
export const nodeStore = {node:'', onChange:null}
export const sourceStore = {sNode:'', onChange:null}
export const targetStore = {tNode:'', onChange:null}
export const linkStore = {sNode:'', tNode:'', onChange:null}
export const textStore = {text:'', onChange:null}
export const dataStore = {data:'', onChange:null}

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.CHANGE_MENU){
        menuStore.menu = payload.value
        menuStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.ADD_NODE){
        nodeStore.node = payload.value
        nodeStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.ADD_SOURCE){
        sourceStore.sNode = payload.value
        sourceStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.ADD_TARGET){
        targetStore.tNode = payload.value
        targetStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.ADD_LINK){
        linkStore.sNode = payload.s_value
        linkStore.tNode = payload.t_value
        linkStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.SELECT_TEXT){
        textStore.text = payload.value
        textStore.onChange()
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.CHANGE_DATA){
        dataStore.data = payload.data
        dataStore.onChange()
    }
})