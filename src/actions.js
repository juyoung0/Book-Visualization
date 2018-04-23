/**
 * Created by juyoung on 2018-04-09.
 */
import {appDispatcher} from './appDispatcher'

export const ActionType = {
    CHANGE_MENU: 'CHANGE_MENU',
    ADD_LINK: 'ADD_LINK',
    ADD_SOURCE: 'ADD_SOURCE',
    ADD_TARGET: 'ADD_TARGET',
    ADD_NODE: 'ADD_NODE',
    SELECT_TEXT: 'SELECT_TEXT',
    CHANGE_DATA: 'CHANGE_DATA'
}

export const Actions = {
    changeMenu : (menu) => {
        if (menu == null) return;
        appDispatcher.dispatch({
            actionType: ActionType.CHANGE_MENU,
            value: menu
        })
    },
    addNode: (node) => {
        appDispatcher.dispatch({
            actionType: ActionType.ADD_NODE,
            value: node
        })
    },
    addSource: (sNode) => {
        appDispatcher.dispatch({
            actionType: ActionType.ADD_SOURCE,
            value: sNode
        })
    },
    addTarget: (tNode) => {
        appDispatcher.dispatch({
            actionType: ActionType.ADD_TARGET,
            value: tNode
        })
    },
    addLink: (sNode,tNode) => {
        appDispatcher.dispatch({
            actionType: ActionType.ADD_LINK,
            s_value: sNode,
            t_value: tNode
        })
    },
    selectText: (text) => {
        appDispatcher.dispatch({
            actionType: ActionType.SELECT_TEXT,
            value: text
        })
    },
    changeData: (data) => {
        appDispatcher.dispatch({
            actionType: ActionType.CHANGE_DATA,
            data: data
        })
    }
}