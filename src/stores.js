import {ActionType} from './actions'
import {appDispatcher} from './appDispatcher'

export const menuStore = {menu:'', onChange:null}
export const nodeStore = {node:'', onChange:null}
export const sourceStore = {sNode:'', onChange:null}
export const targetStore = {tNode:'', onChange:null}
export const linkStore = {sNode:'', tNode:'', onChange:null}
export const textStore = {text:'', onChange:null}
export const dataStore = {data:{nodes: [], links: []}, onChange:null}
export const selectedLinkStore = {sNode:'', tNode:'', focus:false, onChange:null}
export const selectedNodeStore = {node:'', focus:false, onChange:null}
export const removeNodeStore = {node:'', onChange:null}

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

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.SELECT_LINK){
        selectedLinkStore.sNode = payload.s_value
        selectedLinkStore.tNode = payload.t_value
        selectedLinkStore.onChange()
    }else if(payload.actionType == ActionType.FOCUS_LINK){
        selectedLinkStore.focus = payload.focus
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.SELECT_NODE){
        selectedNodeStore.node = payload.value
        selectedNodeStore.onChange()
    }else if(payload.actionType == ActionType.FOCUS_NODE){
        selectedNodeStore.focus = payload.focus
    }
})

appDispatcher.register(payload => {
    if(payload.actionType == ActionType.REMOVE_NODE){
        removeNodeStore.node = payload.value
        removeNodeStore.onChange()
    }
})